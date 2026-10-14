/**
 * ==============================================================================
 * STQA Laboratory Experiment #1: Registration Page Testing & Defect Analysis
 * Exact Screenshot Replica & Automated Test Execution Engine
 * ==============================================================================
 */

// Global State
let currentBuild = 'v1.0';
let currentCaptcha = '3349'; // Match wavy alphanumeric sequence seen in screenshot

// Test Case Definitions (TC01 to TC10)
const TEST_CASES = [
  {
    id: 'TC01',
    name: 'Password mismatch',
    description: 'Verify error when Password and Confirm Password do not match.',
    inputs: {
      userId: 'john_doe',
      password: 'Password@123',
      confirmPassword: 'hello123', // Mismatched value like screenshot
      name: 'John Doe',
      email: 'john.doe@example.com',
      country: 'India',
      captcha: 'VALID'
    },
    expectedMessage: 'Passwords do not match',
    expectedField: 'confirmPassword',
    status: 'PENDING',
    actualResult: 'Not executed yet'
  },
  {
    id: 'TC02',
    name: 'Empty Email',
    description: 'Verify mandatory email check when Email field is left blank.',
    inputs: {
      userId: 'john_doe',
      password: 'Password@123',
      confirmPassword: 'Password@123',
      name: 'John Doe',
      email: '',
      country: 'India',
      captcha: 'VALID'
    },
    expectedMessage: 'Email is required',
    expectedField: 'email',
    status: 'PENDING',
    actualResult: 'Not executed yet'
  },
  {
    id: 'TC03',
    name: 'Invalid Email',
    description: 'Verify email format validation with invalid syntax ("abc").',
    inputs: {
      userId: 'john_doe',
      password: 'Password@123',
      confirmPassword: 'Password@123',
      name: 'John Doe',
      email: 'abc',
      country: 'India',
      captcha: 'VALID'
    },
    expectedMessage: 'Please enter a valid email address.',
    expectedField: 'email',
    status: 'PENDING',
    actualResult: 'Not executed yet'
  },
  {
    id: 'TC04',
    name: 'Incorrect CAPTCHA',
    description: 'Verify security rejection when CAPTCHA does not match canvas.',
    inputs: {
      userId: 'john_doe',
      password: 'Password@123',
      confirmPassword: 'Password@123',
      name: 'John Doe',
      email: 'john.doe@example.com',
      country: 'India',
      captcha: 'r' // Exactly as shown in the screenshot!
    },
    expectedMessage: 'Invalid CAPTCHA.',
    expectedField: 'captcha',
    status: 'PENDING',
    actualResult: 'Not executed yet'
  },
  {
    id: 'TC05',
    name: 'Empty User ID',
    description: 'Verify mandatory field validation when User ID is empty.',
    inputs: {
      userId: '',
      password: 'Password@123',
      confirmPassword: 'Password@123',
      name: 'John Doe',
      email: 'john.doe@example.com',
      country: 'India',
      captcha: 'VALID'
    },
    expectedMessage: 'User ID is required.',
    expectedField: 'userId',
    status: 'PENDING',
    actualResult: 'Not executed yet'
  },
  {
    id: 'TC06',
    name: 'Empty Password',
    description: 'Verify mandatory password validation when Password is blank.',
    inputs: {
      userId: 'john_doe',
      password: '',
      confirmPassword: '',
      name: 'John Doe',
      email: 'john.doe@example.com',
      country: 'India',
      captcha: 'VALID'
    },
    expectedMessage: 'Password is required.',
    expectedField: 'password',
    status: 'PENDING',
    actualResult: 'Not executed yet'
  },
  {
    id: 'TC07',
    name: 'Empty Confirm Password',
    description: 'Verify specific prompt when Confirm Password is left empty.',
    inputs: {
      userId: 'john_doe',
      password: 'Password@123',
      confirmPassword: '',
      name: 'John Doe',
      email: 'john.doe@example.com',
      country: 'India',
      captcha: 'VALID'
    },
    expectedMessage: 'Please confirm your password.',
    expectedField: 'confirmPassword',
    status: 'PENDING',
    actualResult: 'Not executed yet'
  },
  {
    id: 'TC08',
    name: 'Valid Registration',
    description: 'Verify registration succeeds when all valid inputs are supplied.',
    inputs: {
      userId: 'T$1Dw_5&',
      password: 'Password@123',
      confirmPassword: 'Password@123',
      name: 'John Doe',
      email: 'john.doe@example.com',
      country: 'India',
      captcha: 'VALID'
    },
    expectedMessage: 'Registration successful! Welcome, John Doe.',
    expectedField: 'NONE',
    status: 'PENDING',
    actualResult: 'Not executed yet'
  },
  {
    id: 'TC09',
    name: 'Multiple invalid fields',
    description: 'Verify that all relevant validation errors appear simultaneously.',
    inputs: {
      userId: '',
      password: '',
      confirmPassword: '',
      name: '',
      email: '',
      country: '',
      captcha: ''
    },
    expectedMessage: 'All mandatory validation errors displayed simultaneously.',
    expectedField: 'MULTIPLE',
    status: 'PENDING',
    actualResult: 'Not executed yet'
  },
  {
    id: 'TC10',
    name: 'Register button validation',
    description: 'Verify form prevents submission when clicked with invalid data.',
    inputs: {
      userId: '',
      password: '123',
      confirmPassword: 'abc',
      name: '12345',
      email: 'notanemail',
      country: '',
      captcha: 'r'
    },
    expectedMessage: 'Registration must not occur.',
    expectedField: 'MULTIPLE',
    status: 'PENDING',
    actualResult: 'Not executed yet'
  }
];

