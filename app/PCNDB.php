<?php
namespace pcn\trenchweb;
//Gets $mysqli and "general typing" from TSADB
class PCNDB extends \tsa\mvc\TSADB{
    public function __construct(){
        if(CONFIG::is_prod()){
            SELF::$mysqli = new mysqli("localhost", "trenchweb", "Y++Q@QWR]pFr?F[(RP\?", "s18_trenchstat");
        }else{
            SELF::$mysqli = new mysqli();
        }
    }
}
?>