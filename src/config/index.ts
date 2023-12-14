const ENV = {
  NAME: 'dev',
}; // TODO get from react native config

interface ConfigModel {
  NAME: 'dev' | 'staging' | 'production';
  BASE_URL: string;
  RECAPTCHA: {
    SITE_KEY: string;
    DOMAIN: string;
  };
}

let CONFIG: ConfigModel = require('./config.production');

if (ENV.NAME === 'dev') {
  CONFIG = require('./config.dev');
} else if (ENV.NAME === 'staging') {
  CONFIG = require('./config.staging');
}

export default CONFIG;
