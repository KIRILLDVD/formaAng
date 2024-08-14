<?php
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS'); 
header('Access-Control-Max-Age: 3600'); 
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization'); 



if (isset($_POST) and $_SERVER["REQUEST_METHOD"]=="POST"){
    $data = json_decode(file_get_contents('php://input'), true);
    $name = $data['value'];
    $sec = $data['da'];
    if($name == $sec){
     echo json_encode(['status' => '1']);
    
    }
    else{echo json_encode(['status' => '2']);}
}


?>