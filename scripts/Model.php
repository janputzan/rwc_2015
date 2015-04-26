<?php

abstract class Model extends Database {


	protected $table;
	protected $model;

	public function __construct() {

		parent::__construct();
		$this->model = get_class($this);
		$this->table = strtolower($this->model)."s";

	}

	/**
	 * Get all rows from a table
	 *
	 * @return array of PDO objects
	 */

	public function getAll() {

		$sql = "SELECT * FROM $this->table";

		return $this->all($sql);
	}

	/**
	 * Get one result witch matching $id
	 *
	 * @param  int  $id
	 * @return PDO object
	 */

	public function findOne($id) {

		$sql = "SELECT * FROM $this->table WHERE id = '$id'";

		return $this->one($sql);
	}

	/**
	 * Get array of results with matching column name and value
	 *
	 * @param  string  $columnName
	 * @param  string  $value
	 * @return array of PDO objects
	 */

	public function findAll($columnName, $value) {

		$sql = "SELECT * FROM $this->table WHERE $columnName = '$value'";

		return $this->all($sql);
	}

	public function rawQuery($sql) {

		return $this->all($sql);
	}

}

