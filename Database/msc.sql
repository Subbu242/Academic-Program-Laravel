-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3308
-- Generation Time: May 16, 2025 at 12:16 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `msc`
--

-- --------------------------------------------------------

--
-- Table structure for table `assessments`
--

CREATE TABLE `assessments` (
  `Cid` int(11) NOT NULL,
  `instructorID` int(11) NOT NULL,
  `description` mediumtext NOT NULL,
  `totalPoints` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assessments`
--

INSERT INTO `assessments` (`Cid`, `instructorID`, `description`, `totalPoints`) VALUES
(1, 4, 'This is Assessment 1', 100),
(5, 5, 'This is Assessment 2', 50),
(4, 5, 'This is Assessment 1', 200);

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `Cid` int(20) NOT NULL,
  `courseCode` varchar(50) NOT NULL,
  `courseName` varchar(50) NOT NULL,
  `courseContent` mediumtext NOT NULL,
  `programObjective` longtext NOT NULL,
  `instructorID` int(20) NOT NULL,
  `ProgramID` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`Cid`, `courseCode`, `courseName`, `courseContent`, `programObjective`, `instructorID`, `ProgramID`) VALUES
(1, 'CS101', 'Data Structures and Algorithms', 'Time and Space complexity of algorithms,Arrays,Linked Lists,Trees,Heaps,Graphs,Stacks & Queues,Hash Table,Tries,Recursion,Dynamic Programming', 'Demonstrate a breadth and depth of knowledge in the discipline of computer science.', 4, 1),
(2, 'CS102', 'Computer Organization', 'C programming language,Data representation,Machine-level code and elements of code compilation,Computer arithmetic,Performance evaluation and optimization,Memory organization and management', 'Demonstrate comprehension of modern software engineering principles.', 4, 1),
(3, 'CS103', 'Operating Systems', 'Process Management,IO Management,Memory Management,Security,File System Management', 'Demonstrate a breadth and depth of knowledge in the discipline of computer science.', 4, 1),
(4, 'CS104', 'Artificial Intelligence', 'Introduction to Artificial Intelligence,Perception and Intelligence,Algorithms in AI,Neural Networks,Reinforcement Learning,Bayesian Networks', 'Demonstrate proficiency in problem-solving techniques using the computer.', 5, 1),
(5, 'CS105', 'Machine Learning', 'linear discriminants, neural networks, decision trees, support vector machines, supervised learning, and unsupervised learning', 'Demonstrate proficiency in at least two high-level programming languages and two operating systems.', 5, 1),
(23, 'cs234', 'adv se', 'Computer Architecture, Computer programming, Software Development, Open source software, Programming principles, Software design', 'Employ critical thinking skills when evaluating issues in criminology and criminal justice.', 4, 0);

-- --------------------------------------------------------

--
-- Table structure for table `exams`
--

CREATE TABLE `exams` (
  `Cid` int(20) NOT NULL,
  `instructorID` int(20) NOT NULL,
  `question1` mediumtext NOT NULL,
  `question2` mediumtext NOT NULL,
  `question3` mediumtext NOT NULL,
  `question4` mediumtext NOT NULL,
  `choices1` mediumtext NOT NULL,
  `choices2` mediumtext NOT NULL,
  `choices3` mediumtext NOT NULL,
  `choices4` mediumtext NOT NULL,
  `answer1` mediumtext NOT NULL,
  `answer2` mediumtext NOT NULL,
  `answer3` mediumtext NOT NULL,
  `answer4` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `exams`
--

INSERT INTO `exams` (`Cid`, `instructorID`, `question1`, `question2`, `question3`, `question4`, `choices1`, `choices2`, `choices3`, `choices4`, `answer1`, `answer2`, `answer3`, `answer4`) VALUES
(1, 4, 'Minimum number of fields in each node of a doubly linked list is?', 'A graph in which all vertices have equal degree is known as?', 'To perform level-order traversal on a binary tree, which of the following data structure will be required?', 'The number of edges in a complete graph of n vertices is?', '2&&&3&&&4&&&None of the above', 'Complete graph&&&Regular graph&&&Multi graph&&&Simple graph', 'Hash table&&&Queue&&&Binary search tree&&&Stack', 'n(n+1)/2&&&n(n-1)/2&&&n^2/2&&&n', '3', 'Complete graph', 'Queue', 'n(n-1)/2');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `programobjectives`
--

CREATE TABLE `programobjectives` (
  `POid` int(11) NOT NULL,
  `Pid` int(11) NOT NULL,
  `Objective` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `programobjectives`
--

INSERT INTO `programobjectives` (`POid`, `Pid`, `Objective`) VALUES
(1, 1, 'Demonstrate proficiency in problem-solving techniques using the computer.'),
(2, 1, 'Demonstrate proficiency in at least two high-level programming languages and two operating systems.'),
(3, 1, 'Demonstrate proficiency in the analysis of complex problems and the synthesis of solutions to those problems.'),
(4, 1, 'Demonstrate comprehension of modern software engineering principles.'),
(5, 1, 'Demonstrate a breadth and depth of knowledge in the discipline of computer science.'),
(6, 1, 'Ethical practitioners in computer science, software engineering and related fields.'),
(7, 2, 'To demonstrate knowledge of business and economics fundamentals'),
(8, 2, 'To demonstrate communication skills and technology agility'),
(9, 2, 'To develop socially-responsible solutions to business problems in both local and global environments'),
(10, 2, 'To integrate functional business knowledge in a team setting'),
(11, 3, 'Demonstrate academic proficiency in the core criminal justice areas.'),
(12, 3, 'Communicate effectively, orally and in writing, using appropriate references and technologies.'),
(13, 3, 'Assess the basic quality of research in criminology and criminal justice publications and other media.'),
(14, 3, 'Evaluate ethical issues related to the criminal justice system and criminology.\n'),
(15, 3, 'Employ critical thinking skills when evaluating issues in criminology and criminal justice.');

-- --------------------------------------------------------

--
-- Table structure for table `programs`
--

CREATE TABLE `programs` (
  `Pid` int(20) NOT NULL,
  `ProgramCoordinator` int(20) NOT NULL,
  `ProgramCode` varchar(20) NOT NULL,
  `ProgramName` mediumtext NOT NULL,
  `College` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `programs`
--

INSERT INTO `programs` (`Pid`, `ProgramCoordinator`, `ProgramCode`, `ProgramName`, `College`) VALUES
(1, 7, 'CSE', 'Computer Science', 'COLLEGE OF ENGINEERING'),
(2, 9, 'BA', 'Business Administration', '\r\nCOLLEGE OF BUSINESS'),
(3, 10, 'CCJ', 'Criminology and Criminal Justice', '\r\nCOLLEGE OF LIBERAL ARTS');

-- --------------------------------------------------------

--
-- Table structure for table `studentcoordinatormessage`
--

CREATE TABLE `studentcoordinatormessage` (
  `SCMid` int(20) NOT NULL,
  `studentID` int(20) NOT NULL,
  `coordinatorID` int(20) NOT NULL,
  `message` mediumtext NOT NULL,
  `unread` mediumtext NOT NULL,
  `senderID` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `studentcoordinatormessage`
--

INSERT INTO `studentcoordinatormessage` (`SCMid`, `studentID`, `coordinatorID`, `message`, `unread`, `senderID`) VALUES
(1, 2, 7, 'Hey Program Coordinator', 'true', 2),
(2, 2, 7, 'Hey John. This is Ajay', 'true', 7),
(3, 2, 7, 'How are you doing sir?', 'true', 2),
(4, 2, 7, 'Doing good John. What about you?', 'true', 7),
(15, 2, 7, 'Same here Sir.', 'true', 2),
(16, 2, 7, 'Glad to hear.', 'true', 7),
(17, 3, 7, 'Hey Ajay.This is Abhinav.', 'true', 3),
(18, 2, 7, 'Thank you sir.\n', 'true', 2),
(19, 2, 7, 'You\'re welcome John!\n', 'true', 7);

-- --------------------------------------------------------

--
-- Table structure for table `studentinstructormessage`
--

CREATE TABLE `studentinstructormessage` (
  `SIMid` int(20) NOT NULL,
  `studentID` int(20) NOT NULL,
  `instructorID` int(20) NOT NULL,
  `message` varchar(10000) NOT NULL,
  `unread` varchar(20) NOT NULL,
  `senderID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `studentinstructormessage`
--

INSERT INTO `studentinstructormessage` (`SIMid`, `studentID`, `instructorID`, `message`, `unread`, `senderID`) VALUES
(1, 2, 4, 'HELOO', 'true', 2),
(6, 2, 4, 'Sir!!', 'true', 2),
(8, 2, 4, 'Hey Student', 'true', 4),
(9, 2, 4, 'How r u?', 'true', 4),
(18, 2, 4, 'Good Sir. What about you?', 'true', 2),
(19, 2, 4, 'Same here John!', 'true', 4),
(25, 3, 5, 'Hey Abhinay', 'true', 5),
(26, 3, 5, 'Hello ma\'am!', 'true', 3),
(28, 2, 4, 'Good to know!', 'true', 2),
(29, 2, 4, 'hello\n', 'true', 4);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Uid` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Uid`, `email`, `username`, `password`, `role`) VALUES
(2, 'jake@gmail.com', 'Jake', 'Jake@22', 'Student'),
(3, 'subhash@gmail.com', 'Subhash', 'Subhash@22', 'admin'),
(4, 'durga@gmail.com', 'Durga', 'Durga@22', 'Instructor'),
(5, 'rashmi@gmail.com', 'Rashmi', 'Rashmi@22', 'Instructor'),
(6, 'varshith@gmail.com', 'Varshith', 'Varshith@4', 'Quality Assurance Officer'),
(7, 'ajay@gmail.com', 'Ajay', 'Ajay@22', 'Program Coordinator'),
(9, 'nikhil@gmail.com', 'Nikhil', 'Nikhil@22', 'Program Coordinator'),
(10, 'manvith@gmail.com', 'Manvith', 'Manvith@22', 'Program Coordinator');

