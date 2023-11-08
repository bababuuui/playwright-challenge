import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { Header } from "../framgents/header.fragment";

export class HomePage extends BasePage {
  public header: Header;
  constructor(page: Page) {
    super(page);
    this.header = new Header(page);
  }

  async open() {
    await this.page.goto("");
  }
}
