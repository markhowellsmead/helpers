<?php

class Winter
{

    /////////////////////////////////////////////
    
    public function __construct(&$object)
    {
        $object->seasonMessage = '<p>Be careful, the roads might be slippery because it\'s winter.</p>';
    }

    /////////////////////////////////////////////
    
    public function fitSnowChains(&$object)
    {
        $this->object = $object;
        $this->object->canrace = false;
        if ($this->object->canFitChains) {
            echo '<p>Snow chains (' .$this->object->chainWeight. ') fitted to ' .$this->object->wheels. ' wheels of your '.$this->object->make.'.</p>';
            $this->object->canrace = true;
        } else {
            echo '<p>You cannot fit snow chains to your '.$this->object->make.'!</p>';
        }
    }
    
    /////////////////////////////////////////////
    
    public function fitLightChains(&$object)
    {
        $this->object = $object;
        $this->object->chainWeight = 'light';
        $this->object->fitSnowChains();
    }
    
    /////////////////////////////////////////////
    
    public function fitHeavyChains(&$object)
    {
        $this->object = $object;
        $this->object->chainWeight = 'heavy';
        $this->object->fitSnowChains();
    }
    
    /////////////////////////////////////////////
}