// STQA Defect Repository
const DEFECT_REPO = [
  {
    defectId: 'DEF-01',
    testCaseId: 'TC03',
    module: 'Email Validation',
    description: 'Format validation omitted; non-compliant string "abc" does not trigger format error.',
    steps: '1. Enter valid User ID, Password, Name, Country, CAPTCHA.\n2. In Email, enter "abc".\n3. Click Register.',
    expected: 'Display "Please enter a valid email address." and prevent submission.',
    actual: 'No format error displayed; form accepted or showed no format error.',
    severity: 'High',
    priority: 'High',
    status: 'OPEN'
  },
  {
    defectId: 'DEF-02',
    testCaseId: 'TC04',
    module: 'CAPTCHA Security',
    description: 'CAPTCHA returns generic "Security validation failed" instead of specified "Invalid CAPTCHA." error.',
    steps: '1. Fill all valid fields.\n2. Enter incorrect CAPTCHA text "r" or "WRONG7".\n3. Click Register.',
    expected: 'Display exact message: "Invalid CAPTCHA."',
    actual: 'Displayed generic "Security validation failed" instead of "Invalid CAPTCHA."',
    severity: 'Medium',
    priority: 'High',
    status: 'OPEN'
  },
  {
    defectId: 'DEF-03',
    testCaseId: 'TC07',
    module: 'Confirm Password',
    description: 'Blank Confirm Password triggers "Passwords do not match" instead of "Please confirm your password."',
    steps: '1. Enter Password "Password@123".\n2. Leave Confirm Password completely empty.\n3. Click Register.',
    expected: 'Display "Please confirm your password."',
    actual: 'Displayed "Passwords do not match" because empty check was skipped before mismatch check.',
    severity: 'Medium',
    priority: 'Medium',
    status: 'OPEN'
  },
  {
    defectId: 'DEF-04',
    testCaseId: 'TC09',
    module: 'Form Validation',
    description: 'Early-return implementation shows only the first error (User ID) and suppresses remaining field errors.',
    steps: '1. Leave all mandatory fields empty.\n2. Click Register.\n3. Inspect error labels.',
    expected: 'All relevant validation errors displayed simultaneously across all invalid fields.',
    actual: 'Validation halts at first error; only User ID error is displayed, hiding other 6 field errors.',
    severity: 'High',
    priority: 'High',
    status: 'OPEN'
  }
];

// ==============================================================================
// 1. CAPTCHA GENERATOR (MATCHING SCREENSHOT VISUAL APPEARANCE)
// ==============================================================================

/**
 * Draws a mottled, greenish-sage background with wavy noise lines and distorted
 * characters similar to the original laboratory screenshot.
 */
