-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 12, 2016 at 08:33 PM
-- Server version: 5.7.16-0ubuntu0.16.04.1
-- PHP Version: 7.0.8-0ubuntu0.16.04.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `SNMP`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_bandUtil`
--

CREATE TABLE `tb_bandUtil` (
  `id` int(11) UNSIGNED NOT NULL,
  `interface_id` int(11) UNSIGNED NOT NULL,
  `band_util` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_bandUtil`
--

INSERT INTO `tb_bandUtil` (`id`, `interface_id`, `band_util`) VALUES
(2345, 2193, 0),
(2346, 2194, 0),
(2347, 2195, 0.0369),
(2348, 2196, 0),
(2349, 2197, 0),
(2350, 2198, 0),
(2351, 2199, 0),
(2352, 2200, 0),
(2353, 2201, 0),
(2354, 2202, 0),
(2355, 2203, 0),
(2356, 2204, 0),
(2357, 2205, 0),
(2358, 2206, 0),
(2359, 2207, 0),
(2360, 2208, 0),
(2361, 2209, 0),
(2362, 2210, 0),
(2363, 2211, 0),
(2364, 2212, 0),
(2365, 2213, 0),
(2366, 2214, 0),
(2367, 2215, 0),
(2368, 2216, 0),
(2369, 2217, 0),
(2370, 2218, 0),
(2371, 2219, 0),
(2372, 2220, 0),
(2373, 2221, 0),
(2374, 2222, 0),
(2375, 2223, 0),
(2376, 2224, 0),
(2377, 2225, 0),
(2378, 2226, 0),
(2379, 2227, 0),
(2380, 2228, 0),
(2381, 2229, 0),
(2382, 2230, 0),
(2383, 2231, 0),
(2384, 2232, 0),
(2385, 2233, 0),
(2386, 2234, 0),
(2387, 2235, 0),
(2388, 2236, 0),
(2389, 2237, 0),
(2390, 2238, 0),
(2391, 2239, 0),
(2392, 2240, 0),
(2393, 2241, 0),
(2394, 2242, 0),
(2395, 2243, 0),
(2396, 2244, 0),
(2397, 2245, 0.0216),
(2398, 2246, 0),
(2399, 2247, 0.0047),
(2400, 2248, 0),
(2401, 2249, 0.0027),
(2402, 2250, 0),
(2403, 2251, 0),
(2404, 2252, 0),
(2405, 2253, 0),
(2406, 2254, 0),
(2407, 2255, 0),
(2408, 2256, 0.0414),
(2409, 2257, 0),
(2410, 2258, 0),
(2411, 2259, 0),
(2412, 2260, 0),
(2413, 2261, 0),
(2414, 2262, 0),
(2415, 2263, 0),
(2416, 2264, 0),
(2417, 2265, 0.026),
(2418, 2266, 0),
(2419, 2267, 0),
(2420, 2268, 0),
(2421, 2269, 0.0457),
(2422, 2270, 0),
(2423, 2271, 0.0162),
(2424, 2272, 0.0162),
(2425, 2273, 0),
(2426, 2274, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tb_connections`
--

CREATE TABLE `tb_connections` (
  `id` int(11) UNSIGNED NOT NULL,
  `mac_from` varchar(45) DEFAULT NULL,
  `mac_to` varchar(45) DEFAULT NULL,
  `port_from` int(11) DEFAULT NULL,
  `port_to` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_connections`
--

INSERT INTO `tb_connections` (`id`, `mac_from`, `mac_to`, `port_from`, `port_to`, `status`) VALUES
(202, '6C:72:20:AD:71:F4', '00:22:B0:FD:CC:6C', 3, 25, 1),
(205, '00:22:B0:FD:CC:6C', '00:1E:58:B4:9D:8B', 27, 1, 3),
(207, '00:1E:58:B4:9D:8B', '00:26:5A:39:6E:80', 8, 7, 3);

-- --------------------------------------------------------

--
-- Table structure for table `tb_connect_status`
--

CREATE TABLE `tb_connect_status` (
  `id` int(10) UNSIGNED NOT NULL,
  `name_id` int(11) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_connect_status`
--

INSERT INTO `tb_connect_status` (`id`, `name_id`, `name`) VALUES
(1, 1, 'VISIBLE'),
(2, 2, 'IMPLICIT'),
(3, 3, 'CASUAL');

-- --------------------------------------------------------

--
-- Table structure for table `tb_devices`
--

CREATE TABLE `tb_devices` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(85) DEFAULT NULL,
  `MAC` varchar(40) DEFAULT NULL,
  `IP` varchar(45) DEFAULT NULL,
  `community` varchar(45) DEFAULT NULL,
  `version` varchar(45) DEFAULT NULL,
  `uptime` varchar(45) DEFAULT NULL,
  `stack_enabled` int(10) DEFAULT NULL,
  `stack_topology` int(10) DEFAULT NULL,
  `serialnum` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_devices`
--

INSERT INTO `tb_devices` (`id`, `name`, `MAC`, `IP`, `community`, `version`, `uptime`, `stack_enabled`, `stack_topology`, `serialnum`) VALUES
(23, ' DES-1210-28          4.00.064', '6C:72:20:AD:71:F4', '10.90.90.90', 'private', '2c', '(16956951) 1 day, 23:06:09.51', 0, 0, NULL),
(24, ' D-Link DES-3200-28F Fast Ethernet Switch', '00:22:B0:FD:CC:6C', '10.90.90.110', 'private', '2c', '(242910) 0:40:29.10', 0, 0, NULL),
(25, ' DGS-3200-16 Gigabit Ethernet Switch', '00:1E:58:B4:9D:8B', '10.90.90.120', 'private', '2c', '(16960134) 1 day, 23:06:41.34', 0, 0, NULL),
(26, ' D-Link DES-3200-10 Fast Ethernet Switch', '00:26:5A:39:6E:80', '10.90.90.130', 'private', '2c', '(16962710) 1 day, 23:07:07.10', 0, 0, 'PVI31A4002657');

-- --------------------------------------------------------

--
-- Table structure for table `tb_interfaces`
--

CREATE TABLE `tb_interfaces` (
  `id` int(11) UNSIGNED NOT NULL,
  `device_id` int(11) UNSIGNED NOT NULL,
  `number` int(11) DEFAULT NULL,
  `byte_sent` int(10) UNSIGNED DEFAULT NULL,
  `byte_received` int(10) UNSIGNED DEFAULT NULL,
  `countMAC` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `link` int(11) DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  `ifspeed` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_interfaces`
--

INSERT INTO `tb_interfaces` (`id`, `device_id`, `number`, `byte_sent`, `byte_received`, `countMAC`, `status`, `link`, `time`, `ifspeed`) VALUES
(2193, 23, 1, 0, 0, 0, 1, 2, 1481013830, 0),
(2194, 23, 2, 0, 0, 0, 1, 2, 1481013830, 0),
(2195, 23, 3, 2213842, 36022461, 11, 1, 1, 1481013830, 100000000),
(2196, 23, 4, 0, 0, 0, 1, 2, 1481013830, 0),
(2197, 23, 5, 0, 0, 0, 1, 2, 1481013830, 0),
(2198, 23, 6, 0, 0, 0, 1, 2, 1481013830, 0),
(2199, 23, 7, 0, 0, 0, 1, 2, 1481013830, 0),
(2200, 23, 8, 0, 0, 0, 1, 2, 1481013830, 0),
(2201, 23, 9, 0, 0, 0, 1, 2, 1481013830, 0),
(2202, 23, 10, 0, 0, 0, 1, 2, 1481013830, 0),
(2203, 23, 11, 0, 0, 0, 1, 2, 1481013830, 0),
(2204, 23, 12, 0, 0, 0, 1, 2, 1481013830, 0),
(2205, 23, 13, 0, 0, 0, 1, 2, 1481013830, 0),
(2206, 23, 14, 0, 0, 0, 1, 2, 1481013830, 0),
(2207, 23, 15, 0, 0, 0, 1, 2, 1481013830, 0),
(2208, 23, 16, 0, 0, 0, 1, 2, 1481013830, 0),
(2209, 23, 17, 0, 0, 0, 1, 2, 1481013830, 0),
(2210, 23, 18, 0, 0, 0, 1, 2, 1481013830, 0),
(2211, 23, 19, 0, 0, 0, 1, 2, 1481013830, 0),
(2212, 23, 20, 0, 0, 0, 1, 2, 1481013830, 0),
(2213, 23, 21, 0, 0, 0, 1, 2, 1481013830, 0),
(2214, 23, 22, 0, 0, 0, 1, 2, 1481013830, 0),
(2215, 23, 23, 0, 0, 0, 1, 2, 1481013830, 0),
(2216, 23, 24, 0, 0, 0, 1, 2, 1481013830, 0),
(2217, 23, 25, 0, 0, 0, 2147483647, 2, 1481013830, 0),
(2218, 23, 26, 0, 0, 0, 1, 2, 1481013830, 0),
(2219, 23, 27, 0, 0, 0, 1, 2, 1481013830, 0),
(2220, 23, 28, 0, 0, 0, 1, 2, 1481013830, 0),
(2221, 24, 1, 0, 0, 0, 1, 2, 1481013830, 0),
(2222, 24, 2, 0, 0, 0, 1, 2, 1481013830, 0),
(2223, 24, 3, 0, 0, 0, 1, 2, 1481013830, 0),
(2224, 24, 4, 0, 0, 0, 1, 2, 1481013830, 0),
(2225, 24, 5, 0, 0, 0, 1, 2, 1481013830, 0),
(2226, 24, 6, 0, 0, 0, 1, 2, 1481013830, 0),
(2227, 24, 7, 0, 0, 0, 1, 2, 1481013830, 0),
(2228, 24, 8, 0, 0, 0, 1, 2, 1481013830, 0),
(2229, 24, 9, 0, 0, 0, 1, 2, 1481013830, 0),
(2230, 24, 10, 0, 0, 0, 1, 2, 1481013830, 0),
(2231, 24, 11, 0, 0, 0, 1, 2, 1481013830, 0),
(2232, 24, 12, 0, 0, 0, 1, 2, 1481013830, 0),
(2233, 24, 13, 0, 0, 0, 1, 2, 1481013830, 0),
(2234, 24, 14, 0, 0, 0, 1, 2, 1481013830, 0),
(2235, 24, 15, 0, 0, 0, 1, 2, 1481013830, 0),
(2236, 24, 16, 0, 0, 0, 1, 2, 1481013830, 0),
(2237, 24, 17, 0, 0, 0, 1, 2, 1481013830, 0),
(2238, 24, 18, 0, 0, 0, 1, 2, 1481013830, 0),
(2239, 24, 19, 0, 0, 0, 1, 2, 1481013830, 0),
(2240, 24, 20, 0, 0, 0, 1, 2, 1481013830, 0),
(2241, 24, 21, 0, 0, 0, 1, 2, 1481013830, 0),
(2242, 24, 22, 0, 0, 0, 1, 2, 1481013830, 0),
(2243, 24, 23, 0, 0, 0, 1, 2, 1481013830, 0),
(2244, 24, 24, 0, 0, 0, 1, 2, 1481013830, 0),
(2245, 24, 25, 398749, 164084, 1, 1, 1, 1481013830, 100000000),
(2246, 24, 26, 0, 0, 0, 1, 2, 1481013830, 0),
(2247, 24, 27, 304389, 548445, 10, 1, 1, 1481013830, 1000000000),
(2248, 24, 28, 0, 0, 0, 1, 2, 1481013830, 0),
(2249, 25, 1, 562089, 320614, 2, 1, 1, 1481013830, 1000000000),
(2250, 25, 2, 0, 0, 0, 1, 2, 1481013830, 0),
(2251, 25, 3, 0, 0, 0, 1, 2, 1481013830, 0),
(2252, 25, 4, 0, 0, 0, 2147483647, 2, 1481013830, 0),
(2253, 25, 5, 0, 0, 0, 1, 2, 1481013830, 0),
(2254, 25, 6, 0, 0, 0, 1, 2, 1481013830, 0),
(2255, 25, 7, 0, 0, 0, 1, 2, 1481013830, 0),
(2256, 25, 8, 3963648, 36458340, 11, 1, 1, 1481013830, 100000000),
(2257, 25, 9, 0, 0, 0, 1, 2, 1481013830, 0),
(2258, 25, 10, 0, 0, 0, 1, 2, 1481013830, 0),
(2259, 25, 11, 0, 0, 0, 1, 2, 1481013830, 0),
(2260, 25, 12, 0, 0, 0, 1, 2, 1481013830, 0),
(2261, 25, 13, 0, 0, 0, 1, 2, 1481013830, 0),
(2262, 25, 14, 0, 0, 0, 1, 2, 1481013830, 0),
(2263, 25, 15, 35628064, 2056131, 0, 1, 2, 1481013830, 0),
(2264, 25, 16, 0, 0, 0, 1, 2, 1481013830, 0),
(2265, 26, 1, 211931959, 771033912, 8, 1, 1, 1481013830, 100000000),
(2266, 26, 2, 0, 0, 0, 1, 2, 1481013830, 0),
(2267, 26, 3, 0, 0, 0, 1, 2, 1481013830, 0),
(2268, 26, 4, 0, 0, 0, 1, 2, 1481013830, 0),
(2269, 26, 5, 1175305012, 79469005, 2, 1, 1, 1481013830, 100000000),
(2270, 26, 6, 0, 0, 0, 1, 2, 1481013830, 0),
(2271, 26, 7, 36462054, 3970703, 3, 1, 1, 1481013830, 100000000),
(2272, 26, 8, 3920989959, 135638820, 1, 1, 1, 1481013830, 100000000),
(2273, 26, 9, 0, 0, 0, 1, 2, 1481013830, 0),
(2274, 26, 10, 0, 0, 0, 1, 2, 1481013830, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tb_mac`
--

CREATE TABLE `tb_mac` (
  `id` int(11) UNSIGNED NOT NULL,
  `interface_id` int(11) UNSIGNED NOT NULL,
  `mac` varchar(55) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_mac`
--

INSERT INTO `tb_mac` (`id`, `interface_id`, `mac`) VALUES
(739, 2245, '6C:72:20:AD:71:F4'),
(740, 2249, '00:22:B0:FD:CC:6C'),
(741, 2265, '00:0C:29:0A:27:ED'),
(742, 2265, '00:24:01:48:68:EA'),
(743, 2265, '54:A0:50:E7:CD:6A'),
(744, 2265, '54:A0:50:E7:CE:E4'),
(745, 2265, '6C:72:20:FB:18:DF'),
(746, 2265, '90:94:E4:38:8A:C6'),
(747, 2265, '9C:5C:8E:8F:A9:63'),
(748, 2265, 'BC:AE:C5:48:7C:C9'),
(749, 2269, '08:00:27:BE:A2:36'),
(750, 2269, '1C:6F:65:7F:98:E4'),
(751, 2271, '00:1E:58:B4:9D:8B'),
(752, 2272, '9C:D6:43:83:12:7B');

-- --------------------------------------------------------

--
-- Table structure for table `tb_stack`
--

CREATE TABLE `tb_stack` (
  `id` int(11) UNSIGNED NOT NULL,
  `device_id` int(11) UNSIGNED NOT NULL,
  `stack_id` int(11) DEFAULT NULL,
  `user` int(20) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `exist` int(11) DEFAULT NULL,
  `mac` varchar(45) DEFAULT NULL,
  `prom_ver` varchar(45) DEFAULT NULL,
  `fw_ver` varchar(45) DEFAULT NULL,
  `hw_ver` varchar(45) DEFAULT NULL,
  `curr_mode` int(20) DEFAULT NULL,
  `serial` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tb_vlan`
--

CREATE TABLE `tb_vlan` (
  `id` int(11) UNSIGNED NOT NULL,
  `device_id` int(11) UNSIGNED NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `VID` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_vlan`
--

INSERT INTO `tb_vlan` (`id`, `device_id`, `name`, `VID`) VALUES
(7, 24, 'default', 7),
(8, 25, 'default', 7),
(9, 26, 'default', 7);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_bandUtil`
--
ALTER TABLE `tb_bandUtil`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_BandUtil_1_idx` (`interface_id`);

--
-- Indexes for table `tb_connections`
--
ALTER TABLE `tb_connections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tb_connections_1_idx` (`status`);

--
-- Indexes for table `tb_connect_status`
--
ALTER TABLE `tb_connect_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_devices`
--
ALTER TABLE `tb_devices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_interfaces`
--
ALTER TABLE `tb_interfaces`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index2` (`device_id`);

--
-- Indexes for table `tb_mac`
--
ALTER TABLE `tb_mac`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index2` (`interface_id`);

--
-- Indexes for table `tb_stack`
--
ALTER TABLE `tb_stack`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Stack_1_idx` (`device_id`);

--
-- Indexes for table `tb_vlan`
--
ALTER TABLE `tb_vlan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_vlan_1_idx` (`device_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_bandUtil`
--
ALTER TABLE `tb_bandUtil`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2427;
--
-- AUTO_INCREMENT for table `tb_connections`
--
ALTER TABLE `tb_connections`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=208;
--
-- AUTO_INCREMENT for table `tb_connect_status`
--
ALTER TABLE `tb_connect_status`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `tb_devices`
--
ALTER TABLE `tb_devices`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `tb_interfaces`
--
ALTER TABLE `tb_interfaces`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2275;
--
-- AUTO_INCREMENT for table `tb_mac`
--
ALTER TABLE `tb_mac`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=753;
--
-- AUTO_INCREMENT for table `tb_stack`
--
ALTER TABLE `tb_stack`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tb_vlan`
--
ALTER TABLE `tb_vlan`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_bandUtil`
--
ALTER TABLE `tb_bandUtil`
  ADD CONSTRAINT `fk_BandUtil_1` FOREIGN KEY (`interface_id`) REFERENCES `tb_interfaces` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tb_interfaces`
--
ALTER TABLE `tb_interfaces`
  ADD CONSTRAINT `fk_interfaces_1` FOREIGN KEY (`device_id`) REFERENCES `tb_devices` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tb_mac`
--
ALTER TABLE `tb_mac`
  ADD CONSTRAINT `fk_byte_receivedMAC_1` FOREIGN KEY (`interface_id`) REFERENCES `tb_interfaces` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tb_stack`
--
ALTER TABLE `tb_stack`
  ADD CONSTRAINT `fk_Stack_1` FOREIGN KEY (`device_id`) REFERENCES `tb_devices` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tb_vlan`
--
ALTER TABLE `tb_vlan`
  ADD CONSTRAINT `fk_vlan_1` FOREIGN KEY (`device_id`) REFERENCES `tb_devices` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
