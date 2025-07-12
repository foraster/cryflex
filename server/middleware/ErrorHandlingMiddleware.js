const ApiError = require("../error/ApiError");

module.exports = function (err, req, res, next) {
  if (err instanceof ApiError) {
    console.error(err);
    return res.status(err.status || 500).json({ 
        status: err.status,
        message: err.message,
        fields: err.fields || null
    });
  }
  return res.status(500).json({ message: "Unknown error" });
};
