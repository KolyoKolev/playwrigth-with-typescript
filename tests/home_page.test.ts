import { chromium, Browser, BrowserContext, Page } from 'playwright';
import { urls, pageTitles } from '../constants';

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

  test('should click on the link in the footer', async () => {
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.click('a:has-text("Elemental Selenium")'),
    ]);
    await newPage.waitForLoadState();
    expect(await newPage.title()).toBe(pageTitles.elementalSeleneium);
    expect(newPage.url()).toContain(urls.elementalSelenium);
  });
});
