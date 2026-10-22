import { test as base } from "./fixtureBase";
import { MultipleElementsPage } from "../pages/MultipleElementsPage";
import { AjaxFormPage } from "../pages/AjaxFormPage";
import { JavascriptFormPage } from "../pages/JavascriptFormPage";
import { AlertsJavascriptPage } from "../pages/AlertsJavascriptPage";
import { ExternalContentPage } from "../pages/ExternalContentPage";
import { ExternalSitePage } from "../pages/ExternalSitePage";
import { IFrameExamplesPage } from "../pages/IFrameExamplesPage";
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
  iframeExamplesPage: IFrameExamplesPage;
  fileUploadPage: FileUploadPage;
  fileProcessorPage: FileProcessorPage;
  dragAndDropPage: DragAndDropPage;
  basicAuthPage: BasicAuthPage;
  basicAuthApi: BasicAuthApi;
};

export const test = base.extend<Fixtures>({
  multipleElementsPage: async ({ page }, use) => {
    const multipleElementsPage = new MultipleElementsPage(page);
    await use(multipleElementsPage);
  },

  ajaxFormPage: async ({ page }, use) => {
    const ajaxFormPage = new AjaxFormPage(page);
    await use(ajaxFormPage);
  },

  javascriptFormPage: async ({ page }, use) => {
    const javascriptFormPage = new JavascriptFormPage(page);
    await use(javascriptFormPage);
  },

  alertsJavascriptPage: async ({ page }, use) => {
    const alertsJavascriptPage = new AlertsJavascriptPage(page);
    await use(alertsJavascriptPage);
  },

  externalContentPage: async ({ page }, use) => {
    const externalContentPage = new ExternalContentPage(page);
    await use(externalContentPage);
  },

  externalSitePage: async ({ page }, use) => {
    const externalSitePage = new ExternalSitePage(page);
    await use(externalSitePage);
  },

  iframeExamplesPage: async ({ page }, use) => {
    const iframeExamplesPage = new IFrameExamplesPage(page);
    await use(iframeExamplesPage);
  },

  fileUploadPage: async ({ page }, use) => {
    const fileUploadPage = new FileUploadPage(page);
    await use(fileUploadPage);
  },

  fileProcessorPage: async ({ page }, use) => {
    const fileProcessorPage = new FileProcessorPage(page);
    await use(fileProcessorPage);
  },

  dragAndDropPage: async ({ page }, use) => {
    const dragAndDropPage = new DragAndDropPage(page);
    await use(dragAndDropPage);
  },

  basicAuthPage: async ({ page }, use) => {
    const basicAuthPage = new BasicAuthPage(page);
    await use(basicAuthPage);
  },
  basicAuthApi: async ({ request }, use) => {
    const basicAuthApi = new BasicAuthApi(request);
    await use(basicAuthApi);
  },
});
