<?php
namespace pcn\trenchweb\models;
class Player extends \pcn\trenchweb\PCNDB{
    private $_uuid;
        public function getUUID() { return $this->_uuid; }
    private $_username; 
        public function getUsername() { return $this->_username; }

    private $_stats;
        public function getStats(){ return $this->_stats; }

    public function __construct(string $uuid){
        
        if(strlen($uuid) != 32){ throw new \UnexpectedValueException("Invalid UUID Supplied"); }

        SELF::$mysqli->select_db("s18_trenchstat");
        $query = SELF::$mysqli->prepare("SELECT * FROM `gamestats` WHERE `uuid`=? LIMIT 1");
        $query->bind_param("s", $uuid);
        $query->execute();
        $query->store_results();
        if($query->num_rows == 0){
            $query->close();
            throw new \UnexpectedValueException("UUID does not exist in database");
        }
        $res = $query->fetch_array(MYSQLI_ASSOC);
        $this->_uuid = $res["uuid"];
        $this->_username = $res["username"];
        $this->_stats = array_splice($res, 0, 2, array());
        $query->close();
    }

    /**
     * Convert a $username into a Minecraft UUID
     * @param $username: The username to convert
     * @return UUID if one is found in the player index, empty string otherwise
     */
    public static function fetchUUID(string $username){

        if(strlen($username) < 3){ return ""; }

        SELF::$mysqli->select_db("s5_infractions");
        $query = SELF::$mysqli->prepare("SELECT `UUID` FROM `BAT_players` WHERE `BAT_player`=? LIMIT 1");
        $query->bind_param("s",$username);
        $query->execute();
        $query->store_result();
        if($query->num_rows == 0){
            $query->close();
            return "";
        }
        $query->bind_result($uuid);
        $query->fetch();
        $query->close();
        return $uuid;
    }

    /**
     * Search for usernames in player index like the $param provided
     * @param $param: Search key
     * @return Numeric array with 25 hits.
     */
    public static function searchUsernames(string $param){

        SELF::$mysqli->select_db("s5_infractions");
        $query = SELF::$mysqli->prepare("SELECT `BAT_player` FROM `Bat_players` WHERE `Bat_player` LIKE %?% LIMIT 25");
        $query->bind_param("s", $param);
        $query->execute();
        $query->store_result();
        $res = $query->fetch_array(MYSQLI_NUM);
        $query->close();
        return $res;

    }
}

?>