function generateCaptcha() {
  const canvas = document.getElementById('captchaCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;

  // Generate 4-digit code like "33 4 9"
  const digits = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += digits.charAt(Math.floor(Math.random() * digits.length));
  }
  currentCaptcha = code;

  // 1. Mottled greenish-gray background
  ctx.fillStyle = '#CDE0CD';
  ctx.fillRect(0, 0, width, height);

  // 2. Grainy background noise patches
  for (let i = 0; i < 25; i++) {
    ctx.fillStyle = (i % 2 === 0) ? '#B8D4B8' : '#DCEBDC';
    ctx.beginPath();
    ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 8 + 3, 0, Math.PI * 2);
    ctx.fill();
  }

  // 3. Wavy green/gray distortion noise lines
  for (let i = 0; i < 6; i++) {
    ctx.strokeStyle = '#85A885';
    ctx.lineWidth = Math.random() * 1.5 + 0.8;
    ctx.beginPath();
    ctx.moveTo(0, Math.random() * height);
    ctx.bezierCurveTo(
      width * 0.3, Math.random() * height,
      width * 0.7, Math.random() * height,
      width, Math.random() * height
    );
    ctx.stroke();
  }

  // 4. Draw characters with wavy offsets matching screenshot
  ctx.font = 'bold 20px "Courier New", Tahoma, monospace';
  ctx.fillStyle = '#2D522D';
  ctx.textBaseline = 'middle';

  const charSpacing = width / (code.length + 1);
  for (let i = 0; i < code.length; i++) {
    const char = code[i];
    ctx.save();
    const x = (i + 1) * charSpacing - 6;
    const y = height / 2 + (Math.sin(i * 1.5) * 5);
    ctx.translate(x, y);
    ctx.rotate((Math.random() * 16 - 8) * Math.PI / 180);
    ctx.fillText(char, 0, 0);
    ctx.restore();
  }

  logMessage('info', `[CAPTCHA] New code generated: ${code}`);
}

// ==============================================================================
// 2. VALIDATION LOGIC (BUILDS v1.0 vs v1.1)
// ==============================================================================

function validateRegistrationForm(formData, buildVersion = currentBuild) {
  const errors = {};
  const { userId, password, confirmPassword, name, email, country, captchaInput } = formData;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // BUILD v1.0 (CONTAINS DEFECTS FOUND IN SCREENSHOT)
  if (buildVersion === 'v1.0') {
    // Defect 4 (DEF-04): Early return halts on first failure!
    if (!userId || userId.trim() === '') {
      errors.userId = 'User ID is required.';
      return { isValid: false, errors };
    }

    if (!password || password === '') {
      errors.password = 'Password is required.';
      return { isValid: false, errors };
    }

    // Defect 3 (DEF-03): Jumps straight to mismatch check without checking if empty!
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      return { isValid: false, errors };
    }

    if (!name || name.trim() === '') {
      errors.name = 'Name is required.';
      return { isValid: false, errors };
    }

    if (!email || email.trim() === '') {
      errors.email = 'Email is required';
      return { isValid: false, errors };
    }
    // Defect 1 (DEF-01): Missing regex format check! Accepts "abc"

    if (!country || country === '') {
      errors.country = 'Please select a country.';
      return { isValid: false, errors };
    }

    if (!captchaInput || captchaInput.trim() === '') {
      errors.captcha = 'Please enter CAPTCHA';
      return { isValid: false, errors };
    }
    // Defect 2 (DEF-02): Returns wrong message "Security validation failed" instead of "Invalid CAPTCHA."
    if (captchaInput.trim() !== currentCaptcha) {
      errors.captcha = 'Security validation failed';
      return { isValid: false, errors };
    }

    return {
      isValid: true,
      errors: {},
      successMessage: `Registration successful! Welcome, ${name}.`
    };
  }

  // BUILD v1.1 (PATCHED / ALL DEFECTS RESOLVED)
  if (!userId || userId.trim() === '') {
    errors.userId = 'User ID is required.';
  }

  if (!password || password === '') {
    errors.password = 'Password is required.';
  }

  // Fixed DEF-03: Empty check first, then mismatch check
  if (!confirmPassword || confirmPassword === '') {
    errors.confirmPassword = 'Please confirm your password.';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (!name || name.trim() === '') {
    errors.name = 'Name is required.';
  }

  // Fixed DEF-01: Format regex validation added
  if (!email || email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!country || country === '') {
    errors.country = 'Please select a country.';
  }

  // Fixed DEF-02: Exact "Invalid CAPTCHA." error message returned
  if (!captchaInput || captchaInput.trim() === '') {
    errors.captcha = 'Please enter CAPTCHA';
  } else if (captchaInput.trim() !== currentCaptcha) {
    errors.captcha = 'Invalid CAPTCHA.';
  }

  const isValid = Object.keys(errors).length === 0;
  return {
    isValid,
    errors,
    successMessage: isValid ? `Registration successful! Welcome, ${name}.` : null
  };
}

