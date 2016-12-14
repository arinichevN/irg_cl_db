<?php

namespace controller;

class print_help {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute() {
        \acp\sendPackBroadcast(ACP_CMD_APP_HELP);
        return \udp\getText(ACP_BUF_SIZE);
    }

}
