<?php

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(403);
    exit('Forbidden');
}

// $token - API бота
// $chat_id - ID чата с ботом. Переходим по ссылке https://api.telegram.org/botX/getUpdates где вместо X пишем API бота. Берем значение из chat:id с минусом

$name = trim($_POST['name'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$url = trim($_POST['url'] ?? '');
$token = "";
$chat_id = "";
$txt = '';
$arr = array(
  'Имя клиента: ' => $name,
  'Телефон: ' => $phone,
  'Страница отправки формы: ' => $url,
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");
?>