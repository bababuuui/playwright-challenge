import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { Header } from "../framgents/header.fragment";

export class ContactUsPage extends BasePage {
  header: Header;
  contactForm = this.page.frameLocator("iframe[title='Form 0']").locator("form");
  firstNameInput = this.contactForm.locator("input[name='firstname']");
  lastNameInput = this.contactForm.locator("input[name='lastname']");
  workEmailInput = this.contactForm.locator("input[name='email']");
  countrySelect = this.contactForm.locator("select[name='country__new_']");
  howCanWeHelpYouTextArea = this.contactForm.locator("textarea[name='how_can_we_help_you_']");
  legalConsentCheckbox = this.contactForm.locator("input[name='LEGAL_CONSENT.processing']");
  constructor(page: Page) {
    super(page);
    this.header = new Header(page);
  }

  getValidationErrorMessageRelatedToField(fieldLocator: Locator) {
    return fieldLocator.locator("//ancestor::div[@class='input']/../ul[@role='alert']/li/label");
  }

  async clickSubmit() {
    await this.contactForm.getByRole("button", { name: "Submit" }).click();
  }
}
