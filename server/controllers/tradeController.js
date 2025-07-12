const ApiError = require("../error/ApiError");
const { User, Portfolio, PortfolioCryptos, Purchases } = require("../models/models");

class TradeController {
  async buyCrypto(req, res, next) {
    try {
      const { userId, symbol, amount, price } = req.body;

      // Validate input
      if (!userId || !symbol || !amount || !price) {
        return next(ApiError.badRequest("Missing required fields"));
      }

      const amountBig = BigInt(amount);
      const priceBig = BigInt(price);

      if (amountBig <= 0n || priceBig <= 0n) {
        return next(ApiError.badRequest("Amount and price must be positive"));
      }

      const totalCost = (amountBig * priceBig) / 100_000_000n;

      const user = await User.findByPk(userId);
      if (!user) return next(ApiError.notFound("User not found"));

      console.log("balance: " + BigInt(user.balance_units))
      console.log("cost: " + totalCost)
      console.log(BigInt(user.balance_units) < totalCost)

      if (BigInt(user.balance_units) < totalCost) {
        return next(ApiError.badRequest("Not enough balance"));
      }

      const portfolio = await Portfolio.findOne({ where: { userId } });
      if (!portfolio) return next(ApiError.notFound("Portfolio not found"));

      let crypto = await PortfolioCryptos.findOne({
        where: { portfolioId: portfolio.id, symbol },
      });

      if (crypto) {
        crypto.amount = BigInt(crypto.amount) + amountBig;
      } else {
        crypto = await PortfolioCryptos.create({
          portfolioId: portfolio.id,
          symbol,
          amount: amountBig.toString(),
        });
      }

      user.balance_units = BigInt(user.balance_units) - totalCost;

      await Purchases.create({
        symbol,
        amount: amountBig.toString(),
        price_pico_usd: priceBig.toString(),
        activity: "bought",
        userId,
      });

      await user.save();
      await crypto.save();

      return res.status(200).json({ updatedBalance: user.balance_units.toString() });
    } catch (e) {
      return next(ApiError.internal(`Error during buy process: ${e.message}`));
    }
  }


  async sellCrypto(req, res, next) {
    try {
      const { userId, symbol, amount, price } = req.body;

      // Validate input
      if (!userId || !symbol || !amount || !price) {
        return next(ApiError.badRequest("Missing required fields"));
      }

      const amountBig = BigInt(amount);
      const priceBig = BigInt(price);

      if (amountBig <= 0n || priceBig <= 0n) {
        return next(ApiError.badRequest("Amount and price must be positive"));
      }

      const totalGain = (amountBig * priceBig) / 100_000_000n;

      const user = await User.findByPk(userId);
      if (!user) return next(ApiError.notFound("User not found"));

      const portfolio = await Portfolio.findOne({ where: { userId } });
      if (!portfolio) return next(ApiError.notFound("Portfolio not found"));

      const crypto = await PortfolioCryptos.findOne({
        where: { portfolioId: portfolio.id, symbol },
      });

      if (!crypto || BigInt(crypto.amount) < amountBig) {
        return next(ApiError.badRequest("Not enough crypto to sell"));
      }

      const newAmount = BigInt(crypto.amount) - amountBig;
      if (newAmount === 0n) {
        await crypto.destroy();
      } else {
        crypto.amount = newAmount;
        await crypto.save();
      }

      user.balance_units = BigInt(user.balance_units) + totalGain;

      await Purchases.create({
        symbol,
        amount: amountBig.toString(),
        price_pico_usd: priceBig.toString(),
        activity: "sold",
        userId,
      });

      await user.save();

      return res.status(200).json({ updatedBalance: user.balance_units.toString() });
    } catch (e) {
      return next(ApiError.internal(`Error during sell process: ${e.message}`));
    }
  }
}

module.exports = new TradeController();
