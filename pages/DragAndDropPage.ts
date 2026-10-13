import { Page } from "@playwright/test";
import { DragAndDropComponent } from "../components/DragAndDropComponent";

export class DragAndDropPage {
  dragAndDrop: DragAndDropComponent;

  constructor(private page: Page) {
    this.page = page;
    this.dragAndDrop = new DragAndDropComponent(this.page);
  }

  async open() {
    await this.page.goto(
      "https://testpages.eviltester.com/pages/interaction/drag-drop/",
    );
  }
}
