const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM("USER", "ADMIN"), allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  balance_units: { type: DataTypes.BIGINT, allowNull: false, defaultValue: 0 }
});

const Portfolio = sequelize.define("portfolio", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const PortfolioCryptos = sequelize.define("portfolio_cryptos",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    symbol: { type: DataTypes.STRING, allowNull: false },
    amount: { type: DataTypes.BIGINT, allowNull: false, defaultValue: 0 },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["portfolioId", "symbol"],
      },
    ],
  }
);

const Purchases = sequelize.define(
  "purchases",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    symbol: { type: DataTypes.STRING, allowNull: false },
    amount: { type: DataTypes.BIGINT, allowNull: false },
    price_pico_usd: { type: DataTypes.BIGINT, allowNull: false },
    activity: { type: DataTypes.ENUM("bought", "sold"), allowNull: false },
  } 
);

const PersonalInfo = sequelize.define("personal_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING},
  address: { type: DataTypes.STRING},
  country: { type: DataTypes.STRING },
  gender: {
    type: DataTypes.ENUM("male", "female", "not chosen"),
    allowNull: false,
    defaultValue: "not chosen",
  },
  language: { type: DataTypes.STRING, allowNull: true },
  dateOfBirth: { type: DataTypes.DATE, allowNull: true },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

User.hasOne(Portfolio, { onDelete: "CASCADE" });
Portfolio.belongsTo(User);

User.hasOne(PersonalInfo, {foreignKey: "userId", onDelete: "CASCADE" });
PersonalInfo.belongsTo(User, {foreignKey: "userId"});

User.hasMany(Purchases, { onDelete: "CASCADE" });
Purchases.belongsTo(User);

Portfolio.hasMany(PortfolioCryptos);
PortfolioCryptos.belongsTo(Portfolio);

module.exports = {
  User,
  PersonalInfo,
  Portfolio,
  PortfolioCryptos,
  Purchases,
};
