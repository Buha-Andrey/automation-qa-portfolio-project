import { test as base } from "./fixtureBase";
import { MultipleElementsPage } from "../pages/MultipleElementsPage";

type Pages = {
  multipleElementsPage: MultipleElementsPage;
};

export const test = base.extend<Pages>({
  multipleElementsPage: ({ page }, use) => {
    const multipleElementsPage = new MultipleElementsPage(page);
    use(multipleElementsPage);
  },
});
