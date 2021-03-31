import assert from 'assert';

const ensureConfig = (env) => {
  Object.keys(env).forEach((key) => {
    assert(key in process.env, `${key} is not present in env`);
    const value = process.env[key];
    env[key] = value.startsWith('$') ? process.env[value.slice(1)] : value;
  });
};

const envConfig = {
  URL_PREFIX: '/api',
  NODE_ENV: '',
  PORT: '',
  DB_URL: '',
  CORS_REGEX: '',
  FRONTEND_URL: '',
};

ensureConfig(envConfig);

export default envConfig;