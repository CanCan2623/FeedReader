<?php
    $fURL = $_POST["fURL"]; // The URL of the feed to fetch
    
    echo file_get_contents($fURL);
?>