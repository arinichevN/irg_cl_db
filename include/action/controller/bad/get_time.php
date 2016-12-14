<?php

namespace stranger\controller;

class get_time {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute() {
        \uds\init();
        $q = 'g';
        $r = \uds\getDataS($q, PHP_INT_SIZE * 5);
        $data = unpack("i5", $r);
        return $data;
    }

}
