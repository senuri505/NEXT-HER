<?php
require_once __DIR__ . '/php/functions.php';
$csrf_token = generate_csrf_token();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Register | NEXT HER - Empowering Her in the Digital World</title>
  <meta name="description" content="Register for NEXT HER: Empowering Her in the Digital World conducted by Leo Club of University of Sri Jayewardenepura.">

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">

  <!-- Stylesheets -->
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/responsive.css">

  <style>
    .register-page {
      min-height: 100vh;
      padding: 7.5rem 0 5rem 0;
      background: linear-gradient(135deg, #FAF9FE 0%, #F5F2FA 35%, #F0ECF8 70%, #F7F5FB 100%);
      position: relative;
    }

    .form-wrapper {
      max-width: 780px;
      margin: 0 auto;
      background: linear-gradient(
        145deg,
        rgba(255, 255, 255, 0.86) 0%,
        rgba(223, 215, 236, 0.42) 50%,
        rgba(213, 192, 205, 0.28) 100%
      );
      border: 1px solid var(--glass-border-card);
      border-radius: 32px;
      padding: 3.2rem 2.6rem;
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      box-shadow: var(--glass-shadow-soft), var(--glass-inner-light);
      position: relative;
      z-index: 2;
    }

    .category-tabs {
      display: flex;
      gap: 0.6rem;
      margin-bottom: 2.2rem;
      overflow-x: auto;
      padding-bottom: 0.5rem;
    }

    .category-tab-btn {
      padding: 0.72rem 1.4rem;
      border-radius: 40px;
      background: rgba(255, 255, 255, 0.65);
      border: 1px solid var(--glass-border-card);
      color: var(--glass-text-body);
      font-family: var(--font-display);
      font-weight: 800;
      font-size: 0.9rem;
      cursor: pointer;
      white-space: nowrap;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      transition: all var(--transition-fast);
    }

    .category-tab-btn:hover {
      background: rgba(223, 215, 236, 0.5);
      color: var(--glass-text-heading);
      border-color: var(--glass-border-card-hover);
    }

    .category-tab-btn.active {
      background: linear-gradient(135deg, #4E2D82, #683B9E);
      color: #FFFFFF;
      border-color: #4E2D82;
      box-shadow: 0 8px 22px rgba(78, 45, 130, 0.3);
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .form-group.full-width {
      grid-column: span 2;
    }

    .form-label {
      font-size: 0.9rem;
      font-weight: 800;
      color: var(--glass-text-heading);
      text-transform: uppercase;
      letter-spacing: 0.8px;
    }

    .form-input, .form-select, .form-textarea {
      width: 100%;
      padding: 0.94rem 1.25rem;
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.72);
      border: 1px solid var(--glass-border-card);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      color: var(--glass-text-heading);
      font-family: var(--font-body);
      font-size: 0.96rem;
      outline: none;
      box-shadow: inset 0 1px 2px rgba(56, 42, 106, 0.04);
      transition: border-color var(--transition-fast), box-shadow var(--transition-fast), background var(--transition-fast);
    }

    .form-input:focus, .form-select:focus, .form-textarea:focus {
      border-color: #4E2D82;
      box-shadow: 0 0 18px rgba(78, 45, 130, 0.18), inset 0 1px 2px rgba(56, 42, 106, 0.04);
      background: rgba(255, 255, 255, 0.95);
    }

    .field-error {
      font-size: 0.8rem;
      color: #D93838;
      min-height: 1.2rem;
    }

    .response-banner {
      padding: 1.2rem;
      border-radius: 16px;
      font-weight: 700;
      text-align: center;
      margin-bottom: 1.8rem;
      display: none;
    }

    .response-banner.success {
      background: rgba(46, 204, 113, 0.15);
      border: 1px solid #2ECC71;
      color: #1E8449;
    }

    .response-banner.error {
      background: rgba(231, 76, 60, 0.15);
      border: 1px solid #E74C3C;
      color: #C0392B;
    }

    @media (max-width: 600px) {
      .form-grid {
        grid-template-columns: 1fr;
      }
      .form-group.full-width {
        grid-column: span 1;
      }
      .form-wrapper {
        padding: 2rem 1.2rem;
      }
    }
  </style>
</head>
<body>

  <!-- Smooth Ambient Gradient Lighting Mesh -->
  <div class="ambient-gradient-mesh"></div>

  <!-- Header Navbar -->
  <header class="navbar scrolled">
    <div class="container nav-container">
      <a href="index.html" class="nav-brand">
        <img src="assets/logo/women.png" alt="NEXT HER Logo" class="nav-logo-svg">
      </a>
      <a href="index.html" class="btn btn-secondary" style="padding: 0.5rem 1.2rem; font-size: 0.85rem;">← Back to Home</a>
    </div>
  </header>

  <main class="register-page">
    <div class="container">
      <div class="text-center" style="margin-bottom: 2.5rem;">
        <div class="section-badge">✨ Official Registration</div>
        <h1 class="section-title">NEXT <span class="gradient-text">HER</span></h1>
        <div style="margin-bottom: 0.5rem;">
          <span class="cursive-text" style="font-size: 2.2rem;">Empowering Her in the Digital World</span>
        </div>
        <p class="section-subtitle" style="margin-bottom: 0;">
          Select your registration category below and fill out your details to participate.
        </p>
      </div>

      <div class="form-wrapper">
        <!-- Response Banner -->
        <div id="form-response-banner" class="response-banner"></div>

        <!-- Category Selector -->
        <div class="category-tabs">
          <button type="button" class="category-tab-btn active" data-category="school">🎒 School Student</button>
          <button type="button" class="category-tab-btn" data-category="university">🎓 University Student</button>
          <button type="button" class="category-tab-btn" data-category="volunteer">🤝 Volunteer</button>
          <button type="button" class="category-tab-btn" data-category="mentor">👑 Mentor</button>
          <button type="button" class="category-tab-btn" data-category="partner">🏢 Partner / Org</button>
        </div>

        <form id="registration-form" method="POST" action="submit_registration.php">
          <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($csrf_token); ?>">
          <input type="hidden" name="category" id="selected_category" value="school">

          <div class="form-grid">
            <!-- Full Name -->
            <div class="form-group">
              <label class="form-label" for="full_name">Full Name *</label>
              <input type="text" id="full_name" name="full_name" class="form-input" placeholder="e.g. Kavindi Perera" required>
              <span class="field-error" id="full_name_error"></span>
            </div>

            <!-- Email Address -->
            <div class="form-group">
              <label class="form-label" for="email">Email Address *</label>
              <input type="email" id="email" name="email" class="form-input" placeholder="e.g. kavindi@example.com" required>
              <span class="field-error" id="email_error"></span>
            </div>

            <!-- Phone Number -->
            <div class="form-group">
              <label class="form-label" for="phone">Phone / WhatsApp Number *</label>
              <input type="tel" id="phone" name="phone" class="form-input" placeholder="e.g. 0771234567" required>
              <span class="field-error" id="phone_error"></span>
            </div>

            <!-- Age Group -->
            <div class="form-group" id="age_group">
              <label class="form-label" for="age">Age</label>
              <input type="number" id="age" name="age" class="form-input" placeholder="e.g. 17" min="10" max="80">
              <span class="field-error" id="age_error"></span>
            </div>

            <!-- Dynamic Institution Field -->
            <div class="form-group full-width">
              <label class="form-label" id="institution_label" for="institution">School Name & Grade</label>
              <input type="text" id="institution" name="institution" class="form-input" placeholder="e.g. Anula Vidyalaya, Grade 11">
              <span class="field-error" id="institution_error"></span>
            </div>

            <!-- District Selection -->
            <div class="form-group">
              <label class="form-label" for="district">District</label>
              <select id="district" name="district" class="form-select">
                <option value="Colombo">Colombo</option>
                <option value="Gampaha">Gampaha</option>
                <option value="Kalutara">Kalutara</option>
                <option value="Kandy">Kandy</option>
                <option value="Galle">Galle</option>
                <option value="Kurunegala">Kurunegala</option>
                <option value="Other">Other District</option>
              </select>
            </div>

            <!-- Primary Area of Interest -->
            <div class="form-group" id="interests_group">
              <label class="form-label" for="interests">Primary Interest</label>
              <select id="interests" name="interests" class="form-select">
                <option value="App Development Competition">App Development Competition</option>
                <option value="Awareness Programs">Awareness Programs</option>
                <option value="Digital & Tech Skills">Digital & Tech Skills</option>
                <option value="Leadership & Confidence">Leadership & Confidence</option>
                <option value="Personal Safety & Cyber Law">Personal Safety & Cyber Law</option>
                <option value="All Areas">All Areas</option>
              </select>
            </div>

            <!-- Additional Message -->
            <div class="form-group full-width">
              <label class="form-label" for="message">Message / Team Members / Expectations (Optional)</label>
              <textarea id="message" name="message" class="form-textarea" rows="3" placeholder="If registering an App Competition team or asking a question, leave your message here..."></textarea>
            </div>
          </div>

          <div style="margin-top: 2rem; text-align: center;">
            <button type="submit" id="submit-btn" class="btn btn-gold" style="width: 100%; max-width: 380px; padding: 1rem 2rem;">
              Submit NEXT HER Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>

  <script src="js/script.js"></script>
  <script src="js/registration.js"></script>
</body>
</html>
