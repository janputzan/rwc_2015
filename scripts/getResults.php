<?php

	spl_autoload_register(function ($class) {
		include $class . '.php';
	});

	$cup_id = isset($_GET['cup_id']) ? $_GET['cup_id'] : null;

	$teamModel = new Team;
	$resultsModel = new Result;
	$cupModel = new Cup;

	$response = array();

	if ($cup_id) {

		$cup = $cupModel->findOne($cup_id);

		if ($cup) {

			$final_result = $resultsModel->findOne($cup->final_id);
			$third_place_result = $resultsModel->findOne($cup->third_place_id);

			if ($final_result && $third_place_result) {

				$final = array(
					'h_team' => $teamModel->findOne($final_result->h_team_id)->name,
					'a_team' => $teamModel->findOne($final_result->a_team_id)->name,
					'result' => $final_result->h_team_score .'-'. $final_result->a_team_score
				);

				$third_place = array(
					'h_team' => $teamModel->findOne($third_place_result->h_team_id)->name,
					'a_team' => $teamModel->findOne($third_place_result->a_team_id)->name,
					'result' => $third_place_result->h_team_score .'-'. $third_place_result->a_team_score
				);

				$winner = ($final_result->h_team_score > $final_result->a_team_score) ? $teamModel->findOne($final_result->h_team_id)->name : $teamModel->findOne($final_result->a_team_id)->name;
				$second = ($final_result->h_team_score > $final_result->a_team_score) ? $teamModel->findOne($final_result->a_team_id)->name : $teamModel->findOne($final_result->h_team_id)->name;
				$third = ($third_place_result->h_team_score > $third_place_result->a_team_score) ? $teamModel->findOne($third_place_result->h_team_id)->name : $teamModel->findOne($third_place_result->a_team_id)->name;
			
			} else {

				$final = null;
				$third_place = null;
				$winner = 'n/a';
				$second = 'n/a';
				$third = 'n/a';
			}


			$response = array('year' => $cup->year,
								'host_country' => $cup->host,
								'winner' => $winner,
								'second' => $second,
								'third' => $third);

			$results = $resultsModel->findAll('cup_id', $cup_id);

			$resList = array();
			
			foreach ($results as $res) {
				
				array_push($resList, array(
					'h_team' => $teamModel->findOne($res->h_team_id)->name,
					'a_team' => $teamModel->findOne($res->a_team_id)->name,
					'score' => $res->h_team_score .'-'. $res->a_team_score,
					));
			}
		
		} 
	
	}


	// sending json response
	header('Content-Type: application/json');

	echo json_encode(array($response, $resList));
	
?>