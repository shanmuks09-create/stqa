# Software Testing & Quality Assurance (STQA) Laboratory
## Experiment #01: Test Case Specification Document
### Module: User Registration Page Verification & Defect Analysis

---

## 1. Document Overview
* **Project Name:** User Registration Web Application
* **Testing Type:** Black Box Testing (Functional, Boundary Value Analysis, Equivalence Class Partitioning, Negative Testing)
* **Standard:** IEEE 829 Standard for Software Test Documentation
* **Application URL:** `file:///c:/Users/G Shanmukha Sai/Desktop/sqta exp.1/index.html`
* **Test Environment:** 
  * Operating System: Windows 10/11
  * Browser: Google Chrome / Microsoft Edge / Mozilla Firefox
  * Client Stack: HTML5, CSS3, Vanilla JavaScript (ES6)

---

## 2. Test Case Summary Table

| Test Case ID | Test Case Name | Target Module / Field | Test Type | Preconditions | Priority |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC01** | Password Mismatch | Password & Confirm Password | Negative / Functional | Registration form loaded | High |
| **TC02** | Empty Email | Email Address | Negative / Mandatory | Registration form loaded | High |
| **TC03** | Invalid Email Format | Email Address | Negative / Boundary | Registration form loaded | High |
| **TC04** | Incorrect CAPTCHA | Security / CAPTCHA | Negative / Security | CAPTCHA generated | High |
| **TC05** | Empty User ID | User ID | Negative / Mandatory | Registration form loaded | High |
| **TC06** | Empty Password | Password | Negative / Mandatory | Registration form loaded | High |
| **TC07** | Empty Confirm Password | Confirm Password | Negative / Mandatory | Registration form loaded | Medium |
| **TC08** | Valid Registration | All Fields | Positive / End-to-End | Registration form loaded | Critical |
| **TC09** | Multiple Invalid Fields | Form-Level Validation | Negative / Comprehensive | Registration form loaded | High |
| **TC10** | Register Button Validation | Submission Handler | Negative / Integrity | Form contains invalid data | Critical |

---

## 3. Detailed Test Case Specifications

### Test Case TC01: Password Mismatch Validation
* **Test Case ID:** TC01
* **Test Objective:** Verify that entering mismatched values in the "Password" and "Confirm Password" fields triggers an appropriate error message and prevents registration.
* **Pre-conditions:** Registration page is displayed and fields are cleared.
* **Test Steps:**
  1. Enter valid User ID: `john_doe`
  2. Enter Password: `Password@123`
  3. Enter different Confirm Password: `DifferentPassword@999`
  4. Enter valid Name: `John Doe`
  5. Enter valid Email: `john.doe@example.com`
  6. Select Country: `India`
  7. Enter displayed valid CAPTCHA code.
  8. Click **"Register Now"** button.
* **Input Test Data:**
  * Password: `Password@123`
  * Confirm Password: `DifferentPassword@999`
* **Expected Result:**
  * System displays validation error: `"Passwords do not match"` under the Confirm Password field.
  * Registration is blocked; no success state is granted.
* **Post-conditions:** Form remains populated with user input; error message highlighted in red.

---

### Test Case TC02: Empty Email Validation
* **Test Case ID:** TC02
* **Test Objective:** Verify that leaving the mandatory Email field empty prevents form submission with the required error prompt.
* **Pre-conditions:** Registration page is open.
* **Test Steps:**
  1. Enter valid User ID: `john_doe`
  2. Enter valid Password: `Password@123`
  3. Enter valid Confirm Password: `Password@123`
  4. Enter valid Name: `John Doe`
  5. Leave Email field completely empty (`""`).
  6. Select Country: `India`
  7. Enter valid CAPTCHA code.
  8. Click **"Register Now"** button.
* **Input Test Data:**
  * Email: `""` (Empty string)
* **Expected Result:**
  * System displays validation error: `"Email is required"`.
  * Registration is blocked.
* **Post-conditions:** Focus remains on form; email input marked as invalid.

---

