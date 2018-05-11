import config from "./config.json";
import mongoose from "mongoose";

const mongoDb = {
  production: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}${
    process.env.MONGODB
  }`
};

// production env will be configured in heroku
const envConfig = env => {
  const activeEnv = config[env];
  // fetch all key - value , and set it to process.env
  if (activeEnv) {
    Object.keys(activeEnv).forEach(key => {
      process.env[key] = activeEnv[key];
    });
  }

  mongoose.connect(mongoDb[env] || process.env.MONGODB_URL).then(
    () => {
      console.log("you are connected!");
    },
    err => {
      console.log("[Sorry] - mongodb connection error");
    }
  );
};

export default envConfig;
