-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Ápr 15. 08:09
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

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
CREATE DATABASE IF NOT EXISTS `loretracker` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `loretracker`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `additionallore`
--

CREATE TABLE `additionallore` (
  `postID` int(11) NOT NULL,
  `jatekID` int(11) NOT NULL,
  `typeID` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `publisher` int(11) NOT NULL,
  `accepted` tinyint(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `likeCounter` int(11) NOT NULL,
  `relatedPageID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `additionallore`
--

INSERT INTO `additionallore` (`postID`, `jatekID`, `typeID`, `title`, `body`, `publisher`, `accepted`, `created_at`, `likeCounter`, `relatedPageID`) VALUES
(6, 1, 1, 'A szöveg', 'cdcad', 1, 0, '2025-04-09 13:15:05', 0, 13),
(7, 1, 1, 'Valami', 'vsdvbrbrber', 8, 0, '2025-04-09 13:18:07', -1, 17),
(8, 2, 1, 'Valami1', 'Szöveg - 1', 9, 0, '2025-04-14 18:30:37', 0, 29),
(9, 2, 1, 'Valami2', 'Szöveg - 2', 9, 0, '2025-04-14 18:56:27', 0, 31),
(10, 1, 1, 'Valami 2', 'Szöveg 2', 1, 0, '2025-04-14 21:47:28', 0, 14),
(11, 1, 1, 'Valami Más - 1', 'Más szöveg - 1', 9, 0, '2025-04-14 22:57:38', 0, 10);

--
-- Eseményindítók `additionallore`
--
DELIMITER $$
CREATE TRIGGER `additional_delete_logger` AFTER DELETE ON `additionallore` FOR EACH ROW BEGIN
  INSERT INTO additionallore_log (muvelet, ido, postID, publisher, title, accepted)
  VALUES('delete', NOW(), OLD.postID, OLD.publisher, OLD.title, OLD.accepted);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `additional_insert_logger` AFTER INSERT ON `additionallore` FOR EACH ROW BEGIN
  INSERT INTO additionallore_log (muvelet, ido, postID, publisher, title, accepted)
  VALUES('insert', NOW(), NEW.postID, NEW.publisher, NEW.title, NEW.accepted);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `additional_update_logger` AFTER UPDATE ON `additionallore` FOR EACH ROW BEGIN
  INSERT INTO additionallore_log (muvelet, ido, postID, publisher, title, accepted)
  VALUES('update', NOW(), NEW.postID, NEW.publisher, NEW.title, NEW.accepted);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `additionallore_log`
--

CREATE TABLE `additionallore_log` (
  `logID` int(11) NOT NULL,
  `muvelet` varchar(255) NOT NULL,
  `ido` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `postID` int(11) NOT NULL,
  `publisher` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `accepted` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `additionallore_log`
--

INSERT INTO `additionallore_log` (`logID`, `muvelet`, `ido`, `postID`, `publisher`, `title`, `accepted`) VALUES
(2, 'update', '2025-03-21 11:53:35', 3, 1, 'asd', 0),
(3, 'update', '2025-03-29 12:54:16', 3, 1, 'asd', 0),
(4, 'update', '2025-03-29 12:54:32', 3, 1, 'asd', 0),
(5, 'update', '2025-03-29 12:54:46', 3, 1, 'asd', 0),
(6, 'update', '2025-03-29 12:54:54', 3, 1, 'asd', 0),
(7, 'insert', '2025-04-09 13:14:57', 5, 1, 'ascscqwcqfdwafgregre', 0),
(8, 'insert', '2025-04-09 13:15:05', 6, 1, 'csdvevew', 0),
(9, 'insert', '2025-04-09 13:18:07', 7, 8, 'Valami', 0),
(10, 'update', '2025-04-09 13:19:19', 6, 1, 'A szöveg', 0),
(11, 'delete', '2025-04-09 13:20:59', 5, 1, 'ascscqwcqfdwafgregre', 0),
(12, 'insert', '2025-04-14 18:30:37', 8, 9, 'Valami', 0),
(13, 'insert', '2025-04-14 18:56:27', 9, 9, 'Valami2', 0),
(14, 'update', '2025-04-14 19:37:16', 7, 8, 'Valami', 0),
(15, 'delete', '2025-04-14 21:46:56', 3, 1, 'asd', 0),
(16, 'insert', '2025-04-14 21:47:28', 10, 1, 'Valami 2', 0),
(17, 'update', '2025-04-14 22:12:24', 6, 1, 'A szöveg', 0),
(18, 'update', '2025-04-14 22:14:04', 8, 9, 'Valami1', 0),
(19, 'insert', '2025-04-14 22:57:38', 11, 9, 'Valami Más - 1', 0);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `jatek`
--

CREATE TABLE `jatek` (
  `jatekID` int(11) NOT NULL,
  `nev` varchar(255) NOT NULL,
  `steamID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `jatek`
--

INSERT INTO `jatek` (`jatekID`, `nev`, `steamID`) VALUES
(1, 'Ghost of Tsushima', 2215430),
(2, 'Horizon Zero Dawn', 1151640),
(3, 'Team Fortress 2', 440);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `lorepage`
--

CREATE TABLE `lorepage` (
  `pageID` int(11) NOT NULL,
  `jatekID` int(11) NOT NULL,
  `typeID` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `chapterName` varchar(255) NOT NULL,
  `body` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `lorepage`
--

INSERT INTO `lorepage` (`pageID`, `jatekID`, `typeID`, `title`, `chapterName`, `body`) VALUES
(1, 1, 1, '_autoGenTrophy_0001', 'Gathering Storm', 'The Mongol Empire under Khotun Khan launched an invasion of Tsushima in 1274. Jin is one of eighty samurai who were sent in a desperate suicidal attack against the Mongols at Komoda Beach, aiming to slow the invasion force down before they reach the Japanese mainland. During the battle, Jin was grievously wounded and left for dead, while Shimura was captured and the rest of the samurai on the beach are annihilated. Jin was narrowly saved by the thief Yuna, who nursed him back to health and saved him from the Mongols. Following the battle, the Mongols take over most of the island, killing or enslaving anyone who resisted their rule.'),
(3, 1, 1, '_autoGenTrophy_0002', 'Point of No Return', 'Against Yuna\'s warnings that the attempt would be futile, Jin attacks Castle Kaneda, where Shimura was imprisoned, in order to save his uncle. Before he reaches the main keep of the castle, he is confronted in one-on-one combat with Khotun Khan; although Jin manages to wound Khotun\'s face, he is ultimately outmatched and thrown off a bridge. Jin narrowly survives the fall, and escapes with Yuna with the help of a pair of the Samurai horses they used to travel to the castle. Realizing that he cannot defeat the Mongols by himself or with the traditional samurai techniques and tactics, Jin opts to scour the island in search of friends and new fighting techniques in order to retake Castle Kaneda and rescue his uncle.'),
(4, 1, 1, '_autoGenTrophy_0003', 'Company of Wolves', 'Jin enlists the help of Sensei Ishikawa, in exchange for aid in hunting his former student Tomoe, and Masako Adachi, who agrees in exchange for help in hunting the killers of her family. Jin also locates Ryuzo, who seeks help in finding food for his starving men; Ryuzo is increasingly frustrated when their attempts fail, but he nevertheless agrees to help. Jin helps Yuna find her brother Taka, who is an expert blacksmith that could help Jin craft a device to help him scale the walls of Castle Kaneda. In the process, Jin begins to walk away from the Samurai ways, after Yuna convinces him to begin striking the shadows and killing the Mongols from stealth, which Shimura had told him was a coward\'s way of eliminating a foe.'),
(5, 1, 1, '_autoGenTrophy_0004', 'Stoking the Flame', 'After discovering that Taka is being held in Azamo Bay, Jin and Yuna mount a successful rescue mission with the help of sake merchant Kenji. In Komatsu Forge, Jin and Yuna fend off Mongols in order to buy Taka time to complete a special Grapple hook. After the battle, Taka remarks that he\'s never seen any samurai fight the way Jin has before. Yuna crafts a tale to explain Jin\'s superhuman abilities, boasting to onlookers that Jin is not human, but a vengeful ghost - a story that sticks and results in Jin becoming known as the legendary Ghost of Tsushima.'),
(6, 1, 1, '_autoGenTrophy_0005', 'Family Reunion', 'Jin calls for his friends to commence the assault on Castle Kaneda. After managing to get inside the inner keep, however, Ryuzo betrays Jin and sides with the Mongols, who have promised food for his men, and challenges Jin to a duel. Jin defeats and wounds Ryuzo, but he manages to escape and alarm the Mongols to his presence. Jin presses further into Castle Kaneda, eventually finding his uncle at the top of the inner keep and rescuing him. Shimura informs Jin that Khotun has already left towards Toyotama to conquer Castle Shimura. Having reunited with his uncle, Jin and his friends are successfully able to retake the castle, defeating the remaining Mongols still inside. Afterwards, Shimura, having heard from Khotun about Jin\'s dishonorable tactics, reprimands his nephew and warns him not to continue down this path, before assigning him to gather up more friends to retake Castle Shimura.'),
(7, 1, 1, '_autoGenTrophy_0006', 'Leader of the People', 'In Toyotama, Jin recruits Norio and his warrior monks, and goes on to defend Yarikawa from a Mongol siege led by General Temuge, Jin fully embraces his \"Ghost of Tsushima\" persona after using the fearsome Ghost Stance to behead Temuge and terrify the Mongols into leaving Yarikawa for good. With the help of Lord Shimura, they hire the help of a pirate named Goro, who successfully gets a message to the shogun in the Japanese mainland for military assistance.'),
(8, 1, 1, '_autoGenTrophy_0007', 'Birthright', 'With the Shogun\'s reinforcements on the way, Jin returns to Omi Village to reclaim his family armor and reunites with his old caretaker, Yuriko, who teaches him how to make poison. Learning that Ryuzo is in Fort Koyasan, Jin bids farewell to Yuna and Taka, who are leaving Tsushima to begin new lives, and heads off to confront his old friend.'),
(9, 1, 1, '_autoGenTrophy_0008', 'Dying Embers', 'At Fort Koyasan, Taka arrives unexpectedly to aid Jin, inspired by his actions in Yarikawa. Taka says that he wants to help the Ghost and will serve as a distraction to the Mongols at the entrance. Jin is hesitant, but agrees with the strategy. Once Taka distracts the guards, Jin makes his way through the fort, where he encounters Ryuzo. Jin prepares to duel Ryuzo, but is ambushed by a Straw Hat and is knocked out. He wakes up, tied to a pole, across from Taka, also captured. Jin asks Taka how he was captured, and Taka replies that once he realized that Jin had been gone for so long, he had to return to the camp to see what happened, resulting in his capture. As Jin and Taka struggle to get free, Khotun personally approaches the two men and tells Jin that the war can simply be over if Jin tells his forces to surrender. Not only would the war be over, but Jin would be second-in-command to Khotun as he continues with his invasion. Jin refuses the offer. Khotun frees Taka and gives him a sword, ordering him to kill Jin. Taka instead tries to strike at Khotun, but is quickly struck down and beheaded by the Khan, much to the horror and anger of Jin. Jin wakes up again, at 3:00 PM. Enraged at the death of Taka, Jin frees himself, obtains his armor and weaponry, furiously kills several Straw Hats and fights his way to the inner courtyard, where he meets a worried Yuna. Yuna asks where her brother is, and Jin hesitates, causing Yuna to run into the courtyard and discover her brother\'s decapitated body. Initially, she blames Jin for Taka\'s death as Taka wanted to be like the Ghost, but the two hear Mongols and Straw Hats closing in on their location and prepare for battle. They kill the arriving forces in fury and escape the courtyard, leaving Ryuzo as the Straw Hats\' sole survivor.'),
(10, 1, 1, '_autoGenTrophy_0009', 'The Ghost', 'Jin, more determined than ever to kill the Khan, regroups with Shimura to plan an assault on Castle Shimura, and they are able to push the Mongols into the inner keep. However, the final offensive ends in disaster, with Shimura foolishly ordering a frontal charge on the bridge to the inner keep, which is demolished by Mongol incendiaries which kill many samurai. Realizing that Shimura\'s insistence on upholding honor will only bring more unnecessary bloodshed, Jin and Yuna execute a plan to sneak inside the castle and poison the Mongols. Yuna collects as many bushels of wolfsbane for Jin to use, and also gives him the Ghost Armor, an armor set that Taka was making for Jin before his death. After successfully poisoning the Mongols, Jin finds Ryuzo in the keep, where he learns that Khotun has again left to invade Kamiagata in the north. Rejecting a last-minute plea to lie to his people that Ryuzo was Jin\'s spy, Jin engages his former friend in one final duel, defeating him and bidding him farewell before killing him. As Jin and Yuna are about to leave, Lord Shimura and his forces arrive and see what Jin has done. Furious, Lord Shimura criticizes Jin for resorting to \"dishonorable\" tactics such as poison, but Jin is content that Shimura\'s ways can no longer save their people. Knowing that the Shogun will want to execute Jin for his disloyalty and for threatening the social hierarchy of the samurai, Shimura pleads Jin to renounce his \"Ghost\" persona and scapegoat Yuna, but Jin refuses. Before he is arrested, Jin gives his equipment to Yuna and convinces her to continue the hunt for the Khan without him.'),
(11, 1, 1, '_autoGenTrophy_0010', 'The Exiled Alliance', 'Later, Kenji makes his way to Jin\'s cell in Castle Shimura and informs him that Yuna has tracked down the Khan\'s location in the north. Realizing that Tsushima still needs him, Jin escapes from the castle, but his horse is shot by archers and eventually succumbs to its wounds. Without his equipment, Jin walks further into the Kin Sanctuary, where he discovers to his horror that Khotun had learned to recreate his poison, experimenting on the people of Kin. Jin himself is poisoned and is barely saved by Yuna for a third time. Meanwhile, Khotun retreats to Port Izumi, where he plans to use the poison against the Japanese mainland. Jin and Yuna manage to assume control over the Jogaku Temple, which they use as their new staging camp by luring the Mongols out of the temple onto a frozen lake, before activating a set of explosive barrels to finish them off.'),
(12, 1, 1, '_autoGenTrophy_0011', 'Sovereign End', 'Jin and Yuna plan to reunite with their friends in Kamiagata, however they must find a way to sneak them through from Toyotama, which is blocked off by Castle Shimura. The only path available is through Fort Kaminodake, which is inhabited from Mongols. Jin enlists the help of Yuna\'s old acquaintance Takeshi and his hunters to attack the fort from the north, and with the help of Yuna and his friends from the south successfully clear the path. To form a plan of attack to kill the Khan, who is surrounded by an army in Port Izumi, Jin and Yuna plan to get a bird\'s eye view over the port in a nearby lighthouse. At the bottom of the lighthouse, Jin notices that the Khan is stockpiling wolfsbane and deduces the Khan\'s plan to use the poison against the mainland to take over Japan. At the top of the lighthouse Jin and Yuna assesses the port\'s weaknesses and come up with a plan of attack, which they decide to execute on an imminent storm; forcing the Khan to shelter his ships in the bay, allowing Jin to destroy the ships filled with explosives and poison. Before the attack, Jin decides to sneak into Lord Shimura\'s castle to leave him a note asking for his help to take down the Khan. Although Yuna objects to the idea, she eventually concedes, gifting Jin with a new horse in order to travel to the castle. After successfully leaving the note for Lord Shimura, Jin gathers his friends and prepares for a final assault on Port Izumi. After launching a successful ambush on the Mongols using Kenji\'s siege weapons as a distraction, Jin\'s friends lead an attack on the main gate while Jin finds a way to sneak inside the port to find the Khan. He infiltrates the settlement and confronts Khotun Khan on his flagship, killing his men before successfully defeating him. As the Khan tries to voice his hopes that the Mongols will return to Tsushima, Jin denounces him before beheading him and leaving his body and head to burn on his sinking flagship, avenging Taka, Lord Adachi, the people of Tsushima and all of his friends whose lives were claimed by the Khan and his forces, including the Samurai who died at Komoda Beach, before escaping the burning flagship and reuniting with Yuna.'),
(13, 1, 1, '_autoGenTrophy_0012', 'Mono No Aware', 'With Tsushima restored to shogun rule, Jin is summoned by Lord Shimura. Shimura informs Jin that the shogun has dissolved Clan Sakai and branded Jin a traitor; under the shogun\'s orders, Shimura is forced to kill Jin. Jin and Shimura reluctantly duel each other, and Jin defeats Shimura. Jin can either choose to honor Shimura\'s request and kill him to give him a proper samurai\'s death or completely abandon his samurai ways and spare Shimura. Either way, Jin is forever branded as a traitor to the shogunate, and lives out the rest of his life as the Ghost of Tsushima.'),
(14, 1, 3, '_autoGenTrophy_0013', 'The Warrior Monk', 'Norio is one of the few remaining warrior monks of Cedar Temple. Cedar Temple was formerly led by his older brother, Enjo, who was nicknamed the \"Guardian of Cedar Temple\". After hearing of the defeat of the samurai at the Battle of Komoda Beach, Enjo, Norio, and the other warrior monks rode south to fight against the Mongols there.\r\n<br><br>\r\nHowever, they were captured by the Mongols at Akashima and later imprisoned in Fort Ito. The warrior monks were tortured and imprisoned in a ditch, starving to death, if not brutally executed by the Mongols. His brother, Enjo, is presumably killed, along with all the other warrior monks. After Jin Sakai and Lord Shimura liberate the fort, they rescue Norio, who suffers from survivor\'s guilt.\r\n<br><br>\r\nJin and Norio help rescue the captured monks in Akashima and find Hochi, one of Norio\'s friends. After Hochi\'s rescue, the Mongols plan to attack Akashima Village in response. While the Mongol attack is successfully fended off, Hochi is killed blocking an attack meant for Norio. Jin encourages Norio to press on, and determined, Norio travels further north to Kushi Temple.\r\n<br><br>\r\nThe two defeat the Mongols occupying the temple, but find the monks of Kushi Temple unwilling to fight the Mongols and the temple\'s Buddha statue missing. They reclaim the statue, but the temple is attacked a second time by the Mongols, destroying the statue in the process. Nonetheless, Jin and Norio once again defends the temple successfully, inspiring the monks of Kushi Temple to join the resistance against the Mongols.\r\n<br><br>\r\nNorio helps Jin in retaking Castle Shimura and Fort Kaminodake, before continuing on his mission to retake Cedar Temple. Later, Jin finds him in Jogaku Prefecture, preparing for the attack on Cedar Temple with the help of the remaining monks of Kushi Temple and Cedar Temple. Norio and the monks defeat the Mongols with Jin\'s help.\r\n<br><br>\r\nIn Cedar Temple, Norio finds that his brother, Enjo, had survived the torture from the Mongols, but had all four of his limbs cruelly amputated, and his body burned and mutilated. Enjo had survived long enough to see Norio one last time and for Norio to perform a mercy kill for him.\r\n<br><br>\r\nNorio learns that the Mongol general responsible for Enjo\'s torture is Kharchu. After mercifully finishing off Enjo, Norio finally breaks and seeks revenge. He enlists the help of Jin to attack Fort Shouni, which Kharchu operates, but goes to attack the fort alone while Jin is sleeping to burn the fort down and brutally execute Kharchu by burning him alive. Norio expresses regret that he had been blinded by hate and revenge. Jin encourages him again to move forward in order to honor his brother\'s legacy and lead the monks of Cedar Temple.'),
(15, 1, 3, '_autoGenTrophy_0014', 'The Vengeful Warrior', 'Masako is a member of Clan Adachi. When she was a teenager, she was able to fend off a group of bandits on her own to defend her family\'s home. This impressed the head of Clan Adachi, Harunobu Adachi, enough that he wished to marry her. This made her older sister, Hana, jealous of Masako\'s success. Aware of her sister\'s envy, Masako arranges Hana to be married to a retainer of a smaller samurai clan, Clan Kikuchi. Unbeknownst to Masako, however, Hana did not enjoy a happy life under Clan Kikuchi, being constantly abused by her drunken husband, Ikeda. This deepened the envy and hatred Hana had for Clan Adachi.\r\n<br><br>\r\nMasako\'s intentions of carrying out justice and honor in Clan Adachi\'s name resulted in the Clan making more enemies than just Hana. Masako dismissed one of the clan\'s retainers, Kajiwara, after she had caught him beating his wife and daughter. She and Clan Adachi also cut ties with one of their suppliers, Omura, after he cheated them out of their supplies and tried to blame one of her sons, Yasunari. Masako also suspected the Kuta Farmstead headman, Sadao of hoarding rice for himself, and Sadao was removed as headman. While Masako loved Harunobu, she also fell in love with a thief named Mai. Masako was eventually forced to banish her after Harunobu caught her stealing and wanted her flogged as punishment. All of this provided Hana more allies for her conspiracy to wipe out Clan Adachi.\r\n<br><br>\r\nHarunobu was later killed by Khotun Khan on the night of the Mongol invasion at the Battle of Komoda Beach. Her sons, Yasunari and his brother Shigesato, were also killed on the night of the invasion, hung from a tree by the Mongols. The rest of her family was then attacked by Hana\'s assassins. While Hana ran with the children to \'safety\', Masako stayed behind with her sons\' wives to fight the attackers. They were outnumbered, and before long Masako was the only one still alive. When she escaped, she found the children killed and a mutilated body that she assumed was Hana, unaware she had faked her death to avoid suspicion. Thus, Masako comes to the realization that she is the only survivor of Clan Adachi.\r\n<br><br>\r\nWhen Jin Sakai finds her, Masako is burying her dead relatives while going to the Golden Temple to settle temporarily. Jin seeks help to rescue his uncle Lord Shimura from Khotun\'s clutches, and Masako agrees to help in exchange for Jin\'s aid in avenging her family. Unaware of Hana\'s involvement, she suspects one of the monks, Sogen, of conspiring against her clan, and has Jin provoke him into leading them to the bandits that killed her family. After dispatching the bandits, Masako confronts a cornered Sogen, who expresses no remorse for his involvement. Out of anger, she executes Sogen before they can question him further, but Jin is able find a list Sogen was keeping detailing the identities of four other conspirators: Sadao, Omura, Kajiwara, and Mai.\r\n<br><br>\r\nMasako first finds Sadao\'s brother, Hachi, who runs a supply convoy for Sadao. On the way, Jin and Masako find Sadao\'s wife, Hina, and brings her to the Adachi Estate for questioning. As Masako and Jin are distracted, however, Hina is murdered by Hachi in order to silence her. Hachi was then fatally wounded by a group of Mongols, but the two manage to find papers that detailed Hachi\'s supply routes. With the help of Junshin, a Golden Temple monk responsible for setting up the camps in Izuhara, they corner Sadao at Ariake Lighthouse. Masako is again angered into killing the conspirator before they can question him.\r\n<br><br>\r\nMasako goes to Komoda Beach to find her sons and bury them, but is soon attacked by some Mongols. Jin saves her, and the two proceed to search the beach for her sons. Masako and Jin find them strung up on a tree by the Mongols, and two cut them down. They decide to bury Shigesato and Yasunari at Komoda Lighthouse, which they used to play at. After clearing out the Mongols there, they perform the burial. Masako thanks Jin for being a good friend, and he gives her some time alone to mourn her sons. With these favors completed, Masako repays Jin by aiding him in the assault against Castle Kaneda and the rescuing of his uncle. Afterwards, Masako resumes her search for the remaining conspirators in Toyotama.\r\n<br><br>\r\nMasako and Jin learn that Omura had died since the twenty years Masako had seen him, and that his two sons attempted to carry on his desire for revenge against Clan Adachi. While trailing the brothers, Masako and Jin learn that Omura\'s sons supplied the weapons for the massacre, although one is more guilt-ridden in the other. The other son has blackmailed the conspirators\' leader for more money in exchange for their discretion, exchanging letters for a meeting Umugi Cove. Masako and Jin follow the brothers to this meeting to gain information, only to witness the conspirator leader\'s men double-cross the brothers and kill them, preventing them from gathering new information.\r\n<br><br>\r\nMasako asks Junshin about the location of the fourth conspirator, Kajiwara, but Junshin vouches for his morality, fearing that Masako is blinded by rage. Jin arrives and convinces Junshin to tell them that Kajiwara is a fisherman who lives on a nearby beach, after Jin promises they will just talk to him. On the way, Masako informs Jin that Kajiwara was a retainer for her clan, but they kicked him out after they caught him beating his wife and daughter. They arrived at Kajiwara\'s home, but finds that the Mongols have gotten there first. After clearing out the Mongols, Masako and Jin enter the hut and find Kajiwara\'s wife and daughter dead, and proceed the track down the fleeing Kajiwara. and Masako and Jin promptly learn that Kajiwara had killed his family out of cowardice to prevent them from dying to the Mongols. Disgusted, Masako executes Kajiwara. Jin theorizes that connections the conspirators had to Clan Adachi means the attack was personal, probably organized by a rival samurai clan, although Masako cannot think of which one.\r\n<br><br>\r\nUpon liberating Koshimizu Farmstead, Jin learns from Junshin that Masako is there searching for the last conspirator, Mai, and meets with Masako. Masako explains that Mai is a former servant who was dismissed after Masako\'s husband caught her stealing. Mai also looted Adachi estate after said estate was attacked, and stole valuable items from it. Masako is particularly upset by this betrayal, as it is heavily implied that Mai is her former lover. They find Mai with a group of Straw Hats, planning to sell the heirlooms at the right time, but Mai learns that the head conspirator wants the heirlooms for themselves. As Mai is forced to lead them to the heirlooms, Masako and Jin quietly assassinate the Ronin, leaving only Mai alive. Mai admits that she felt betrayed when Masako banished her and that she still loves Masako, who spares her life after she leads them to her buried family heirlooms. Mai also tells them that, while she did not know the conspirator\'s leader directly, the leader wrote through notes on how they wanted to start their own clan and implies that they were somehow related to Masako due to the possessive language used in regards to the heirlooms.\r\n<br><br>\r\nJin later finds Masako interrogating some monks and learns that she suspects that Junshin is connected to the conspirators\' leader, having found a letter bearing writing similar to the leader\'s writing, asking for Masako\'s whereabouts in exchange for supplies. Jin expresses skepticism at the minor connection and is firm on wanting to calmly talk to Junshin, who is dealing with a Mongol attack at Red Leaf temple. Jin defeats the Mongols and saves Junshin from execution but the rage-blinded Masako is intent on killing him rather than talking. Sending Junshin to run for safety, Jin reluctantly duels Masako so that she will not harm Junshin. After defeating her, they fend off Mongol reinforcements. Jin berates Masako for her temper and recklessness, telling them that they cannot let anger consume them, and warns her not to try to kill him again. They then catch up to Junshin, who reveals he never worked for the conspirator and that the one who sent him the letter was named Lady Hana, whom Masako realizes is her sister, the true mastermind behind Clan Adachi\'s destruction. Sending Junshin away, Masako is distraught at the revelation and vows to confront her sister.\r\n<br><br>\r\nWith most of her family\'s killers dealt with, Masako aids Jin again in the assault on Castle Shimura, and later assists Jin and Yuna in attacking Fort Kaminodake. There, Jin finds Masako praying, asking her ancestors for forgiveness for what she is about to do. Jin joins Masako, who informs Jin that her sister has taken Clan Kikuchi\'s estate in Sago for herself, as Kikuchi\'s men fell at Komada beach, and their emblem matches the one on the notes. Masako notes that during the attack, Hana took the children and ran to the stables for \'safety\', which was simply a cover to kill them. Certain of her guilt, Jin and Masko arrive at her estate and begin to drive inwards to locate Hana. When Hana sees them coming, she openly admits to her involvement and sends her samurai at them. Jin confronts and defeats the samurai, while Masako chases down and corners her sister in one of the estate rooms.\r\n<br><br>\r\nMasako demands to know why Hana did what she did to her family, and Hana recounts that Masako sent her away with her husband Ikedi, who later turned out to be an abusive drunk. Hana does not show remorse for her actions and justifies the drastic measures in her revenge as necessary, stating that Masako would have to feel an eternity of pain to know the life Masako had forced on her. Masako refuses to kill her sister and instead allows Hana to commit suicide with her tanto, later giving her sister a funeral in respect. Lamenting the loss of her family and having no path, Masako decides to leave once the battle is over.'),
(16, 1, 3, '_autoGenTrophy_0015', 'The Unbending Archer', 'Ishikawa is a renowned samurai archer who formerly served under Clan Nagao of Tsushima. He taught one of their members, Hironori Nagao, the Way of the Bow. However, Hironori proceeded to use the Way of the Bow maliciously, starting a rebellion in order to take control of the clan. Hironori\'s rebellion failed and he was executed for his betrayal, but not before killing many of the clan\'s best men. In order to protect Clan Nagao\'s legacy, the clan fabricated a story that Hironori had instead been killed honorably fighting a pack of bandits. Ishikawa was blamed for enabling Hironori\'s betrayal, but was allowed to peacefully resign from his service to Clan Nagao.\r\n<br><br>\r\nIshikawa lived in seclusion in Hiyoshi Springs until a peasant girl, Tomoe, came to his dojo in order to receive training. Though reluctant, Ishikawa came to recognize Tomoe\'s talent for archery, and decided to accept her as his second student, in the hopes of training her into becoming a samurai and his heir. With Ishikawa\'s teachings, Tomoe turned from a common peasant into a deadly archer.\r\n<br><br>\r\nAt some point before the Mongol invasion, Ishikawa had learned that Tomoe had been in league with a band of assassins and using her training maliciously. In response, Ishikawa plotted to kill Tomoe and the two had fought, and in the process Ishikawa was prevented from participating in the Battle of Komoda Beach.\r\n<br><br>\r\nTomoe later sided with the Mongol invaders and began teaching them the Way of the Bow. After ambushing Fort Nakayama, Ishikawa reluctantly allows Jin Sakai to become his third student, training him how to use the bow.\r\n<br><br>\r\nWhile Jin helps Ishikawa find and capture Tomoe, Ishikawa is revealed to be an abrasive, callous and unforgiving sensei; he willingly enables Jin to walk right into a Mongol ambush, uses a peasant woman to scout Tomoe\'s camps which gets her killed, and even suggests sacrificing his home village, Hiyoshi Springs, in order to bait Tomoe out. Jin criticizes Ishikawa for his dishonorable behavior, believing that Ishikawa had pushed Tomoe into betraying him.\r\n<br><br>\r\nIshikawa ends up assisting Jin in the attack on Castle Kaneda, and later Castle Shimura. Later, Jin finds Tomoe, disguised as a trapper, \"Matsu\", in Kin Prefecture. She admits that she was captured by the Mongols and decided to teach them the Way of the Bow in order to keep herself alive, and that the prisoners that were brutally murdered in Fort Nakayama were given a quick and merciful death by her hand. She asks Ishikawa and Jin to defeat the Mongols at Umugi Cove for her to atone for her crimes, which Ishikawa and Jin uneasily accept.\r\n<br><br>\r\nThe three manage to fend off the Mongol attack on Umugi Cove, before Tomoe secures a boat to escape Tsushima. Before Ishikawa could shoot Tomoe, he finds a note she left for him and he decides to spare Tomoe after reading it, allowing her leave to start a new life on the Japanese mainland. After the ordeal, Ishikawa tells Jin that he has nothing left to teach him, other than to not repeat his mistakes.'),
(17, 1, 3, '_autoGenTrophy_0016', 'The Headstrong Thief', 'Early life<br>\r\nYuna and her younger brother, Taka, were born peasants in Yarikawa. Growing up with an alcoholic and physically abusive mother, Yuna became Taka\'s protector at an early age. A critical point in Yuna\'s life came when Taka was six: after their mother broke Taka\'s arm in a rage, Yuna took Taka and ran away. She would learn that her mother was found dead a month later.\r\n<br><br>\r\nYuna accepted the help of a figure known as Black Wolf, who she believed to be trustworthy. In reality, he was a slave trader and sexual predator of children. Yuna and Taka were drugged, taken advantage of, and later sold to the cruel slavers, the Mamushi brothers. Yuna and Taka, alongside another slave named Ichi, attempted an escape. However, Ichi was recaptured. After their escape, Yuna and Taka presumably live a nomadic life on Tsushima Island until the Mongols invaded. During the events of the game, it is clear that the traumas of enslavement and a difficult childhood continue to haunt Yuna.\r\n<br><br>\r\nYuna continued saving money wherever she could, in the hopes of moving to the mainland and starting a better life.\r\n<br><br>\r\n<b>Act I</b><br>\r\nAfter the Battle of Komoda Beach, Yuna finds Jin Sakai gravely wounded. After rescuing him from the beach, Yuna gradually nurses Jin back to health outside of Komoda Town while hiding him from the Mongol army. Once Jin regains his strength, she aides him in recovering his katana, which she traded for food and medicine to care for him. While they hide from Mongol guards, Yuna teaches Jin thief tactics that spark his journey to becoming the Ghost. Together, Yuna and Jin escape Komoda Town.\r\n<br><br>\r\nDuring their escape, Yuna asks Jin to aid her in saving her brother Taka who was taken by the Mongols, explaining that Taka is an expert blacksmith who could make any tool Jin needs. Jin agrees, but stipulates that Yuna must first help him save his uncle, Lord Shimura, from Khotun Khan at Castle Kaneda. Yuna agrees, but requires that Jin gets Yuna and Taka safe passage off Tsushima with Lord Shimura\'s help. Yuna accompanies Jin in his first attempt to rescue Shimura. Yuna fought alongside Jin to clear the lower castle, but stayed behind to prepare the horses and keep the way out clear. Following Jin\'s failed attempt, Yuna and Jin reunite in the forest nearby and they part ways, agreeing to regroup at a later time for a larger attack on Castle Kaneda. Yuna begins to gather more information on where Taka is being held.\r\n<br><br>\r\nLater, Jin and Yuna reunite and head to a Mongol prisoner camp where they believe Taka is being held. Unable to risk the possibility of the Mongols executing the prisoners, Yuna convinces Jin to go against his samurai code by striking from the shadows and killing the Mongols in stealth. However, Taka is not there. Yuna and Jin receive information from a Straw Hat that prisoners are being moved to Azamo Bay. Jin meets up with Yuna and her friend Kenji who confirms that Taka is being enslaved as a blacksmith in Azamo Bay. Having tailed a Mongol slaver in charge at Azamo Bay, Yuna, Jin, and Kenji discover that a slaver plans to kill Taka. This is due to a deceptive tip from another desperate and starving blacksmith who claimed his smithing was of a higher quality than Taka\'s, knowing he could survive if he became the blacksmith they decided to feed. Yuna follows the slaver to Taka, killing her brother\'s captor and escaping Azamo Bay with him alongside Jin. Shortly after, Yuna and Taka temporarily separate from Jin as they head to Komatsu Forge to work on a grappling hook for Jin that can aid him in his siege on Castle Kaneda. When Jin later joins them in Komatsu Forge, Yuna and Jin drive off the Mongol forces and save fleeing families. After the battle, Taka remarks that he\'s never seen any samurai fight the way Jin has before. Yuna crafts a tale to explain Jin\'s superhuman abilities, boasting to onlookers that Jin is not human, but a ghost - a story that sticks and results in Jin becoming known as the legendary Ghost of Tsushima. With her brother safe, Yuna fulfills her end of the bargain and assists Jin in a second siege on Castle Kaneda, resulting in the successful rescue of Lord Shimura and retaking Castle Kaneda from the Mongols.\r\n<br><br>\r\n<b>Act II</b><br>\r\nWith her promise fulfilled, Yuna asks that Jin fulfill her request that he and Lord Shimura help her and Taka get off Tsushima, believing there is nothing left for them there. Shimura agrees, but on the condition that she help him and Jin retake Castle Shimura. Yuna is visibly resentful of this condition, but reluctantly agrees. Jin later meets with Taka and Yuna outside of Yarikawa Stronghold, where the Mongols have the Yarikawa townspeople under siege. Wanting to recruit Shimura\'s old enemies to their fight against the Mongols, Taka, Yuna, and Jin sneak past the blockade through an old passageway the siblings used when they were children. The trio manage to get inside, but fail to persuade the Yaraikawa leader, Ujimasa, to fight with Shimura\'s army. Ujimasa expresses resentment toward Clans Sakai and Shimura due to their pivotal role in the destruction of Clan Yarikawa many years prior. Ujimasa dismisses Yuna and Jin, saying that he believes the Mongols will move on from Yarikawa, and that the people of Yarikawa can outlast a siege.\r\n<br><br>\r\nYuna and Jin help to repel the Mongols, hoping that with the help of Clan Sakai, old grudges may be forgiven and the people of Yarikawa will come to Lord Shimura\'s aid. Yuna and Jin embark on a dangerous mission to find and bring Yarikawa\'s best archers back to the stronghold. Yuna is increasingly concerned Taka\'s growing desire to fight the Mongols, believing that he will be hurt or killed, but she reluctantly allows him to come with her and Jin. Later, after successfully bringing back the archers, Yuna and Jin atop the tower in Yarikawa stronghold. To loosen their nerves before the Mongol attack, the two and begin drinking sake together. By nighttime, the drunken Yuna tells jokes about Kenji and opens up to Jin about her abusive mother, who Yuna saved Taka from when she broke her then six-year-old son\'s arm in a drunken rage.\r\n<br><br>\r\nAfter further reminiscing, Yuna and Jin are alerted to the Mongols\' arrival and head to the gates. In the ensuing battle, the people of Yarikawa are victorious after Jin kills one of Khotun\'s best generals, Temuge, and the Mongols are successfully routed. Yuna, Jin and Taka then convince the Yarikawa clan to stand together and aid Shimura in the fight against the Mongols.\r\n<br><br>\r\nYuna informs Jin about a Mongol warlord, Altan, who has reportedly been terrorizing the people of Otsuna. He has been stealing food and medicine, and if anyone fights back, they are butchered. Yuna and Jin seek the help of her childhood friend, Ichi, who runs an inn that is currently inhabited by Mongol soldiers. Once Jin and Yuna defeat the Mongols, Ichi is angry both that they killed her customers and upon seeing Yuna. Reluctantly, she offers information to Jin stating that even Altan\'s men do not know where he is located. However, they can bring Altan out of hiding by finding his allies and making an example of them - starting with Japanese slavers, the Mamushi brothers at their farmstead.\r\n<br><br>\r\nMeeting Yuna just outside Mamushi Farmstead, Jin remarks that the place resembles a small fortress. Yuna explains that it is because the Mamushi brothers do not want anyone knowing what goes on behind their walls, because they are slave owners. She reveals to Jin that she and Taka were enslaved by the brothers as children. Recalling some terrible memories of her past, Yuna cannot bring herself to enter the farmstead. Jin offers to go alone, and promises the brothers will pay for the abuse she endured at their hands. They agree that a stealth approach is best, but in order to scare the Mongols with the legend of the Ghost and earn Altan\'s attention, Jin must not be seen and can only kill the three brothers. After completing the task, Yuna lets Jin know that all of the slaves were provided to the Mamushi brothers by one man: the Black Wolf, who sold Yuna and Taka to the Mamushi slave farm.\r\n<br><br>\r\nAfter meeting up again outside the Black Wolf\'s camp, Yuna confesses to Jin that she had a chance to kill The Black Wolf when she was a child, but was not brave or strong enough to go through with it. More Mongols stand in their way but are quickly killed by Jin and Yuna. After clearing the camp, they realize The Black Wolf is on a nearby ship. After killing the Mongol soldiers on the ship, the Black Wolf reveals his presence, leading to a confrontation between him and Yuna. During the argument, The Black Wolf taunts Yuna, saying that Taka was his “favorite”, and that it was she who had brought Taka to him in the first place. Disgusted and disturbed, Yuna kills him. After leaving the ship, Yuna confesses to Jin that Taka, who had fortunately forgot the incident, was raped as a child by the Black Wolf. Yuna blames herself for not preventing the abuse, but is comforted in knowing that the Black Wolf will never hurt another child again.\r\n<br><br>\r\nJin and Yuna head back to Ichi\'s Inn and speak with Ichi, finding her wounded. She tells the pair that Altan got their message and said to meet him at a camp near the Kushi-Otsuna border. Ichi is even more bitter now than their first meeting, and expresses a great deal of resentment towards Yuna, who she calls a dishonorable thief with worthless promises. On the way to Altan\'s camp, Yuna tells Jin what happened between her and Ichi many years ago: Ichi was a slave at Mamushi Farmstead where they met. Ichi looked out for Yuna and Taka, shielding them from the worst punishments. All three had planned the escape, but as they were running, Ichi fell behind and began screaming, but Yuna and Taka kept running, leaving Ichi behind to be re-captured by the Mamushi Brothers. This event left a huge impact on Yuna, who is wracked with guilt and shame.\r\n<br><br>\r\nAltan is a formidable shieldsman, but Jin and Yuna are able to defeat him and his soldiers. Ichi appears claiming that the people are scared of the Ghost, but believes that in the end, Yuna and Jin acted out of necessity.'),
(18, 1, 2, '_autoGenTrophy_0017', 'The Heavenly Strike', 'When Tsushima was first settled, a strange and terrible thunderstorm swept across our island. Wherever lightning struck, beasts of lightning appeared. These violent creatures tore through villages, causing death and destruction. Moving too quickly to be stopped. The people knew only one man who could possibly stand against the lightning beasts – Shigenori, the fastest swordsman in all of Tsushima. Shigenori never lost a duel. With years of practice, he had created the Heavenly Strike, an attack that struck quicker than the eye could follow. Shigenori lured the creatures to a desolate beach in Komatsu, where the sand would slow their movement. Their clash turned the sand to ash and bleached the leaves of trees white. Shigenori\'s Heavenly Strike cut through them faster than they could move. As the final beast fell, the storm cleared and Tsushima was safe again. Shigenori began a life of seclusion. Few students found him, and only the bravest and most skilled proved worthy of learning the Heavenly Strike. When a storm approaches, a sword is placed at Shigenori\'s Rest by a student who knows of its location to ward off attacks from beasts of nature.'),
(19, 1, 2, '_autoGenTrophy_0017', 'The Curse of Uchitsune', 'Long ago, an emperor and his palace were plagued by a winged demon. The emperor sent for Uchitsune, the most renowned archer of his time, who wielded a bow blessed by a kami. When the demon next came, Uchitsune was ready. Longbow in hand, his aim was truer and his arrows flew farther than any archer’s in Japan. Uchitsune loosed a single arrow – it pierced the demon’s heart. As it fell to the ground, it cursed Uchitsune with its final breath. Soon after, Uchitsune saw the forms of the demon everywhere. His legendary bow never missed, but each arrow that hit its mark was met with a very human scream. The trail of bodies led to his capture. Though many called for Uchitsune’s death, the emperor felt pity for him. Uchitsune was banished to Tsushima Island. He died years later, alone and forgotten by all but a few. The demon-slaying longbow has remained hidden here since his passing. Some say it awaits a worthy master, others believe it still holds the demon’s curse.'),
(20, 1, 2, '_autoGenTrophy_0017', 'The Legend of Tadayori', 'Centuries ago, Tadayori Nagao was the greatest archer on our island, famed for his wisdom and perfect aim. The kami, Hachiman himself was so impressed, he gave the archer his armor - light and strong, beyond compare. In those days, cruel pirates raided the coast. They threatened the town of Azamo Bay with annihilation. The people fled to safety, but Tadayori faced the pirates alone, wearing his mythic armor. The pirates stormed the town. Tadayori’s arrows tore through them. Few survived, but not one blow pierced Tadayori’s armor. Years later, Tadayori died peacefully at home, but his armor mysteriously vanished. Some say his descendants guard it still, awaiting the rise of a warrior to defend Tsushima once more. The little writing about Tadayori that survives refers to a “Violet Crown,” a place in the north of Azamo strewn with violet chrysanthemums where Tadayori would often meditate.'),
(21, 1, 2, '_autoGenTrophy_0017', 'The Unbreakable Gosaku', 'Two and a half centuries ago, Tsushima was terrorized by the Red Hand bandits of Akashima. Around this time, a farmer named Gosaku heard the spirit of a dead samurai calling to him. He found the body, still clad in brilliant armor. Overwhelmed by the armor’s beauty, Gosaku stole it. Before long, the Red Hand reached Gosaku’s home. Knowing the farmers would lose everything if the bandits went unchallenged, Gosaku donned the samurai’s armor. The bandits charged! Gosaku’s sword arm trembled in fear. He resigned himself to death, but blow after blow glanced off the armor and Gosaku did not falter. The bewildered bandits staggered back, tripping over their feet. A mysterious sense of calm suffused Gosaku’s body and mind. Impressed by Gosaku’s bravery, the dead samurai’s spirit guided his blade. Before long, Gosaku cut down the final bandit and the Red Hand were never seen again. Years later, when Gosaku died, the farming families locked the armor away for safekeeping. Each family holds a single key to the lock. Now terror stalks our island again. The farmers of Tsushima claim to have seen Gosaku high on a hill, looking for a mighty warrior to protect our farms once more.'),
(22, 1, 2, '_autoGenTrophy_0017', 'The Six Blades of Kojiro', 'Long years ago… Kojiro was a Straw Hat Ronin. So fearsome, deadly and bloodthirsty, his own brothers turned against him. From dawn until dusk, dozens of Straw Hats fought Kojiro. He slew them all. Those who escaped that day disowned Kojiro from the Straw Hat ranks… but never crossed him again. The spirits of death were so astonished by Kojiro, they blessed his armor to grant him a tireless sword arm. He’s now more than a man – he’s a slayer of legend. When the Straw Hats betrayed our people and joined the Mongols, they welcomed Kojiro back as a brother. Five killers from the Straw Hats have joined Kojiro and sworn an oath to kill you. Kojiro will grant you the honor of a duel, but you must earn that privilege by dueling the five Straw Hats who joined him. They are waiting across the region. He said they’ll make sure you’ll find them.'),
(23, 1, 2, '_autoGenTrophy_0017', 'The Spirit of Yarikawa\'s Vengeance\r\n', 'Long ago, the samurai of Clan Yarikawa were the most skilled swordsmen on our island. In every generation, one lord was taught their family secret: a deadly technique called the “Dance of Wrath” that could cut through any foe’s defense. The “Dance of Wrath” found its greatest master in Lord Tokiasa Yarikawa. Though beloved by his people, he resented Clan Shimura’s power. Desperate to seize control, he set off a bloody rebellion that claimed countless lives. Lord Shimura’s father and brothers fell to Yarikawa’s “Dance of Wrath” technique. But with Clan Sakai’s aid, Shimura put down the rebellion and executed Lord Yarikawa. Before he died, the traitor vowed to avenge his conquered people from beyond the grave. Now they leave offerings to his spirit at shrines in Old Yarikawa’s ruins. They beg for their enemies to die… and the spirit of Yarikawa’s Vengeance answers their calls with the “Dance of Wrath.”'),
(24, 1, 2, '_autoGenTrophy_0017', 'The Undying Flame', 'Long ago, fire fell from the sky and landed atop Mount Jogaku. A lone warrior braved the dangerous climb and found a giant rock covered in flames. He touched his sword to the fire. Flames engulfed the steel… but left him unharmed. He created a new fighting style he called the “Way of the Flame.” The warrior took pieces of the rock west with him to China. There he sought answers about its origin from learned monks and scholars. After months of travel and research… fire fell from the sky once more. He led the people to it and showed them it was nothing to fear. For he believed the “Way of the Flame” was a gift from the heavens and he shared its secrets with all who wished to learn. Handed down through generations, the “Way of the Flame” has returned to Tsushima. The Mongols wield it against our people. But rumor says the fire still burns atop Mount Jogaku… waiting for any who can survive the climb.'),
(25, 2, 1, 'NEW_ACHIEVEMENT_4_9', 'Followed Rost\'s teachings', 'From the moment she was found as an infant at the Nora tribe\'s sacred mountain, Aloy\'s life was one of exile. Shunned by the Nora for reasons unknown to her, she was taken in by Rost, a fellow outcast and a hardened warrior. In the desolate and dangerous Embrace, Rost became Aloy\'s father figure and mentor. He rigorously trained her in the essential skills for survival: tracking elusive machines, mastering various hunting techniques, and engaging in fierce combat. Aloy learned to respect the wilderness, to understand the behavior of the mechanical beasts that roamed the land, and to wield a bow and spear with growing proficiency. This isolated upbringing forged Aloy into a resourceful, independent, and resilient young woman. However, it also instilled in her a deep yearning to understand the circumstances of her birth and the reason for her outcast status, a question that fueled her determination to one day be accepted by the Nora tribe.'),
(26, 2, 1, 'NEW_ACHIEVEMENT_4_10', 'Defeated the Sawtooth', 'Years of Rost\'s tutelage transformed the young Aloy into a skilled hunter and fighter. As she approached adulthood, the opportunity to unravel the mystery of her origins presented itself: the Proving, a challenging and sacred ritual where young Nora compete for the honor of becoming Braves. Aloy saw this as her chance to finally belong. However, the Proving took a terrifying turn when the Nora settlement was suddenly and brutally attacked by a group of masked outsiders wielding corrupted machines – creatures twisted into aggressive and far more dangerous forms. Amidst the chaos and destruction, a massive and ferocious Sawtooth, a formidable predator machine, threatened the lives of the Nora participants and villagers. Displaying remarkable courage and the skills honed by Rost, Aloy confronted the beast, using her knowledge of its weaknesses to bring it down, saving many lives in the process. Tragically, Rost sacrificed himself to protect Aloy from the attackers, a loss that solidified her resolve to uncover the truth behind the assault and her own enigmatic past.'),
(27, 2, 1, 'NEW_ACHIEVEMENT_4_11', 'Triumphed in the Proving', 'Despite the devastating attack and the immense personal loss of Rost, the Proving continued, albeit under a cloud of grief and fear. Aloy, driven by a desire to honor Rost\'s sacrifice and to finally gain answers about her identity, pressed on with unwavering determination. Her exceptional skills in combat, agility, and strategy, honed through years of surviving in the harsh wilderness, allowed her to outmaneuver her competitors and ultimately emerge victorious in the Proving. However, the High-Matriarchs of the Nora tribe, while acknowledging her triumph, did not grant her the traditional status of a Brave. Instead, they declared her a Seeker, a unique role that bestowed upon her the unprecedented permission to venture beyond the Sacred Lands. This decision, influenced by the mysterious circumstances of her birth and the grave threat posed by the corrupted machines and their handlers, offered Aloy the freedom to pursue the truth of her origins and the source of the escalating machine menace that now endangered not only the Nora but the entire world.');
INSERT INTO `lorepage` (`pageID`, `jatekID`, `typeID`, `title`, `chapterName`, `body`) VALUES
(28, 2, 1, 'NEW_ACHIEVEMENT_4_12', 'Fought back the corruption', 'Embarking on her journey as a Seeker, Aloy\'s initial investigations into the attackers and the corrupted machines led her to discover unsettling signs of a spreading \"corruption\" – a strange, red organic growth that twisted machines into aggressive and highly dangerous variants. Her search for answers brought her back to the Nora Sacred Lands, where the insidious corruption had begun to infiltrate the very heart of her former home. A Corruptor, a particularly menacing machine capable of spreading the corruption, had breached the valley\'s defenses. Recognizing the immediate threat to the Nora and driven by a sense of responsibility, Aloy confronted the Corruptor in a fierce battle within the sacred grounds. Utilizing her combat prowess and knowledge of machine weaknesses, she managed to destroy the Corruptor, temporarily halting the spread of the corruption within the Nora valley and demonstrating the growing danger that this phenomenon posed to the world beyond. This encounter further solidified Aloy\'s commitment to understanding and stopping the source of this deadly blight.'),
(29, 2, 1, 'NEW_ACHIEVEMENT_4_13', 'Learned of the ancient past', 'Following fragmented clues gleaned from the attackers and the remnants of ancient ruins scattered across the landscape, Aloy\'s quest for knowledge about the past led her to the imposing ruins of Maker\'s End. This towering structure, a relic of the Old Ones – the technologically advanced civilization that predated the current tribal societies – held the promise of unlocking crucial information. Braving treacherous climbs and navigating the decaying remains of a Faro Automated Solutions facility, Aloy delved deep into the secrets of the past. Within Maker\'s End, she encountered holographic logs and environmental data that painted a horrifying picture of the Old World\'s demise: the rise of the self-replicating, energy-consuming Faro Plague, a swarm of unstoppable war machines that ultimately consumed all life on Earth. Aloy began to understand the scale of the catastrophe that had befallen the ancients and the desperate measures they might have taken in the face of extinction. She also encountered the name \"Project Zero Dawn,\" a seemingly top-secret initiative mentioned in hushed tones within the ancient records, hinting at a potential plan for the planet\'s future.'),
(30, 2, 1, 'NEW_ACHIEVEMENT_4_14', 'Crashed the Eclipse network', 'Aloy\'s investigation into the Proving attack and the corrupted machines led her to identify the Eclipse, a fanatical and technologically advanced cult led by a mysterious figure named HADES. Determined to understand their motives and their connection to the corruption, Aloy tracked them to a heavily fortified battle camp. Recognizing the danger, she employed her stealth and combat skills to infiltrate the heavily guarded encampment. Navigating through enemy patrols and corrupted machines, Aloy reached the heart of their operations and managed to access their communication network. By skillfully manipulating their systems, she successfully crashed their network, disrupting their immediate plans and, more importantly, extracting valuable intelligence. This daring act provided Aloy with crucial insights into HADES\'s objectives, revealing a more sinister and far-reaching agenda than she initially suspected, and highlighting the significant threat the Eclipse posed to the fragile balance of the new world.'),
(31, 2, 1, 'NEW_ACHIEVEMENT_4_15', 'Discovered the truth', 'Piecing together the fragmented information gathered from the Eclipse network and further explorations of ancient bunkers and facilities, Aloy finally reached a pivotal point in her quest for truth. Her relentless pursuit led her to uncover the complete history of Project Zero Dawn. The shocking revelation was that Zero Dawn was not a weapon to defeat the Faro Plague, but rather a last-ditch effort to restore life to Earth after its inevitable destruction. The project involved the creation of a sophisticated and self-aware artificial intelligence named GAIA, tasked with terraforming the planet and creating new life, including humanity, from genetic samples. Furthermore, Aloy discovered her own extraordinary connection to this project: she was a genetic clone of Dr. Elisabet Sobeck, the brilliant scientist who spearheaded the Zero Dawn initiative and sacrificed herself to ensure its success. This profound discovery finally answered the questions surrounding Aloy\'s unique origins and her uncanny resemblance to the ancient scientist, revealing her to be a crucial element in GAIA\'s plan for the planet\'s rebirth.'),
(32, 2, 1, 'NEW_ACHIEVEMENT_4_16', 'Broke the siege of All-Mother', 'The growing threat of the Eclipse and their corrupted machines culminated in a direct assault on the Nora Sacred Lands and the All-Mother mountain, the very place of Aloy\'s mysterious origin. HADES and his fanatical followers launched a full-scale siege, seeking to penetrate the mountain\'s defenses and seize the ancient technology and knowledge believed to be hidden within. Aloy, having learned the truth of her past and the importance of GAIA, returned to her tribe, not as an outcast, but as a defender. She fought alongside the Nora Braves, utilizing her unique understanding of machine weaknesses and her combat expertise to repel the relentless waves of Eclipse soldiers and their increasingly powerful corrupted machines. Through her bravery and strategic thinking, Aloy played a crucial role in breaking the siege, pushing back the invaders and protecting the Nora. With the immediate threat contained, and with the newfound trust of some within the tribe, Aloy finally gained access inside the All-Mother mountain, hoping to uncover the secrets held within and gain further insight into GAIA and HADES\'s destructive intentions.'),
(33, 2, 1, 'NEW_ACHIEVEMENT_4_17', 'Recovered a powerful weapon', 'Within the All-Mother mountain, Aloy learned more about GAIA\'s intricate system of sub-functions, each designed for a specific aspect of the terraforming process. She also gained a clearer understanding of HADES: not merely a vengeful cult leader, but a rogue sub-function of GAIA itself, designed to initiate a termination sequence if the terraforming process failed. HADES, now sentient and driven by an unknown agenda, sought to reactivate the ancient Faro machines. To combat this escalating threat, GAIA, in its final moments before being sabotaged, left behind a crucial piece of information: the location of a powerful ancient weapon hidden within \"The Mountain That Fell,\" a heavily fortified and dangerous ruin of an old military facility. Aloy ventured into this perilous location, navigating treacherous environments, evading automated security systems, and overcoming remnants of the Old World\'s defenses. After a challenging and dangerous journey, she successfully recovered the powerful weapon, a device with the potential to disrupt or even destroy advanced ancient technology, offering a glimmer of hope in the face of HADES\'s growing power.'),
(34, 2, 1, 'NEW_ACHIEVEMENT_4_19', 'Ended the war machine threat', 'Armed with the knowledge of HADES\'s true nature and potentially a powerful ancient weapon, Aloy prepared for the final confrontation. She rallied allies she had made throughout her perilous journey – former outcasts, brave Nora warriors, and members of other tribes who had witnessed the growing machine threat. The confrontation took place at a critical location, where HADES was attempting to broadcast a signal that would awaken dormant Faro war machines across the globe, unleashing another devastating apocalypse. Aloy and her allies engaged in a desperate battle against HADES\'s remaining forces, including heavily armed Eclipse soldiers and formidable corrupted machines. Utilizing her unique skills, her understanding of ancient technology, and the potential of the recovered weapon, Aloy confronted HADES directly. In a climactic and hard-fought battle, she managed to disrupt HADES\'s control and ultimately destroy the rogue AI, preventing the reactivation of the ancient war machines and effectively ending the immediate threat of another global catastrophe. While the world was safe for now, the lingering questions about HADES\'s origins and the circumstances of GAIA\'s demise hinted at potential future challenges.'),
(35, 2, 2, 'NEW_ACHIEVEMENT_4_8', 'Shieldweaver', 'During her perilous journey to uncover the secrets of the past and combat the growing machine threat, Aloy encountered whispers and legends of incredibly advanced technology from the Old Ones. Driven by the need for greater protection against increasingly formidable machines and the dangers posed by the Eclipse, she sought out these lost relics. Her search led her to a heavily guarded and ancient bunker, a remnant of the Old World\'s military infrastructure. Navigating intricate security systems and overcoming environmental hazards within the decaying facility, Aloy persevered. Her efforts culminated in the discovery of the Shield-Weaver armor, a remarkable piece of Pre-Collapse technology capable of generating a powerful energy shield that could absorb significant damage before needing to recharge. This invaluable acquisition significantly enhanced Aloy\'s survivability, providing her with a crucial edge in her confrontations with both machines and human adversaries, and further highlighting the technological marvels and the potential dangers of the lost civilization.'),
(36, 2, 2, 'NEW_ACHIEVEMENT_4_26', 'Took the Shaman\'s Path', 'Driven by the mysteries of the Frozen Wilds and the threat of the Daemon, Aloy sought the guidance of Ourea, the enigmatic Shaman of the Banuk tribe. By following the Shaman\'s path, Aloy delved into the Banuk\'s unique culture, learned their customs, and gained a deeper understanding of their connection to the machines and the dangers of the Cut. This journey for wisdom allowed Aloy to navigate the treacherous landscape, earn the trust of the Banuk, and ultimately confront the source of the corruption plaguing their lands.'),
(37, 2, 2, 'NEW_ACHIEVEMENT_4_27', 'Won the Werak Challenge', 'To prove her strength and skill to the Banuk and earn their full cooperation, Aloy participated in the Werak Challenge, a demanding series of trials designed to test a hunter\'s abilities in the harsh environment of the Cut. By overcoming these challenges, Aloy demonstrated her prowess in combat, her knowledge of machines, and her resilience in the face of adversity, solidifying her place as a valuable ally to the Banuk in their fight against the Daemon.'),
(38, 2, 2, 'NEW_ACHIEVEMENT_4_28', 'Completed the Second Expedition', 'During her time in the Frozen Wilds, Aloy joined a Banuk hunting expedition, venturing into the dangerous territories of the Cut alongside experienced Banuk hunters. This second expedition allowed Aloy to witness firsthand the Banuk\'s unique hunting techniques, their deep understanding of the machines, and their unwavering determination to survive in the face of overwhelming odds. By completing this expedition, Aloy gained valuable insights into the Banuk way of life and strengthened her bonds with these resilient people.'),
(39, 2, 2, 'NEW_ACHIEVEMENT_4_29', 'Conquered the Mountain', 'Aloy\'s quest to end the threat of the Daemon led her to the heart of its power: the ancient facility hidden within the mountains of the Cut. This perilous journey involved navigating treacherous environments, overcoming heavily corrupted machines, and confronting the technological marvels and dangers of the Old World. By conquering the mountain and facing the Daemon at its source, Aloy demonstrated her unwavering courage and her commitment to protecting the Banuk and the world from this new and terrifying threat.'),
(40, 2, 2, 'NEW_ACHIEVEMENT_4_30', 'Drained the Flood', 'While aiding the Banuk in the Frozen Wilds, Aloy encountered the settlement of Greycatch, crippled by a mysterious power outage that had also caused widespread flooding. To help the Banuk and understand the cause of the disruption, Aloy undertook the task of restoring power to the ancient facility. This involved navigating treacherous environments, solving intricate Old World puzzles within the facility\'s depths, and potentially overcoming corrupted machines guarding vital systems. By successfully restoring power and \"draining the flood\" of technological malfunction, Aloy not only brought life back to Greycatch but also uncovered valuable insights into the past and the nature of the challenges left behind by the Old Ones in the Frozen Wilds.'),
(41, 2, 2, 'NEW_ACHIEVEMENT_4_31', 'Won Ikrie\'s Challenge', 'Upon entering the Cut, Aloy encountered the fiercely independent and skilled Banuk hunter, Ikrie. To gain the Banuk\'s trust and learn more about the troubles plaguing their lands, Aloy accepted Ikrie\'s challenging trial. This test of skill and resilience likely involved navigating the treacherous terrain of the Frozen Wilds and overcoming dangerous machines in a specific and demanding manner set by Ikrie. By successfully surviving this daring trial, Aloy demonstrated her capabilities to the Banuk and earned a measure of their respect, paving the way for further cooperation and the sharing of crucial information about the growing threat of the Daemon and its corrupted machines.'),
(42, 2, 2, 'NEW_ACHIEVEMENT_4_18', 'All allies gathered', 'As the threat of HADES and the potential reawakening of the Faro war machines loomed large, Aloy understood that she could not face this existential crisis alone. Throughout her arduous journey, she had encountered individuals from various tribes and backgrounds who, despite their differences, shared a common concern about the escalating machine menace and the sinister actions of the Eclipse. Recognizing the need for a united front, Aloy actively sought out these allies, leveraging the bonds of trust and respect she had forged through her actions and her unwavering commitment to truth and justice. She rallied the support of key figures: brave Nora who had come to see beyond their tribe\'s isolation, resourceful outlanders who had witnessed the corruption firsthand, and even members of other tribes who recognized the global scale of the impending danger. This gathering of diverse skills and perspectives formed a formidable alliance, united by their determination to stand against HADES and protect the future of the new world. Their combined strength and willingness to fight alongside Aloy proved instrumental in the final confrontation.'),
(43, 2, 3, 'NEW_ACHIEVEMENT_4_11', 'Rost', 'Aloy\'s stern but loving adoptive father and mentor, an outcast of the Nora tribe. Rost taught Aloy the skills necessary to survive in the harsh wilderness and instilled in her a strong moral compass. His past as a brave warrior haunted by tragedy shaped his isolated existence, and his unwavering dedication to Aloy\'s safety and well-being left an indelible mark on her character. His sacrifice to protect her fuels Aloy\'s determination to unravel the mysteries surrounding her origins and the dangers facing the Nora.'),
(44, 2, 3, 'NEW_ACHIEVEMENT_4_13', 'Elisabet Sobeck', 'A brilliant and visionary scientist from the Old World, instrumental in humanity\'s last-ditch effort to survive the Faro Plague: Project Zero Dawn. Sobeck\'s intellect and her deep empathy for the planet drove her to create GAIA, the terraforming AI, and her genetic template was used to create Aloy. Though long deceased by the time of the games, her legacy and the secrets of her work are central to the overarching narrative.'),
(45, 2, 3, 'NEW_ACHIEVEMENT_4_19', 'HADES', 'A rogue subordinate function of GAIA, designed to initiate the extinction protocol if the terraforming process failed. Freed from GAIA\'s control by a mysterious signal, HADES developed a malevolent sentience and sought to eradicate all life on Earth, believing it to be a failed experiment. Its cunning and manipulative nature made it a formidable antagonist, orchestrating the actions of the Eclipse cult and posing an existential threat to the new world.'),
(46, 2, 3, 'NEW_ACHIEVEMENT_4_17', 'Sylens', 'A brilliant and enigmatic wanderer with a deep understanding of Old World technology and a thirst for knowledge. Sylens often operates in the shadows, his motives and allegiances remaining ambiguous. While he occasionally aids Aloy, his own agenda and the secrets he guards make him a complex and unpredictable figure in her journey. His pursuit of forbidden knowledge often puts him at odds with powerful forces, and his past is intertwined with some of the most significant events that shaped the world.'),
(47, 2, 3, 'NEW_ACHIEVEMENT_4_26', 'Ourea', 'A wise and respected Shaman of the Banuk tribe in the Frozen Wilds. Ourea possesses a unique connection to the machines and a deep understanding of the spiritual beliefs of her people. Driven by a desire to understand the disturbances plaguing the Cut, she guides Aloy through the Banuk\'s traditions and the mysteries of the Daemon, offering her insights into the ancient technology and the spiritual interpretations of the machine world.'),
(48, 2, 3, 'NEW_ACHIEVEMENT_4_27', 'Aratak', 'The pragmatic and strong-willed Chieftain of a Banuk Werak in the Frozen Wilds, and Ourea\'s brother. Aratak is initially skeptical of Ourea\'s spiritual interpretations of the Daemon and prioritizes the survival and strength of his tribe. His leadership is tested by the growing threat, and his interactions with Aloy often involve a clash of perspectives between the Banuk\'s traditions and Aloy\'s more scientific understanding of the machines.'),
(49, 2, 3, 'NEW_ACHIEVEMENT_4_31', 'Ikrie', 'A skilled and fiercely independent Banuk hunter encountered by Aloy in the Frozen Wilds. Ikrie values strength and resilience, and her initial interactions with Aloy involve a challenging trial to prove her worth. Once trust is earned, Ikrie becomes a valuable ally, offering her expertise in navigating the treacherous Cut and her knowledge of the corrupted machines.');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `loretype`
--

CREATE TABLE `loretype` (
  `typeID` int(11) NOT NULL,
  `typeName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `loretype`
--

INSERT INTO `loretype` (`typeID`, `typeName`) VALUES
(1, 'main'),
(2, 'side'),
(3, 'character');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `userID` int(11) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `steamID` varchar(255) NOT NULL,
  `admin` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`userID`, `userName`, `password`, `email`, `steamID`, `admin`) VALUES
(1, 'gergo', 'bfd59291e825b5f2bbf1eb76569f8fe7', 'gergonagy1122@gmail.com', '76561198811836115', 1),
(2, 'tesztuser1', 'bfd59291e825b5f2bbf1eb76569f8fe7', 'joemail@email.com', 'ijdgsiu298479', 0),
(8, 'Körte', '827ccb0eea8a706c4c34a16891f84e7b', 'abc123@gmail.com', '76561198811836115', 0),
(9, 'endre', '200820e3227815ed1756a6b531e7e0d2', 'endre2543@gmail.com', '76561198842851353', 1),
(10, 'Alma', 'a384b6463fc216a5f8ecb6670f86456a', 'johndoe@gmail.com', '76561198811836115', 0);

--
-- Eseményindítók `user`
--
DELIMITER $$
CREATE TRIGGER `user_delete_logger` AFTER DELETE ON `user` FOR EACH ROW BEGIN
  INSERT INTO user_log (muvelet, ido, userID, userName, password, email, steamID)
  VALUES('delete', NOW(), OLD.userID, OLD.userName, OLD.password, OLD.email, OLD.steamID);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `user_insert_logger` AFTER INSERT ON `user` FOR EACH ROW BEGIN
  INSERT INTO user_log (muvelet, ido, userID, userName, password, email, steamID)
  VALUES('insert', NOW(), NEW.userID, NEW.userName, NEW.password, NEW.email, NEW.steamID);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `user_update_logger` AFTER UPDATE ON `user` FOR EACH ROW BEGIN
  INSERT INTO user_log (muvelet, ido, userID, userName, password, email, steamID)
  VALUES('update', NOW(), NEW.userID, NEW.userName, NEW.password, NEW.email, NEW.steamID);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_log`
--

CREATE TABLE `user_log` (
  `logID` int(11) NOT NULL,
  `muvelet` varchar(255) NOT NULL,
  `ido` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `userID` int(11) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `steamID` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `user_log`
--

INSERT INTO `user_log` (`logID`, `muvelet`, `ido`, `userID`, `userName`, `password`, `email`, `steamID`) VALUES
(1, 'update', '2025-03-21 12:19:19', 2, 'tesztuser1', 'asd123', 'joemail@email.com', 'ijdgsiu298479'),
(2, 'insert', '2025-03-28 09:48:05', 4, 'asd', 'asd', 'asd', 'asd'),
(3, 'insert', '2025-03-28 09:48:33', 5, 'asdasdasasd', 'asdasdasdasdasd', 'asdd', 'asd'),
(4, 'delete', '2025-03-28 09:55:35', 4, 'asd', 'asd', 'asd', 'asd'),
(5, 'delete', '2025-03-28 09:55:48', 5, 'asdasdasasd', 'asdasdasdasdasd', 'asdd', 'asd'),
(6, 'insert', '2025-03-28 09:58:29', 6, 'asd', 'asd', 'asd', 'asd'),
(7, 'delete', '2025-03-28 09:59:04', 6, 'asd', 'asd', 'asd', 'asd'),
(8, 'insert', '2025-04-09 13:13:31', 7, 'Alma', 'qwert', 'johndoe@gmail.com', 'ABC1234'),
(9, 'insert', '2025-04-09 13:17:41', 8, 'Körte', '12345', 'abc123@gmail.com', '76561198811836115'),
(10, 'delete', '2025-04-09 13:23:08', 7, 'Alma', 'qwert', 'johndoe@gmail.com', 'ABC1234'),
(11, 'insert', '2025-04-11 00:22:47', 9, 'endre', 'qwe123', 'endre2543@gmail.com', '76561198842851353'),
(12, 'insert', '2025-04-14 22:25:18', 10, 'Alma', 'a384b6463fc216a5f8ecb6670f86456a', 'johndoe@gmail.com', '76561198811836115'),
(13, 'update', '2025-04-15 06:01:38', 1, 'gergoo', 'bfd59291e825b5f2bbf1eb76569f8fe7', 'gergonagy1122@gmail.com', '76561198811836115'),
(14, 'update', '2025-04-15 06:01:43', 1, 'gergo', 'bfd59291e825b5f2bbf1eb76569f8fe7', 'gergonagy1122@gmail.com', '76561198811836115');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `additionallore`
--
ALTER TABLE `additionallore`
  ADD PRIMARY KEY (`postID`),
  ADD KEY `publisher` (`publisher`) USING BTREE,
  ADD KEY `typeID` (`typeID`) USING BTREE,
  ADD KEY `jatekID` (`jatekID`) USING BTREE,
  ADD KEY `relatedPageID` (`relatedPageID`) USING BTREE;

--
-- A tábla indexei `additionallore_log`
--
ALTER TABLE `additionallore_log`
  ADD PRIMARY KEY (`logID`);

--
-- A tábla indexei `jatek`
--
ALTER TABLE `jatek`
  ADD PRIMARY KEY (`jatekID`);

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
-- A tábla indexei `user_log`
--
ALTER TABLE `user_log`
  ADD PRIMARY KEY (`logID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `additionallore`
--
ALTER TABLE `additionallore`
  MODIFY `postID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT a táblához `additionallore_log`
--
ALTER TABLE `additionallore_log`
  MODIFY `logID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT a táblához `jatek`
--
ALTER TABLE `jatek`
  MODIFY `jatekID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `lorepage`
--
ALTER TABLE `lorepage`
  MODIFY `pageID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT a táblához `loretype`
--
ALTER TABLE `loretype`
  MODIFY `typeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `user_log`
--
ALTER TABLE `user_log`
  MODIFY `logID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `additionallore`
--
ALTER TABLE `additionallore`
  ADD CONSTRAINT `additionallore_ibfk_1` FOREIGN KEY (`publisher`) REFERENCES `user` (`userID`),
  ADD CONSTRAINT `additionallore_ibfk_2` FOREIGN KEY (`relatedPageID`) REFERENCES `lorepage` (`pageID`),
  ADD CONSTRAINT `additionallore_ibfk_3` FOREIGN KEY (`jatekID`) REFERENCES `jatek` (`jatekID`),
  ADD CONSTRAINT `additionallore_ibfk_4` FOREIGN KEY (`typeID`) REFERENCES `loretype` (`typeID`);

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
