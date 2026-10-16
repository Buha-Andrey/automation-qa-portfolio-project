| ID case | Test Case | Type | Priority | Spec File | Status |
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