// ==============================================================================
// 3. UI RENDERING & DOM UPDATES
// ==============================================================================

function clearValidationUI() {
  document.querySelectorAll('.error-msg').forEach(el => {
    el.textContent = '';
    el.classList.remove('active');
  });
  document.querySelectorAll('.replica-input, .replica-select').forEach(el => {
    el.classList.remove('is-invalid');
  });
  const alertBox = document.getElementById('form-alert-box');
  if (alertBox) alertBox.style.display = 'none';

  const successCard = document.getElementById('registration-success-card');
  if (successCard) successCard.style.display = 'none';
}

function renderValidationUI(errors) {
  clearValidationUI();
  const keys = Object.keys(errors);
  if (keys.length === 0) return;

  keys.forEach(k => {
    const errorEl = document.getElementById(`error-${k}`);
    const inputEl = document.getElementById(k === 'captcha' ? 'captchaInput' : k);
    if (errorEl) {
      errorEl.textContent = errors[k];
      errorEl.classList.add('active');
    }
    if (inputEl) {
      inputEl.classList.add('is-invalid');
    }
  });

  const alertBox = document.getElementById('form-alert-box');
  if (alertBox) {
    alertBox.innerHTML = `<strong>Validation Error:</strong> ${keys.length} invalid field(s) detected. Please correct errors below.`;
    alertBox.style.display = 'block';
  }
}

function renderSuccessUI(msg) {
  clearValidationUI();
  const successCard = document.getElementById('registration-success-card');
  const successMsg = document.getElementById('success-message');
  if (successCard && successMsg) {
    successMsg.textContent = msg;
    successCard.style.display = 'block';
  }
}

function getFormData() {
  return {
    userId: document.getElementById('userId').value,
    password: document.getElementById('password').value,
    confirmPassword: document.getElementById('confirmPassword').value,
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    country: document.getElementById('country').value,
    captchaInput: document.getElementById('captchaInput').value
  };
}

function setFormData(data) {
  document.getElementById('userId').value = data.userId !== undefined ? data.userId : '';
  document.getElementById('password').value = data.password !== undefined ? data.password : '';
  document.getElementById('confirmPassword').value = data.confirmPassword !== undefined ? data.confirmPassword : '';
  document.getElementById('name').value = data.name !== undefined ? data.name : '';
  document.getElementById('email').value = data.email !== undefined ? data.email : '';
  document.getElementById('country').value = data.country !== undefined ? data.country : 'India';

  if (data.captcha === 'VALID') {
    document.getElementById('captchaInput').value = currentCaptcha;
  } else {
    document.getElementById('captchaInput').value = data.captcha !== undefined ? data.captcha : '';
  }
}

/**
 * Loads the exact scenario values shown in the lab screenshot!
 */
function loadScreenshotValues() {
  document.getElementById('userId').value = 'T$1Dw_5&';
  document.getElementById('password').value = 'Password@123';
  document.getElementById('confirmPassword').value = 'hello123';
  document.getElementById('name').value = 'Tester1.1 and Tester 1.2';
  document.getElementById('email').value = '';
  document.getElementById('country').value = 'India';
  document.getElementById('captchaInput').value = 'r';

  clearValidationUI();
  logMessage('info', '[SCREENSHOT] Loaded exact values from laboratory screenshot into form.');
}

// ==============================================================================
// 4. TEST EXECUTION (TC01 to TC10)
// ==============================================================================

