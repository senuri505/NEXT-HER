/**
 * Registration Logic & Asynchronous AJAX Submission
 * Supports Standalone register.php & In-Page Index Section
 * Leo Club of University of Sri Jayewardenepura - NEXT HER
 */

document.addEventListener('DOMContentLoaded', () => {
  initCategorySwitcher();
  initInpageCategorySwitcher();
  initRegistrationForm();
  initInpageRegistrationForm();
});

/* --------------------------------------------------------------------------
   1. Standalone Page Category Switcher (register.php)
   -------------------------------------------------------------------------- */
function initCategorySwitcher() {
  const categoryTabs = document.querySelectorAll('.category-tab-btn');
  const categoryInput = document.getElementById('selected_category');
  const institutionLabel = document.getElementById('institution_label');
  const institutionInput = document.getElementById('institution');
  const ageGroup = document.getElementById('age_group');

  if (!categoryTabs.length || !categoryInput) return;

  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-category');
      categoryInput.value = category;

      if (category === 'school') {
        if (institutionLabel) institutionLabel.textContent = 'School Name & Grade';
        if (institutionInput) institutionInput.placeholder = 'e.g. Anula Vidyalaya, Grade 11';
        if (ageGroup) ageGroup.style.display = 'block';
      } else if (category === 'university') {
        if (institutionLabel) institutionLabel.textContent = 'University & Faculty / Year';
        if (institutionInput) institutionInput.placeholder = 'e.g. University of Sri Jayewardenepura, FHSS 3rd Year';
        if (ageGroup) ageGroup.style.display = 'block';
      } else if (category === 'volunteer' || category === 'mentor') {
        if (institutionLabel) institutionLabel.textContent = 'Institution / Profession';
        if (institutionInput) institutionInput.placeholder = 'e.g. Software Engineer at Tech Corp';
        if (ageGroup) ageGroup.style.display = 'block';
      } else if (category === 'partner') {
        if (institutionLabel) institutionLabel.textContent = 'Company / Organization Name';
        if (institutionInput) institutionInput.placeholder = 'e.g. Women Impact Foundation';
        if (ageGroup) ageGroup.style.display = 'none';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. In-Page Category Switcher (index.html #register)
   -------------------------------------------------------------------------- */
function initInpageCategorySwitcher() {
  const categoryPills = document.querySelectorAll('.category-pill-btn');
  const categoryInput = document.getElementById('inpage_selected_category');
  const institutionLabel = document.getElementById('inpage_institution_label');
  const institutionInput = document.getElementById('inpage_institution');

  if (!categoryPills.length || !categoryInput) return;

  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const category = pill.getAttribute('data-category');
      categoryInput.value = category;

      if (category === 'school') {
        if (institutionLabel) institutionLabel.textContent = 'EDUCATIONAL INSTITUTION *';
        if (institutionInput) institutionInput.placeholder = 'Your School Name & Grade';
      } else if (category === 'university') {
        if (institutionLabel) institutionLabel.textContent = 'EDUCATIONAL INSTITUTION *';
        if (institutionInput) institutionInput.placeholder = 'Your University / Faculty Name';
      } else if (category === 'volunteer' || category === 'mentor') {
        if (institutionLabel) institutionLabel.textContent = 'INSTITUTION / PROFESSION *';
        if (institutionInput) institutionInput.placeholder = 'Company / Profession / University';
      } else if (category === 'partner') {
        if (institutionLabel) institutionLabel.textContent = 'ORGANIZATION / COMPANY *';
        if (institutionInput) institutionInput.placeholder = 'Company / Organization Name';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. Standalone Registration Form Submit
   -------------------------------------------------------------------------- */
function initRegistrationForm() {
  const form = document.getElementById('registration-form');
  const messageBanner = document.getElementById('form-response-banner');
  const submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (messageBanner) messageBanner.style.display = 'none';

    if (!validateField('full_name', 'email', 'phone', 'full_name_error', 'email_error', 'phone_error')) return;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Registering...';
    }

    try {
      const response = await fetch('submit_registration.php', {
        method: 'POST',
        body: new FormData(form)
      });
      const result = await response.json();

      if (result.success) {
        showBanner(messageBanner, 'success', result.message);
        form.reset();
        const defaultTab = document.querySelector('.category-tab-btn[data-category="school"]');
        if (defaultTab) defaultTab.click();
      } else {
        showBanner(messageBanner, 'error', result.message);
      }
    } catch (err) {
      showBanner(messageBanner, 'error', 'Network error. Please ensure local Apache server is active.');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Complete Registration';
      }
    }
  });
}

/* --------------------------------------------------------------------------
   4. In-Page Registration Form Submit (index.html #register)
   -------------------------------------------------------------------------- */
function initInpageRegistrationForm() {
  const form = document.getElementById('inpage-registration-form');
  const messageBanner = document.getElementById('inpage-response-banner');
  const submitBtn = document.getElementById('inpage-submit-btn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (messageBanner) messageBanner.style.display = 'none';

    if (!validateField('inpage_full_name', 'inpage_email', 'inpage_phone', 'inpage_full_name_error', 'inpage_email_error', 'inpage_phone_error')) return;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Submitting Registration...';
    }

    try {
      const response = await fetch('submit_registration.php', {
        method: 'POST',
        body: new FormData(form)
      });
      const result = await response.json();

      if (result.success) {
        showBanner(messageBanner, 'success', result.message);
        form.reset();
        const defaultPill = document.querySelector('.category-pill-btn[data-category="school"]');
        if (defaultPill) defaultPill.click();
      } else {
        showBanner(messageBanner, 'error', result.message);
      }
    } catch (err) {
      showBanner(messageBanner, 'error', 'Server offline. Please start XAMPP Apache & MySQL.');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'SUBMIT REGISTRATION →';
      }
    }
  });
}

/* --------------------------------------------------------------------------
   Validation Helpers
   -------------------------------------------------------------------------- */
function validateField(nameId, emailId, phoneId, nameErrId, emailErrId, phoneErrId) {
  let valid = true;
  const nameEl = document.getElementById(nameId);
  const emailEl = document.getElementById(emailId);
  const phoneEl = document.getElementById(phoneId);

  const nameErr = document.getElementById(nameErrId);
  const emailErr = document.getElementById(emailErrId);
  const phoneErr = document.getElementById(phoneErrId);

  if (nameErr) nameErr.textContent = '';
  if (emailErr) emailErr.textContent = '';
  if (phoneErr) phoneErr.textContent = '';

  if (!nameEl || !nameEl.value.trim()) {
    if (nameErr) nameErr.textContent = 'Full Name is required';
    valid = false;
  }

  if (!emailEl || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim())) {
    if (emailErr) emailErr.textContent = 'Please enter a valid email address';
    valid = false;
  }

  if (!phoneEl || !/^[0-9+\-\s()]{9,15}$/.test(phoneEl.value.trim())) {
    if (phoneErr) phoneErr.textContent = 'Valid phone number required';
    valid = false;
  }

  return valid;
}

function showBanner(banner, type, message) {
  if (!banner) return;
  banner.className = `response-banner ${type}`;
  banner.innerHTML = message;
  banner.style.display = 'block';
  banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
