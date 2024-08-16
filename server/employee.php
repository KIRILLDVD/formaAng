<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Max-Age: 3600');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization');





$conn = new mysqli('localhost', 'root', '', 'test1');

if ($conn->connect_error) {
    die("Ошибка соединения с базой данных: " . $conn->connect_error);
}
$data = json_decode(file_get_contents('php://input'), true);
$name = $data['name'];
$email = $data['email'];
$selector =$data['selector'];
$phone = $data['phone'];
$message = $data['message'];

$query = "SELECT * FROM contacts WHERE email = ? AND phone = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param('ss', $email, $phone);
$stmt->execute();
$result = $stmt->get_result();
if($result->num_rows > 0){
    while ($row = $result->fetch_assoc()){
        $last_insert_id = $row['id'];
        $stmt = $conn->prepare("INSERT INTO messages (message, id_contact) VALUES (?,?)");
        $stmt->bind_param("ss",$message,$last_insert_id);
        $stmt->execute();
        $stmt->close();
        $stmt = $conn->prepare("INSERT INTO selector (selectr,id_contact) VALUES (?,?)");
        $stmt->bind_param("ss",$selector,$last_insert_id);
        $stmt->execute();
        $stmt->close();
        echo json_encode(['status' => 'телефон и имейл совпали']);
    }
}
else{
    $stmt = $conn->prepare("INSERT INTO contacts (email,phone,name) VALUES (?,?,?)");
    $stmt->bind_param("sss", $email,$phone,$name);
    $stmt->execute();
    $stmt->close();
    $last_insert_id = $conn->insert_id;
    $stmt = $conn->prepare("INSERT INTO messages (message, id_contact) VALUES (?,?)");
    $stmt->bind_param("ss",$message,$last_insert_id);
    $stmt->execute();
    $stmt->close();
    $stmt = $conn->prepare("INSERT INTO selector (selectr,id_contact) VALUES (?,?)");
    $stmt->bind_param("ss",$selector,$last_insert_id);
    $stmt->execute();
    $stmt->close();
    echo json_encode(['status' => 'такого пользователя нет его записали']);

}

?>