function executeTestCase(tcId) {
  const tc = TEST_CASES.find(t => t.id === tcId);
  if (!tc) return;

  logMessage('step', `[RUN] Executing ${tc.id}: ${tc.name} [Build ${currentBuild}]`);

  const inputs = { ...tc.inputs };
  inputs.captchaInput = (inputs.captcha === 'VALID') ? currentCaptcha : inputs.captcha;

  // Ingest into DOM
  setFormData(tc.inputs);

  // Validate
  const result = validateRegistrationForm(inputs, currentBuild);

  let passed = false;
  let actual = '';

  switch (tc.id) {
    case 'TC01': // Password mismatch
      if (!result.isValid && result.errors.confirmPassword === 'Passwords do not match') {
        passed = true;
        actual = 'Displayed "Passwords do not match" & registration prevented.';
      } else {
        passed = false;
        actual = `Got: "${result.errors.confirmPassword || 'No confirmPassword error'}"`;
      }
      break;

    case 'TC02': // Empty Email
      if (!result.isValid && result.errors.email === 'Email is required') {
        passed = true;
        actual = 'Displayed "Email is required" & registration prevented.';
      } else {
        passed = false;
        actual = `Got: "${result.errors.email || 'None'}"`;
      }
      break;

    case 'TC03': // Invalid Email (DEF-01)
      if (!result.isValid && result.errors.email === 'Please enter a valid email address.') {
        passed = true;
        actual = 'Displayed "Please enter a valid email address." & registration prevented.';
      } else {
        passed = false;
        actual = result.isValid
          ? 'Defect DEF-01: Form accepted invalid email "abc"!'
          : `Defect DEF-01: Format error missing (Got: "${result.errors.email || 'None'}")`;
      }
      break;

    case 'TC04': // Incorrect CAPTCHA (DEF-02)
      if (!result.isValid && result.errors.captcha === 'Invalid CAPTCHA.') {
        passed = true;
        actual = 'Displayed exact error "Invalid CAPTCHA." & registration prevented.';
      } else {
        passed = false;
        actual = `Defect DEF-02: Expected "Invalid CAPTCHA.", but got: "${result.errors.captcha || 'None'}"`;
      }
      break;

    case 'TC05': // Empty User ID
      if (!result.isValid && result.errors.userId === 'User ID is required.') {
        passed = true;
        actual = 'Displayed "User ID is required." & registration prevented.';
      } else {
        passed = false;
        actual = `Got: "${result.errors.userId || 'None'}"`;
      }
      break;

    case 'TC06': // Empty Password
      if (!result.isValid && result.errors.password === 'Password is required.') {
        passed = true;
        actual = 'Displayed "Password is required." & registration prevented.';
      } else {
        passed = false;
        actual = `Got: "${result.errors.password || 'None'}"`;
      }
      break;

    case 'TC07': // Empty Confirm Password (DEF-03)
      if (!result.isValid && result.errors.confirmPassword === 'Please confirm your password.') {
        passed = true;
        actual = 'Displayed "Please confirm your password." & registration prevented.';
      } else {
        passed = false;
        actual = `Defect DEF-03: Expected "Please confirm your password.", but got: "${result.errors.confirmPassword || 'None'}"`;
      }
      break;

    case 'TC08': // Valid Registration
      if (result.isValid) {
        passed = true;
        actual = `Registration succeeded: "${result.successMessage}"`;
      } else {
        passed = false;
        actual = `Unexpected errors: ${JSON.stringify(result.errors)}`;
      }
      break;

    case 'TC09': // Multiple invalid fields (DEF-04)
      const errCount = Object.keys(result.errors).length;
      if (!result.isValid && errCount >= 5) {
        passed = true;
        actual = `All ${errCount} mandatory errors displayed simultaneously.`;
      } else {
        passed = false;
        actual = `Defect DEF-04: Early-exit halted validation; only ${errCount} error visible (User ID: "${result.errors.userId || ''}").`;
      }
      break;

    case 'TC10': // Register button validation
      if (!result.isValid) {
        passed = true;
        actual = 'Submission blocked; registration did not occur.';
      } else {
        passed = false;
        actual = 'Defect: Permitted submission with invalid data.';
      }
      break;
  }

  // Update DOM feedback
  if (result.isValid) {
    renderSuccessUI(result.successMessage);
  } else {
    renderValidationUI(result.errors);
  }

  tc.status = passed ? 'PASS' : 'FAIL';
  tc.actualResult = actual;

  if (passed) {
    logMessage('pass', `✔ [PASS] ${tc.id}: ${actual}`);
  } else {
    logMessage('fail', `✖ [FAIL] ${tc.id}: ${actual}`);
  }

  updateTestCaseCardDOM(tc);
  updateMetrics();
  updateDefectStatuses();
}

