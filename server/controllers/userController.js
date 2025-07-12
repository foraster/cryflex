const ApiError = require("../error/ApiError");
const { Sequelize } = require("sequelize");
const {
  User,
  PersonalInfo,
  Portfolio,
  PortfolioCryptos,
  Purchases,
} = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { user } = require("pg");
const { validatePassword } = require("../utils/helpers");

//Start value of money
const balance_units = 100_000_000_000_0; 

const generateJWT = (id, role) => {
  return jwt.sign({ id, role }, process.env.SECRET_KEY, { expiresIn: "24h" });
};

class UserController {
  async validate(req, res, next) {
    const { username, email, password } = req.body;
    const missingFields = {};
    if (!email) missingFields.email = "Email is required";
    if (!username) missingFields.username = "Username is required";
    if (!password) missingFields.password = "Password is required";

    if (!validatePassword(password)) {
      return next(
        ApiError.badRequest("Password validation failed", {
          password: "Password does not meet the requirements",
        })
      );
    }
    const candidate = await User.findOne({
      where: {
        [Sequelize.Op.or]: [{ email }, { username }],
      },
    });

    if (candidate) {
      if (candidate.email === email) {
        missingFields.email = "User with provided email already exists";
        return next(
          ApiError.badRequest("User with provided email already exists")
        );
      }
      if (candidate.username === username) {
        missingFields.username = "User with provided username already exists";
        return next(
          ApiError.badRequest("User with provided username already exists")
        );
      }
    }
    if (Object.keys(missingFields).length > 0) {
      return next(ApiError.badRequest("Validation failed", missingFields));
    }
    res.status(200).json({ success: true });
  }

  async registration(req, res, next) {
    const {
      username,
      email,
      password,
      image,
      firstName,
      lastName,
      phone,
      address,
      gender,
      country,
      language,
      dateOfBirth,
    } = req.body;
    if (!firstName || !lastName) {
      return next(ApiError.badRequest("First name and last name are required"));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({
      username,
      email,
      image: image || "static/default-avatar.png",
      role: "ADMIN",
      password: hashPassword,
      balance_units, // Initial balance 
    });
    await PersonalInfo.create({
      firstName,
      lastName,
      phone,
      address,
      country,
      gender,
      language,
      dateOfBirth,
      userId: user.id,
    });
    await Portfolio.create({ userId: user.id });
    const token = generateJWT(user.id, user.email);
    res.cookie("token", token, {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res.json({ success: true });
  }

  async login(req, res, next) {
    const { identifier, password } = req.body;
    if (!identifier || !password) {
      return next(ApiError.badRequest("Enter email or username and password"));
    }

    try {
      const user = await User.findOne({
        where: {
          [Sequelize.Op.or]: [{ email: identifier }, { username: identifier }],
        },
      });
      if (!user) {
        return next(ApiError.notFound("User was not found"));
      }
      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return next(ApiError.notFound("Password doesn't match"));
      }
      const token = generateJWT(user.id, user.email);
     res.cookie("token", token, {
      maxAge: 3 * 30 * 24 * 60 * 60 * 1000, // 3 months
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res.json({ success: true });
    } catch (e) {
      console.error(e);
      return next(ApiError.internal("Authorization error"));
    }
  }

  async modify(req, res, next) {
    try {
      const {
        userId,
        username,
        email,
        firstName,
        lastName,
        phone,
        address,
        gender,
        country,
        language,
        dateOfBirth,
      } = req.body;
      const personalInfo = await PersonalInfo.findOne({
        where: { userId: userId },
      });
      // Check if user exists
      if (!personalInfo) {
        return next(ApiError.notFound("User was not found"));
      }
      const user = await User.findByPk(userId);
      if (user) {
        user.username = username;
        user.email = email;
        await user.save();
      }
      personalInfo.firstName = firstName;
      personalInfo.lastName = lastName;
      personalInfo.phone = phone;
      personalInfo.address = address;
      personalInfo.gender = gender;
      personalInfo.country = country;
      personalInfo.language = language;
      personalInfo.dateOfBirth = dateOfBirth;

      await personalInfo.save();
      return res
        .status(200)
        .json({ message: "Changes are successfully applied!" });
    } catch (error) {
      console.error(error);
      return next(ApiError.internal("Error changing user's personal info"));
    }
  }

  async check(req, res, next) {
    try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "email", "role"]
    });

    if (!user) {
      return res.status(401).json({ message: "User not found or deleted." });
    }
    console.log("Found user:", user?.dataValues);
    return res.json(user);
  } catch (e) {
    return next(ApiError.internal("Authorization check failed" + e.message ));
  }
  }

  async getPersonalInfo(req, res, next) {
    try {
      // Find user and personal info
      const { userId } = req.params;
      const personalInfo = await PersonalInfo.findOne({
        where: { userId: userId },
        include: [{ model: User, attributes: ["username", "email"] }],
      });

      // Check if user exists
      if (!personalInfo) {
        return next(ApiError.notFound("User was not found"));
      }
      if (!personalInfo.user.dataValues) {
        return next(ApiError.notFound("Associated user not found"));
      }
      //Return user's info
      return res.json({
        username: personalInfo.dataValues.user.username,
        email: personalInfo.dataValues.user.email,
        firstName: personalInfo.firstName,
        lastName: personalInfo.lastName,
        phone: personalInfo.phone,
        address: personalInfo.address,
        country: personalInfo.country,
        gender: personalInfo.gender,
        language: personalInfo.language,
        dateOfBirth: personalInfo.dateOfBirth,
        registerDate: personalInfo.createdAt,
      });
    } catch (error) {
      return next(ApiError.internal("Error fetching user's personal info"));
    }
  }

  async getBalance(req, res, next) {
    try {
      // Find user
      const { userId } = req.params;
      const user = await User.findByPk(userId);
      if (!user) {
        return next(ApiError.notFound("User was not found"));
      }
      // Return user's balance
      return res.json({ balance_units: user.balance_units });
    } catch (error) {
      return next(ApiError.internal("Error fetching user balance"));
    }
  }

  async getOwnedCryptos(req, res, next) {
    try {
      // Find portfolio
      const { userId } = req.params;
      const portfolio = await Portfolio.findOne({ where: { userId: userId } });
      if (!portfolio) {
        return next(ApiError.notFound("Portfolio was not found"));
      }
      const ownedCryptos = await PortfolioCryptos.findAll({
        where: { portfolioId: portfolio.id },
      });

      // Return user's cryptos
      return res.json({ ownedCryptos });
    } catch (error) {
      return next(ApiError.internal("Error getting owned cryptocurrencies"));
    }
  }

  async getPurchases(req, res, next) {
    try {
      const { userId } = req.params;
      const purchases = await Purchases.findAll({ where: { userId: userId } });
      return res.status(200).json(purchases);
    } catch (error) {
      return next(ApiError.internal("Failed to fetch purchases"));
    }
  }

  async logout(req, res) {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  }

}
module.exports = new UserController();
