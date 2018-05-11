import config from "./config.json";

const envConfig = env => {
  const activeEnv = config[env];
  // fetch all key - value , and set it to process.env
  if (activeEnv) {
    Object.keys(activeEnv).forEach(key => {
      process.env[key] = activeEnv[key];
    });
  }
};

export default envConfig;
