<?php
namespace pcn\trenchweb\core;
class Application extends \tsa\mvc\core\Application{

    public function __construct(){
        parent::__construct("pcn\\trenchweb");


        $this->route();
    }

}
?>