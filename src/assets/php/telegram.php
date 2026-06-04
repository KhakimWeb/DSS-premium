<?php

// $token - API бота
// $chat_id - ID чата с ботом. Переходим по ссылке https://api.telegram.org/botX/getUpdates где вместо X пишем API бота. Берем значение из chat:id с минусом

$name = $_POST['name'];
$phone = $_POST['phone'];
$method = $_POST['method'];
$token = "";
$chat_id = "";
$arr = array(
  'Имя клиента: ' => $name,
  'Телефон: ' => $phone,
  'Способ связи: ' => $method,
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");
?>