<?php
class Tx_FrpExtendNews_Domain_Model_NewsDefault extends Tx_News_Domain_Model_News {

	/**
	 * the new field
	 * @var string
	 */
	protected $newField;
	
	/**
	 * Returns an array of orderings created from a given demand object.
	 *
	 * @param string $newField
	 * @return void
	 */
	public function setNewField($value) {
		$this->newField = $value;
	}

	/**
	 * Get new field
	 *
	 * @return string
	 */
	public function getNewField() {
		return $this->newField;
	}

}
?>