import { test as base } from "./fixtureBase";
import { MultipleElementsPage } from "../pages/MultipleElementsPage";
import { AjaxFormPage } from "../pages/AjaxFormPage";
import { JavascriptFormPage } from "../pages/JavascriptFormPage";
import { AlertsJavascriptPage } from "../pages/AlertsJavascriptPage";
import { ExternalContentPage } from "../pages/ExternalContentPage";
import { ExternalSitePage } from "../pages/ExternalSitePage";
import { iFrameExamplesPage } from "../pages/iFrameExamplesPage";
import { FileUploadPage } from "../pages/FileUploadPage";
import { FileProcessorPage } from "../pages/FileProcessorPage";
import { DragAndDropPage } from "../pages/DragAndDropPage";
import { BasicAuthPage } from "../pages/BasicAuthPage";
import { BasicAuthApi } from "../api/base-auth.client";

type Fixtures = {
  multipleElementsPage: MultipleElementsPage;
  ajaxFormPage: AjaxFormPage;
  javascriptFormPage: JavascriptFormPage;
  alertsJavascriptPage: AlertsJavascriptPage;
  externalContentPage: ExternalContentPage;
  externalSitePage: ExternalSitePage;
  iframeExamplesPage: iFrameExamplesPage;
  fileUploadPage: FileUploadPage;
  fileProcessorPage: FileProcessorPage;
  dragAndDropPage: DragAndDropPage;
  basicAuthPage: BasicAuthPage;
  basicAuthApi: BasicAuthApi;
};

export const test = base.extend<Fixtures>({
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

  fileUploadPage: ({ page }, use) => {
    const fileUploadPage = new FileUploadPage(page);
    use(fileUploadPage);
  },

  fileProcessorPage: ({ page }, use) => {
    const fileProcessorPage = new FileProcessorPage(page);
    use(fileProcessorPage);
  },

  dragAndDropPage: ({ page }, use) => {
    const dragAndDropPage = new DragAndDropPage(page);
    use(dragAndDropPage);
  },

  basicAuthPage: ({ page }, use) => {
    const basicAuthPage = new BasicAuthPage(page);
    use(basicAuthPage);
  },
  basicAuthApi: ({ request }, use) => {
    const basicAuthApi = new BasicAuthApi(request);
    use(basicAuthApi);
  },
});
