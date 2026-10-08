import { Page } from "@playwright/test";
export type InMemoryFile = {
  name: string;
  mimeType: string;
  buffer: Buffer;
};

export class FileUploadComponent {
  constructor(private page: Page) {
    this.page = page;
  }

  makeFile(
    name: string,
    sizeBytes: number,
    mimeType = "text/plain",
  ): InMemoryFile {
    return {
      name: name,
      mimeType: mimeType,
      buffer: Buffer.alloc(sizeBytes, "a"),
    };
  }

  getDragNDropZone() {
    return this.page.locator("#drop-zone");
  }

  getChooseButton() {
    return this.page.locator("#fileinput");
  }

  getImageRadioButton() {
    return this.page.locator("#itsanimage");
  }

  getGeneralRadioButton() {
    return this.page.locator("#itsafile");
  }

  getUploadButton() {
    return this.page.getByRole("button", { name: "Upload" });
  }

  getSuccessMessage() {
    return this.page.locator("#statusmessage");
  }

  async clickDragNDropZone() {
    await this.getDragNDropZone().click();
  }

  async clickChooseButton() {
    await this.getChooseButton().click();
  }

  async clickImageRadioButton() {
    await this.getImageRadioButton().click();
  }

  async clickGeneralRadioButton() {
    await this.getGeneralRadioButton().click();
  }

  async clickUploadButton() {
    await this.getUploadButton().click();
  }

  async uploadViaFileChooserV_1(name: string, sizeBytes: number) {
    const [chooser] = await Promise.all([
      this.page.waitForEvent("filechooser"),
      this.clickDragNDropZone(),
    ]);
    await chooser.setFiles(this.makeFile(name, sizeBytes));
  }

  async uploadViaDropV_1() {
    const dataTransfer = await this.page.evaluateHandle(() => {
      const dt = new DataTransfer();
      dt.items.add(new File(["hello"], "test.txt", { type: "text/plain" }));
      return dt;
    });
    await this.getDragNDropZone().dispatchEvent("drop", { dataTransfer });
  }

  async uploadViaFileChooserV_2(name: string, sizeBytes: number) {
    const [chooser] = await Promise.all([
      this.page.waitForEvent("filechooser"),
      this.clickChooseButton(),
    ]);
    await chooser.setFiles(this.makeFile(name, sizeBytes));
  }

  async uploadViaInputV_2(name: string, sizeBytes: number) {
    await this.getChooseButton().setInputFiles(this.makeFile(name, sizeBytes));
  }

  async waitForUploadResponse() {
    return await this.page.waitForResponse(
      (response) =>
        response.url().includes("/uploads/fileprocessor") && response.ok(),
    );
  }
}
