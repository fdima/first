<?php

session_start();

require_once "Facebook/autoload.php";

$FB = new \Facebook\Facebook([
	'app_id' => '2066301470277423',
	'app_secret' => '1ee978e8c0e1e2a95f5bc8d82aef3105',
	'default_graph_version' => 'v3.0', //v2.10
	]);

$helper = $FB->getRedirectLoginHelper();


?>