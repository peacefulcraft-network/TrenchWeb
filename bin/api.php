<?php
// CORS, excessive for this but here in case more functionality is added later.
header("Access-Control-Allow-Origin: https://player.peacefulcraft.net");
if($_SERVER['REQUEST_METHOD'] == "OPTIONS") {
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Allow-Credentials: false");
    header('Access-Control-Max-Age: 1728000');
    exit();
}

require("../appconfig.php");

if(!isset($_GET["action"])){ invalidRequest(); }

switch($_GET["action"]){
    case "search":

        // Make sure there are serach parameters
        if(!isset($_GET["params"])){ invalidRequest(); }

        // Check for valid length
        if(strlen($_GET["params"]) > 16){ invalidRequest(); }
        if(strlen($_GET["params"]) < 1){ invalidRequest(); }

        // don't let visitors use wildcards, we only want one at the end
        $params = str_replace("%", "", $_GET["params"]) . "%";

        $mysqli = initMysql();

        $table = $mysqli->real_escape_string($CONFIG["db_table"]);
        $stmt = $mysqli->prepare("SELECT 
            `uuid`,`username`,`player_kills`,`player_deaths`
            FROM $table WHERE `username` LIKE ? LIMIT 5");
        $stmt->bind_param("s",$params);
        $stmt->execute();
        
        $result = $stmt->get_result();
        $players = $result->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        echo json_encode($players);
        exit();

    break; case "profile":

        // Make sure there are serach parameters
        if(!isset($_GET["params"])){ invalidRequest(); }

        // Check for valid uuid
        if(!strlen($_GET["params"]) == 32){ invalidRequest(); }

        $mysqli = initMysql();

        $table = $mysqli->real_escape_string($CONFIG["db_table"]);
        $stmt = $mysqli->prepare("SELECT * FROM `$table` WHERE `uuid`= ? LIMIT 1");
        $stmt->bind_param("s",$_GET["params"]);
        $stmt->execute();

        $result = $stmt->get_result();
        $profile = $result->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        echo json_encode($profile);
        exit();

    break; case "top10kdr":
        
        $mysqli = initMysql();
        $table = $mysqli->real_escape_string($CONFIG["db_table"]);
        $stmt = $mysqli->prepare("SELECT `username`, `player_kills`, `player_deaths`, (`player_kills`/`player_deaths`) AS 'kdr' FROM `$table` ORDER BY `kdr` DESC LIMIT 10");
        $stmt->execute();

        $result = $stmt->get_result();
        $profile = $result->fetch_all(MYSQLI_ASSOC);
        $stmt->close();

        echo json_encode($profile);
        exit();

    break; default:

    break;
}

function initMysql(){

    // from appconfig.php
    GLOBAL $CONFIG; 

    $mysqli = new mysqli(
        $CONFIG["db_host"], $CONFIG["db_user"], 
        $CONFIG["db_password"], $CONFIG["db_name"]
    );

    // Check for db link
    if($mysqli->connect_errno){ 
        http_response_code();
    }

    return $mysqli;
}

/**
 * Terminate response and return HTTP/400 for
 * unrecognized or malformatted request
 */
function invalidRequest(){
    echo(
        json_encode(
            array("error"=>"Invalid API Request")
        )
    );
    http_response_code(400);
    exit();
}

/**
 * Terminate response and return HTTP/500 for
 * internal server error
 */
function serverError(){
    echo(
        json_encode(
            array("error"=>"Encountered a temporary server error, try again in a few minutes.")
        )
    );
    http_response_code(500);
    exit();
}
?>
