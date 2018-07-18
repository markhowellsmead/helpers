<?php
require_once('class.vehicle.php');

$myVehicle = new BMW();

if ($myVehicle->extend('winter')) {
    $myVehicle->fitHeavyChains();
}

$myVehicle->race();
