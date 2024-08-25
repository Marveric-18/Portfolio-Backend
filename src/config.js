const whitelist = ["*"];
const corsOptions = {
  origin: function (origin, callback) {
    if (process.env.SERVER_APP_DEBUG === true) {
      Logger.printLog("Origin Log", { "Whitelist: ": whitelist, "Origin ": origin });
    }
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      const message = new Error('Not allowed by CORS');
      Logger.printError("CORS Error", message);
      callback(message);
    }
  },
  credentials: true, //access-control-allow-credentials:true
}

module.exports = {
    corsOptions
};