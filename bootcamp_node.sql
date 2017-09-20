-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 20 Sep 2017 pada 22.00
-- Versi Server: 10.1.22-MariaDB
-- PHP Version: 7.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bootcamp_node`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `admin`
--

CREATE TABLE `admin` (
  `id_admin` int(255) NOT NULL,
  `nm_admin` varchar(50) NOT NULL,
  `email_admin` varchar(50) NOT NULL,
  `pass_admin` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `admin`
--

INSERT INTO `admin` (`id_admin`, `nm_admin`, `email_admin`, `pass_admin`) VALUES
(1, 'faisal arkan', 'faisalarkan21@gmail.com', 'U2FsdGVkX186lfeqmI2sVj9pPSkets9COO4FNZogejY=');

-- --------------------------------------------------------

--
-- Struktur dari tabel `detil_pesan_tiket`
--

CREATE TABLE `detil_pesan_tiket` (
  `prefix` varchar(2) NOT NULL DEFAULT 'TK',
  `id_pembeli` int(5) NOT NULL,
  `harga_tiket` decimal(10,2) NOT NULL,
  `uang_transfer` decimal(10,2) NOT NULL,
  `pilihan_bank` varchar(225) NOT NULL,
  `status` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `detil_pesan_tiket`
--

INSERT INTO `detil_pesan_tiket` (`prefix`, `id_pembeli`, `harga_tiket`, `uang_transfer`, `pilihan_bank`, `status`) VALUES
('TK', 5, '500000.00', '0.00', 'BCA NO. 98080986643 - Faisal Arkan', 'Belum Lunas'),
('TK', 6, '500000.00', '0.00', 'BRI NO. 78787878741 - Sativa Ken', 'Belum Lunas'),
('TK', 7, '500000.00', '0.00', 'BCA NO. 98080986643 - Faisal Arkan', 'Belum Lunas'),
('TK', 15, '500000.00', '0.00', 'BCA NO. 98080986643 - Faisal Arkan', 'Belum Lunas'),
('TK', 16, '500000.00', '0.00', 'BRI NO. 78787878741 - Sativa Ken', 'Belum Lunas'),
('TK', 18, '500000.00', '0.00', 'BCA NO. 98080986643 - Faisal Arkan', 'Belum Lunas'),
('TK', 19, '500000.00', '0.00', 'BCA NO. 98080986643 - Faisal Arkan', 'Belum Lunas'),
('TK', 21, '500000.00', '0.00', 'BCA NO. 98080986643 - Faisal Arkan', 'Belum Lunas'),
('TK', 22, '500000.00', '0.00', 'BCA NO. 98080986643 - Faisal Arkan', 'Belum Lunas'),
('TK', 23, '500000.00', '0.00', 'BRI NO. 78787878741 - Sativa Ken', 'Belum Lunas'),
('TK', 25, '500000.00', '0.00', 'BCA NO. 98080986643 - Faisal Arkan', 'Belum Lunas'),
('TK', 26, '500000.00', '0.00', 'BCA NO. 98080986643 - Faisal Arkan', 'Belum Lunas'),
('TK', 27, '500000.00', '0.00', 'BCA NO. 98080986643 - Faisal Arkan', 'Belum Lunas'),
('TK', 28, '500000.00', '0.00', 'BCA NO. 98080986643 - Faisal Arkan', 'Belum Lunas');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kursus`
--

