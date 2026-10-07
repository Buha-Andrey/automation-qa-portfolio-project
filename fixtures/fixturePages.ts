import { test as base } from "./fixtureBase";
import { MultipleElementsPage } from "../pages/MultipleElementsPage";
import { AjaxFormPage } from "../pages/AjaxFormPage";
import { JavascriptFormPage } from "../pages/JavascriptFormPage";
import { AlertsJavascriptPage } from "../pages/AlertsJavascriptPage";
import { ExternalContentPage } from "../pages/ExternalContentPage";
import { ExternalSitePage } from "../pages/ExternalSitePage";
import { iFrameExamplesPage } from "../pages/iFrameExamplesPage";

type Pages = {
  multipleElementsPage: MultipleElementsPage;
  ajaxFormPage: AjaxFormPage;
  javascriptFormPage: JavascriptFormPage;
  alertsJavascriptPage: AlertsJavascriptPage;
  externalContentPage: ExternalContentPage;
  externalSitePage: ExternalSitePage;
  iframeExamplesPage: iFrameExamplesPage;
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

  alertsJavascriptPage: ({ page }, use) => {
    const alertsJavascriptPage = new AlertsJavascriptPage(page);
    use(alertsJavascriptPage);
  },

  externalContentPage: ({ page }, use) => {
    const externalContentPage = new ExternalContentPage(page);
    use(externalContentPage);
  },

  externalSitePage: ({ page }, use) => {
    const externalSitePage = new ExternalSitePage(page);
    use(externalSitePage);
  },

  iframeExamplesPage: ({ page }, use) => {
    const iframeExamplesPage = new iFrameExamplesPage(page);
    use(iframeExamplesPage);
  },
});
