<?php
namespace TYPO3\FrpKeywords\Domain\Model;

/***************************************************************
 *  Copyright notice
 *
 *  (c) 2014 Mark Howells-Mead <m.howells-mead@frappant.ch>, !frappant Webfactory
 *  
 *  All rights reserved
 *
 *  This script is part of the TYPO3 project. The TYPO3 project is
 *  free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  The GNU General Public License can be found at
 *  http://www.gnu.org/copyleft/gpl.html.
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  This copyright notice MUST APPEAR in all copies of the script!
 ***************************************************************/

/**
 *
 *
 * @package frp_keywords
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 *
 */
class Pages extends \TYPO3\CMS\Extbase\DomainObject\AbstractEntity {

	/**
	 * frp_keywords_keyword
	 *
	 * @var \TYPO3\CMS\Extbase\Persistence\ObjectStorage<\TYPO3\FrpKeywords\Domain\Model\Keyword>
	 */
	protected $frp_keywords_keyword;

	/**
	 * __construct
	 *
	 * @return Pages
	 */
	public function __construct() {
		//Do not remove the next line: It would break the functionality
		$this->initStorageObjects();
	}

	/**
	 * Initializes all ObjectStorage properties.
	 *
	 * @return void
	 */
	protected function initStorageObjects() {
		/**
		 * Do not modify this method!
		 * It will be rewritten on each save in the extension builder
		 * You may modify the constructor of this class instead
		 */
		$this->frp_keywords_keyword = new \TYPO3\CMS\Extbase\Persistence\ObjectStorage();
	}

	/**
	 * Adds a Keyword
	 *
	 * @param \TYPO3\FrpKeywords\Domain\Model\Keyword $frp_keywords_keyword
	 * @return void
	 */
	public function addfrp_keywords_keyword(\TYPO3\FrpKeywords\Domain\Model\Keyword $frp_keywords_keyword) {
		$this->frp_keywords_keyword->attach($frp_keywords_keyword);
	}

	/**
	 * Removes a Keyword
	 *
	 * @param \TYPO3\FrpKeywords\Domain\Model\Keyword $frp_keywords_keywordToRemove The Keyword to be removed
	 * @return void
	 */
	public function removefrp_keywords_keyword(\TYPO3\FrpKeywords\Domain\Model\Keyword $frp_keywords_keywordToRemove) {
		$this->frp_keywords_keyword->detach($frp_keywords_keywordToRemove);
	}

	/**
	 * Returns the frp_keywords_keyword
	 *
	 * @return \TYPO3\CMS\Extbase\Persistence\ObjectStorage<\TYPO3\FrpKeywords\Domain\Model\Keyword> $frp_keywords_keyword
	 */
	public function getfrp_keywords_keyword() {
		return $this->frp_keywords_keyword;
	}

	/**
	 * Sets the frp_keywords_keyword
	 *
	 * @param \TYPO3\CMS\Extbase\Persistence\ObjectStorage<\TYPO3\FrpKeywords\Domain\Model\Keyword> $frp_keywords_keyword
	 * @return void
	 */
	public function setfrp_keywords_keyword(\TYPO3\CMS\Extbase\Persistence\ObjectStorage $frp_keywords_keyword) {
		$this->frp_keywords_keyword = $frp_keywords_keyword;
	}

}
?>