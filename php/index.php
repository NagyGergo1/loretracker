<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include './adatbazis_fuggvenyek.php';

$fullURL = explode("/", $_SERVER["REQUEST_URI"]);
$url = explode("?", end($fullURL));

$bodyContent = json_decode(file_get_contents("php://input"), true);
$params = $bodyContent['params'];

switch ($url[0]){
    case "gameloadall":
        gameLoadAll($params['id']);
        break;

    case "gameList":
        gameList();
        break;

    case "getUserTracker":
        getUserTracker($params['id']);
        break;

    case "getUserData":
        getUserData($params['id']);
        break;

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

    default:
        echo 'none selected';
        break;
}

function gameLoadAll($gameId){
    $query = adatokLekerese("SELECT * FROM lorepage WHERE jatekID = {$gameId}");

    if(is_array($query)){
        echo json_encode($query, JSON_UNESCAPED_UNICODE);
    }
    else{
        echo json_encode(['valasz' => $query], JSON_UNESCAPED_UNICODE);
        header('bad request', true, 400);
    }
}

function gameList(){
    $query = adatokLekerese("SELECT * FROM jatek ORDER BY jatek.jatekID");

    if(is_array($query)){
        echo json_encode($query, JSON_UNESCAPED_UNICODE);
    }
    else{
        echo json_encode(['valasz' => $query], JSON_UNESCAPED_UNICODE);
        header('bad request', true, 400);
    }
}

function getUserTracker($trackerID){
    $query = adatokLekerese("SELECT jatekloretracker.jatekID as id, jatekloretracker.achievementCounter as achCounter FROM jatekloretracker
    WHERE jatekloretracker.trackerID = {$trackerID}");

    if(is_array($query)){
        echo json_encode($query, JSON_UNESCAPED_UNICODE);
    }
    else{
        echo json_encode(['valasz' => $query], JSON_UNESCAPED_UNICODE);
        header('bad request', true, 400);
    }
}

function getUserData($userID){
    $query = adatokLekerese("SELECT * FROM user WHERE user.userID = {$userID}");

    if(is_array($query)){
        echo json_encode($query, JSON_UNESCAPED_UNICODE);
    }
    else{
        echo json_encode(['valasz' => $query], JSON_UNESCAPED_UNICODE);
        header('bad request', true, 400);
    }
}

function getAdditionalByTimeDesc(){
    $query = adatokLekerese("SELECT * FROM additionallore ORDER BY additionallore.created_at DESC");

    if(is_array($query)){
        echo json_encode($query, JSON_UNESCAPED_UNICODE);
    }
    else{
        echo json_encode(['valasz' => $query], JSON_UNESCAPED_UNICODE);
        header('bad request', true, 400);
    }
}

function getAdditionalByTimeAsc(){
    $query = adatokLekerese("SELECT * FROM additionallore ORDER BY additionallore.created_at ASC");

    if(is_array($query)){
        echo json_encode($query, JSON_UNESCAPED_UNICODE);
    }
    else{
        echo json_encode(['valasz' => $query], JSON_UNESCAPED_UNICODE);
        header('bad request', true, 400);
    }
}

function getAdditionalByLikeDesc(){
    $query = adatokLekerese("SELECT * FROM additionallore ORDER BY additionallore.likeCounter DESC");

    if(is_array($query)){
        echo json_encode($query, JSON_UNESCAPED_UNICODE);
    }
    else{
        echo json_encode(['valasz' => $query], JSON_UNESCAPED_UNICODE);
        header('bad request', true, 400);
    }
}

function getAdditionalByLikeAsc(){
    $query = adatokLekerese("SELECT * FROM additionallore ORDER BY additionallore.likeCounter ASC");

    if(is_array($query)){
        echo json_encode($query, JSON_UNESCAPED_UNICODE);
    }
    else{
        echo json_encode(['valasz' => $query], JSON_UNESCAPED_UNICODE);
        header('bad request', true, 400);
    }
}

function getAdditionalByTitleDesc(){
    $query = adatokLekerese("SELECT * FROM additionallore ORDER BY additionallore.title DESC");


    if(is_array($query)){
        echo json_encode($query, JSON_UNESCAPED_UNICODE);
    }
    else{
        echo json_encode(['valasz' => $query], JSON_UNESCAPED_UNICODE);
        header('bad request', true, 400);
    }
}

function getAdditionalByTitleAsc(){
    $query = adatokLekerese("SELECT * FROM additionallore ORDER BY additionallore.title ASC");


    if(is_array($query)){
        echo json_encode($query, JSON_UNESCAPED_UNICODE);
    }
    else{
        echo json_encode(['valasz' => $query], JSON_UNESCAPED_UNICODE);
        header('bad request', true, 400);
    }
}