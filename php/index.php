<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include './adatbazis_fuggvenyek.php';

$fullURL = explode("/", $_SERVER["REQUEST_URI"]);
$url = explode("?", end($fullURL));

$bodyContent = json_decode(file_get_contents("php://input"), true);

switch ($url[0]){
    case "gameloadall":
        gameLoadAll($bodyContent['params']['key1']);
        break;

    default:
        echo 'none selected';
        break;
}

function gameLoadAll($gameId){
    $lekeres = adatokLekerese("SELECT * FROM lorepage WHERE jatekID = {$gameId}");

    if(is_array($lekeres)){
        echo json_encode($lekeres, JSON_UNESCAPED_UNICODE);
    }
    else{
        echo json_encode(['valasz' => $lekeres], JSON_UNESCAPED_UNICODE);
        header('bad request', true, 400);
    }
}