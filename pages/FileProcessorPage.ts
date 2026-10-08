import { Page } from "@playwright/test";

export class FileProcessorPage {
  constructor(private page: Page) {}

  getUploadResults() {
    return this.page.getByRole("heading", {
      name: "File Upload - Upload Results",
    });
  }
}
