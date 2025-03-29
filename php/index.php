<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include './adatbazis_fuggvenyek.php';

$fullURL = explode("/", $_SERVER["REQUEST_URI"]);
$url = explode("?", end($fullURL));

$bodyContent = json_decode(file_get_contents("php://input"), true);
$params = $bodyContent['params'];

switch ($url[0]){
    //játék
    case "gameList":
        gameList();
        break;

    case "gameNameGet":
        gameNameGet($params['id']);
        break;

    //típus
    case "getAlltipus":
        getAlltipus();
        break;

    case "getTipusById":
        getTipusById($params['id']);
        break;

    //tracker
    case "getUserTracker":
        getUserTracker($params['id']);
        break;

    case "getTrackerByUserAndGame":
        getTrackerByUserAndGame($params['userID'], $params['jatekID']);
        break;

    case "createTracker":
        createTracker($params['userID'], $params['jatekID'], $params['mainAcCounter'], $params['optional']);
        break;

    case "updateTracker":
        updateTracker($params['trackerID'], $params['mainAcCounter'], $params['optional']);
        break;

    case "deleteTracker":
        deleteTracker($params['userID']);
        break;

    //felhasználó
    case "getUserData":
        getUserData($params['id']);
        break;

    case "createUserData":
        createUserData($params['userName'], $params['password'], $params['email'], $params['steamID']);
        break;

    case "getUserByName":
        getUserByName($params['name']);
        break;

    case "getUserByEmail":
        getUserByEmail($params['email']);
        break;

    case "getUserLogin":
        getUserLogin($params['email'], $params['password']);
        break;

    case "modifyUser":
        modifyUser($params['userName'], $params['password'], $params['email'], $params['steamID'], $params['currentEmail']);
        break;

    case "deleteUser":
        deleteUser($params['email']);
        break;

    //főoldal
    case "gameLoadAll":
        gameLoadAll($params['id']);
        break;
    
    case "getChapterTitle":
        getChapterTitle($params['gameId'], $params['pageId']);
        break;

    case "createLorepage":
        createLorepage($params['jatekID'], $params['typeID'], $params['title'], $params['chapterName'], $params['body']);
        break;

    case "updateLorepage":
        updateLorepage($params['pageId'], $params['typeID'], $params['title'], $params['chapterName'], $params['body']);
        break;

    case "deleteLorepage":
        deleteLorepage($params['pageId']);
        break;

    //közösségi oldal
    case "searchAdditionalByTitle":
        searchAdditionalByTitle($params['title']);
        break;

    case "getAdditionalByUser":
        getAdditionalByUser($params['userID']);
        break;

    case "getAdditionalByUserAndGame":
        getAdditionalByUserAndGame($params['userID'], $params['gameId']);
        break;

    case "getAdditionalByTimeDesc":
        getAdditionalByTimeDesc($params['gameId']);
        break;

    case "getAdditionalByTimeAsc":
        getAdditionalByTimeAsc($params['gameId']);
        break;

    case "getAdditionalByTitleDesc":
        getAdditionalByTitleDesc($params['gameId']);
        break;
    
    case "getAdditionalByTitleAsc":
        getAdditionalByTitleAsc($params['gameId']);
        break;

    case "createAdditional":
        createAdditional($params['jatekID'], $params['typeID'], $params['title'], $params['body'], $params['publisher'], $params['relatedPageID']);
        break;

    case "updateAdditional":
        updateAdditional($params['postID'], $params['jatekID'], $params['typeID'], $params['title'], $params['body'], $params['relatedPageID']);
        break;

    case "acceptAdditional":
        acceptAdditional($params['postID'], $params['accepted']);
        break;

    case "likeAdditional":
        likeAdditional($params['postID']);
        break;

    case "dislikeAdditional":
        dislikeAdditional($params['postID']);
        break;

    case "deleteAdditional":
        deleteAdditional($params['postID']);
        break;

    //log
    case "getUserLog":
        getUserLog();
        break;

    case "getAdditionalLog":
        getAdditionalLog();
        break;

    case "getTrackerLog":
        getTrackerLog();
        break;

    //default
    default:
        echo 'none selected';
        break;
}

//------------------------------------
function queryGetCheck($query){
    if(is_array($query)){
        echo json_encode($query, JSON_UNESCAPED_UNICODE);
    }
    else{
        echo json_encode(['valasz' => $query], JSON_UNESCAPED_UNICODE);
        header('bad request', true, 400);
    }
}

function queryChangeCheck($query){
    if($query == "Sikeres művelet!"){
        echo json_encode($query, JSON_UNESCAPED_UNICODE);
    }
    else{
        echo json_encode(['valasz' => $query], JSON_UNESCAPED_UNICODE);
        header('bad request', true, 400);
    }
}
//------------------------------------


