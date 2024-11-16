-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 16, 2024 at 06:37 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nexus`
--

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `group_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`id`, `user_id`, `group_id`, `title`, `content`, `date`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 'Lorem ipsum dolor sit amet.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.\r\n', '2025-02-16 16:00:00', '2024-11-16 09:30:08', '2024-11-16 09:30:08'),
(2, 1, 3, 'Lorem ipsum dolor sit amet.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.', '2024-11-19 16:00:00', '2024-11-16 09:31:47', '2024-11-16 09:31:47'),
(3, 1, 3, 'Lorem ipsum dolor sit amet.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nulla facilisi. Sed finibus, augue in tincidunt cursus, lorem sapien tristique justo, nec convallis mi lectus at purus.', '2024-12-24 16:00:00', '2024-11-16 09:34:02', '2024-11-16 09:34:02');

-- --------------------------------------------------------

--
-- Table structure for table `announcement_attachments`
--

CREATE TABLE `announcement_attachments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `announcement_id` bigint(20) UNSIGNED NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_size` int(11) NOT NULL,
  `mime_type` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `announcement_attachments`
--

INSERT INTO `announcement_attachments` (`id`, `announcement_id`, `file_path`, `file_name`, `file_size`, `mime_type`, `created_at`, `updated_at`) VALUES
(1, 1, 'attachments/25Tuf0QfJYxmX8dCE6Ce8Dtm5VAWhvPyFRDgYJSM.jpg', 'sportbanner.jpg', 44035, 'image/jpeg', NULL, NULL),
(2, 2, 'attachments/u4gbXcqXAEItnphPVRJNUK0IdZhBUOYj6kNR7cQH.jpg', 'art8.jpg', 47762, 'image/jpeg', NULL, NULL),
(3, 3, 'attachments/Zbxo0oxrRPRBfrVhxhVvVwiWaRNuD1SF3wwYdLdB.jpg', 'artbanner.jpg', 38497, 'image/jpeg', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `conversations`
--

CREATE TABLE `conversations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id1` bigint(20) UNSIGNED NOT NULL,
  `user_id2` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `last_message_id` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `owner_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `last_message_id` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`, `description`, `owner_id`, `created_at`, `updated_at`, `last_message_id`) VALUES
(1, 'Math Club', 'For math enthusiasts to solve challenging problems, share techniques, and enjoy logical puzzles.', 1, '2024-11-16 08:56:59', '2024-11-16 09:07:42', 6),
(2, 'Sports Club', 'A community for sports lovers to participate in events, discuss games, and stay active together.', 1, '2024-11-16 08:57:17', '2024-11-16 09:10:01', 11),
(3, 'Art Club', 'A space for creative minds to explore and share their passion for the visual arts.', 1, '2024-11-16 08:57:37', '2024-11-16 09:04:33', 4);

-- --------------------------------------------------------

--
-- Table structure for table `group_users`
--

CREATE TABLE `group_users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `group_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `group_users`
--

