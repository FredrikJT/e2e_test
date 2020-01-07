import {
  browser,
  By,
  WebElement
} from 'protractor';
import {
  performance
} from 'perf_hooks';

var fs = require('fs');
var util = require('util');

const BD = browser.driver;

describe('Auth0', async () => {
  it('should have email field displayed and enabled.', async () => {
    const appUrl = 'https://git-fjot-env.drive.tobiicloud.com/drive/';
    // const appUrl = 'https://intoli.com/blog/making-chrome-headless-undetectable/chrome-headless-test.html';
    console.log(`appUrl: ${appUrl}`);
    // browser.
    // await page.setUserAgent(
    //   'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
    //   'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
    //   );
    await BD.get(appUrl);
    const currentUrl = await BD.getCurrentUrl();
    expect(currentUrl.includes('login.tobii')).toBe(true);
    // expect(currentUrl.includes('intoli.com')).toBe(true);
    // await browser.sleep(120000);
    await browser.takeScreenshot().then((png) => {
      writeScreenShot(png, 'foo.png');
    });

    // browser.executeScript(() => {
    //   console.log(window.navigator.userAgent);
    // });


    // let result = await browser.executeScript(() => {
    //   return window.navigator.userAgent;
    // });

    // console.log('userAgent: ' + result);

    // let result2 = await browser.executeScript(() => {
    //   return window.navigator.platform;
    // });

    // console.log('platform: ' + result2);

    // let result3 = await browser.executeScript(() => {
    //   return window.navigator;
    // });

    // console.log('navigator: ' + util.inspect(result3));

    // browser.driver.executeScript(function() { return api.Version; }).then(function(result) { console.log('API version: ' + result); });

    // await browser.sleep(120000);

    // let browserLogs = browser.manage().logs().get('server');
    // console.log("Browserlogs: " + util.inspect(browserLogs));
    
    // browser.manage().logs().get('browser').then(
    //   function(browserLog) {
    //     console.log('log: ' + 
    //       require('util').inspect(browserLog));
    //   }
    // );
    // browser.manage().logs().get('driver').then(
    //   function(browserLog) {
    //     console.log('log: ' + 
    //       require('util').inspect(browserLog));
    //   }
    // );
    // browser.manage().logs().get('server').then(
    //   function(browserLog) {
    //     console.log('log: ' + 
    //       require('util').inspect(browserLog));
    //   }
    // );
    
    // const emailInputLocator = By.css('input[name=email]');
    // await BD.wait<void>(
    //   () => isLocatorInteractable(emailInputLocator),
    //   10000,
    //   `Timed out waiting for locator ${emailInputLocator} to be interactable`
    // );
  });
});

function writeScreenShot(data, filename) {
  var stream = fs.createWriteStream(filename);
  stream.write(new Buffer(data, 'base64'));
  stream.end();
}

export async function getElement(locator): Promise<WebElement> {
  const elements = await BD.findElements(locator);
  return elements.length > 0 ? elements[0] : undefined;
}

async function isElementInteractable(el: WebElement): Promise<boolean> {
  let i: number;
  let t0: number;
  let t1: number;

  // eslint-disable-next-line firecloud/no-for
  for (i = 100; i >= 1; i--) {
    if (i === 50) {
      console.log('50');
    }
    if (i === 1) {
      console.log('1');
    }
    t0 = performance.now();
    await el.isDisplayed();
    t1 = performance.now();
    if (t1 - t0 > 2000) {
      console.log(`isDisplayed took ${t1 - t0} ms at attempt ${100 - i}`);
    }

    t0 = performance.now();
    await el.isEnabled();
    t1 = performance.now();
    if (t1 - t0 > 2000) {
      console.log(`isEnabled took ${t1 - t0} ms at attempt ${100 - i}`);
    }
  }
  return (await el.isDisplayed()) && (await el.isEnabled());
}

async function isLocatorInteractable(locator): Promise<boolean> {
  const el = await getElement(locator);
  return Boolean(el) && await isElementInteractable(el);
}
