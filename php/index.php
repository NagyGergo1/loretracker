<?php

include './adatbazis_fuggvenyek.php';

$request = json_decode(file_get_contents('php://input'), true);

if (!isset($request['function'])) {
    echo json_encode(['error' => 'No function.']);
    exit;
}

$function = $request['func'];
$params = $request['params'] ?? [];

if (function_exists($function)) {
    $result = $function($params);
    echo json_encode($result);
}
else {
    echo json_encode(['error' => 'Function not found.']);
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