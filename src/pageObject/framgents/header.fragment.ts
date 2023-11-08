import { Locator, Page } from "@playwright/test";

export class Header {
  private rootLocator = this.page.getByRole("navigation");
  private subMenuLocator = this.page.locator(".nav-dropdown");
  public getInTouchButton = this.rootLocator.getByRole("link", { name: "Get in touch" });
  constructor(private page: Page) {}

  getBookmarkByName(name: string): Locator {
    return this.rootLocator.getByRole("link", { name, exact: true });
  }

  async navigateToBookmark(bookmarkName: string, subMenuItemName: string): Promise<void> {
    await this.getBookmarkByName(bookmarkName).hover();
    await this.subMenuLocator.getByRole("link", { name: subMenuItemName }).click();
  }
}
