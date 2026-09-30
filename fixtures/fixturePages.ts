import { test as base } from "./fixtureBase";
import { MultipleElementsPage } from "../pages/MultipleElementsPage";
import { AjaxFormPage } from "../pages/AjaxFormPage";

type Pages = {
  multipleElementsPage: MultipleElementsPage;
  ajaxFormPage: AjaxFormPage;
};

export const test = base.extend<Pages>({
  multipleElementsPage: ({ page }, use) => {
    const multipleElementsPage = new MultipleElementsPage(page);
    use(multipleElementsPage);
  },

  ajaxFormPage: ({ page }, use) => {
    const ajaxFormPage = new AjaxFormPage(page);
    use(ajaxFormPage);
  },
});