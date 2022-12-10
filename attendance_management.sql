-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2022 at 07:45 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `attendance_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id` int(11) NOT NULL,
  `roll` varchar(255) NOT NULL,
  `year` int(5) NOT NULL,
  `semester` int(10) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`id`, `roll`, `year`, `semester`, `subject`, `date`, `status`) VALUES
(35, 'B200032CS', 2, 3, 'CS12010', '2022-10-09', 'present'),
(36, 'B200060CS', 2, 3, 'CS12010', '2022-10-09', 'absent'),
(37, 'B200061CS', 2, 3, 'CS12010', '2022-10-09', 'absent'),
(38, 'B200065CS', 2, 3, 'CS12010', '2022-10-09', 'leave'),
(47, 'B200032CS', 2, 3, 'CS12013', '2022-10-09', 'present'),
(48, 'B200060CS', 2, 3, 'CS12013', '2022-10-09', 'present'),
(49, 'B200061CS', 2, 3, 'CS12013', '2022-10-09', 'absent'),
(50, 'B200065CS', 2, 3, 'CS12013', '2022-10-09', 'absent'),
(51, 'B200032CS', 2, 3, 'CS12013', '2022-10-08', 'present'),
(52, 'B200060CS', 2, 3, 'CS12013', '2022-10-08', 'leave'),
(53, 'B200061CS', 2, 3, 'CS12013', '2022-10-08', 'absent'),
(54, 'B200065CS', 2, 3, 'CS12013', '2022-10-08', 'absent'),
(55, 'B200032CS', 2, 3, 'CS12010', '2022-10-10', 'present'),
(56, 'B200060CS', 2, 3, 'CS12010', '2022-10-10', 'present'),
(57, 'B200061CS', 2, 3, 'CS12010', '2022-10-10', 'present'),
(58, 'B200065CS', 2, 3, 'CS12010', '2022-10-10', 'absent'),
(59, 'B200032CS', 2, 3, 'CS12013', '2022-10-10', 'present'),
(60, 'B200060CS', 2, 3, 'CS12013', '2022-10-10', 'present'),
(61, 'B200061CS', 2, 3, 'CS12013', '2022-10-10', 'absent'),
(62, 'B200065CS', 2, 3, 'CS12013', '2022-10-10', 'absent'),
(67, 'B200054CS', 3, 5, 'CS15104', '2022-10-14', 'present'),
(68, 'B200056CS', 3, 5, 'CS15104', '2022-10-14', 'present'),
(69, 'B200060CS', 3, 5, 'CS15104', '2022-10-14', 'absent'),
(70, 'B200054CS', 3, 5, 'CS15103', '2022-10-14', 'present'),
(71, 'B200056CS', 3, 5, 'CS15103', '2022-10-14', 'absent'),
(72, 'B200060CS', 3, 5, 'CS15103', '2022-10-14', 'present'),
(73, 'B200054CS', 3, 5, 'CS15104', '2022-11-04', 'present'),
(74, 'B200056CS', 3, 5, 'CS15104', '2022-11-04', 'present'),
(75, 'B200060CS', 3, 5, 'CS15104', '2022-11-04', 'present'),
(76, 'B200054CS', 3, 5, 'CS15104', '2022-11-05', 'present'),
(77, 'B200056CS', 3, 5, 'CS15104', '2022-11-05', 'present'),
(78, 'B200060CS', 3, 5, 'CS15104', '2022-11-05', 'absent'),
(79, 'B200070CS', 3, 5, 'CS15104', '2022-11-05', 'absent'),
(80, 'B200054CS', 3, 5, 'CS15104', '2022-12-08', 'present'),
(81, 'B200056CS', 3, 5, 'CS15104', '2022-12-08', 'absent'),
(82, 'B200060CS', 3, 5, 'CS15104', '2022-12-08', 'absent'),
(83, 'B200070CS', 3, 5, 'CS15104', '2022-12-08', 'present'),
(84, 'B200054CS', 3, 5, 'CS15104', '2022-12-09', 'absent'),
(85, 'B200056CS', 3, 5, 'CS15104', '2022-12-09', 'present'),
(86, 'B200060CS', 3, 5, 'CS15104', '2022-12-09', 'present'),
(87, 'B200070CS', 3, 5, 'CS15104', '2022-12-09', 'present'),
(88, 'B200054CS', 3, 5, 'CS15103', '2022-12-09', 'present'),
(89, 'B200056CS', 3, 5, 'CS15103', '2022-12-09', 'present'),
(90, 'B200060CS', 3, 5, 'CS15103', '2022-12-09', 'present'),
(91, 'B200070CS', 3, 5, 'CS15103', '2022-12-09', 'absent'),
(92, 'B200054CS', 3, 5, 'CS15101', '2022-12-09', 'present'),
(93, 'B200056CS', 3, 5, 'CS15101', '2022-12-09', 'present'),
(94, 'B200060CS', 3, 5, 'CS15101', '2022-12-09', 'present'),
(95, 'B200070CS', 3, 5, 'CS15101', '2022-12-09', 'absent'),
(96, 'B200054CS', 3, 5, 'CS15101', '2022-12-09', 'absent'),
(97, 'B200056CS', 3, 5, 'CS15101', '2022-12-09', 'absent'),
(98, 'B200060CS', 3, 5, 'CS15101', '2022-12-09', 'absent'),
(99, 'B200070CS', 3, 5, 'CS15101', '2022-12-09', 'absent'),
(100, 'B200035CS', 3, 5, 'CS15101', '2022-12-10', 'present'),
(101, 'B200054CS', 3, 5, 'CS15101', '2022-12-10', 'present'),
(102, 'B200056CS', 3, 5, 'CS15101', '2022-12-10', 'absent'),
(103, 'B200060CS', 3, 5, 'CS15101', '2022-12-10', 'present'),
(104, 'B200070CS', 3, 5, 'CS15101', '2022-12-10', 'present');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `roll` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `course` varchar(255) NOT NULL,
  `year` int(11) NOT NULL,
  `branch` enum('CSE','ECE','EEE','ME','CE','HSS','CHEM','PHY') NOT NULL,
  `semester` enum('1','2','3','4','5','6','7','8') NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `roll`, `name`, `email`, `contact`, `course`, `year`, `branch`, `semester`, `password`) VALUES