//játék
function gameList(){
    $query = adatokLekerese("SELECT * FROM jatek ORDER BY jatek.jatekID");
    queryGetCheck($query);
}

function gameNameGet($gameId) {
    $query = adatokLekerese("SELECT * FROM jatek WHERE jatekID = {$gameId}");
    queryGetCheck($query);
}

//típus
function getAlltipus(){
    $query = adatokLekerese("SELECT * FROM loretype ORDER BY loretype.typeID");
    queryGetCheck($query);
}

function getTipusById($id){
    $query = adatokLekerese("SELECT * FROM loretype WHERE typeID = {$id}");
    queryGetCheck($query);
}


//tracker
function getUserTracker($trackerID){
    $query = adatokLekerese("SELECT * FROM jatekloretracker WHERE jatekloretracker.trackerID = {$trackerID}");
    queryGetCheck($query);
}

function getTrackerByUserAndGame($userID, $jatekID){
    $query = adatokLekerese("SELECT * FROM jatekloretracker WHERE userID = {$userID} AND jatekID = {$jatekID}");
    queryGetCheck($query);
}

function createTracker($userID, $jatekID, $mainAcCounter, $optional){
    $counterList = [0, 0, 0, 0];

    for ($i=0; $i < count($optional); $i++) {
        $counterList[$i] = $optional[$i];
    }

    $query = adatokValtozasa("REPLACE INTO `jatekloretracker`(`userID`, `jatekID`, `mainAchievementCounter`, `sideAchievementCounter1`, `sideAchievementCounter2`, `sideAchievementCounter3`, `sideAchievementCounter4`) VALUES ({$userID},{$jatekID},{$mainAcCounter},{$counterList[0]},{$counterList[1]},{$counterList[2]},{$counterList[3]})");
    queryChangeCheck($query);
}

function updateTracker($trackerID, $mainAcCounter, $optional){
    $counterList = [0, 0, 0, 0];

    for ($i=0; $i < count($optional); $i++) {
        $counterList[$i] = $optional[$i];
    }

    $query = adatokValtozasa("UPDATE `jatekloretracker` SET `mainAchievementCounter`={$mainAcCounter},`sideAchievementCounter1`={$counterList[0]},`sideAchievementCounter2`={$counterList[1]},`sideAchievementCounter3`={$counterList[2]},`sideAchievementCounter4`={$counterList[3]} WHERE trackerID = {$trackerID}");
    queryChangeCheck($query);
}

function deleteTracker($userID){
    $query = adatokValtozasa("DELETE FROM `jatekloretracker` WHERE userID = {$userID}");
    queryChangeCheck($query);
}


//felhasználó
function getUserData($userID){
    $query = adatokLekerese("SELECT * FROM user WHERE user.userID = {$userID}");
    queryGetCheck($query);
}