CREATE TABLE `kursus` (
  `id_kursus` int(11) NOT NULL,
  `materi_kursus` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `kursus`
--

INSERT INTO `kursus` (`id_kursus`, `materi_kursus`) VALUES
(1, 'Mempelajari dasar dari Ecmascript 6'),
(2, 'Mempelajari node.js dan framework yang dibutuhkan'),
(3, 'Mempelajari database berbasis NoSQL dan SQL'),
(4, 'Mempelajari Version Control Ex. Github');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pembeli`
--

CREATE TABLE `pembeli` (
  `prefix` varchar(3) NOT NULL DEFAULT 'CS_',
  `id_pembeli` int(5) NOT NULL,
  `id_batch` int(11) NOT NULL,
  `nm_pembeli` varchar(40) NOT NULL,
  `email_pembeli` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL,
  `hp_pembeli` varchar(225) NOT NULL,
  `gd_pembeli` varchar(40) NOT NULL,
  `motivasi_pembeli` varchar(225) NOT NULL,
  `email_verification` tinyint(1) NOT NULL,
  `token_verification` varchar(225) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `pembeli`
--

INSERT INTO `pembeli` (`prefix`, `id_pembeli`, `id_batch`, `nm_pembeli`, `email_pembeli`, `password`, `hp_pembeli`, `gd_pembeli`, `motivasi_pembeli`, `email_verification`, `token_verification`) VALUES
('CS_', 5, 3, 'Andri Fortunio Bagaskara', 'andri@gmail.com', 'U2FsdGVkX19cuBiYnWoeCWZp/GXiPqQsUdBBfLPxLxQ=', '085778801245', 'Pria', 'Saya ingin bisa!', 0, '6cc91cdf97d9e162fe866033d1a4748b8c56ceba8a359f99394ef7437c18dfd7'),
('CS_', 6, 3, 'Alister Galen Pratama', 'alister@gmail.com', 'U2FsdGVkX186lfeqmI2sVj9pPSkets9COO4FNZogejY=', '085778802231', 'Pria', 'Saya ingin belajar !', 0, '16203c6bd5fda86819db9b46f202ddcc4b8e4dea9aa0f97e604ef37e8e8069ac'),
('CS_', 7, 3, 'Andrian Daylon Valentino ', 'andrian@gmail.com', 'U2FsdGVkX19RdGqoSUHhs7MQ6efN9nApQrgRMST2qLE=', '081722505723', 'Pria', 'Saya ingin mahir dalam bahasa pemprograman !', 0, 'b3e2ba5e79c2220d0386efd2e01bf5e733f48abc6c05fa3839474af1b7525eac'),
('CS_', 15, 3, 'Faisal Arkan', 'faisalarkan21@gmail.com', 'U2FsdGVkX1+bN4bsmvjdR7MH2JY5V6yY4p6jrd9vcoo=', '085778805197', 'Pria', 'Saya Ingin Bisa !', 0, 'b44d907e939c311bb132831fcd75bd4f6591c4040b6b30462fb6b8887abd6be6'),
('CS_', 16, 3, 'Abdur Rahim', 'abdur@gmail.com', 'U2FsdGVkX19cuk97vXvcNypspo/osFPWSxSytZCfmrE=', '085778805197', 'Pria', 'Saya ingin bisa !', 0, '1556ac4a50bf3bbce6165c550542676c1643210e790b32fbf48572c889bc255b'),
('CS_', 18, 3, 'Adabi Abadi', 'adabi@gmail.com', 'U2FsdGVkX19kmzspjw10QEK88o1+STfo7sDrngI1ZCU=', '08715224747675', 'Pria', 'Saya ingin bisa!', 0, '28b973f1cb0c784bbdc16c9e95bc88ad6e7a3671c426b222267fc646eabbe12c'),
('CS_', 19, 3, 'Andri Fortunio Bagaskara', 'andri@gmail.com', 'U2FsdGVkX1+5KydHmdga8vcFWSRJ6l1ni/FOiUXUHxU=', '081663764655', 'Pria', 'Saya bisa!', 0, '6cc91cdf97d9e162fe866033d1a4748b8c56ceba8a359f99394ef7437c18dfd7'),
('CS_', 21, 3, 'Abrisam Bryan Alvaro ', 'abrisam@gmail.com', 'U2FsdGVkX1+W5QpjVW9ykKjzanwPDuUtvpnCsxD5Jlg=', '08265578971', 'Pria', 'Saya selalu ingin bisa!', 0, '04b2d1aacbc442c745d1c348fcd9b1cd08e1c2b626443dd0472fcc39c3ef227f'),
('CS_', 22, 3, 'Adhitama Elvan ', 'adhitima@gmail.com', 'U2FsdGVkX1+zKHygtY4tjl55tU4tzueJLvFpXy3+ugg=', '085132322112', 'Pria', 'Saya bisa!', 0, '615dc71cccb2bdd0982e60b4aa8e1bd58fa0b97d52e6684efa7adf99767af88a'),
('CS_', 23, 3, 'Aristides Androcles', 'ari@gmail.com', 'U2FsdGVkX19uUKzpxsZKc9lrLvqi4rWNitGsYopoB9E=', '082769486432', 'Pria', 'Saya ingin belajar !', 0, 'bf26ddc53af53bfd5d01a75d649565e584435a0138bdbf4fb6a46e7fb8007235'),
('CS_', 25, 3, 'Alfarezi Kavindra', 'alfarizi@gmail.com', 'U2FsdGVkX19MDuKzpSTajfB10SrtNTPyY+TdVtwMEQo=', '085742105192', 'Pria', 'Saya bisa!', 0, '98f4703b71d2b2fd82dd033066fec56337ea1c95be753b2f351c5ac059ebbe80'),
('CS_', 26, 3, 'Akio Mandani ', 'akio@gmail.com', 'U2FsdGVkX19sAXTtyGi+StTEuJczv9+ncKA0ZHjvL4E=', '08187654349', 'Pria', 'Saya ingin mempunyai guru !', 0, '0bcd0caf5c5e2e008714d4b5e0486ad5d797c984bdee3767e23bf9a31efc410a'),
('CS_', 27, 3, 'Dini Wati ', 'dini@gmail.com', 'U2FsdGVkX19rxNp+VCFP+drPRqi+zby/XibPfkiTxak=', '0857788212121', 'Wanita', 'Saya bisa!', 0, '2be678c6f1c6b393256ec911093981201851fca99b4669083197479a4e662df4'),
('CS_', 28, 3, 'Aksa Delvin', 'aksa@gmail.com', 'U2FsdGVkX19HGrrZLjmPcJmoX/MrsIB87zlVmymDIwg=', '085113805197', 'Pria', 'Saya bisa!', 0, '817e3ce251e82b328297bf58e3685a14f87c0c50aa596b132b6ebf627775b4c0');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pembeli_validasi`
--

CREATE TABLE `pembeli_validasi` (
  `id_pembeli` int(11) NOT NULL,
  `nm_pembeli` varchar(225) NOT NULL,
  `email_pembeli` varchar(225) NOT NULL,
  `hp_pembeli` varchar(225) NOT NULL,
  `uang_transfer_validasi` decimal(10,2) NOT NULL,
  `pilihan_bank` varchar(225) DEFAULT 'Belum Konfirmasi'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `pembeli_validasi`
--

INSERT INTO `pembeli_validasi` (`id_pembeli`, `nm_pembeli`, `email_pembeli`, `hp_pembeli`, `uang_transfer_validasi`, `pilihan_bank`) VALUES
(5, 'Andri Fortunio Bagaskara', 'andri@gmail.com', '085778805197', '0.00', 'Belum Konfirmasi'),
(6, 'Alister Galen Pratama', 'alister@gmail.com', '085778802231', '0.00', 'Belum Konfirmasi'),
(7, 'Andrian Daylon Valentino ', 'andrian@gmail.com', '081722505723', '500000.00', 'BCA NO. 98080986643 - Faisal Arkan'),
(15, 'Faisal Arkan', 'faisalarkan21@gmail.com', '085778805197', '500000.00', 'BCA NO. 98080986643 - Faisal Arkan'),
(16, 'Abdur Rahim', 'abdur@gmail.com', '085778805197', '0.00', 'Belum Konfirmasi'),
(18, 'Adabi Abadi', 'adabi@gmail.com', '08715224747675', '0.00', 'Belum Konfirmasi'),
(19, 'Andri Fortunio Bagaskara', 'andri@gmail.com', '081663764655', '0.00', 'Belum Konfirmasi'),
(21, 'Abrisam Bryan Alvaro ', 'abrisam@gmail.com', '08265578971', '0.00', 'Belum Konfirmasi'),
(22, 'Adhitama Elvan ', 'adhitima@gmail.com', '085132322112', '0.00', 'Belum Konfirmasi'),
(23, 'Aristides Androcles', 'ari@gmail.com', '082769486432', '0.00', 'Belum Konfirmasi'),
(25, 'Alfarezi Kavindra', 'alfarizi@gmail.com', '085742105192', '0.00', 'Belum Konfirmasi'),
(26, 'Akio Mandani ', 'akio@gmail.com', '08187654349', '0.00', 'Belum Konfirmasi'),
(27, 'Dini Wati ', 'dini@gmail.com', '0857788212121', '0.00', 'Belum Konfirmasi'),
(28, 'Aksa Delvin', 'aksa@gmail.com', '085113805197', '0.00', 'Belum Konfirmasi');

-- --------------------------------------------------------

--
-- Struktur dari tabel `periode`
--

CREATE TABLE `periode` (
  `id_batch` int(11) NOT NULL,
  `tgl_mulai` date NOT NULL,
  `tgl_selesai` date NOT NULL,
  `tgl_daftar_mulai` date NOT NULL,
  `tgl_daftar_selesai` date NOT NULL,
  `quota` int(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `periode`
--

INSERT INTO `periode` (`id_batch`, `tgl_mulai`, `tgl_selesai`, `tgl_daftar_mulai`, `tgl_daftar_selesai`, `quota`) VALUES
(1, '2017-07-03', '2017-08-03', '2017-06-01', '2017-07-02', 15),
(2, '2017-08-10', '2017-09-10', '2017-07-03', '2017-08-08', 15),
(3, '2017-09-15', '2017-10-15', '2017-08-09', '2017-09-15', 15),
(4, '2017-10-23', '2017-11-16', '2017-10-14', '2017-10-20', 15);

-- --------------------------------------------------------

--
-- Struktur dari tabel `tgl_pesan`
--

CREATE TABLE `tgl_pesan` (
  `prefix` varchar(3) DEFAULT 'CS_',
  `id_pembeli` int(5) NOT NULL,
  `tgl_order` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `tgl_pesan`
--

INSERT INTO `tgl_pesan` (`prefix`, `id_pembeli`, `tgl_order`) VALUES
('CS_', 5, '2017-09-13 06:50:58.293'),
('CS_', 6, '2017-09-13 06:51:56.923'),
('CS_', 7, '2017-09-13 06:52:52.893'),
('CS_', 15, '2017-09-13 09:59:16.967'),
('CS_', 16, '2017-09-14 07:03:11.239'),
('CS_', 18, '2017-09-14 07:06:00.790'),
('CS_', 19, '2017-09-14 07:07:09.246'),
('CS_', 21, '2017-09-14 07:10:05.350'),
('CS_', 22, '2017-09-14 07:12:38.079'),
('CS_', 23, '2017-09-14 07:13:27.284'),
('CS_', 25, '2017-09-14 07:14:51.245'),
('CS_', 26, '2017-09-14 07:15:31.524'),
('CS_', 27, '2017-09-14 08:13:05.620'),
('CS_', 28, '2017-09-14 08:20:16.587');

-- --------------------------------------------------------

--
-- Struktur dari tabel `trainer`
--

CREATE TABLE `trainer` (
  `trainer_id` int(11) NOT NULL,
  `trainer_name` varchar(225) NOT NULL,
  `trainer_email` varchar(225) NOT NULL,
  `trainer_gd` varchar(225) NOT NULL,
  `trainer_hp` varchar(225) NOT NULL,
  `id_kursus` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `trainer`
--

INSERT INTO `trainer` (`trainer_id`, `trainer_name`, `trainer_email`, `trainer_gd`, `trainer_hp`, `id_kursus`) VALUES
(27, 'Lea Sativa', 'lea@gmail.com', 'Wanita', '085778805197', 1),
(28, 'Budi Herdiansyah', 'faisalarkan21@gmail.com', 'Pria', '085432567659', 1),
(29, 'Yuli Z.', 'yuli@gmail.com', 'Wanita', '0817689765791', 1),
(30, 'Frans Simatupang', 'frans@gmail.com', 'Pria', '0856789871612', 2),
(31, ' Azzam Khalif ', 'azzam@gmail.com', 'Pria', '082768654371', 2),
(32, 'Atha Hafizh Alfarezi ', 'atha@gmail.com', 'Pria', '08287655776411', 2),
(33, 'Agrata Razzan', 'agrata@gmail.com', 'Pria', '085777557889', 3),
(34, 'Aqil Irsyad ', 'aqil@gmail.com', 'Pria', '08215523678', 4),
(35, 'Arsyana Azlan', 'azlan@gmail.com', 'Pria', '085778804521', 3),
(36, 'Aludra Rumaisha', 'aludra@gmail.com', 'Wanita', '085778805197', 4),
(37, 'Ataya Pranaya', 'ataya@gmail.com', 'Wanita', '085778235678', 3),
(38, 'Aurelia Almashyra', 'aurel@gmail.com', 'Wanita', '085778501247', 4),
(39, 'Azril Fauzan Rashya', 'azril@gmail.com', 'Pria', '08126767682122', NULL),
(40, 'Alvin Zaidan ', 'alvin@gmail.com', 'Pria', '085778763345', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indexes for table `detil_pesan_tiket`
--
ALTER TABLE `detil_pesan_tiket`
  ADD PRIMARY KEY (`id_pembeli`),
  ADD KEY `FK_detil_pesan` (`id_pembeli`);

--
-- Indexes for table `kursus`
--
ALTER TABLE `kursus`
  ADD PRIMARY KEY (`id_kursus`);

--
-- Indexes for table `pembeli`
--
ALTER TABLE `pembeli`
  ADD PRIMARY KEY (`id_pembeli`),
  ADD KEY `email_pembeli` (`email_pembeli`),
  ADD KEY `jadwal_id_index` (`id_batch`);

--
-- Indexes for table `pembeli_validasi`
--
ALTER TABLE `pembeli_validasi`
  ADD PRIMARY KEY (`id_pembeli`);

--
-- Indexes for table `periode`
--
ALTER TABLE `periode`
  ADD PRIMARY KEY (`id_batch`),
  ADD KEY `id_jadwal` (`id_batch`);

--
-- Indexes for table `tgl_pesan`
--
ALTER TABLE `tgl_pesan`
  ADD PRIMARY KEY (`id_pembeli`),
  ADD KEY `id_pembeli` (`id_pembeli`);

--
-- Indexes for table `trainer`
--
ALTER TABLE `trainer`
  ADD PRIMARY KEY (`trainer_id`),
  ADD KEY `kursus_id` (`id_kursus`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id_admin` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `detil_pesan_tiket`
--
ALTER TABLE `detil_pesan_tiket`
  MODIFY `id_pembeli` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT for table `kursus`
--
ALTER TABLE `kursus`
  MODIFY `id_kursus` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `pembeli`
--
ALTER TABLE `pembeli`
  MODIFY `id_pembeli` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT for table `pembeli_validasi`
--
ALTER TABLE `pembeli_validasi`
  MODIFY `id_pembeli` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT for table `periode`
--
ALTER TABLE `periode`
  MODIFY `id_batch` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tgl_pesan`
--
ALTER TABLE `tgl_pesan`
  MODIFY `id_pembeli` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT for table `trainer`
--
ALTER TABLE `trainer`
  MODIFY `trainer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `detil_pesan_tiket`
--
ALTER TABLE `detil_pesan_tiket`
  ADD CONSTRAINT `FK_detil_pesan` FOREIGN KEY (`id_pembeli`) REFERENCES `tgl_pesan` (`id_pembeli`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `pembeli`
--
ALTER TABLE `pembeli`
  ADD CONSTRAINT `pembeli_ibfk_1` FOREIGN KEY (`id_batch`) REFERENCES `periode` (`id_batch`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `pembeli_validasi`
--
ALTER TABLE `pembeli_validasi`
  ADD CONSTRAINT `pembeli_validasi_ibfk_1` FOREIGN KEY (`id_pembeli`) REFERENCES `detil_pesan_tiket` (`id_pembeli`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `tgl_pesan`
--
ALTER TABLE `tgl_pesan`
  ADD CONSTRAINT `tgl_pesan_ibfk_1` FOREIGN KEY (`id_pembeli`) REFERENCES `pembeli` (`id_pembeli`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `trainer`
--
ALTER TABLE `trainer`
  ADD CONSTRAINT `trainer_ibfk_1` FOREIGN KEY (`id_kursus`) REFERENCES `kursus` (`id_kursus`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
