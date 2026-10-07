import { expect, Frame, Locator } from "@playwright/test";

export class iFrameComponent {
  constructor(readonly iFrame: Locator) {}

  private async frame(): Promise<Frame> {
    const handle = await this.iFrame.elementHandle();
    const frame = await handle.contentFrame();
    if (!frame) throw new Error("contentFrame is missing");
    return frame;
  }

  inner(selector: string): Locator {
    return this.iFrame.contentFrame().locator(selector);
  }

  getSource() {
    return this.iFrame.getAttribute("src");
  }

  async url(): Promise<string> {
    return (await this.frame()).url();
  }
}
