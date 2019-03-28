let CONFIG = {}; //Make this global to use all over the application
CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || "jwt_please_change";
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || "10000";

module.exports = CONFIG;
