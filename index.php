<?php

require 'Slim/Slim.php';

$CATALOG = "book_files/";

$app = new Slim();

$app->get('/books', 'books');
$app->get('/books/:id',	'getBook');

$app->run();

function books() {	
	echo getJSONFromFiles();
}

function getBook($id) {
	echo getJSONFromFiles($id);
}

function getJSONFromFiles($id=".*"){
	global $CATALOG;
	$json = "";
	
	if($handle = opendir($CATALOG))
    while (false !== ($entry = readdir($handle))) {
		if(preg_match('/'.$id.'\.txt/',$entry))
		{
			$json.=",".file_get_contents($CATALOG.$entry);
		}
    }
	
	return "[".substr($json,1)."]";
}

?>