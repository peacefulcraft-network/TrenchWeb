<section class="playerSearch">
    <form action="<?php echo $data["actionURL"];?>/profile/results" method="GET">
        <input class="searchBar" type="text" name="params" value="<?php echo ((isset($data["param"]))? $data["param"] : "");?>" placeholder="Enter a player or UUID to serach for..."/>
        <input class="searchSubmit" type="submit" name="submit" value="Search"/>
    </form>
</section>