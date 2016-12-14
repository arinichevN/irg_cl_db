<?php

namespace controller;

class terminate {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
       \acp\sendPackBroadcast(ACP_CMD_APP_EXIT);
    }

}
