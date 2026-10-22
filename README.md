# Automation QA Portfolio Project

**QA Engineer:** Buha Andrii

Automation tests for [testpages.eviltester.com](https://testpages.eviltester.com/pages/) using Playwright + TypeScript.

![Playwright Tests](https://github.com/Buha-Andrey/automation-qa-portfolio-project/actions/workflows/playwright.yml/badge.svg)    
[📊 Last Report](https://buha-andrey.github.io/automation-qa-portfolio-project/)

## Tech stack
Playwright · TypeScript · GitHub Actions

## Test cases
There are 67 test cases covering forms, alerts, iframes, file upload, drag and drop, and basic authentication.
<details>
<summary>Full list of test cases </summary>

| idCase | Test Case | Type | Priority | Spec File | Status |
|---|---|---|---|---|---|
| TC-01 | should select category and show it as selected | UI | Medium | ajax-form.spec.ts | Automated |
| TC-02 | should select language and show it as selected  | UI | Medium | ajax-form.spec.ts | Automated |
| TC-03 | should list all categories in the expected order | UI | Medium | ajax-form.spec.ts | Automated |
| TC-04 | should list all languages in the expected order after selecting category | UI | Medium | ajax-form.spec.ts | Automated |
| TC-05 | should show success message with submitted category and language after form submit | UI | High | ajax-form.spec.ts | Automated |
| TC-06 | should hide submit result after Clear button click | UI | Medium | ajax-form.spec.ts | Automated |
| TC-07 | should keep Submit button disabled while language list is loading | UI | Medium | ajax-form.spec.ts | Known issue (`test.fail`) |
| TC-08 | should request languages from API when category is changed | network | Medium | ajax-form.spec.ts | Automated |
| TC-09 | should send POST request with correct category id and language id on submit | network | High | ajax-form.spec.ts | Automated |
|---|---|---|---|---|---|
| TC-10 | should show JS alert with expected message when Alert button is clicked | UI | Medium | alerts-javascript.spec.ts | Automated (flaky) |
| TC-11 | should show success message after JS alert is accepted | UI | High | alerts-javascript.spec.ts | Automated |
| TC-12 | should show JS confirm with expected message when Confirm button is clicked | UI | Medium | alerts-javascript.spec.ts | Automated (flaky) |
| TC-13 | should show "true" result and success message after JS confirm is accepted | UI | High | alerts-javascript.spec.ts | Automated |
| TC-14 | should show "false" result after JS confirm is dismissed | UI | Medium | alerts-javascript.spec.ts | Automated |
| TC-15 | should show JS prompt with expected message when Prompt button is clicked | UI | Medium | alerts-javascript.spec.ts | Automated (flaky) |
| TC-16 | should show success message after JS prompt is dismissed | UI | Medium | alerts-javascript.spec.ts | Automated |
| TC-17 | should show entered text and success message after JS prompt is accepted with input (`${thePrompt}`) | UI | High | alerts-javascript.spec.ts | Automated |
| TC-18 | should show HTML entered in JS prompt as plain text (no HTML rendering) | UI | Medium | alerts-javascript.spec.ts | Known issue (`test.fail`) |
|---|---|---|---|---|---|
| TC-19 | should show authenticated message when protected page is opened with valid credentials | UI | High | basic-auth.spec.ts | Automated |
| TC-20 | should return to Basic Auth page when "Return to the Basic Auth page" is clicked | UI | Medium | basic-auth.spec.ts | Automated |
| TC-21 | should show reset confirmation and stop sending Authorization header after "Reset Basic Auth" is clicked | UI | Medium | basic-auth.spec.ts | Automated |
| TC-22 | should show "Not authenticated" message when protected page is opened with invalid credentials (`${username} / ${password}`) | UI | Medium | basic-auth.spec.ts | Automated |
| TC-23 | should return 200 and authenticated=true when request has valid Basic Auth header | API | High | basic-auth.spec.ts | Automated |
| TC-24 | should return 401 and authenticated=false when Authorization header is invalid or missing | API | Medium | basic-auth.spec.ts | Needs fix (`test.fixme`) |
| TC-25 | should return 401 when Accept header is invalid or missing | API | Medium | basic-auth.spec.ts | Needs fix (`test.fixme`) |
|---|---|---|---|---|---|
| TC-26 | should show initial titles on all squares when page is opened | UI | Medium | drag-and-drop.spec.ts | Automated |
| TC-27 | should update square titles after dragging yellow square ${yellow} to red square ${red} | UI | High | drag-and-drop.spec.ts | Automated (flaky) |
| TC-28 | should show "Drop Here" on both red squares when Ctrl is pressed | UI | High | drag-and-drop.spec.ts | Automated |
| TC-29 | should show "Bwa! Ha! Ha!" on first yellow square when Ctrl+B is pressed | UI | Medium | drag-and-drop.spec.ts | Automated |
| TC-30 | should show "Let GO!!!" on both red squares when Ctrl+Space is held | UI | Medium | drag-and-drop.spec.ts | Automated |
|---|---|---|---|---|---|
| TC-31 | should show YouTube iframe when page is opened | UI | High | external-content.spec.ts | Automated |
| TC-32 | should show audio iframe when page is opened | UI | High | external-content.spec.ts | Automated |
| TC-33 | should have expected "src" attribute in YouTube iframe | UI | Medium | external-content.spec.ts | Automated |
| TC-34 | should have expected "src" attribute in audio iframe | UI | Medium | external-content.spec.ts | Automated |
| TC-35 | should load expected URL in YouTube iframe | UI | Medium | external-content.spec.ts | Automated |
| TC-36 | should load expected URL in audio iframe | UI | Medium | external-content.spec.ts | Automated |
|---|---|---|---|---|---|
| TC-37 | should set iframe "src" to the selected website | UI | Medium | external-site.spec.ts | Automated |
| TC-38 | should load selected website in iframe | UI | High | external-site.spec.ts | Automated |
|---|---|---|---|---|---|
| TC-39 | should show expected text for list item #`${itemID}` (`${item}`) | UI | Medium | iFrame-example.spec.ts | Automated |
| TC-40 | should show "iFrame" as list title when page is opened | UI | Medium | iFrame-example.spec.ts | Automated |
| TC-41 | should show total 100 after adding positive amount (100) with Add button | UI | High | iFrame-example.spec.ts | Automated |
| TC-42 | should show total -100 after adding negative amount (-100) with Add button | UI | Medium | iFrame-example.spec.ts | Automated |
|---|---|---|---|---|---|
| TC-43 | should show success message after file is uploaded by clicking the drop zone | UI | Medium | file-upload.spec.ts | Automated |
| TC-44 | should show success message after file is dropped onto the drop zone | UI | High | file-upload.spec.ts | Automated |
| TC-45 | should show upload results after file is chosen with "Choose file", the form is filled and Upload is clicked | UI | High | file-upload.spec.ts | Automated |
| TC-46 | should show upload results after file is set in the file input, the form is filled and Upload is clicked | UI | Medium | file-upload.spec.ts | Automated |
| TC-47 | should send POST request after uploading file via "Choose file" button | network | High | file-upload.spec.ts | Automated |
| TC-48 | should send POST request when file is dropped onto the drop zone |network| High | file-upload.spec.ts | Automated |
|---|---|---|---|---|---|
| TC-49 | should accept valid value in the first field after it loses focus (`${note}`) | UI | Medium | javascript-form.spec.ts | Automated |
| TC-50 | should accept valid value in the second field after it loses focus (`${note}`) | UI | Medium | javascript-form.spec.ts | Automated |
| TC-51 | should show success message when form is submitted with valid values (`${note}`) | UI | High | javascript-form.spec.ts | Automated |
| TC-52 | should submit form with valid values using keyboard only | UI | Medium | javascript-form.spec.ts | Needs fix (`test.fixme`) |
| TC-53 | should show submitted values in results after form is submitted with valid values (`${note}`) | UI | High | javascript-form.spec.ts | Automated |
| TC-54 | should show error when invalid value is entered in the first field and it loses focus (`${note}`) | UI | Medium | javascript-form.spec.ts | Known issue (`test.fail`) |
| TC-55 | should show error when invalid value is entered in the second field and it loses focus (`${note}`) | UI | Medium | javascript-form.spec.ts | Known issue (`test.fail`) |
| TC-56 | should show error and no success message when form is submitted with invalid first value (`${note}`) | UI | Medium | javascript-form.spec.ts | Known issue (`test.fail`) |
| TC-57 | should show error and no success message when form is submitted with invalid second value (`${note}`) | UI | Medium | javascript-form.spec.ts | Known issue (`test.fail`) |
| TC-58 | should show values in request body as entered in fields when form is submitted (`${note}`) | API (network) | High | javascript-form.spec.ts | Automated |
|---|---|---|---|---|---|
| TC-59 | should show success message and hide spinner after Submit with selected role (`${role}`) | UI | High | multiple-elements.spec.ts | Automated |
| TC-60 | should show role description when hovering over role button (`${role}`) | UI | Medium | multiple-elements.spec.ts | Automated |
| TC-61 | should show spinner while submit request is in progress (`${role}`) | UI | Medium | multiple-elements.spec.ts | Automated |
| TC-62 | should keep Submit button disabled when no role is selected | UI | Medium | multiple-elements.spec.ts | Automated |
| TC-63 | should disable Submit button after role is submitted (`${role}`) | UI | Medium | multiple-elements.spec.ts | Automated |
| TC-64 | should show result of the first submission when role is changed | UI | Medium | multiple-elements.spec.ts | Known issue (`test.fail`) |
| TC-65 | should send POST request to /internalapi/choose-a-role on submit for each role - `${role}` | network | High | multiple-elements.spec.ts | Automated |
| TC-66 | should send JSON body with selected role and "application/json" content-type when role is submitted (`${role}`) | network | Medium | multiple-elements.spec.ts | Automated |
| TC-67 | should return response body matching the role shown in the success message - `${role}` | network | Medium | multiple-elements.spec.ts | Automated |
</details>

## Found bugs

## Approach
- **Page Object Pattern**: every page has its own class, reusable components have separate component classes. API tests use dedicated API client classes.
- **Custom fixtures**: Page Objects are injected into tests via `fixturePages.ts`, so there is no manual setup in specs.
- **Centralized test data**: all data lives in `test-data.ts`, no hardcoded values in specs.
- **Structure**: tests are grouped with `test.describe`; shared setup is moved to `test.beforeEach`.
- **Tags**: tests are split into `@smoke` and `@regression`.

## Project structure
```
tests/      # spec-files
pages/      # Page Objects
api/        # api and their methods
components/ # every component and their methods 
fixtures/   # fixtures for pages
test-data/  # test data
```

## Getting started
```bash
npm ci
npx playwright install --with-deps chromium
npx playwright test
npx playwright show-report
```

## CI/CD
- On push: lint + tests
- On schedule: tests + publishing report on GitHub Pages


## Next steps
- **3 flaky tests**: in some runs locator error appears while the dialog is open. Mitigated with `retries: 1` in CI; root cause analysis is in progress.
- Create test cases for Cookies and Session Storage sections.

## Contacts

