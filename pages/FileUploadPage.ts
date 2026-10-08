import { Page } from "@playwright/test";
import { FileUploadComponent } from "../components/FileUploadComponent";

export class FileUploadPage {
  fileUploadComponent: FileUploadComponent;

  constructor(private page: Page) {
    this.fileUploadComponent = new FileUploadComponent(this.page);
  }

  async open() {
    await this.page.goto(
      "https://testpages.eviltester.com/pages/files/file-upload/",
    );
  }
}
