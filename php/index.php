<?php

include './adatbazis_fuggvenyek.php';

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
gameLoadAll(1);