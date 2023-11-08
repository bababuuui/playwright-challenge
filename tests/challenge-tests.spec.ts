import { test, expect } from "@playwright/test";
import { ContactUsPage } from "src/pageObject/pages/contactUsPage";
import { HomePage } from "src/pageObject/pages/homePage";
let homePage: HomePage;
let contactUsPage: ContactUsPage;

test.describe("Challenge tests", () => {
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    contactUsPage = new ContactUsPage(page);
    await homePage.open();
  });

  test("Nav bar - User should see all bookmarks", async ({}) => {
    const expectedBookmarks = ["Banking", "Insurance", "Finance & ESG", "Services", "Partners", "Company", "Resources"];
    for (const bookmark of expectedBookmarks) {
      await expect(homePage.header.getBookmarkByName(bookmark)).toBeVisible();
    }
  });

  test("Nav bar - User should be able to navigate to Financial Control page ", async ({ page }) => {
    await homePage.header.navigateToBookmark("Finance & ESG", "Financial Control");
    await page.waitForURL("**/finance-esg/financial-control/");
  });

  test("Get in touch Page - User should see validation messages if submits empty form ", async ({ page }) => {
    const COMPLETE_REQUIRED_FIELD_MESSAGE = "Please complete this required field.";
    const SELECT_OPTION_FROM_DROPDOWN_MESSAGE = "Please select an option from the dropdown menu.";
    const COMPLETE_ALL_FIELDS_MESSAGE = "Please complete all required fields.";
    await homePage.header.getInTouchButton.click();
    await page.waitForURL("**/contact/");
    await contactUsPage.clickSubmit();
    //validate expected  global error message
    await expect(contactUsPage.contactForm.getByText(COMPLETE_ALL_FIELDS_MESSAGE)).toBeVisible();
    //validate fields with expected error message : "Please complete this required field."
    for (const field of [
      contactUsPage.firstNameInput,
      contactUsPage.lastNameInput,
      contactUsPage.workEmailInput,
      contactUsPage.howCanWeHelpYouTextArea,
      contactUsPage.legalConsentCheckbox,
    ]) {
      await expect(await contactUsPage.getValidationErrorMessageRelatedToField(field)).toHaveText(
        COMPLETE_REQUIRED_FIELD_MESSAGE
      );
    }
    //validate expected error message for dropdown
    await expect(await contactUsPage.getValidationErrorMessageRelatedToField(contactUsPage.countrySelect)).toHaveText(
      SELECT_OPTION_FROM_DROPDOWN_MESSAGE
    );
  });
});
