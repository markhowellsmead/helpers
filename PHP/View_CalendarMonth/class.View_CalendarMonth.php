<?php
/*

	PHP-Class to build and generate an HTML table view of a selected month.
	Week starts on Monday and ends on Sunday. Weekend days (Saturday and
	Sunday) receive a different CSS class name.

	Usage:
	require_once('class.View_CalendarMonth.php');
	$calendar  = new View_CalendarMonth(10,2013);
	echo $calendar->viewData;

	Mark Howells-Mead | mhm.li | 3.10.2013
	Use it however you like. No copyright or license required.
	
*/

class View_CalendarMonth {

	function dump($var,$die=false){
		echo '<pre>' .print_r($var,1). '</pre>';
		if($die){die();}
	}//dump
	
	var $className, $monthName, $daysInMonth, 
		$currentDay = 0, $currentMonth = 0, $currentYear = 0, 
		$dayFirst = 1, $dayLast = 31, $weekdayFirst = 1, $weekdayLast = 7;

	var $days = array(), $grid = array(),
		$dayDefault = array('dayNumber' => null,'weekdayNumber' => null,'weekend' => 0, 'today' => 0, 'empty' => 0),
		$dayEmpty = array('dayNumber' => null,'weekdayNumber' => null,'weekend' => 0, 'today' => 0, 'empty' => 1),
		$viewData = '';
	
	////////////////////////////////////////////////////////////
	
	function __construct($month,$year){
		
		$this->className = get_class();
	
		$this->year 	= $year;
		$this->month 	= $month;

		$this->setCurrentDate();
		$this->setRange();
		$this->fillDays();
		$this->buildGrid();
		$this->buildHTML();

	}//__construct
	
	////////////////////////////////////////////////////////////
	
	function setRange(){
		$this->daysInMonth = cal_days_in_month(CAL_GREGORIAN, intval($this->month), intval($this->year));
		$this->monthString	= $this->year.'-'.$this->month;
		$this->dayFirst	= strtotime($this->monthString.'-01');
		$this->dayLast	= strtotime($this->monthString.'-'.$this->daysInMonth);
	}//setRange
	
	////////////////////////////////////////////////////////////
	
	function setCurrentDate(){
		$this->currentDay 	= intval(strftime('%e'));
		$this->currentMonth	= intval(strftime('%m'));
		$this->currentYear	= intval(strftime('%Y'));
	}//setCurrentDate
	
	////////////////////////////////////////////////////////////
	
	function setCurrentDay(){
		if($this->month == $this->currentMonth && $this->year == $this->currentYear){
			$this->days[$this->currentDay]['today'] = true;
		}
	}//setCurrentDay
	
	////////////////////////////////////////////////////////////
	
	function fillDays(){
		$this->days = array_fill(1,$this->daysInMonth,$this->dayDefault);
		$this->setCurrentDay();
		foreach($this->days as $n => &$day){
			$day['dayNumber'] = intval($n);
			$day['weekdayNumber'] = strftime('%u',strtotime($this->monthString.'-'.$n));
			$day['weekend'] = $this->isWeekend($day['weekdayNumber']);
		}
	}//fillDays
	
	////////////////////////////////////////////////////////////
	
	function buildGrid(){

		$dayIterator = $this->weekdayFirst;
		$weekIterator = $this->weekdayFirst;
		
		$this->grid = array_fill(0,5,null);
		$weekIterator = 0;

		while($dayIterator<=$this->daysInMonth){
		
			$this->grid[$weekIterator][] = $this->days[$dayIterator];

			if($this->days[$dayIterator]['weekdayNumber']==$this->weekdayLast){
				$weekIterator++;
			}
			$dayIterator++;
		}
		unset($dayIterator);
		unset($weekIterator);
		$this->addEmptyDays();
	}//buildGrid
	
	////////////////////////////////////////////////////////////
	
	function addEmptyDays(){
	
		$firstWeek = &$this->grid[0];
		$finalWeek = &$this->grid[count($this->grid)-1];
		
		if(count($finalWeek)<$this->weekdayLast){
			// add empty days to the end of the month

			$dayNumber = $finalWeek[count($finalWeek)-1]['weekdayNumber']+1;
			
			while(count($finalWeek)<$this->weekdayLast){
				array_push($finalWeek, $this->dayEmpty);
				$finalWeek[count($finalWeek)-1]['weekdayNumber'] = $dayNumber;
				$finalWeek[count($finalWeek)-1]['weekend'] = $this->isWeekend($dayNumber);
				$dayNumber++;
			}
			unset($dayNumber);
		}

		if(count($firstWeek)<$this->weekdayLast){
			// add empty days to the start of the month
			$dayNumber = $firstWeek[0]['weekdayNumber']-1;

			while(count($firstWeek)<$this->weekdayLast){
				array_unshift($firstWeek, $this->dayEmpty);
				$firstWeek[0]['weekdayNumber'] = $dayNumber;
				$firstWeek[0]['weekend'] = $this->isWeekend($dayNumber);
				$dayNumber--;
			}
			unset($dayNumber);
		}
	}
	
	////////////////////////////////////////////////////////////
	
	function isWeekend($dayNumber){
		// return boolean value: weekend is classed as day 6 or 7 (Sat/Sun)
		$dayNumber = strval($dayNumber);
		return ($dayNumber==='6' || $dayNumber==='7');
	}//isWeekend
	
	////////////////////////////////////////////////////////////
	
	function buildHTML(){
	
		$html = '';

		foreach($this->grid as $week){
			$html .= '<tr>';
			foreach($week as $day){
				$html.='<td data-dayNumber="' .$day['dayNumber']. '" class="' .($day['weekend']?'weekend':'weekday').($day['empty']?' empty':'').($day['today']?' today':''). '">' .($day['empty']?'&nbsp;':$day['dayNumber']). '</td>';	
			}
			$html .= '</tr>';
		}

		if($html!==''){
			$this->viewData = '<table class="calendar">' .$html. '</table>';
		}
	}
	
}//class