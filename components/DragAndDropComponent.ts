import { Locator, Page } from "@playwright/test";

export class DragAndDropComponent {
  constructor(private page: Page) {
    this.page = page;
  }

  getYellowSquare_1 = () => this.page.locator("#draggable1");
  getYellowSquare_2 = () => this.page.locator("#draggable2");
  getRedSquare_1 = () => this.page.locator("#droppable1");
  getRedSquare_2 = () => this.page.locator("#droppable2");

  getYellowSquare = (number: string) =>
    this.page.locator(`#draggable${number}`);
  getRedSquare = (number: string) =>
    this.page.locator(`#droppable${number}`);
  
  async dragSquareTo(yellow: Locator, red: Locator) {
    await yellow.dragTo(red);
  }
}
