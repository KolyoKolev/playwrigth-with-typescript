import type { Page } from 'playwright';

const footerLink: string = 'a:has-text("Elemental Selenium")';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getAllLinksOnThePage() {
    return this.page.$$('a');
  }

  async clickOnTheLinkAtTheFooter() {
    await this.page.click(footerLink);
  }
}
