const config = require('./protractor.conf').config;

config.capabilities = {
  browserName: 'chrome',
  chromeOptions: {
    args: [
      // '--headless',
      // '--no-sandbox',
      '--remote-debugging-port=9222'
    // '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"'
    ]
  },
  loggingPrefs: {
    browser: 'SEVERE',
    driver: 'SEVERE',
    performance: 'SEVERE',
  }
};

exports.config = config;