(18, 'B200061CS', 'Manish Kumar  ', 'manish132@gmail.com', '08873514280', 'btech', 2, 'CSE', '3', '$2a$10$BvlxRYNZdqFcAC25LbL0UuTE0WHZh9DYUBiaIXrmOkJUO8u6hBBVq'),
(19, 'B200065CS', 'Manish Kumar  ', 'manish132@gmail.com', '08873514280', 'btech', 2, 'CSE', '3', '$2a$10$BvlxRYNZdqFcAC25LbL0UuTE0WHZh9DYUBiaIXrmOkJUO8u6hBBVq'),
(20, 'B200032CS', 'Manish Kumar  ', 'manish132@gmail.com', '08873514280', 'btech', 2, 'CSE', '3', '$2a$10$BvlxRYNZdqFcAC25LbL0UuTE0WHZh9DYUBiaIXrmOkJUO8u6hBBVq'),
(22, 'B200056CS', 'Ashish Kumar', 'ashish@gmail.com', '12123123123', 'btech', 3, 'CSE', '5', '$2a$10$zxspfbDHlu3/meX3w/R9Kui1DIyEh8XS4nhYhDeGeI36iC3rCKvdq'),
(23, 'B200054CS', 'Aman Saurav', 'aman@gmail.com', '56d4f65d4f6', 'btech', 3, 'CSE', '5', '$2a$10$a05qh6GIzZ6cnaiFGry06uS1PQHIFu767aRxglB/CfzUgVjHaN8BO'),
(24, 'B200060CS', 'Manish Kumar pandit', 'manish@gmail.com', '6544d6', 'btech', 3, 'CSE', '5', '$2a$10$yeZ54yKNOtstSov1pjTdeeBf55owPIJh2DeqQfprohxKSn0xkJgJS'),
(25, 'B200070CS', 'Riyan Gonsalves', 'riyan@gmail.com', '65413213204302', 'btech', 3, 'CSE', '5', '$2a$10$UGLZMzy.UdUEwqlRsS/quOCo4f2O9gcKhFQ13Gc2TpukmMA0wU6f2'),
(26, 'B200035CS', 'Harsh Tyagi', 'harsh@gmail.com', '5646548451432', 'btech', 3, 'CSE', '5', '$2a$10$E/SSUMtvSGjCfD3icJWm6.dkaU3t60IhePTRN/h3XavCztn3/VB6u'),
(27, 'B200041CS', 'Avinash Singh', 'avinash@gmail.com', '865243565530', 'btech', 3, 'CSE', '5', '$2a$10$fHG74y4mXeW5yOZfqp5xheJkQJGfDFZ7OoPi7Z9QBMKartWKt/sWm');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `course` enum('btech','mtech') NOT NULL,
  `branch` enum('CSE','ECE','EEE','ME','CE','HSS','CHEM','PHY') NOT NULL,
  `semester` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `teacher_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `code`, `name`, `course`, `branch`, `semester`, `year`, `teacher_id`) VALUES
(5, 'CS15104', 'Advanced Algorithms', 'btech', 'CSE', 5, 3, '11'),
(6, 'CS15103', 'Database Management System ', 'btech', 'CSE', 5, 3, '12'),
(7, 'CS15104', 'Theory Of Computation', 'btech', 'CSE', 5, 3, '13'),
(8, 'CS15101', 'Artificial Intelligence', 'btech', 'CSE', 5, 3, '13');

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE `teacher` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `branch` enum('CSE','ECE','EEE','ME','CE','HSS','CHEM','PHY') NOT NULL,
  `contact` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teacher`
--

INSERT INTO `teacher` (`id`, `name`, `email`, `branch`, `contact`, `password`) VALUES
(11, 'Dr. Pratay Kuila', 'kuila@gmail.com', 'CSE', '1231223423423', '$2a$10$mS30rNj7XxeVar98OLn.geobe9m/n3Xj9Bd7uuQe65O/s15P0Eg0q'),
(12, 'Sangram Ray', 'sangram@gmail.com', 'CSE', '48568465153', '$2a$10$GFc5AFFRSjOvdiok4wdPEu2GcXV9zT/sooyhCMqK5/tfY1kCbbYra'),
(13, 'Krishna Kumar', 'krishna@gmail.com', 'CSE', '4321231', '$2a$10$mAFQAdrlZXyyUR7L8YqB0OBA2wS7sfhPGZuGby6aYrA9m6aRY7muS'),
(14, 'Bala g', 'balag@gmail.com', 'CSE', '51321321032', '$2a$10$3RRpf98AMNBpi4gofd3JAezVxIzRg0C3yyLifcKkq9yTMidh4CqF2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `teacher`
--
ALTER TABLE `teacher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
