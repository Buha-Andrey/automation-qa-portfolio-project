import { Page } from "@playwright/test";
import { SelectRoleComponent } from "../components/SelectRoleComponent";

class MultipleElementsPage {
  SelectRole: SelectRoleComponent;

  constructor(private page: Page) {
    this.page = page;
    this.SelectRole = new SelectRoleComponent(this.page);
  }

  async open() {
    await this.page.goto(
      "https://testpages.eviltester.com/pages/basics/multiple-elements-example/",
    );
  }
}
export { MultipleElementsPage };
