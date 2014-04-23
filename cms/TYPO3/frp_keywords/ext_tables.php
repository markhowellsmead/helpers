<?php
if (!defined('TYPO3_MODE')) {
	die ('Access denied.');
}

/**
* Register an Extbase PlugIn into backend's list of plugins
*/
\TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerPlugin(
	'FrpKeywords',	// The name of the extension in UpperCamelCase
	'Pi1',	// A unique name of the plugin in UpperCamelCase
	'Keyword list'	// A title shown in the backend dropdown field
);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile($_EXTKEY, 'Configuration/TypoScript', 'Add content tags');
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addLLrefForTCAdescr('tx_frpkeywords_domain_model_keyword', 'EXT:frp_keywords/Resources/Private/Language/locallang_csh_tx_frpkeywords_domain_model_keyword.xlf');
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::allowTableOnStandardPages('tx_frpkeywords_domain_model_keyword');
$TCA['tx_frpkeywords_domain_model_keyword'] = array(
	'ctrl' => array(
		'title'	=> 'LLL:EXT:frp_keywords/Resources/Private/Language/locallang_db.xlf:tx_frpkeywords_domain_model_keyword',
		'label' => 'keyword',
		'tstamp' => 'tstamp',
		'crdate' => 'crdate',
		'cruser_id' => 'cruser_id',
		'dividers2tabs' => TRUE,

		'versioningWS' => 2,
		'versioning_followPages' => TRUE,
		'origUid' => 't3_origuid',
		'languageField' => 'sys_language_uid',
		'transOrigPointerField' => 'l10n_parent',
		'transOrigDiffSourceField' => 'l10n_diffsource',
		'delete' => 'deleted',
		'enablecolumns' => array(
			'disabled' => 'hidden',
			'starttime' => 'starttime',
			'endtime' => 'endtime',
		),
		'searchFields' => 'keyword,',
		'dynamicConfigFile' => \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extPath($_EXTKEY) . 'Configuration/TCA/Keyword.php',
		'iconfile' => \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extRelPath($_EXTKEY) . 'Resources/Public/Icons/tx_frpkeywords_domain_model_keyword.gif'
	),
);

$tempColumns = Array (
	"frp_keywords_keyword" => Array (		
		"label" => "LLL:EXT:frp_keywords/Resources/Private/Language/locallang_db.xlf:tx_frpkeywords_domain_model_pages.frp_keywords_keyword",
		"config" => Array (
			"type" => "select",	
			"foreign_table" => "tx_frpkeywords_domain_model_keyword",	
			"foreign_table_where" => "ORDER BY keyword",
			"size" => 10,	
			"maxitems" => 30,
		)
	),
);

t3lib_div::loadTCA("pages");
t3lib_extMgm::addTCAcolumns("pages",$tempColumns,1);
t3lib_extMgm::addToAllTCAtypes("pages","frp_keywords_keyword;;;;1-1-1");

?>