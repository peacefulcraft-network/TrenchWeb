<?php
/*
    Account Information Page
*/
namespace pcn\trenchweb\controllers;
class home extends Controller{
    public function __construct(){

    }

    public function index(){
        $this->header();
        $this->view("home/helloworld");
        $this->footer();
    }
}
?>
