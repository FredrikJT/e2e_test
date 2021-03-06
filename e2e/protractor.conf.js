// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 110000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],

  // sauceUser: process.env.SAUCE_USERNAME,
  // sauceKey: process.env.SAUCE_ACCESS_KEY,
  // browserstackUser: process.env.BROWSERSTACK_USERNAME,
  // browserstackKey: process.env.BROWSERSTACK_ACCESS_KEY,
  // sauceRegion: 'eu',
  capabilities: {
    'extendedDebugging' : 'true',
    'browserName': 'chrome',
    chromeOptions: {
      args: [

        '--remote-debugging-port=9222',
        // 'platform=hejhej',
        // '--user-agent=Chrome',
        '--headless',
        '--no-sandbox'
      ]
    },
    loggingPrefs: {
      browser: 'WARNING',
      driver: 'WARNING',
      performance: 'WARNING',
    },
    // 'platformName': 'Windows 10' // Saucelabs
    'os': 'Windows',
    'os_version': '10',
    'build': 'Small repo'
  },
  logLevel: 'WARN',

  directConnect: false,
  baseUrl: 'https://git-fjot-env.drive.tobiicloud.com/drive/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 1800000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  },
};