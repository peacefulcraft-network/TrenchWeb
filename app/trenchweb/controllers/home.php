<?php
/*
    Account Information Page
*/
namespace pcn\trenchweb\controllers;
use pcn\trenchweb\core\Config;
class home extends Controller{
    public function __construct(){

    }

    public function index(){
        $this->header(array("urlbase"=>Config::getRootUrl()));
        $this->view("home/helloworld");
        $this->footer();
    }
}
?>
