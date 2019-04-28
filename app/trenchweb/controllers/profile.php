<?php
namespace pcn\trenchweb\controllers;
use \pcn\trenchweb\core\Config;
use \pcn\trenchweb\models\Player;
class profile extends Controller{

    public function index(string $param = ""){
        
        //Look for player to fetch data on, otherwise show search window
        if(strlen($param) < 1){ $param = @$_GET["param"]; }
        if(strlen($param) < 1){

            $this->searchform();
            return;
        }
        
        //Exact uuid, attempt to load stats
        if(strlen($param) == 32){
            try{
                $Player = new Player($param);
            }catch(\UnexpectedValueException $x){
                
                //UUID not in database, redirect to search form
                $this->header(array("urlbase"=>Config::getRootUrl()));
                $this->view("profile/playernotfound", array("playerstring"=>$param));
                $this->view("profile/searchform", array("actionURL"=>Config::getRootUrl()));
                $this->footer();
                return;

            }catch(\Exception $x){
                //Generic error
                //TODO: $this->error("Database Error! Please try again later.");
            }
        }

        //UUID is valid an we have a Player in $Player
        $this->header(array("urlbase"=>Config::getRootUrl()));
        $this->view("profile/profile", array("username"=>$Player->getUsername(), "uuid"=>$Player->getUUID(), "stats"=>$Player->getStats()));
        $this->footer();
    }

    public function searchform(){
        $this->header(array("urlbase"=>Config::getRootUrl()));
        $this->view("profile/searchform", array("actionURL"=>Config::getRootUrl()));
        $this->footer();
    }

    public function results(string $params = ""){

        //Look for search params, otherwise show search window
        if(strlen($params) < 1){ $params = @$_GET["params"]; }
        if(strlen($params) < 1){ $this->index(); return; }
        
        //Search for mathing usernames
        $res = Player::searchUsernames($params);
        
        //Output
        $this->header(array("urlbase"=>Config::getRootUrl()));
        
        $this->view("profile/searchform", array("actionURL"=>Config::getRootUrl(), "param"=>htmlentities($params)));
        $this->view("player/searchresults", array("results"=>$res));

        $this->footer();
    }

}
?>