<?php

namespace controller;

class print_all {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute() {
        \acp\sendPackBroadcast(ACP_CMD_APP_PRINT);
        return \udp\getText(ACP_BUF_SIZE);
    }

}
