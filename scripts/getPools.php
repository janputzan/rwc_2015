<?php

	spl_autoload_register(function ($class) {
		include $class . '.php';
	});

	$pool = isset($_GET['pool']) ? $_GET['pool'] : null;

	$teamModel = new Team;
	$resultsModel = new Result;
	$cupModel = new Cup;

	$response = array();
	$fixtures = null;

	if (!$pool) {

		$pool_a = $teamModel->findAll('pool', 'A');
		$pool_b = $teamModel->findAll('pool', 'B');
		$pool_c = $teamModel->findAll('pool', 'C');
		$pool_d = $teamModel->findAll('pool', 'D');

		$response = array('A' => $pool_a,
						'B' => $pool_b,
						'C' => $pool_c,
						'D' => $pool_d);

	} else {

		$response = array('pool' =>	$teamModel->findAll('pool', $pool),
						'fixtures' => $fixtures);
	}


	// sending json response
	header('Content-Type: application/json');

	echo json_encode($response);
	
?>