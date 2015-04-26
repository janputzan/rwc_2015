<?php

	spl_autoload_register(function ($class) {
		include $class . '.php';
	});

	$teamModel = new Team;

	$team_id = isset($_GET['team_id']) ? $_GET['team_id'] : null;

	if ($team_id) {

		$teams = $teamModel->findOne($team_id);
	
	} else {

		$teams = $teamModel->getAll();
	}

	$response = array();

	
	// sending json response
	header('Content-Type: application/json');

	echo json_encode($teams)
	
?>