function runAllTestCases() {
  logMessage('info', `=== STARTING TEST EXECUTION [Build ${currentBuild}] ===`);
  let index = 0;
  function next() {
    if (index < TEST_CASES.length) {
      executeTestCase(TEST_CASES[index].id);
      index++;
      setTimeout(next, 200);
    } else {
      logMessage('info', `=== TEST RUN COMPLETED ===`);
    }
  }
  next();
}

function resetTestCases() {
  TEST_CASES.forEach(tc => {
    tc.status = 'PENDING';
    tc.actualResult = 'Not executed yet';
    updateTestCaseCardDOM(tc);
  });
  updateMetrics();
  clearValidationUI();
  logMessage('info', '[RESET] All test cases reset to PENDING.');
}

// ==============================================================================
// 5. TEST CARDS & DEFECT REPORT RENDERING
// ==============================================================================

function renderTestCaseList() {
  const container = document.getElementById('test-case-list');
  if (!container) return;

  container.innerHTML = '';
  TEST_CASES.forEach(tc => {
    const card = document.createElement('div');
    card.className = `tc-card status-${tc.status.toLowerCase()}`;
    card.id = `card-${tc.id}`;

    card.innerHTML = `
      <div class="tc-card-head">
        <div>
          <span class="tc-id">${tc.id}</span>
          <span class="tc-name">${tc.name}</span>
        </div>
        <span class="tc-badge-status badge-${tc.status.toLowerCase()}" id="badge-${tc.id}">${tc.status}</span>
      </div>
      <div class="tc-desc">${tc.description}</div>
      <div class="tc-expected"><strong>Expected:</strong> ${tc.expectedMessage}</div>
      <div class="tc-actual" id="actual-${tc.id}"></div>
      <div class="tc-card-actions">
        <button type="button" class="btn-tc-run" data-id="${tc.id}">▶ Run TC</button>
        <button type="button" class="btn-tc-load" data-id="${tc.id}">Load Inputs</button>
      </div>
    `;

    container.appendChild(card);
  });

  document.querySelectorAll('.btn-tc-run').forEach(b => {
    b.addEventListener('click', (e) => executeTestCase(e.currentTarget.getAttribute('data-id')));
  });

  document.querySelectorAll('.btn-tc-load').forEach(b => {
    b.addEventListener('click', (e) => {
      const tc = TEST_CASES.find(t => t.id === e.currentTarget.getAttribute('data-id'));
      if (tc) {
        setFormData(tc.inputs);
        clearValidationUI();
        logMessage('info', `[INPUTS] Loaded test inputs for ${tc.id}.`);
      }
    });
  });
}

function updateTestCaseCardDOM(tc) {
  const card = document.getElementById(`card-${tc.id}`);
  const badge = document.getElementById(`badge-${tc.id}`);
  const actual = document.getElementById(`actual-${tc.id}`);

  if (card) card.className = `tc-card status-${tc.status.toLowerCase()}`;
  if (badge) {
    badge.className = `tc-badge-status badge-${tc.status.toLowerCase()}`;
    badge.textContent = tc.status;
  }
  if (actual) {
    actual.className = `tc-actual ${tc.status === 'PASS' ? 'show-pass' : 'show-fail'}`;
    actual.innerHTML = `<strong>Actual:</strong> ${tc.actualResult}`;
  }
}

function updateMetrics() {
  const total = TEST_CASES.length;
  const passed = TEST_CASES.filter(t => t.status === 'PASS').length;
  const failed = TEST_CASES.filter(t => t.status === 'FAIL').length;
  const pending = TEST_CASES.filter(t => t.status === 'PENDING').length;

  document.getElementById('metric-total').textContent = total;
  document.getElementById('metric-passed').textContent = passed;
  document.getElementById('metric-failed').textContent = failed;
  document.getElementById('metric-pending').textContent = pending;
}

function updateDefectStatuses() {
  DEFECT_REPO.forEach(d => {
    const linked = TEST_CASES.find(t => t.id === d.testCaseId);
    if (currentBuild === 'v1.1') {
      d.status = 'CLOSED';
    } else {
      d.status = (linked && linked.status === 'PASS') ? 'CLOSED' : 'OPEN';
    }
  });

  renderDefectTable();
  const openCount = DEFECT_REPO.filter(d => d.status === 'OPEN').length;
  const badge = document.getElementById('defect-count-badge');
  if (badge) badge.textContent = openCount;
}