INSERT INTO `group_users` (`id`, `group_id`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, NULL, NULL),
(2, 1, 7, NULL, NULL),
(3, 1, 4, NULL, NULL),
(4, 1, 2, NULL, NULL),
(5, 1, 5, NULL, NULL),
(6, 1, 3, NULL, NULL),
(7, 1, 6, NULL, NULL),
(8, 2, 1, NULL, NULL),
(9, 2, 7, NULL, NULL),
(10, 2, 4, NULL, NULL),
(11, 2, 2, NULL, NULL),
(12, 3, 1, NULL, NULL),
(13, 3, 7, NULL, NULL),
(14, 3, 4, NULL, NULL),
(15, 3, 2, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `message` longtext DEFAULT NULL,
  `sender_id` bigint(20) UNSIGNED NOT NULL,
  `receiver_id` bigint(20) UNSIGNED DEFAULT NULL,
  `group_id` bigint(20) UNSIGNED DEFAULT NULL,
  `conversation_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `message`, `sender_id`, `receiver_id`, `group_id`, `conversation_id`, `created_at`, `updated_at`) VALUES
(1, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae aspernatur fugit nam soluta illo mollitia tempora nulla dolor a modi accusantium minus maxime minima, amet numquam sint eius placeat? Accusamus?', 7, NULL, 3, NULL, '2024-11-16 08:58:58', '2024-11-16 08:58:58'),
(2, NULL, 7, NULL, 3, NULL, '2024-11-16 09:01:45', '2024-11-16 09:01:45'),
(3, 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', 7, NULL, 3, NULL, '2024-11-16 09:02:57', '2024-11-16 09:02:57'),
(4, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae aspernatur fugit nam soluta illo mollitia tempora nulla dolor a modi accusantium minus maxime minima,', 1, NULL, 3, NULL, '2024-11-16 09:04:33', '2024-11-16 09:04:33'),
(5, NULL, 1, NULL, 1, NULL, '2024-11-16 09:05:11', '2024-11-16 09:05:11'),
(6, 'Lorem ipsum dolor sit amet.', 7, NULL, 1, NULL, '2024-11-16 09:07:42', '2024-11-16 09:07:42'),
(7, NULL, 7, NULL, 2, NULL, '2024-11-16 09:08:48', '2024-11-16 09:08:48'),
(8, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.', 1, NULL, 2, NULL, '2024-11-16 09:09:07', '2024-11-16 09:09:07'),
(9, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nulla facilisi. Sed finibus, augue in tincidunt cursus, lorem sapien tristique justo, nec convallis mi lectus at purus.', 7, NULL, 2, NULL, '2024-11-16 09:09:25', '2024-11-16 09:09:25'),
(10, NULL, 1, NULL, 2, NULL, '2024-11-16 09:09:41', '2024-11-16 09:09:41'),
(11, NULL, 7, NULL, 2, NULL, '2024-11-16 09:10:01', '2024-11-16 09:10:01');

-- --------------------------------------------------------

--
-- Table structure for table `message_attachments`
--

CREATE TABLE `message_attachments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `message_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `path` varchar(1024) NOT NULL,
  `mime` varchar(255) NOT NULL,
  `size` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `message_attachments`
--

INSERT INTO `message_attachments` (`id`, `message_id`, `name`, `path`, `mime`, `size`, `created_at`, `updated_at`) VALUES
(1, 2, 'art3.jpg', 'attachments/K6En5EXBhndvszcLYMbaGxLQg02wTYvK/azFPbUL19gLOEGhbqZxTrVl9ERB7fdeQYrwBOmnL.jpg', 'image/jpeg', 36269, '2024-11-16 09:01:45', '2024-11-16 09:01:45'),
(2, 2, 'art2.jpg', 'attachments/uchRaR3yWVC7B9FHB2ykjKOZWfsIMdtO/X9wH75SPSFnXQ3vN79ecwsWx5xviEBomV3BcaUzH.jpg', 'image/jpeg', 39131, '2024-11-16 09:01:45', '2024-11-16 09:01:45'),
(3, 3, 'art7.jpg', 'attachments/j86FjCsWpJxFSDU7uGN6amy9vXxcCXfO/kHYnGhGlML3wQjOJrnKYICOXWxIoZLz2fAoIvMIS.jpg', 'image/jpeg', 86712, '2024-11-16 09:02:57', '2024-11-16 09:02:57'),
(4, 3, 'art4.jpg', 'attachments/B3sN3byOZfidUAJoLkqTeCrVpt0XnDsX/2ePgrCzlWL0yvatDyJB4dp6ExMkUchZ3L32Ol0Ps.jpg', 'image/jpeg', 70350, '2024-11-16 09:02:57', '2024-11-16 09:02:57'),
(5, 5, 'math5.jpg', 'attachments/JrnQ9yyCgZsoAKYJrG3oONHwIXDc5rJo/ZivGhOx04HmxPoXo3kyo1u6r87UzOwCXX8fOXMDn.jpg', 'image/jpeg', 110636, '2024-11-16 09:05:11', '2024-11-16 09:05:11'),
(6, 5, 'math4.jpg', 'attachments/nqw4ibq9zKFyueKE7RhVPkg2PcYc79rR/SOn0sX5XfC2beBSTSXFG27ijvoK8zQS4fwXN7JPA.jpg', 'image/jpeg', 53834, '2024-11-16 09:05:11', '2024-11-16 09:05:11'),
(7, 5, 'math3.jpg', 'attachments/QSfTXnJzqROuXDlyzWMSfd8fcqGUm2Ys/grV2rQM3yE49bYbpOBflDLfW5UaiCCrLnFh3FCAK.jpg', 'image/jpeg', 78562, '2024-11-16 09:05:11', '2024-11-16 09:05:11'),
(8, 5, 'math2.jpg', 'attachments/o6pRFkkVrLgoeAbSO0k98E3QKoGXzhX4/50fnwo0TaZ4oXi4EoTFqY8z9sND8W4TvWw4CalJ5.jpg', 'image/jpeg', 54963, '2024-11-16 09:05:12', '2024-11-16 09:05:12'),
(9, 5, 'math1.jpg', 'attachments/jIldVVCr3q5PMCkRhUCjtUkNDsH1HcxD/HnjA2LClDnxVgRZQ9v4Jd2lAU3uCBS4l8lZzwDZ4.jpg', 'image/jpeg', 79120, '2024-11-16 09:05:12', '2024-11-16 09:05:12'),
(10, 7, 'sport3.jpg', 'attachments/pI3ZelKG4aShTs1fF6aYp5EsY9w3nqEB/L2rESNtrLPtTriTegaJZMfzPxiEePBsnNSlmSq15.jpg', 'image/jpeg', 50478, '2024-11-16 09:08:48', '2024-11-16 09:08:48'),
(11, 7, 'sport2.jpg', 'attachments/jKB3V1fPH3MU3ZoTxxw0yo0wgYXhyZPf/OUfpJv7DZsV9anEwXvgko4I4tb7SEcnyLnIxFktb.jpg', 'image/jpeg', 49331, '2024-11-16 09:08:48', '2024-11-16 09:08:48'),
(12, 10, 'sportsbanner.jpg', 'attachments/QY0l3cUln0MoAvnzGmauBZW1F2PgWLcA/3YiJuoo8yMEi3LW07j6i2c6Oe5gRYIaFjWP6qr6W.jpg', 'image/jpeg', 37653, '2024-11-16 09:09:41', '2024-11-16 09:09:41'),
(13, 11, 'sport5.jpg', 'attachments/45cMG5neIhN1OnGwVmWs2ZEjgtP0hpyW/UP9MOnivLXsyfVMqEjsKSHq2WMTQyUWwibVVrkFz.jpg', 'image/jpeg', 47471, '2024-11-16 09:10:01', '2024-11-16 09:10:01'),
(14, 11, 'sport4.jpg', 'attachments/tbS3WTFqEHcFZrF44dFr1r8GaxE2TYDy/oUwVoRD4HwdQqcmZ2ANGwmsYlDvLSHjfZf57wAiN.jpg', 'image/jpeg', 51634, '2024-11-16 09:10:01', '2024-11-16 09:10:01');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_04_30_153845_create_groups_table', 1),
(5, '2024_04_30_153929_create_conversations_table', 1),
(6, '2024_04_30_153951_create_messages_table', 1),
(7, '2024_05_10_071242_create_message_attachments_table', 1),
(8, '2024_10_31_055858_create_posts_table', 1),
(9, '2024_10_31_060121_create_post_attachments_table', 1),
(10, '2024_10_31_063120_create_personal_access_tokens_table', 1),
(11, '2024_11_14_180044_create_announcements_table', 1),
(12, '2024_11_14_181139_create_announcement_attachments_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `content` text DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `group_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `content`, `user_id`, `group_id`, `created_at`, `updated_at`) VALUES
(1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nulla facilisi. Sed finibus, augue in tincidunt cursus, lorem sapien tristique justo, nec convallis mi lectus at purus.', 7, 2, '2024-11-16 09:10:58', '2024-11-16 09:10:58'),
(2, 'Lorem ipsum dolor sit amet.', 7, 2, '2024-11-16 09:11:55', '2024-11-16 09:11:55'),
(3, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.', 7, 2, '2024-11-16 09:12:23', '2024-11-16 09:12:23'),
(4, NULL, 7, 2, '2024-11-16 09:12:46', '2024-11-16 09:12:46'),
(5, 'Lorem ipsum dolor sit amet.', 7, 2, '2024-11-16 09:19:43', '2024-11-16 09:19:43'),
(6, 'Lorem ipsum dolor sit amet.', 7, 1, '2024-11-16 09:23:23', '2024-11-16 09:23:23'),
(7, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.', 7, 1, '2024-11-16 09:24:07', '2024-11-16 09:24:07'),
(8, 'Lorem ipsum dolor sit amet.', 1, 1, '2024-11-16 09:25:07', '2024-11-16 09:25:07'),
(9, NULL, 1, 3, '2024-11-16 09:26:03', '2024-11-16 09:26:03'),
(10, NULL, 7, 3, '2024-11-16 09:27:10', '2024-11-16 09:27:10'),
(11, NULL, 7, 3, '2024-11-16 09:27:30', '2024-11-16 09:27:30'),
(12, NULL, 1, 3, '2024-11-16 09:27:45', '2024-11-16 09:27:45'),
(13, NULL, 1, 3, '2024-11-16 09:27:53', '2024-11-16 09:27:53');

-- --------------------------------------------------------

--
-- Table structure for table `post_attachments`
--

CREATE TABLE `post_attachments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `post_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `path` varchar(1024) NOT NULL,
  `mime` varchar(255) NOT NULL,
  `size` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `post_attachments`
--

INSERT INTO `post_attachments` (`id`, `post_id`, `name`, `path`, `mime`, `size`, `created_at`, `updated_at`) VALUES
(1, 2, 'art1.jpg', 'attachments/ikvcUVT7ZWvLCINFmmaQXg9nbrH0PPIO/rB4ywiOLclXVkh9NCQCUb0OZEowkkn9U6oIGsX7U.jpg', 'image/jpeg', 150473, '2024-11-16 09:11:55', '2024-11-16 09:11:55'),
(2, 4, 'sport3.jpg', 'attachments/hN0RyievU8pGGk25NzBHodqsN8RhG3oU/yPiFlJSuATWQA6icbZy8RWZU2pHphoU8oaVTvErO.jpg', 'image/jpeg', 50478, '2024-11-16 09:12:46', '2024-11-16 09:12:46'),
(3, 4, 'sport2.jpg', 'attachments/UKeIE2wbDCWoqkDHSx2V3r6TDGTxxCdQ/NGtybM196O7baJFFNqftcHjIbGYITVvaNtTnaVqN.jpg', 'image/jpeg', 49331, '2024-11-16 09:12:46', '2024-11-16 09:12:46'),
(4, 4, 'sport1.jpg', 'attachments/QAuJg9ytTVBe0cphWmalGgFA3u02ICdq/jBeIHTu05gOEq5qctvTnrProWaNm46YwYZeakWhr.jpg', 'image/jpeg', 53709, '2024-11-16 09:12:46', '2024-11-16 09:12:46'),
(5, 5, 'sportsbanner.jpg', 'attachments/eDdokCd60vmsPQqLQzrv7aIBdlDG9I9e/6wqkJA7E6kqrXunl36NliphKTPfYxLA5HkQRsBSv.jpg', 'image/jpeg', 37653, '2024-11-16 09:19:43', '2024-11-16 09:19:43'),
(6, 7, 'math1.jpg', 'attachments/dTSBcYTLGaKe5xvtJs6eJcTWVNR0W806/qfZYNZUVKiT6Efjhw8RAvcavhlJuQC8agDg8KvWB.jpg', 'image/jpeg', 79120, '2024-11-16 09:24:07', '2024-11-16 09:24:07'),
(7, 8, 'math5.jpg', 'attachments/8CN7Dh7cl8POgiAFkQGBmUZqO7SKt7x8/CSkBnodYOwIR4RT079SOdvhNbpJM3kNgArIByCJ0.jpg', 'image/jpeg', 110636, '2024-11-16 09:25:07', '2024-11-16 09:25:07'),
(8, 8, 'math4.jpg', 'attachments/va0TXk5dtGCLo2bT79TdBCVqyeu8Gjph/jJc2MKtf4yGa8SEBuJyK5MFA8Y4GmOf0nJJWuRvr.jpg', 'image/jpeg', 53834, '2024-11-16 09:25:07', '2024-11-16 09:25:07'),
(9, 8, 'math3.jpg', 'attachments/W10eoRRrePWLvWH2HWAmRCNEybRAFMwZ/dZEeWLW4XzLmVajZVJSOB56V0acw648no3qblGys.jpg', 'image/jpeg', 78562, '2024-11-16 09:25:07', '2024-11-16 09:25:07'),
(10, 8, 'math2.jpg', 'attachments/5RBwUYT7C1MDF6MIEMLRNQBvLarswliI/U7AqyRI1xci1kKFEW50wvlAqnkqdiGtWtQj42oxX.jpg', 'image/jpeg', 54963, '2024-11-16 09:25:07', '2024-11-16 09:25:07'),
(11, 9, 'art6.jpg', 'attachments/NcPia7fCcCZtkfypjHRiVOAy6lGmRYiq/z4YUTJHswgUL8GqzzoCDsV8Oy182an3u9sR0ntdu.jpg', 'image/jpeg', 150578, '2024-11-16 09:26:03', '2024-11-16 09:26:03'),
(12, 10, 'artbanner.jpg', 'attachments/7OVKQCnOr7FEz2Wa5empnYZ3nmuiuNR7/D3H3AhMZnHQEEiJZiCRko7BHxiukPIVD7CfzJd1g.jpg', 'image/jpeg', 38497, '2024-11-16 09:27:10', '2024-11-16 09:27:10'),
(13, 11, 'art3.jpg', 'attachments/LEM7f0Gp9fHEAiNNA4GfQgxDyf6WOqbt/vXMWGpLWV1wbcQgmBo1EWsgwdLkvnsvV03tLWkCC.jpg', 'image/jpeg', 36269, '2024-11-16 09:27:30', '2024-11-16 09:27:30'),
(14, 11, 'art2.jpg', 'attachments/OcVAyMb4E86S29XIjoyiUhqAE5Ho7Lx5/6w8IZah7eSM0LCX086HGJDXP6ivm852Hj4mnoQKo.jpg', 'image/jpeg', 39131, '2024-11-16 09:27:30', '2024-11-16 09:27:30'),
(15, 12, 'art7.jpg', 'attachments/i9Msqbw05ePu3yrs6lempIoaH60zun1a/N9wvYgRVI3lGcvPfmMECChSbRT6nlUzqgZ5YimDi.jpg', 'image/jpeg', 86712, '2024-11-16 09:27:45', '2024-11-16 09:27:45'),
(16, 13, 'art5.jpg', 'attachments/cJKoQR2nSn8YSwLs5V5o9RypKtHXiBti/CQRIBbcZa6ld2CqDH7E5EO7YG1oeNsOalkB0HsQ4.jpg', 'image/jpeg', 79220, '2024-11-16 09:27:53', '2024-11-16 09:27:53');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('5LwjBe0bp7n4qcSTDVYXNrYADVbuZvNaJ0Mtue7y', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiWk1KR0RLUTFyakNKQWlxazdJWU1qdjF3M2pDeGtEcHpRcjVFdWZXUCI7czozOiJ1cmwiO2E6MDp7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjE7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzQ6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hbm5vdW5jZW1lbnQiO319', 1731778600),
('ctTI7EtMY3WV0m9iAdrOisrnEHZ5x73pIxyJgmJQ', 7, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiVkxDbDdTZ21OMngwcjBBeElXVnZvVm93dGZHQllLbzZ4TktRdk1pZiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czozOiJ1cmwiO2E6MDp7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjMzOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvZmVlZC9jbHViLzMiO31zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aTo3O30=', 1731778114);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `blocked_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `avatar`, `email_verified_at`, `password`, `remember_token`, `is_admin`, `blocked_at`, `created_at`, `updated_at`) VALUES
(1, 'Jilian Garette A. Abangan', 'jiliangarette@gmail.com', 'avatars/jilian.jpg', '2024-11-16 08:54:52', '$2y$12$8.u4suQynZTc9lTQbDSs/Op6/pBgRTc1Ulphh.mghbuRWYGvzMCru', 'yRcekG88kq', 1, NULL, '2024-11-16 08:54:54', '2024-11-16 08:54:54'),
(2, 'John Doe', 'john@gmail.com', 'avatars/avatar1.png', '2024-11-16 08:54:55', '$2y$12$78nsM5RLSeXfESNmufKfTOW7NiG7L8xMJobr/URJLdkw3adAQwkae', 'cliBTcCZTR', 0, NULL, '2024-11-16 08:54:55', '2024-11-16 08:54:55'),
(3, 'Robert C. Martin', 'cleancode@gmail.com', 'avatars/avatar2.png', '2024-11-16 08:54:55', '$2y$12$45JF0lrLk1BoMxLMETIkzuD8.aaN0VL4ONcK8OGURioKiEc1wfNQu', 'fAk20pfPJQ', 1, '2024-11-16 09:00:44', '2024-11-16 08:54:55', '2024-11-16 09:00:44'),
(4, 'Jane Smith', 'jane@gmail.com', 'avatars/avatar3.png', '2024-11-16 08:54:56', '$2y$12$aBxEXXYTlft02LMmGPapBewpxQuOGrvoZSLrXakIyIs2jhZ7hlCM2', 'xPjVcTgcOV', 0, NULL, '2024-11-16 08:54:56', '2024-11-16 08:54:56'),
(5, 'Michael Lee', 'michael@gmail.com', 'avatars/avatar4.png', '2024-11-16 08:54:57', '$2y$12$vp.a.m74Dh.6KeAY3hXjNeJwugLi0JK80qI5CtOyy5bFBr1UoJpqe', 'P5eaAKcZZK', 1, NULL, '2024-11-16 08:54:57', '2024-11-16 08:54:57'),
(6, 'Sarah Brown', 'sarah@gmail.com', 'avatars/avatar5.png', '2024-11-16 08:54:57', '$2y$12$8xUY5aDopYpDUhZehiGqYuIpAEtUJ9/OwWhAADMSiHO4c4GDQHeIi', 'gqYciRNiPx', 0, NULL, '2024-11-16 08:54:57', '2024-11-16 08:54:57'),
(7, 'Chris Wilson', 'chris@gmail.com', 'avatars/avatar6.png', '2024-11-16 08:54:58', '$2y$12$AuSJw2siQaUA4JDw32/Bx.pkvQHR9iDVEDHepqQSSp47j2aeT2ZB6', 'uEMlnYOf7e', 0, NULL, '2024-11-16 08:54:58', '2024-11-16 08:54:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `announcements_user_id_foreign` (`user_id`),
  ADD KEY `announcements_group_id_foreign` (`group_id`);

--
-- Indexes for table `announcement_attachments`
--
ALTER TABLE `announcement_attachments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `announcement_attachments_announcement_id_foreign` (`announcement_id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `conversations`
--
ALTER TABLE `conversations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `conversations_user_id1_foreign` (`user_id1`),
  ADD KEY `conversations_user_id2_foreign` (`user_id2`),
  ADD KEY `conversations_last_message_id_foreign` (`last_message_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `groups_owner_id_foreign` (`owner_id`),
  ADD KEY `groups_last_message_id_foreign` (`last_message_id`);

--
-- Indexes for table `group_users`
--
ALTER TABLE `group_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `group_users_group_id_foreign` (`group_id`),
  ADD KEY `group_users_user_id_foreign` (`user_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `messages_sender_id_foreign` (`sender_id`),
  ADD KEY `messages_receiver_id_foreign` (`receiver_id`),
  ADD KEY `messages_group_id_foreign` (`group_id`),
  ADD KEY `messages_conversation_id_foreign` (`conversation_id`);

--
-- Indexes for table `message_attachments`
--
ALTER TABLE `message_attachments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `message_attachments_message_id_foreign` (`message_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `posts_user_id_foreign` (`user_id`),
  ADD KEY `posts_group_id_foreign` (`group_id`);

--
-- Indexes for table `post_attachments`
--
ALTER TABLE `post_attachments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_attachments_post_id_foreign` (`post_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `announcement_attachments`
--
ALTER TABLE `announcement_attachments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `conversations`
--
ALTER TABLE `conversations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `group_users`
--
ALTER TABLE `group_users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `message_attachments`
--
ALTER TABLE `message_attachments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `post_attachments`
--
ALTER TABLE `post_attachments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `announcements`
--
ALTER TABLE `announcements`
  ADD CONSTRAINT `announcements_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `announcements_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `announcement_attachments`
--
ALTER TABLE `announcement_attachments`
  ADD CONSTRAINT `announcement_attachments_announcement_id_foreign` FOREIGN KEY (`announcement_id`) REFERENCES `announcements` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `conversations`
--
ALTER TABLE `conversations`
  ADD CONSTRAINT `conversations_last_message_id_foreign` FOREIGN KEY (`last_message_id`) REFERENCES `messages` (`id`),
  ADD CONSTRAINT `conversations_user_id1_foreign` FOREIGN KEY (`user_id1`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `conversations_user_id2_foreign` FOREIGN KEY (`user_id2`) REFERENCES `users` (`id`);

--
-- Constraints for table `groups`
--
ALTER TABLE `groups`
  ADD CONSTRAINT `groups_last_message_id_foreign` FOREIGN KEY (`last_message_id`) REFERENCES `messages` (`id`),
  ADD CONSTRAINT `groups_owner_id_foreign` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `group_users`
--
ALTER TABLE `group_users`
  ADD CONSTRAINT `group_users_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `group_users_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_conversation_id_foreign` FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`id`),
  ADD CONSTRAINT `messages_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`),
  ADD CONSTRAINT `messages_receiver_id_foreign` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `messages_sender_id_foreign` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `message_attachments`
--
ALTER TABLE `message_attachments`
  ADD CONSTRAINT `message_attachments_message_id_foreign` FOREIGN KEY (`message_id`) REFERENCES `messages` (`id`);

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `posts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `post_attachments`
--
ALTER TABLE `post_attachments`
  ADD CONSTRAINT `post_attachments_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
