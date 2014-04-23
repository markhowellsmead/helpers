<?php
class Tx_FrpExtendNews_Domain_Model_NewsDefault 
    extends Tx_News_Domain_Model_NewsDefault
{
	/**
	 * the new field
	 * @var string
	 */
	protected $frpextendnewsNewField;
	
	/**
	 * Returns an array of orderings created from a given demand object.
	 *
	 * @param string $frpextendnewsNewField
	 * @return void
	 */
	public function setFrpextendnewsNewField($value) {
	        $this->frpextendnewsNewField = $value;
	}
	/**
	 * Get new field
	 *
	 * @return string
	 */
	public function getFrpextendnewsNewField() {
		return $this->frpextendnewsNewField;
	}
}
?>