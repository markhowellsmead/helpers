<?php

require(__DIR__ .'/../Resources/Private/Php/PHPExcel.php');
require(__DIR__ .'/../Resources/Private/Php/PHPExcel/Writer/Excel2007.php');

class ExportData{
	function __construct($datatype){
		switch ($datatype) {
			case "users":
				$this->exportUsers();
				break;
		}
	}

	function exportUsers(){
		$objPHPExcel = new PHPExcel();
			
		$objPHPExcel->getProperties()->setCreator("OLV Hindelbank");
		$objPHPExcel->getProperties()->setLastModifiedBy("OLV Hindelbank");
		$objPHPExcel->getProperties()->setTitle("olvh mitgliederliste");
		$objPHPExcel->getProperties()->setSubject("olvh mitgliederliste");
		$objPHPExcel->getProperties()->setDescription("olvh mitgliederliste");
			
			
		$objPHPExcel->setActiveSheetIndex(0);

		$objPHPExcel->getActiveSheet()->getStyle("A1:L1")->getFont()->setBold(true);
		$objPHPExcel->getActiveSheet()->SetCellValue('A1', '#');
		$objPHPExcel->getActiveSheet()->SetCellValue('B1', 'Name');
		$objPHPExcel->getActiveSheet()->SetCellValue('C1', 'Vorname');
		$objPHPExcel->getActiveSheet()->SetCellValue('D1', 'Jahrgang');
		$objPHPExcel->getActiveSheet()->SetCellValue('E1', 'Strasse');
		$objPHPExcel->getActiveSheet()->SetCellValue('F1', 'PLZ');
		$objPHPExcel->getActiveSheet()->SetCellValue('G1', 'Ort');
		$objPHPExcel->getActiveSheet()->SetCellValue('H1', 'Telefon');
		$objPHPExcel->getActiveSheet()->SetCellValue('I1', 'Email');
		$objPHPExcel->getActiveSheet()->SetCellValue('J1', 'Geburtsdatum');
		$objPHPExcel->getActiveSheet()->SetCellValue('K1', 'Mobile');
		$objPHPExcel->getActiveSheet()->SetCellValue('L1', 'user_login');
		$objPHPExcel->getActiveSheet()->setTitle('Mitgliederliste');
			
		$args = array(
				'orderby'      => 'last_name',
				'order'        => 'ASC'
				);
				$users = get_users( $args );
				$i = 2;
				foreach ($users as $user){
					$objPHPExcel->getActiveSheet()->SetCellValue('A'.$i, $i-1);
					$objPHPExcel->getActiveSheet()->SetCellValue('B'.$i,$user->last_name);
					$objPHPExcel->getActiveSheet()->SetCellValue('C'.$i,$user->first_name);
					$objPHPExcel->getActiveSheet()->SetCellValue('D'.$i,get_user_meta($user->ID,'year', true));
					$objPHPExcel->getActiveSheet()->SetCellValue('E'.$i,get_user_meta($user->ID,'road', true));
					$objPHPExcel->getActiveSheet()->SetCellValue('F'.$i,get_user_meta($user->ID,'plz', true));
					$objPHPExcel->getActiveSheet()->SetCellValue('G'.$i,get_user_meta($user->ID,'location', true));
					$objPHPExcel->getActiveSheet()->SetCellValue('H'.$i,get_user_meta($user->ID,'phone_mobile', true));
					$objPHPExcel->getActiveSheet()->SetCellValue('I'.$i, $user->user_email);
					$objPHPExcel->getActiveSheet()->SetCellValue('J'.$i,get_user_meta($user->ID,'birthdate', true));
					$objPHPExcel->getActiveSheet()->SetCellValue('K'.$i,get_user_meta($user->ID,'phone_mobile', true));
					$objPHPExcel->getActiveSheet()->SetCellValue('L'.$i,$user->user_login, true);
					$i++;
				}

				PHPExcel_Shared_Font::setAutoSizeMethod(PHPExcel_Shared_Font::AUTOSIZE_METHOD_EXACT);
				foreach(range('A','L') as $columnID) {
					$objPHPExcel->getActiveSheet()->getColumnDimension($columnID)
					->setAutoSize(true);
				}
					
				date_default_timezone_set("Europe/Berlin");
				$fileName = "/wp-content/uploads/frpExportDataAsExcel/olvh_mitgliederliste_".date("YmdHis").".xlsx";

				$objWriter = new PHPExcel_Writer_Excel2007($objPHPExcel);
				$objWriter->save("..".$fileName);
				die($fileName);
	}
}
?>