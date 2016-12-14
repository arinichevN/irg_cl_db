<?php


class getv {

    public static function getUser() {
	return ['stranger' => '*'];
    }

    public static function execute() {
	global $basePath;
	$data = [];
	$q = "select * from version";
	$db = \db\getCell($q);
	if (!$db) {
	    $db = 0;
	} else {
	    $db = (int) $db;
	}
	array_push($data, $db);
	$app = file_get_contents($basePath .DIRECTORY_SEPARATOR. 'v');
	if (!$app) {
	    $app = 0;
	} else {
	    $app = (int) $app;
	}
	array_push($data, $app);
	return $data;
    }
}
