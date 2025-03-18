-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Gép: localhost:3306
-- Létrehozás ideje: 2025. Már 18. 11:12
-- Kiszolgáló verziója: 8.4.3
-- PHP verzió: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `loretracker`
--
CREATE DATABASE IF NOT EXISTS `loretracker` DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_hungarian_ci;
USE `loretracker`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `additionallore`
--

CREATE TABLE `additionallore` (
  `postID` int NOT NULL,
  `addJatek` varchar(255) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `addLoreType` varchar(255) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `body` text COLLATE utf8mb3_hungarian_ci NOT NULL,
  `publisher` int NOT NULL,
  `accepted` tinyint NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `likeCounter` int NOT NULL,
  `relatedPageID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `jatek`
--

CREATE TABLE `jatek` (
  `jatekID` int NOT NULL,
  `nev` varchar(255) COLLATE utf8mb3_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;

--
-- A tábla adatainak kiíratása `jatek`
--

INSERT INTO `jatek` (`jatekID`, `nev`) VALUES
(1, 'Ghost of Tsushima'),
(2, 'Team Fortress 2');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `jatekloretracker`
--

CREATE TABLE `jatekloretracker` (
  `trackerID` int NOT NULL,
  `userID` int NOT NULL,
  `jatekID` int NOT NULL,
  `mainAchievementCounter` int NOT NULL,
  `sideAchievementCounter1` int NOT NULL,
  `sideAchievementCounter2` int NOT NULL,
  `sideAchievementCounter3` int NOT NULL,
  `sideAchievementCounter4` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;

--
-- A tábla adatainak kiíratása `jatekloretracker`
--

INSERT INTO `jatekloretracker` (`trackerID`, `userID`, `jatekID`, `mainAchievementCounter`, `sideAchievementCounter1`, `sideAchievementCounter2`, `sideAchievementCounter3`, `sideAchievementCounter4`) VALUES
(1, 2, 1, 6, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `lorepage`
--

CREATE TABLE `lorepage` (
  `pageID` int NOT NULL,
  `jatekID` int NOT NULL,
  `typeID` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `body` text COLLATE utf8mb3_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;

--
-- A tábla adatainak kiíratása `lorepage`
--

INSERT INTO `lorepage` (`pageID`, `jatekID`, `typeID`, `title`, `body`) VALUES
(1, 1, 1, '_autoGenTrophy_0001', 'The Mongol Empire under Khotun Khan launched an invasion of Tsushima in 1274. Jin is one of eighty samurai who were sent in a desperate suicidal attack against the Mongols at Komoda Beach, aiming to slow the invasion force down before they reach the Japanese mainland. During the battle, Jin was grievously wounded and left for dead, while Shimura was captured and the rest of the samurai on the beach are annihilated. Jin was narrowly saved by the thief Yuna, who nursed him back to health and saved him from the Mongols. Following the battle, the Mongols take over most of the island, killing or enslaving anyone who resisted their rule.'),
(3, 1, 1, '_autoGenTrophy_0002', 'Against Yuna\'s warnings that the attempt would be futile, Jin attacks Castle Kaneda, where Shimura was imprisoned, in order to save his uncle. Before he reaches the main keep of the castle, he is confronted in one-on-one combat with Khotun Khan; although Jin manages to wound Khotun\'s face, he is ultimately outmatched and thrown off a bridge. Jin narrowly survives the fall, and escapes with Yuna with the help of a pair of the Samurai horses they used to travel to the castle. Realizing that he cannot defeat the Mongols by himself or with the traditional samurai techniques and tactics, Jin opts to scour the island in search of friends and new fighting techniques in order to retake Castle Kaneda and rescue his uncle.'),
(4, 1, 1, '_autoGenTrophy_0003', 'Jin enlists the help of Sensei Ishikawa, in exchange for aid in hunting his former student Tomoe, and Masako Adachi, who agrees in exchange for help in hunting the killers of her family. Jin also locates Ryuzo, who seeks help in finding food for his starving men; Ryuzo is increasingly frustrated when their attempts fail, but he nevertheless agrees to help. Jin helps Yuna find her brother Taka, who is an expert blacksmith that could help Jin craft a device to help him scale the walls of Castle Kaneda. In the process, Jin begins to walk away from the Samurai ways, after Yuna convinces him to begin striking the shadows and killing the Mongols from stealth, which Shimura had told him was a coward\'s way of eliminating a foe.'),
(5, 1, 1, '_autoGenTrophy_0004', 'After discovering that Taka is being held in Azamo Bay, Jin and Yuna mount a successful rescue mission with the help of sake merchant Kenji. In Komatsu Forge, Jin and Yuna fend off Mongols in order to buy Taka time to complete a special Grapple hook. After the battle, Taka remarks that he\'s never seen any samurai fight the way Jin has before. Yuna crafts a tale to explain Jin\'s superhuman abilities, boasting to onlookers that Jin is not human, but a vengeful ghost - a story that sticks and results in Jin becoming known as the legendary Ghost of Tsushima.'),
(6, 1, 1, '_autoGenTrophy_0005', 'Jin calls for his friends to commence the assault on Castle Kaneda. After managing to get inside the inner keep, however, Ryuzo betrays Jin and sides with the Mongols, who have promised food for his men, and challenges Jin to a duel. Jin defeats and wounds Ryuzo, but he manages to escape and alarm the Mongols to his presence. Jin presses further into Castle Kaneda, eventually finding his uncle at the top of the inner keep and rescuing him. Shimura informs Jin that Khotun has already left towards Toyotama to conquer Castle Shimura. Having reunited with his uncle, Jin and his friends are successfully able to retake the castle, defeating the remaining Mongols still inside. Afterwards, Shimura, having heard from Khotun about Jin\'s dishonorable tactics, reprimands his nephew and warns him not to continue down this path, before assigning him to gather up more friends to retake Castle Shimura.'),
(7, 1, 1, '_autoGenTrophy_0006', 'In Toyotama, Jin recruits Norio and his warrior monks, and goes on to defend Yarikawa from a Mongol siege led by General Temuge, Jin fully embraces his \"Ghost of Tsushima\" persona after using the fearsome Ghost Stance to behead Temuge and terrify the Mongols into leaving Yarikawa for good. With the help of Lord Shimura, they hire the help of a pirate named Goro, who successfully gets a message to the shogun in the Japanese mainland for military assistance.'),
(8, 1, 1, '_autoGenTrophy_0007', 'With the Shogun\'s reinforcements on the way, Jin returns to Omi Village to reclaim his family armor and reunites with his old caretaker, Yuriko, who teaches him how to make poison. Learning that Ryuzo is in Fort Koyasan, Jin bids farewell to Yuna and Taka, who are leaving Tsushima to begin new lives, and heads off to confront his old friend.'),
(9, 1, 1, '_autoGenTrophy_0008', 'At Fort Koyasan, Taka arrives unexpectedly to aid Jin, inspired by his actions in Yarikawa. Taka says that he wants to help the Ghost and will serve as a distraction to the Mongols at the entrance. Jin is hesitant, but agrees with the strategy. Once Taka distracts the guards, Jin makes his way through the fort, where he encounters Ryuzo. Jin prepares to duel Ryuzo, but is ambushed by a Straw Hat and is knocked out. He wakes up, tied to a pole, across from Taka, also captured. Jin asks Taka how he was captured, and Taka replies that once he realized that Jin had been gone for so long, he had to return to the camp to see what happened, resulting in his capture. As Jin and Taka struggle to get free, Khotun personally approaches the two men and tells Jin that the war can simply be over if Jin tells his forces to surrender. Not only would the war be over, but Jin would be second-in-command to Khotun as he continues with his invasion. Jin refuses the offer. Khotun frees Taka and gives him a sword, ordering him to kill Jin. Taka instead tries to strike at Khotun, but is quickly struck down and beheaded by the Khan, much to the horror and anger of Jin. Jin wakes up again, at 3:00 PM. Enraged at the death of Taka, Jin frees himself, obtains his armor and weaponry, furiously kills several Straw Hats and fights his way to the inner courtyard, where he meets a worried Yuna. Yuna asks where her brother is, and Jin hesitates, causing Yuna to run into the courtyard and discover her brother\'s decapitated body. Initially, she blames Jin for Taka\'s death as Taka wanted to be like the Ghost, but the two hear Mongols and Straw Hats closing in on their location and prepare for battle. They kill the arriving forces in fury and escape the courtyard, leaving Ryuzo as the Straw Hats\' sole survivor.'),
(10, 1, 1, '_autoGenTrophy_0009', 'Jin, more determined than ever to kill the Khan, regroups with Shimura to plan an assault on Castle Shimura, and they are able to push the Mongols into the inner keep. However, the final offensive ends in disaster, with Shimura foolishly ordering a frontal charge on the bridge to the inner keep, which is demolished by Mongol incendiaries which kill many samurai. Realizing that Shimura\'s insistence on upholding honor will only bring more unnecessary bloodshed, Jin and Yuna execute a plan to sneak inside the castle and poison the Mongols. Yuna collects as many bushels of wolfsbane for Jin to use, and also gives him the Ghost Armor, an armor set that Taka was making for Jin before his death. After successfully poisoning the Mongols, Jin finds Ryuzo in the keep, where he learns that Khotun has again left to invade Kamiagata in the north. Rejecting a last-minute plea to lie to his people that Ryuzo was Jin\'s spy, Jin engages his former friend in one final duel, defeating him and bidding him farewell before killing him. As Jin and Yuna are about to leave, Lord Shimura and his forces arrive and see what Jin has done. Furious, Lord Shimura criticizes Jin for resorting to \"dishonorable\" tactics such as poison, but Jin is content that Shimura\'s ways can no longer save their people. Knowing that the Shogun will want to execute Jin for his disloyalty and for threatening the social hierarchy of the samurai, Shimura pleads Jin to renounce his \"Ghost\" persona and scapegoat Yuna, but Jin refuses. Before he is arrested, Jin gives his equipment to Yuna and convinces her to continue the hunt for the Khan without him.'),
(11, 1, 1, '_autoGenTrophy_0010', 'Later, Kenji makes his way to Jin\'s cell in Castle Shimura and informs him that Yuna has tracked down the Khan\'s location in the north. Realizing that Tsushima still needs him, Jin escapes from the castle, but his horse is shot by archers and eventually succumbs to its wounds. Without his equipment, Jin walks further into the Kin Sanctuary, where he discovers to his horror that Khotun had learned to recreate his poison, experimenting on the people of Kin. Jin himself is poisoned and is barely saved by Yuna for a third time. Meanwhile, Khotun retreats to Port Izumi, where he plans to use the poison against the Japanese mainland. Jin and Yuna manage to assume control over the Jogaku Temple, which they use as their new staging camp by luring the Mongols out of the temple onto a frozen lake, before activating a set of explosive barrels to finish them off.'),
(12, 1, 1, '_autoGenTrophy_0011', 'Jin and Yuna plan to reunite with their friends in Kamiagata, however they must find a way to sneak them through from Toyotama, which is blocked off by Castle Shimura. The only path available is through Fort Kaminodake, which is inhabited from Mongols. Jin enlists the help of Yuna\'s old acquaintance Takeshi and his hunters to attack the fort from the north, and with the help of Yuna and his friends from the south successfully clear the path. To form a plan of attack to kill the Khan, who is surrounded by an army in Port Izumi, Jin and Yuna plan to get a bird\'s eye view over the port in a nearby lighthouse. At the bottom of the lighthouse, Jin notices that the Khan is stockpiling wolfsbane and deduces the Khan\'s plan to use the poison against the mainland to take over Japan. At the top of the lighthouse Jin and Yuna assesses the port\'s weaknesses and come up with a plan of attack, which they decide to execute on an imminent storm; forcing the Khan to shelter his ships in the bay, allowing Jin to destroy the ships filled with explosives and poison. Before the attack, Jin decides to sneak into Lord Shimura\'s castle to leave him a note asking for his help to take down the Khan. Although Yuna objects to the idea, she eventually concedes, gifting Jin with a new horse in order to travel to the castle. After successfully leaving the note for Lord Shimura, Jin gathers his friends and prepares for a final assault on Port Izumi. After launching a successful ambush on the Mongols using Kenji\'s siege weapons as a distraction, Jin\'s friends lead an attack on the main gate while Jin finds a way to sneak inside the port to find the Khan. He infiltrates the settlement and confronts Khotun Khan on his flagship, killing his men before successfully defeating him. As the Khan tries to voice his hopes that the Mongols will return to Tsushima, Jin denounces him before beheading him and leaving his body and head to burn on his sinking flagship, avenging Taka, Lord Adachi, the people of Tsushima and all of his friends whose lives were claimed by the Khan and his forces, including the Samurai who died at Komoda Beach, before escaping the burning flagship and reuniting with Yuna.'),
(13, 1, 1, '_autoGenTrophy_0012', 'With Tsushima restored to shogun rule, Jin is summoned by Lord Shimura. Shimura informs Jin that the shogun has dissolved Clan Sakai and branded Jin a traitor; under the shogun\'s orders, Shimura is forced to kill Jin. Jin and Shimura reluctantly duel each other, and Jin defeats Shimura. Jin can either choose to honor Shimura\'s request and kill him to give him a proper samurai\'s death or completely abandon his samurai ways and spare Shimura. Either way, Jin is forever branded as a traitor to the shogunate, and lives out the rest of his life as the Ghost of Tsushima.');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `loretype`
--

CREATE TABLE `loretype` (
  `typeID` int NOT NULL,
  `typeName` varchar(255) COLLATE utf8mb3_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;

--
-- A tábla adatainak kiíratása `loretype`
--

INSERT INTO `loretype` (`typeID`, `typeName`) VALUES
(1, 'main'),
(2, 'side');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `userID` int NOT NULL,
  `userName` varchar(255) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `steamID` varchar(255) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `admin` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`userID`, `userName`, `password`, `email`, `steamID`, `admin`) VALUES
(1, 'gergo', 'asd123', 'gergonagy1122@gmail.com', '76561198811836115', 1),
(2, 'tesztuser', 'asd123', 'joemail@email.com', 'ijdgsiu298479', 0);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `additionallore`
--
ALTER TABLE `additionallore`
  ADD PRIMARY KEY (`postID`),
  ADD UNIQUE KEY `publisher` (`publisher`),
  ADD UNIQUE KEY `relatedPageID` (`relatedPageID`);

--
-- A tábla indexei `jatek`
--
ALTER TABLE `jatek`
  ADD PRIMARY KEY (`jatekID`);

--
-- A tábla indexei `jatekloretracker`
--
ALTER TABLE `jatekloretracker`
  ADD PRIMARY KEY (`trackerID`),
  ADD UNIQUE KEY `jatekID` (`jatekID`),
  ADD KEY `userID` (`userID`);

--
-- A tábla indexei `lorepage`
--
ALTER TABLE `lorepage`
  ADD PRIMARY KEY (`pageID`),
  ADD KEY `jatekID` (`jatekID`),
  ADD KEY `typeID` (`typeID`);

--
-- A tábla indexei `loretype`
--
ALTER TABLE `loretype`
  ADD PRIMARY KEY (`typeID`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `userName` (`userName`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `additionallore`
--
ALTER TABLE `additionallore`
  MODIFY `postID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `jatek`
--
ALTER TABLE `jatek`
  MODIFY `jatekID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `jatekloretracker`
--
ALTER TABLE `jatekloretracker`
  MODIFY `trackerID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `lorepage`
--
ALTER TABLE `lorepage`
  MODIFY `pageID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT a táblához `loretype`
--
ALTER TABLE `loretype`
  MODIFY `typeID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `userID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `additionallore`
--
ALTER TABLE `additionallore`
  ADD CONSTRAINT `additionallore_ibfk_1` FOREIGN KEY (`publisher`) REFERENCES `user` (`userID`),
  ADD CONSTRAINT `additionallore_ibfk_2` FOREIGN KEY (`relatedPageID`) REFERENCES `lorepage` (`pageID`);

--
-- Megkötések a táblához `jatekloretracker`
--
ALTER TABLE `jatekloretracker`
  ADD CONSTRAINT `jatekloretracker_ibfk_1` FOREIGN KEY (`jatekID`) REFERENCES `jatek` (`jatekID`),
  ADD CONSTRAINT `jatekloretracker_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`);

--
-- Megkötések a táblához `lorepage`
--
ALTER TABLE `lorepage`
  ADD CONSTRAINT `lorepage_ibfk_1` FOREIGN KEY (`jatekID`) REFERENCES `jatek` (`jatekID`),
  ADD CONSTRAINT `lorepage_ibfk_2` FOREIGN KEY (`typeID`) REFERENCES `loretype` (`typeID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
