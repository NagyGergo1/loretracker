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
    case "gameloadall":
        gameLoadAll($params['id']);
        break;

    case "gameList":
        gameList();
        break;

    //típus
    case "getAlltipus":
        getAlltipus();
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

    //közösségi oldal
    case "getAdditionalByTimeDesc":
        getAdditionalByTimeDesc();
        break;

    case "getAdditionalByTimeAsc":
        getAdditionalByTimeAsc();
        break;

    case "getAdditionalByLikeDesc":
        getAdditionalByLikeDesc();
        break;

    case "getAdditionalByLikeAsc":
        getAdditionalByLikeAsc();
        break;

    case "getAdditionalByTitleDesc":
        getAdditionalByTitleDesc();
        break;
    
    case "getAdditionalByTitleAsc":
        getAdditionalByTitleAsc();
        break;

    //logok
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
function gameLoadAll($gameId){
    $query = adatokLekerese("SELECT * FROM lorepage WHERE jatekID = {$gameId}");
    queryGetCheck($query);
}

function gameList(){
    $query = adatokLekerese("SELECT * FROM jatek ORDER BY jatek.jatekID");
    queryGetCheck($query);
}

//típus
function getAlltipus(){
    $query = adatokLekerese("SELECT * FROM loretype ORDER BY loretype.typeID");
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
    $query = adatokValtozasa("DELETE FROM user WHERE email = '{$email}'");
    queryChangeCheck($query);
}


//közösségi oldal
function getAdditionalByTimeDesc(){
    $query = adatokLekerese("SELECT * FROM additionallore ORDER BY additionallore.created_at DESC");
    queryGetCheck($query);
}

function getAdditionalByTimeAsc(){
    $query = adatokLekerese("SELECT * FROM additionallore ORDER BY additionallore.created_at ASC");
    queryGetCheck($query);
}

function getAdditionalByLikeDesc(){
    $query = adatokLekerese("SELECT * FROM additionallore ORDER BY additionallore.likeCounter DESC");
    queryGetCheck($query);
}

function getAdditionalByLikeAsc(){
    $query = adatokLekerese("SELECT * FROM additionallore ORDER BY additionallore.likeCounter ASC");
    queryGetCheck($query);
}

function getAdditionalByTitleDesc(){
    $query = adatokLekerese("SELECT * FROM additionallore ORDER BY additionallore.title DESC");
    queryGetCheck($query);
}

function getAdditionalByTitleAsc(){
    $query = adatokLekerese("SELECT * FROM additionallore ORDER BY additionallore.title ASC");
    queryGetCheck($query);
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