### Test Case TC03: Invalid Email Format Validation
* **Test Case ID:** TC03
* **Test Objective:** Verify that entering a non-compliant email format without `@` or domain (e.g., `abc`) is rejected with a specific syntax error.
* **Pre-conditions:** Registration page is open.
* **Test Steps:**
  1. Fill all other mandatory fields with valid data.
  2. In the Email field, enter the invalid string: `abc`.
  3. Enter valid CAPTCHA code.
  4. Click **"Register Now"** button.
* **Input Test Data:**
  * Email: `abc`
* **Expected Result:**
  * System displays validation error: `"Please enter a valid email address."`
  * Form submission is prevented.
* **Defect Identified in Build v1.0:** Build v1.0 omitted regular expression syntax validation; it only checked for emptiness, permitting `abc` or displaying no format error (**DEF-01**). Resolved in Build v1.1.

---

### Test Case TC04: Incorrect CAPTCHA Security Validation
* **Test Case ID:** TC04
* **Test Objective:** Verify that entering a security verification code that does not match the canvas image prevents automated bot registration.
* **Pre-conditions:** Canvas CAPTCHA is generated and rendered.
* **Test Steps:**
  1. Fill all registration fields with valid credentials.
  2. In the CAPTCHA field, enter an incorrect code: `WRONG7` (different from displayed image).
  3. Click **"Register Now"** button.
* **Input Test Data:**
  * CAPTCHA Input: `WRONG7` (Displayed token is e.g. `K9X2P4`)
* **Expected Result:**
  * System displays validation error: `"Invalid CAPTCHA."`
  * Registration is blocked.
* **Defect Identified in Build v1.0:** Build v1.0 displayed generic `"Security validation failed"` instead of the required specification `"Invalid CAPTCHA."` (**DEF-02**). Resolved in Build v1.1.

---

### Test Case TC05: Empty User ID Validation
* **Test Case ID:** TC05
* **Test Objective:** Verify that the User ID field is strictly required and cannot be bypassed when blank.
* **Pre-conditions:** Registration page loaded.
* **Test Steps:**
  1. Leave User ID input empty (`""`).
  2. Fill Password: `Password@123`, Confirm Password: `Password@123`.
  3. Fill Name, Email, Country, and valid CAPTCHA.
  4. Click **"Register Now"** button.
* **Input Test Data:**
  * User ID: `""` (Empty string)
* **Expected Result:**
  * System displays validation error: `"User ID is required."`
  * Registration is prevented.
* **Post-conditions:** User ID input field highlighted with red border.

---

### Test Case TC06: Empty Password Validation
* **Test Case ID:** TC06
* **Test Objective:** Verify that the Password field is mandatory and rejects blank submission.
* **Pre-conditions:** Registration page loaded.
* **Test Steps:**
  1. Enter valid User ID: `john_doe`.
  2. Leave Password field empty (`""`).
  3. Leave Confirm Password field empty (`""`).
  4. Fill remaining fields with valid data.
  5. Click **"Register Now"** button.
* **Input Test Data:**
  * Password: `""` (Empty string)
* **Expected Result:**
  * System displays validation error: `"Password is required."`
  * Registration is prevented.
* **Post-conditions:** Password input marked with invalid class.

---

### Test Case TC07: Empty Confirm Password Validation
* **Test Case ID:** TC07
* **Test Objective:** Verify that leaving the Confirm Password field empty when a password is typed displays the specific prompt `"Please confirm your password."` rather than a generic mismatch error.
* **Pre-conditions:** Registration page loaded.
* **Test Steps:**
  1. Enter valid User ID: `john_doe`.
  2. Enter valid Password: `Password@123`.
  3. Leave Confirm Password field empty (`""`).
  4. Fill Name, Email, Country, and CAPTCHA.
  5. Click **"Register Now"** button.
* **Input Test Data:**
  * Password: `Password@123`
  * Confirm Password: `""`
* **Expected Result:**
  * System displays validation error: `"Please confirm your password."`
  * Registration is prevented.
* **Defect Identified in Build v1.0:** Build v1.0 checked `password !== confirmPassword` directly, displaying `"Passwords do not match"` instead of `"Please confirm your password."` (**DEF-03**). Resolved in Build v1.1.

---

