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
    console.log(`appUrl: ${appUrl}`);
    await BD.get(appUrl);
    const currentUrl = await BD.getCurrentUrl();
    expect(currentUrl.includes('login.tobii')).toBe(true);
    const emailInputLocator = By.css('input[name=email]');
    await BD.wait<void>(
      () => isLocatorInteractable(emailInputLocator),
      10000,
      `Timed out waiting for locator ${emailInputLocator} to be interactable`
    );
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
