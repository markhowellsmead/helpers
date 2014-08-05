<?php

namespace TYPO3\FrpKeywords\Tests;
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
 *  the Free Software Foundation; either version 2 of the License, or
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
 * Test case for class \TYPO3\FrpKeywords\Domain\Model\Pages.
 *
 * @version $Id$
 * @copyright Copyright belongs to the respective authors
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 *
 * @package TYPO3
 * @subpackage Add content tags
 *
 * @author Mark Howells-Mead <m.howells-mead@frappant.ch>
 */
class PagesTest extends \TYPO3\CMS\Extbase\Tests\Unit\BaseTestCase {
	/**
	 * @var \TYPO3\FrpKeywords\Domain\Model\Pages
	 */
	protected $fixture;

	public function setUp() {
		$this->fixture = new \TYPO3\FrpKeywords\Domain\Model\Pages();
	}

	public function tearDown() {
		unset($this->fixture);
	}

	/**
	 * @test
	 */
	public function getfrp_keywords_keywordReturnsInitialValueForKeyword() { 
		$newObjectStorage = new \TYPO3\CMS\Extbase\Persistence\Generic\ObjectStorage();
		$this->assertEquals(
			$newObjectStorage,
			$this->fixture->getfrp_keywords_keyword()
		);
	}

	/**
	 * @test
	 */
	public function setfrp_keywords_keywordForObjectStorageContainingKeywordSetsfrp_keywords_keyword() { 
		$frp_keywords_keyword = new \TYPO3\FrpKeywords\Domain\Model\Keyword();
		$objectStorageHoldingExactlyOnefrp_keywords_keyword = new \TYPO3\CMS\Extbase\Persistence\Generic\ObjectStorage();
		$objectStorageHoldingExactlyOnefrp_keywords_keyword->attach($frp_keywords_keyword);
		$this->fixture->setfrp_keywords_keyword($objectStorageHoldingExactlyOnefrp_keywords_keyword);

		$this->assertSame(
			$objectStorageHoldingExactlyOnefrp_keywords_keyword,
			$this->fixture->getfrp_keywords_keyword()
		);
	}
	
	/**
	 * @test
	 */
	public function addfrp_keywords_keywordToObjectStorageHoldingfrp_keywords_keyword() {
		$frp_keywords_keyword = new \TYPO3\FrpKeywords\Domain\Model\Keyword();
		$objectStorageHoldingExactlyOnefrp_keywords_keyword = new \TYPO3\CMS\Extbase\Persistence\Generic\ObjectStorage();
		$objectStorageHoldingExactlyOnefrp_keywords_keyword->attach($frp_keywords_keyword);
		$this->fixture->addfrp_keywords_keyword($frp_keywords_keyword);

		$this->assertEquals(
			$objectStorageHoldingExactlyOnefrp_keywords_keyword,
			$this->fixture->getfrp_keywords_keyword()
		);
	}

	/**
	 * @test
	 */
	public function removefrp_keywords_keywordFromObjectStorageHoldingfrp_keywords_keyword() {
		$frp_keywords_keyword = new \TYPO3\FrpKeywords\Domain\Model\Keyword();
		$localObjectStorage = new \TYPO3\CMS\Extbase\Persistence\Generic\ObjectStorage();
		$localObjectStorage->attach($frp_keywords_keyword);
		$localObjectStorage->detach($frp_keywords_keyword);
		$this->fixture->addfrp_keywords_keyword($frp_keywords_keyword);
		$this->fixture->removefrp_keywords_keyword($frp_keywords_keyword);

		$this->assertEquals(
			$localObjectStorage,
			$this->fixture->getfrp_keywords_keyword()
		);
	}
	
}
?>