function createUserData($userName, $password, $email, $steamID){
    $query = adatokValtozasa("INSERT IGNORE INTO `user`(`userName`, `password`, `email`, `steamID`, `admin`)
    VALUES ('{$userName}', '{$password}', '{$email}', '{$steamID}', 0)");
    queryChangeCheck($query);
}

function getUserByName($name){
    $query = adatokLekerese("SELECT * FROM user WHERE userName = '{$name}'");
    queryGetCheck($query);
}

function getUserByEmail($email){
    $query = adatokLekerese("SELECT * FROM user WHERE email = '{$email}'");
    queryGetCheck($query);
}

function getUserLogin($email, $password){
    $query = adatokLekerese("SELECT * FROM user WHERE user.email = '{$email}' AND user.password = '{$password}'");
    queryGetCheck($query);
}

function modifyUser($userName, $password, $email, $steamID, $currentEmail){
    $query = adatokValtozasa("UPDATE user SET userName = '{$userName}', password = '{$password}', email = '{$email}', steamID = '{$steamID}' WHERE email = '{$currentEmail}'");
    queryChangeCheck($query);
}

function deleteUser($email){
    $query1 = adatokLekerese("SELECT userID FROM user WHERE email = '{$email}'");
    adatokValtozasa("DELETE FROM jatekloretracker WHERE userID = {$query1[0]['userID']}");
    adatokValtozasa("DELETE FROM additionallore WHERE publisher = {$query1[0]['userID']}");

    $query3 = adatokValtozasa("DELETE FROM user WHERE email = '{$email}'");
    queryChangeCheck($query3);
}


//főoldal
function gameLoadAll($gameId){
    $query = adatokLekerese("SELECT * FROM lorepage WHERE jatekID = {$gameId}");
    queryGetCheck($query);
}

function getChapterTitle($gameId, $pageId) {
    $query = adatokLekerese("SELECT * FROM lorepage WHERE jatekID = $gameId AND pageID = $pageId;");
    queryGetCheck($query);
}

function createLorepage($jatekID, $typeID, $title, $chapterName, $body){
    $query = adatokValtozasa("INSERT INTO `lorepage`(`jatekID`, `typeID`, `title`, `chapterName`, `body`) VALUES ({$jatekID}, {$typeID}, '{$title}', '{$chapterName}', '{$body}')");
    queryChangeCheck($query);
}

function updateLorepage($pageId, $typeID, $title, $chapterName, $body){
    $query = adatokValtozasa("UPDATE `lorepage` SET `typeID`={$typeID}, `title`='{$title}', `chapterName`='{$chapterName}', `body`='{$body}' WHERE pageID = {$pageId}");
    queryChangeCheck($query);
}

function deleteLorepage($pageId){
    adatokValtozasa("DELETE FROM additionallore WHERE relatedPageID = {$pageId}");

    $query = adatokValtozasa("DELETE FROM lorepage WHERE pageID = {$pageId}");
    queryChangeCheck($query);
}


//közösségi oldal
function searchAdditionalByTitle($title){
    $query = adatokLekerese("SELECT * FROM additionallore WHERE title LIKE '%{$title}%'");
    queryGetCheck($query);
}

function getAdditionalByUser($userID){
    $query = adatokLekerese("SELECT * FROM additionallore WHERE publisher = {$userID}");
    queryGetCheck($query);
}

function getAdditionalByUserAndGame($userID, $gameId){
    $query = adatokLekerese("SELECT * FROM additionallore WHERE publisher = {$userID} AND jatekID = {$gameId}");
    queryGetCheck($query);
}

function getAdditionalByTimeDesc($gameId){
    $query = adatokLekerese("SELECT * FROM additionallore WHERE jatekID = {$gameId} ORDER BY additionallore.created_at DESC");
    queryGetCheck($query);
}

function getAdditionalByTimeAsc($gameId){
    $query = adatokLekerese("SELECT * FROM additionallore WHERE jatekID = {$gameId} ORDER BY additionallore.created_at ASC");
    queryGetCheck($query);
}

function getAdditionalByTitleDesc($gameId){
    $query = adatokLekerese("SELECT * FROM additionallore WHERE jatekID = {$gameId} ORDER BY additionallore.title DESC");
    queryGetCheck($query);
}

function getAdditionalByTitleAsc($gameId){
    $query = adatokLekerese("SELECT * FROM additionallore WHERE jatekID = {$gameId} ORDER BY additionallore.title ASC");
    queryGetCheck($query);
}

function createAdditional($jatekID, $typeID, $title, $body, $publisher, $relatedPageID){
    $query = adatokValtozasa("INSERT INTO `additionallore`(`jatekID`, `typeID`, `title`, `body`, `publisher`, `accepted`, `created_at`, `likeCounter`, `relatedPageID`) VALUES ({$jatekID}, {$typeID}, '{$title}', '{$body}', {$publisher}, 0, NOW(), 0, {$relatedPageID})");
    queryChangeCheck($query);
}

function updateAdditional($postID, $jatekID, $typeID, $title, $body, $relatedPageID){
    $query = adatokValtozasa("UPDATE `additionallore` SET `jatekID`={$jatekID}, `typeID`={$typeID}, `title`='{$title}', `body`='{$body}', `relatedPageID`={$relatedPageID} WHERE postID = {$postID}");
    queryChangeCheck($query);
}

function acceptAdditional($postID, $accepted){
    $query = adatokValtozasa("UPDATE additionallore SET accepted={$accepted} WHERE postID = {$postID}");
    queryChangeCheck($query);
}

function likeAdditional($postID){
    $query = adatokValtozasa("UPDATE additionallore SET likeCounter = likeCounter + 1 WHERE postID = {$postID}");
    queryChangeCheck($query);
}

function dislikeAdditional($postID){
    $query = adatokValtozasa("UPDATE additionallore SET likeCounter = likeCounter - 1 WHERE postID = {$postID}");
    queryChangeCheck($query);
}


function deleteAdditional($postID){
    $query = adatokValtozasa("DELETE FROM `additionallore` WHERE postID = {$postID}");
    queryChangeCheck($query);
}


//logok
function getUserLog(){
    $query = adatokLekerese("SELECT * FROM user_log ORDER BY ido DESC");
    queryGetCheck($query);
}

function getAdditionalLog(){
    $query = adatokLekerese("SELECT * FROM additionallore_log ORDER BY ido DESC");
    queryGetCheck($query);
}

function getTrackerLog(){
    $query = adatokLekerese("SELECT * FROM jatekloretracker_log ORDER BY ido DESC");
    queryGetCheck($query);
}