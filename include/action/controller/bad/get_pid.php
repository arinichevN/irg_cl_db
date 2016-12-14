<?php

namespace stranger\controller;

class get_pid {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute() {
        \uds\init();
        $q = 'P';
        $r = \uds\getData($q, 4);
        $data = unpack("i", $r);
        return $data[1];
    }

}