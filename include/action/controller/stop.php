<?php

namespace controller;

class stop {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute() {
        \acp\sendPackBroadcast(ACP_CMD_APP_STOP);
    }

}
