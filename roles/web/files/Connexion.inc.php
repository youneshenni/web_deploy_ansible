<?php
try
{
	    $conx = new PDO('mysql:host=localhost;dbname={mysql_db};charset=utf8', '{mysql_user}', '{mysql_password}', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
}
catch(Exception $e)

{
	    die('Erreur : '.$e->getMessage());
}

?>
