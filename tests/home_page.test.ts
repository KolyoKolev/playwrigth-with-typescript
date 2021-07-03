import { chromium, Browser, BrowserContext, Page } from 'playwright';
import { urls } from '../constants';

const getListOfLinks = (selector: string) => {
  return page.$$(selector);
};

let browser: Browser;
let context: BrowserContext;
let page: Page;

describe('Test the-internet app home page', () => {
  beforeEach(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto(urls.base);
  });

  afterEach(async () => {
    await page.close();
    await context.close();
    await browser.close();
  });

  test('load the home page', async () => {
    const pageTitle = await page.title();
    console.log(pageTitle);
    expect(pageTitle).toEqual('The Internet');
  });

  test('should count the total link on the page', async () => {
    expect(await getListOfLinks('a')).toHaveLength(46);
  });
});
