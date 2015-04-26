<?php

/**
*
*	Class for connecting to database an running queries
*
*/
class Database {

	private $servername;
	private $username;
	private $password;
	private $dbname;
	private $connection;

	// constructor to call when an object is created
	public function __construct() {

		// settings for local/remote environment
		// if (App::isLocal()) {

			$this->servername = "localhost";
			$this->username = "root";
			$this->password = "";
			$this->dbname = "rwc_2015";

		// } else {

		// 	$this->servername = "lochnagar.abertay.ac.uk";
		// 	$this->username = "sql1405776";
		// 	$this->password = "PEk0Ub9v";
		// 	$this->dbname = "sql1405776";
			
		// }

		try {
			
		    $this->connection = new PDO("mysql:host=$this->servername;dbname=$this->dbname", $this->username, $this->password);
		    $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		}
		catch(PDOException $e){

		    echo "Connection failed: " . $e->getMessage();
		}
		
	}

	public function __destruct() {

		$this->connection = null;
	}

	/**
	 * Run a query and return one instance of result
	 *
	 * @param  string  $sql
	 * 
	 * @return PDO object
	 */

	public function one($sql) {

		$query = $this->connection->query($sql);
		
		$result = $query->fetch(PDO::FETCH_OBJ);

		return $result;
	}

	/**
	 * Run a query and return array of result
	 *
	 * @param  string  $sql
	 * 
	 * @return array of PDO objects
	 */

	public function all($sql) {
//-----> remove this 
		// var_dump($sql);
//----->
		$query = $this->connection->query($sql);
		
		$result = $query->fetchAll(PDO::FETCH_OBJ);

		return $result;
	}

	/**
	 * Execute a query and return boolean
	 *
	 * @param  string  $sql
	 * 
	 * @return boolean
	 */

	public function execute($sql) {

		try {
		
			$this->connection->exec($sql);
		
		} catch(PDOException $e) {

		    echo $e->getMessage();
		    
		    return false;
  		}

		return true;	
	}

	/**
	 * Execute a query and return integer or false
	 *
	 * @param  string  $sql
	 * 
	 * @return mixed $result
	 */
	public function getNumber($sql) {

		try {

			$query = $this->connection->query($sql);

			$result = $query->fetch(PDO::FETCH_NUM);
		
		} catch (PDOException $e) {

			echo $e->getMessage();

			return false;
		}

		return $result;
	}
	
}



?>