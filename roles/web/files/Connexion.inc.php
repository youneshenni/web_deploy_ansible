<?php
try
{
	    $conx = new PDO('mysql:host=localhost;dbname=mtek;charset=utf8', 'mtek_web', 'mtek2020sangoku4', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
}
catch(Exception $e)

{
	    die('Erreur : '.$e->getMessage());
}

?>
