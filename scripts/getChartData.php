<?php


	spl_autoload_register(function ($class) {
		include $class . '.php';
	});

	$team_id = isset($_GET['team_id']) ? $_GET['team_id'] : null;

	$teamModel = new Team;
	$resultsModel = new Result;
	$cupModel = new Cup;

	$response = array();

	$games = array();

	$cups = $cupModel->getAll();

	if ($team_id) {

		foreach ($resultsModel->getAll('h_team_id') as $game) {
			
			array_push($games, $game);
		}

		foreach ($resultsModel->getAll('a_team_id') as $game) {
			
			array_push($games, $game);
		}

	}

	if (count($games) > 0) {

		foreach ($cups as $cup) {

			$won = 0;
			$lost = 0;
			$drawn = 0;

			foreach ($games as $game) {
				
				if ($game->cup_id == $cup->id) {

					if ($team_id == $game->h_team_id) {

						if (intval($game->h_team_score) > intval($game->a_team_score)) {

							$won += 1;
						}

						if (intval($game->h_team_score) < intval($game->a_team_score)) {

							$lost += 1;
						}

						if (intval($game->h_team_score) == intval($game->a_team_score)) {

							$drawn += 1;
						}
					}

					if ($team_id == $game->a_team_id) {

						if (intval($game->a_team_score) > intval($game->h_team_score)) {

							$won += 1;
						}

						if (intval($game->a_team_score) < intval($game->h_team_score)) {

							$lost += 1;
						}

						if (intval($game->a_team_score) == intval($game->h_team_score)) {

							$drawn += 1;
						}
					}
					
					$cupData = array('year' => $cup->year, 'results' => array('won' => $won, 'lost' => $lost, 'drawn' => $drawn));
				}

			}
			
			array_push($response, $cupData);
		}

	}
	

	// sending json response
	header('Content-Type: application/json');

	echo json_encode($response);
?>