-- ============================================================
-- Women Empowerment Drive Database Setup Script
-- Organization: Leo Club of University of Sri Jayewardenepura
-- Host: XAMPP Localhost / MySQL
-- ============================================================

CREATE DATABASE IF NOT EXISTS `women_empowerment_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `women_empowerment_db`;

-- ------------------------------------------------------------
-- Table structure for `registrations`
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `registrations` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `full_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(30) NOT NULL,
  `age` INT NULL,
  `category` VARCHAR(50) NOT NULL COMMENT 'school, university, volunteer, mentor, partner',
  `institution` VARCHAR(200) NULL COMMENT 'School, University, or Organization name',
  `district` VARCHAR(100) NULL,
  `interests` TEXT NULL COMMENT 'Selected interest areas',
  `message` TEXT NULL,
  `status` VARCHAR(30) NOT NULL DEFAULT 'pending',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_email` (`email`),
  INDEX `idx_category` (`category`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Table structure for `admin_users`
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(100) NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Default Admin User
-- Username: admin
-- Password: admin123 (bcrypt hash below)
-- ------------------------------------------------------------
INSERT INTO `admin_users` (`username`, `password_hash`, `full_name`) 
VALUES ('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Leo Admin')
ON DUPLICATE KEY UPDATE `username` = `username`;

-- ------------------------------------------------------------
-- Sample Demonstration Registrations (Initial Placeholders)
-- ------------------------------------------------------------
INSERT INTO `registrations` (`full_name`, `email`, `phone`, `age`, `category`, `institution`, `district`, `interests`, `message`, `status`)
VALUES 
('Kavindi Perera', 'kavindi.p@example.com', '0771234567', 17, 'school', 'Anula Vidyalaya, Nugegoda', 'Colombo', 'Leadership, Career Awareness', 'Excited to join the school leadership workshop!', 'approved'),
('Nimasha Fernando', 'nimasha.f@example.com', '0719876543', 22, 'university', 'University of Sri Jayewardenepura', 'Colombo', 'Financial Literacy, Digital Skills', 'Looking forward to career networking opportunities.', 'pending'),
('Dr. Sanduni Jayawardena', 'sanduni.j@example.com', '0765551234', 32, 'mentor', 'Tech Empowerment SL', 'Gampaha', 'Mentorship, Personal Safety', 'Willing to conduct sessions on digital safety.', 'approved'),
('Ranidu Silva', 'ranidu.s@example.com', '0703334444', 21, 'volunteer', 'University of Sri Jayewardenepura', 'Kalutara', 'Community Outreach, Media', 'Enthusiastic volunteer for event coordination.', 'pending');
