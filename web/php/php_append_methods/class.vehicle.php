<?php

class Vehicle
{
    public $make = 'vehicle';
    public $seasonMessage = '';
    public $imported_functions=array();
    public $imported_classes=array();
    public $canrace=true;
    public $wheels = 2;
    public $canFitChains = true;

    public function __construct()
    {
        $this->congratulate();
    }

    public function congratulate()
    {
        echo '<p>Congratulations on your purchase of a new '.$this->make.'!</p>';
    }

    public function showSeasonMessage()
    {
        echo $this->seasonMessage;
    }

    public function race()
    {
        if ($this->canrace) {
            $this->showSeasonMessage();
            echo '<p>Racing... vrooooom!</p>';
        } else {
            echo '<p>You are not allowed to race!</p>';
        }
    }

    public function __call($method, $args)
    {
        if ($this->imported_functions && array_key_exists($method, $this->imported_functions)) {
            $args[] = &$this;
            return call_user_func_array(array($this->imported_functions[$method], $method), $args);
        } else {
            die('Call to undefined method/class function: ' . $method);
        }
    }

    public function extend($functionality)
    {
        /*
            magic function __call (above) MUST BE USED with this.

            load additional class functionality on request.
            looks for a file with the name e.g. class.youtube.php
            in the same folder which must contain a class called
            e.g. Youtube (i.e. $functionality all lowercase but
            with upper case first letter)

            usage:

            if(!$this->extend('youtube')){
                return '';
            }
            $videoID = intval($_GET['videoID']);
            return $this->getVideoTitle($videoID);

        */
        $functionality = strtolower($functionality);
        $child_class=null;
        $child_class_file = dirname(__FILE__).'/class.' .$functionality. '.php';
        if (!@$this->imported_classes[$child_class_name] && (file_exists($child_class_file))) {
            require_once($child_class_file);

            $child_class_name = ucfirst(strtolower($functionality));
            $child_class = new $child_class_name($this);
            $functions = get_class_methods($child_class);

            array_push($this->imported_classes, $child_class_name);
            array_push($this->imported_functions, array($child_class_name, $child_class));

            foreach ($functions as $key => $function_name) {
                $this->imported_functions[$function_name] = &$child_class;
            }
        }
        return (bool)$child_class;
    }
}

class BMW extends Vehicle
{
    public function __construct()
    {
        $this->make = 'BMW';
        $this->wheels = 4;
        parent::__construct();
    }
}


class Harley extends Vehicle
{
    public function __construct()
    {
        $this->make = 'Harley Davidson';
        $this->canFitChains = false;
        parent::__construct();
    }
}
