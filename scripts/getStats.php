<?php

	spl_autoload_register(function ($class) {
		include $class . '.php';
	});

	$team_id = $_GET['team_id'];

	$teamModel = new Team;
	$resultsModel = new Result;
	$cupModel = new Cup;

	$team = $teamModel->findOne($team_id);

	$homeGames = $resultsModel->findAll('h_team_id', $team_id);
	$awayGames = $resultsModel->findAll('a_team_id', $team_id);

	$response = array();

	foreach ($homeGames as $game) {

		if ($game->h_team_id == $team_id) {

			$against_id = $game->a_team_id;

			if ($game->h_team_score > $game->a_team_score) {

				$result = 'win';
			
			} elseif ($game->h_team_score < $game->a_team_score) {

				$result = 'lost';
			
			} else {

				$result = 'draw';
			}
		
		} else {

			$against_id = $game->h_team_id;

			if ($game->h_team_score < $game->a_team_score) {

				$result = 'win';
			
			} elseif ($game->h_team_score > $game->a_team_score) {

				$result = 'lost';
			
			} else {

				$result = 'draw';
			}
		}

		array_push($response, array('against' => $teamModel->findOne($against_id)->name,
									'cup' => $cupModel->findOne($game->cup_id)->year,
									'result' => $result,
									'score' => $game->h_team_score . '-' . $game->a_team_score));
	}

	foreach ($awayGames as $game) {

		if ($game->h_team_id == $team_id) {

			$against_id = $game->a_team_id;

			if ($game->h_team_score > $game->a_team_score) {

				$result = 'win';
			
			} elseif ($game->h_team_score < $game->a_team_score) {

				$result = 'lost';
			
			} else {

				$result = 'draw';
			}
		
		} else {

			$against_id = $game->h_team_id;

			if ($game->h_team_score < $game->a_team_score) {

				$result = 'win';
			
			} elseif ($game->h_team_score > $game->a_team_score) {

				$result = 'lost';
			
			} else {

				$result = 'draw';
			}
		}

		array_push($response, array('against' => $teamModel->findOne($against_id)->name,
									'cup' => $cupModel->findOne($game->cup_id)->year,
									'result' => $result,
									'score' => $game->h_team_score . '-' . $game->a_team_score));
	}

	// sending json response
	header('Content-Type: application/json');

	echo json_encode($response);
	
?>