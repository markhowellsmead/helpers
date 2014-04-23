<?php
if (!defined('TYPO3_MODE')) {
	die ('Access denied.');
}

\TYPO3\CMS\Extbase\Utility\ExtensionUtility::configurePlugin(
	'TYPO3.' . $_EXTKEY,
	'Pi1',
	// cacheable actions
	array(
		'Keyword' => 'keywordList',
	),
	// non-cacheable actions
	array(
		'Keyword' => '',
	)
);
?>