### Test Case TC08: Valid Registration (Happy Path / End-to-End)
* **Test Case ID:** TC08
* **Test Objective:** Verify that providing valid, compliant data in all fields successfully registers the user into the system.
* **Pre-conditions:** Registration page loaded; fresh CAPTCHA generated.
* **Test Steps:**
  1. Enter User ID: `john_doe`
  2. Enter Password: `Password@123`
  3. Enter Confirm Password: `Password@123`
  4. Enter Full Name: `John Doe`
  5. Enter Email: `john.doe@example.com`
  6. Select Country: `India`
  7. Enter matching CAPTCHA code from canvas.
  8. Click **"Register Now"** button.
* **Input Test Data:**
  * All fields populated with valid, RFC-compliant, matching values.
* **Expected Result:**
  * Registration succeeds.
  * System displays success alert: `"Registration successful! Welcome, John Doe."`
  * No error labels or red borders appear.
* **Post-conditions:** User session is recognized as registered.

---

### Test Case TC09: Multiple Invalid Fields Validation
* **Test Case ID:** TC09
* **Test Objective:** Verify that when multiple mandatory fields are missing or invalid, all relevant validation error messages are displayed simultaneously rather than halting on the first error.
* **Pre-conditions:** Registration page loaded.
* **Test Steps:**
  1. Leave all mandatory fields empty (User ID, Password, Confirm Password, Name, Email, Country, CAPTCHA).
  2. Click **"Register Now"** button.
  3. Count and inspect the displayed validation messages across the form.
* **Input Test Data:**
  * All 7 fields empty (`""`).
* **Expected Result:**
  * All relevant validation errors are displayed concurrently:
    * `"User ID is required."`
    * `"Password is required."`
    * `"Please confirm your password."`
    * `"Name is required."`
    * `"Email is required"`
    * `"Please select a country."`
    * `"Please enter CAPTCHA"`
  * Top summary alert indicates multiple validation errors.
  * Form submission is prevented.
* **Defect Identified in Build v1.0:** Early return pattern (`return { isValid: false }`) after the first failed field caused only the User ID error to be visible, hiding errors for the remaining 6 fields (**DEF-04**). Resolved in Build v1.1.

---

### Test Case TC10: Register Button Validation (Negative Submission Prevention)
* **Test Case ID:** TC10
* **Test Objective:** Verify that clicking the Register button with invalid data cannot bypass client-side validation or cause unauthorized submission.
* **Pre-conditions:** Form contains invalid, non-matching, or incomplete data.
* **Test Steps:**
  1. Enter whitespace User ID, 3-character Password, mismatched Confirm Password, numeric Name, malformed Email, no Country, and dummy CAPTCHA.
  2. Click **"Register Now"** button multiple times.
  3. Verify that the form does not redirect, does not clear itself, and blocks registration.
* **Input Test Data:**
  * Mixed invalid data set.
* **Expected Result:**
  * Registration must not occur.
  * Form remains active on page with error indicators.
* **Post-conditions:** State remains secure and unsubmitted.

---

## 4. Execution Traceability Matrix

| Test Case ID | Requirement / Rule Tested | Build v1.0 Result | Build v1.1 Result | Associated Defect |
| :--- | :--- | :--- | :--- | :--- |
| **TC01** | Password match check | **PASS** | **PASS** | None |
| **TC02** | Email empty check | **PASS** | **PASS** | None |
| **TC03** | Email regex format | **FAIL** | **PASS** | **DEF-01** |
| **TC04** | CAPTCHA error wording | **FAIL** | **PASS** | **DEF-02** |
| **TC05** | User ID empty check | **PASS** | **PASS** | None |
| **TC06** | Password empty check | **PASS** | **PASS** | None |
| **TC07** | Confirm Password empty check | **FAIL** | **PASS** | **DEF-03** |
| **TC08** | Valid registration | **PASS** | **PASS** | None |
| **TC09** | Simultaneous multi-field errors | **FAIL** | **PASS** | **DEF-04** |
| **TC10** | Register submission prevention | **PASS** | **PASS** | None |

---
**Approved by:** STQA Laboratory Examiner / QA Lead  
**Document Status:** Baselines & Verified
