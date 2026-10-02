import { test as base } from "./fixtureBase";
import { MultipleElementsPage } from "../pages/MultipleElementsPage";
import { AjaxFormPage } from "../pages/AjaxFormPage";
import { JavascriptFormPage } from "../pages/JavascriptFormPage";

type Pages = {
  multipleElementsPage: MultipleElementsPage;
  ajaxFormPage: AjaxFormPage;
  javascriptFormPage: JavascriptFormPage;
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

  javascriptFormPage: ({ page }, use) => {
    const javascriptFormPage = new JavascriptFormPage(page);
    use(javascriptFormPage);
  },
});
