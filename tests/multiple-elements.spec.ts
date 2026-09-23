import { test, expect, Page, request } from "@playwright/test";
import { MultipleElementsPage } from "../pages/MultipleElementsPage";

let page: Page;

const roles = {
  tester:
    "Explore the software functionality to compare with stakeholder needs and requirements, identifying bugs, verifying fixes, and raising unexpected risks and issues.",
  programmer:
    "Design, write, test, and maintain code to build software applications. Transform requirements into functional solutions using various programming languages and frameworks.",
  manager:
    "Lead and coordinate the development team, manage project timelines, allocate resources, and be responsible for delivery of software projects while fostering team collaboration.",
  all: "Take on multiple responsibilities across management, development, and testing. Perfect for versatile professionals who enjoy wearing different hats and contributing to all aspects of software delivery.",
};

const expectedResponseRoleText: Record<string, string> = {
  tester: 'tester',
  programmer: 'programmer',
  manager: 'manager',
  all: 'generalist (one who does it all)',
};

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage();
  const multipleElementsPage = new MultipleElementsPage(page);

  await multipleElementsPage.open();
});

for (const [role, description] of Object.entries(roles)) {
  test(`should hide spinner and display success message on submit with the correct selected role ${role}`, async ({}) => {
    const multipleElementsPage = new MultipleElementsPage(page);
    await multipleElementsPage.SelectRole.clickRoleRadioButton(role);
    await multipleElementsPage.SelectRole.clickSubmitButton();
    await multipleElementsPage.SelectRole.waitForSpinnerToBeHidden();

    await expect(multipleElementsPage.SelectRole.getSpinner()).toBeHidden();
    await expect(
      multipleElementsPage.SelectRole.getSuccessMessage(),
    ).toBeVisible();
    await expect(
      multipleElementsPage.SelectRole.getSuccessMessage(),
    ).toHaveText(`Successfully submitted: ${role}`);
  });
}

for (const [role, description] of Object.entries(roles)) {
  test(`should display correct description text on hover for  ${role} button`, async ({}) => {
    const multipleElementsPage = new MultipleElementsPage(page);
    await multipleElementsPage.SelectRole.hoverRoleRadioButton(role);

    await expect(
      multipleElementsPage.SelectRole.getRoleDescription(),
    ).toHaveText(description);
  });
}

for (const [role, description] of Object.entries(roles)) {
  test(`should display spinner while request is in progress for each role ${role}`, async ({}) => {
    const multipleElementsPage = new MultipleElementsPage(page);

    await multipleElementsPage.SelectRole.clickRoleRadioButton("tester");
    await multipleElementsPage.SelectRole.clickSubmitButton();

    await expect(multipleElementsPage.SelectRole.getSpinner()).toBeVisible();
  });
}

test(`should submit-button be disabled before a role is selected`, async ({}) => {
  const multipleElementsPage = new MultipleElementsPage(page);
  await expect(
    multipleElementsPage.SelectRole.getSubmitButton(),
  ).toBeDisabled();
});

for (const role of Object.keys(roles)) {
  test(`should submit-button become disabled after a ${role} is submitted`, async ({}) => {
    const multipleElementsPage = new MultipleElementsPage(page);
    await multipleElementsPage.SelectRole.clickRoleRadioButton(role);
    await multipleElementsPage.SelectRole.clickSubmitButton();
    await multipleElementsPage.SelectRole.waitForSpinnerToBeHidden();

    await expect(
      multipleElementsPage.SelectRole.getSubmitButton(),
    ).toBeDisabled();
  });
}

test(`should handle role change while a previous submission request is still pending`, async ({}) => {
  test.fail();
  // submitted 2 requests after clicking SubmitButton each time

  const multipleElementsPage = new MultipleElementsPage(page);
  await multipleElementsPage.SelectRole.clickRoleRadioButton(
    Object.keys(roles)[0],
  );
  await multipleElementsPage.SelectRole.clickSubmitButton();
  await multipleElementsPage.SelectRole.clickRoleRadioButton(
    Object.keys(roles)[1],
  );
  await multipleElementsPage.SelectRole.clickSubmitButton();
  await multipleElementsPage.SelectRole.waitForSpinnerToBeHidden();

  await expect(multipleElementsPage.SelectRole.getSuccessMessage()).toHaveText(
    `Successfully submitted: ${Object.keys(roles)[0]}`,
  );
});

for (const role of Object.keys(roles)) {
  test(`should send POST request to /internalapi/choose-a-role on submit for each role - ${role}`, async ({}) => {
    const multipleElementsPage = new MultipleElementsPage(page);
    await multipleElementsPage.SelectRole.clickRoleRadioButton(role);
    const [response] = await Promise.all([
      multipleElementsPage.SelectRole.waitForSubmitApiResponse(),
      multipleElementsPage.SelectRole.clickSubmitButton(),
    ]);

    expect(response.status()).toBe(200);
    expect(response.url()).toContain("/internalapi/choose-a-role");
    expect(response.request().method()).toBe("POST");
  });
}

for (const role of Object.keys(roles)) {
  test(`should send request payload with correct role and content-type headers for each role - ${role}`, async ({}) => {
    const multipleElementsPage = new MultipleElementsPage(page);
    await multipleElementsPage.SelectRole.clickRoleRadioButton(role);
    const [response] = await Promise.all([
      multipleElementsPage.SelectRole.waitForSubmitApiResponse(),
      multipleElementsPage.SelectRole.clickSubmitButton(),
    ]);

    expect(response.request().headers()["content-type"]).toBe(
      "application/json",
    );
    expect(response.request().postDataJSON()).toEqual({ role: role });
  });
}

for (const role of Object.keys(roles)) {
  test(`should return response body matching the role shown in the success message - ${role}`, async ({}) => {
    const multipleElementsPage = new MultipleElementsPage(page);
    await multipleElementsPage.SelectRole.clickRoleRadioButton(role);
    const [response] = await Promise.all([
      multipleElementsPage.SelectRole.waitForSubmitApiResponse(),
      multipleElementsPage.SelectRole.clickSubmitButton(),
    ]);

    expect(response.headers()["content-type"]).toContain("text/html");
    expect(await response.text()).toContain(
      `good luck in your role as ${expectedResponseRoleText[role]}`,
    );
  });
}
