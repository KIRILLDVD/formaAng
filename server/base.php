<!DOCTYPE html>
<html>
<head>
<title>LASTREG</title>
<meta charset="utf-8" />
</head>
<body>
<h2>Последние внесенные данные</h2>
<?php
        $pdo = new PDO('mysql:host=localhost;dbname=test1', 'root', '0000');
        $query = "SELECT c.email, c.name, c.phone, m.message,s.selectr
        FROM contacts AS c
        INNER JOIN messages AS m ON c.id = m.id_contact
        INNER JOIN selector AS s ON c.id = s.id_contact
        ORDER BY s.id DESC, m.id DESC LIMIT 1";
       
        try {
            $stmt = $pdo->query($query);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach ($result as $row) {
                echo "<pre>";
                print_r($row);
                echo "</pre>";
                // echo "<td>" . $row["id"] . "</td>";
                // echo "<td>" . $row["name"] . "</td>";
                // echo "<td>" . $row["phone"] . "</td>";
            }
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }

?>
</body>
</html>