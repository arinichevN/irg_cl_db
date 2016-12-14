<?php

namespace stranger\controller;

class getv {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute() {
        \uds\init();
        return \uds\sgInt('V');
    }

}
