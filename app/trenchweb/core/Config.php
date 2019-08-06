<?php
namespace pcn\trenchweb\core;
class Config extends \tsa\mvc\core\Config{

    private static $_is_prod =  false;

    public function __construct(string $app_dir_prefix = ""){
        parent::__construct($app_dir_prefix);
        SELF::initRootUrl();
    }

    private static $_root_url;
        public function getRootUrl(){ return Config::$_root_url; }

    private static function initRootUrl(){
        if(SELF::$_is_prod){
            SELF::$_root_url = "https://player.peacefulcraft.net";
        }else{
            SELF::$_root_url = "http://localhost/TrenchWeb/public";
        }
    }

}
?>