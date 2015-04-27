<?php

	spl_autoload_register(function ($class) {
		include $class . '.php';
	});

	$pool = isset($_GET['pool']) ? $_GET['pool'] : null;
	$team_id = isset($_GET['team_id']) ? $_GET['team_id'] : null;

	$teamModel = new Team;
	$fixtureModel = new Fixture;
	$cupModel = new Cup;

	$response = array();
	$fixtures = null;

	if ($team_id) {

		$fixtures = $fixtureModel->findAll('h_team_id', $team_id);

		foreach ($fixtures as $fix) {

			array_push($response, array('h_team' => $teamModel->findOne($fix->h_team_id)->name,
										'a_team' => $teamModel->findOne($fix->a_team_id)->name,
										'h_team_id' => $teamModel->findOne($fix->h_team_id)->id,
										'a_team_id' =>$teamModel->findOne($fix->a_team_id)->id,
										'date' => $fix->date));
		}

		$fixtures = $fixtureModel->findAll('a_team_id', $team_id);

		foreach ($fixtures as $fix) {

			array_push($response, array('h_team' => $teamModel->findOne($fix->h_team_id)->name,
										'a_team' => $teamModel->findOne($fix->a_team_id)->name,
										'h_team_id' => $teamModel->findOne($fix->h_team_id)->id,
										'a_team_id' =>$teamModel->findOne($fix->a_team_id)->id,
										'date' => $fix->date));
		}		

	} elseif ($pool) {

		$fixtures = $fixtureModel->findAll('pool', $pool);

		foreach ($fixtures as $fix) {

			array_push($response, array('h_team' => $teamModel->findOne($fix->h_team_id)->name,
										'a_team' => $teamModel->findOne($fix->a_team_id)->name,
										'h_team_id' => $teamModel->findOne($fix->h_team_id)->id,
										'a_team_id' =>$teamModel->findOne($fix->a_team_id)->id,
										'date' => $fix->date));
		}		
	
	} else {

		$fixtures = $fixtureModel->getAll();

		foreach ($fixtures as $fix) {

			array_push($response, array('h_team' => $teamModel->findOne($fix->h_team_id)->name,
										'a_team' => $teamModel->findOne($fix->a_team_id)->name,
										'h_team_id' => $teamModel->findOne($fix->h_team_id)->id,
										'a_team_id' =>$teamModel->findOne($fix->a_team_id)->id,
										'date' => $fix->date));
		}
	}


	// sending json response
	header('Content-Type: application/json');

	echo json_encode($response);
	
?>