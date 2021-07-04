import { chromium, Browser, BrowserContext, Page } from 'playwright';
import { urls, pageTitles } from '../constants';
import { HomePage } from '../pages/home_page';

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
    const homePage = new HomePage(page);
    expect(await homePage.getAllLinksOnThePage()).toHaveLength(46);
  });

  test('should click on the link in the footer', async () => {
    const homePage = new HomePage(page);
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      homePage.clickOnTheLinkAtTheFooter(),
    ]);
    await newPage.waitForLoadState();
    expect(await newPage.title()).toBe(pageTitles.elementalSeleneium);
    expect(newPage.url()).toContain(urls.elementalSelenium);
  });
});
