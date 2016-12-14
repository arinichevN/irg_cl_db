<?php

namespace controller;

class get_date {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute() {
        \acp\sendPackBroadcast(ACP_CMD_IRG_GET_TIME);
        return \acp\getDate();
    }

}
