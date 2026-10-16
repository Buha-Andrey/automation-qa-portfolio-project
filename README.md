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
|---|---|---|---|---|---|
| TC-19 | should show authenticated message when protected page is opened with valid credentials | UI | High | basic-auth.spec.ts | Automated |
| TC-20 | should return to Basic Auth page when "Return to the Basic Auth page" is clicked | UI | Medium | basic-auth.spec.ts | Automated |
| TC-21 | should show reset confirmation and stop sending Authorization header after "Reset Basic Auth" is clicked | UI | Medium | basic-auth.spec.ts | Automated |
| TC-22 | should show "Not authenticated" message when protected page is opened with invalid credentials (`${username} / ${password}`) | UI | Medium | basic-auth.spec.ts | Automated |
| TC-23 | should return 200 and authenticated=true when request has valid Basic Auth header | API | High | basic-auth.spec.ts | Automated |
| TC-24 | should return 401 and authenticated=false when Authorization header is invalid or missing | API | Medium | basic-auth.spec.ts | Needs fix (`test.fixme`) |
| TC-25 | should return 401 when Accept header is invalid or missing | API | Medium | basic-auth.spec.ts | Needs fix (`test.fixme`) |
|---|---|---|---|---|---|
| TC-01 | should show initial titles on all squares when page is opened | UI | Medium | drag-and-drop.spec.ts | Automated |
| TC-02 | should update square titles after dragging yellow square ${yellow} to red square ${red} | UI | High | drag-and-drop.spec.ts | Automated (flaky) |
| TC-03 | should show "Drop Here" on both red squares when Ctrl is pressed | UI | High | drag-and-drop.spec.ts | Automated |
| TC-04 | should show "Bwa! Ha! Ha!" on first yellow square when Ctrl+B is pressed | UI | Medium | drag-and-drop.spec.ts | Automated |
| TC-05 | should show "Let GO!!!" on both red squares when Ctrl+Space is held | UI | Medium | drag-and-drop.spec.ts | Automated |
|---|---|---|---|---|---|
| TC-01 | should show YouTube iframe when page is opened | UI | High | external-content.spec.ts | Automated |
| TC-02 | should show audio iframe when page is opened | UI | High | external-content.spec.ts | Automated |
| TC-03 | should have expected "src" attribute in YouTube iframe | UI | Medium | external-content.spec.ts | Automated |
| TC-04 | should have expected "src" attribute in audio iframe | UI | Medium | external-content.spec.ts | Automated |
| TC-05 | should load expected URL in YouTube iframe | UI | Medium | external-content.spec.ts | Automated |
| TC-06 | should load expected URL in audio iframe | UI | Medium | external-content.spec.ts | Automated |
|---|---|---|---|---|---|
| TC-01 | should set iframe "src" to the selected website | UI | Medium | external-site.spec.ts | Automated |
| TC-02 | should load selected website in iframe | UI | High | external-site.spec.ts | Automated |
|---|---|---|---|---|---|
| TC-01 | should show expected text for list item #`${itemID}` (`${item}`) | UI | Medium | iFrame-example.spec.ts | Automated |
| TC-02 | should show "iFrame" as list title when page is opened | UI | Medium | iFrame-example.spec.ts | Automated |
| TC-03 | should show total 100 after adding positive amount (100) with Add button | UI | High | iFrame-example.spec.ts | Automated |
| TC-04 | should show total -100 after adding negative amount (-100) with Add button | UI | Medium | iFrame-example.spec.ts | Automated |
|---|---|---|---|---|---|
| TC-01 | should show success message after file is uploaded by clicking the drop zone | UI | Medium | file-upload.spec.ts | Automated |
| TC-02 | should show success message after file is dropped onto the drop zone | UI | High | file-upload.spec.ts | Automated |
| TC-03 | should show upload results after file is chosen with "Choose file", the form is filled and Upload is clicked | UI | High | file-upload.spec.ts | Automated |
| TC-04 | should show upload results after file is set in the file input, the form is filled and Upload is clicked | UI | Medium | file-upload.spec.ts | Automated |
| TC-05 | should send POST request after uploading file via "Choose file" button | network | High | file-upload.spec.ts | Automated |
| TC-06 | should send POST request when file is dropped onto the drop zone |network| High | file-upload.spec.ts | Automated |