function renderDefectTable() {
  const tbody = document.getElementById('defect-table-body');
  if (!tbody) return;

  tbody.innerHTML = '';
  DEFECT_REPO.forEach(d => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${d.defectId}</strong></td>
      <td><span class="tc-id">${d.testCaseId}</span></td>
      <td><strong>${d.module}</strong></td>
      <td>${d.description}</td>
      <td style="white-space: pre-line; font-size: 0.72rem;">${d.steps}</td>
      <td style="color: #0369a1;">${d.expected}</td>
      <td style="color: #b91c1c;">${d.actual}</td>
      <td><span class="badge-${d.severity.toLowerCase()}">${d.severity}</span></td>
      <td><span class="badge-${d.priority.toLowerCase()}">${d.priority}</span></td>
      <td>
        <span class="${d.status === 'OPEN' ? 'badge-defect-open' : 'badge-defect-closed'}">
          ${d.status}
        </span>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function logMessage(type, msg) {
  const box = document.getElementById('test-console-output');
  if (!box) return;
  const now = new Date().toLocaleTimeString();
  const div = document.createElement('div');
  div.className = `log-line ${type}`;
  div.textContent = `[${now}] ${msg}`;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

// ==============================================================================
// 6. INITIALIZATION & LISTENERS
// ==============================================================================

document.addEventListener('DOMContentLoaded', () => {
  generateCaptcha();
  renderTestCaseList();
  renderDefectTable();
  updateMetrics();

  // Refresh CAPTCHA
  document.getElementById('refresh-captcha-btn').addEventListener('click', generateCaptcha);

  // Load Screenshot Scenario Values
  document.getElementById('load-screenshot-data-btn').addEventListener('click', loadScreenshotValues);

  // Clear Form
  document.getElementById('clear-form-btn').addEventListener('click', () => {
    document.getElementById('registration-form').reset();
    clearValidationUI();
    generateCaptcha();
    logMessage('info', '[FORM] Cleared all inputs.');
  });

  // Fill 100% Valid Data (TC08)
  document.getElementById('fill-valid-btn').addEventListener('click', () => {
    setFormData(TEST_CASES.find(t => t.id === 'TC08').inputs);
    clearValidationUI();
    logMessage('info', '[FORM] Loaded 100% valid data.');
  });

  // Build Switches
  const btnV10 = document.getElementById('build-v10-btn');
  const btnV11 = document.getElementById('build-v11-btn');
  const headerTitle = document.getElementById('header-title-text');
  const confirmPwdInput = document.getElementById('confirmPassword');

  btnV10.addEventListener('click', () => {
    currentBuild = 'v1.0';
    btnV10.classList.add('active');
    btnV11.classList.remove('active');
    headerTitle.textContent = 'New Registratio'; // Defect in title
    confirmPwdInput.setAttribute('type', 'text'); // Unmasked text defect
    logMessage('warn', '[BUILD SWITCH] Build v1.0 active (Screenshot Defects Present).');
    updateDefectStatuses();
  });

  btnV11.addEventListener('click', () => {
    currentBuild = 'v1.1';
    btnV11.classList.add('active');
    btnV10.classList.remove('active');
    headerTitle.textContent = 'New Registration'; // Fixed title
    confirmPwdInput.setAttribute('type', 'password'); // Fixed masked password
    logMessage('pass', '[BUILD SWITCH] Build v1.1 active (Patched / Defect Free).');
    updateDefectStatuses();
  });

  // Form Submit
  const form = document.getElementById('registration-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = getFormData();
    logMessage('step', `[SUBMIT] Validating registration in Build ${currentBuild}...`);
    const res = validateRegistrationForm(data, currentBuild);
    if (res.isValid) {
      renderSuccessUI(res.successMessage);
      logMessage('pass', `[SUCCESS] ${res.successMessage}`);
    } else {
      renderValidationUI(res.errors);
      logMessage('fail', `[FAILED] ${Object.keys(res.errors).length} error(s) found.`);
    }
  });

  // Test Actions
  document.getElementById('run-all-tests-btn').addEventListener('click', runAllTestCases);
  document.getElementById('reset-tests-btn').addEventListener('click', resetTestCases);
  document.getElementById('clear-logs-btn').addEventListener('click', () => {
    document.getElementById('test-console-output').innerHTML = '';
  });

  // Tab Switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const target = document.getElementById(e.currentTarget.getAttribute('data-tab'));
      if (target) target.classList.add('active');
    });
  });
});
