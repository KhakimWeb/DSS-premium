<?php
$recepient = "khakim.arli@bk.ru";

$name = trim($_POST["nickname"]);
$comment = trim($_POST["reviewText"]);
$message = "Ник: $name \nОтзыв: $comment";

$pagetitle = "Отзыв с сайта";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");

?>