-- --------------------------------------------------------

--
-- Table structure for table `userscourse`
--

CREATE TABLE `userscourse` (
  `id` int(20) NOT NULL,
  `Uid` int(20) NOT NULL,
  `Cid` int(20) NOT NULL,
  `Score` int(20) NOT NULL,
  `Grades` varchar(20) NOT NULL,
  `Feedback` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userscourse`
--

INSERT INTO `userscourse` (`id`, `Uid`, `Cid`, `Score`, `Grades`, `Feedback`) VALUES
(1, 2, 1, 25, 'A', 'Excellent'),
(2, 2, 2, 60, 'C', 'Good. Can score well if more work is put in.'),
(3, 2, 3, 20, 'E', 'Poor. A lot of extra effort must be put in'),
(4, 3, 1, 100, 'A', 'Excellent. Keep it up.'),
(5, 3, 2, 50, 'C', 'Can do better'),
(6, 3, 3, 75, 'B', 'Very good. You have the potential and can Score well'),
(7, 3, 4, 88, 'A', 'Very Good. Keep it up.'),
(11, 2, 23, 0, '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`Cid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `programobjectives`
--
ALTER TABLE `programobjectives`
  ADD PRIMARY KEY (`POid`);

--
-- Indexes for table `programs`
--
ALTER TABLE `programs`
  ADD PRIMARY KEY (`Pid`);

--
-- Indexes for table `studentcoordinatormessage`
--
ALTER TABLE `studentcoordinatormessage`
  ADD PRIMARY KEY (`SCMid`);

--
-- Indexes for table `studentinstructormessage`
--
ALTER TABLE `studentinstructormessage`
  ADD PRIMARY KEY (`SIMid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Uid`);

--
-- Indexes for table `userscourse`
--
ALTER TABLE `userscourse`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `Cid` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `programobjectives`
--
ALTER TABLE `programobjectives`
  MODIFY `POid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `programs`
--
ALTER TABLE `programs`
  MODIFY `Pid` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `studentcoordinatormessage`
--
ALTER TABLE `studentcoordinatormessage`
  MODIFY `SCMid` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `studentinstructormessage`
--
ALTER TABLE `studentinstructormessage`
  MODIFY `SIMid` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `userscourse`
--
ALTER TABLE `userscourse`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
