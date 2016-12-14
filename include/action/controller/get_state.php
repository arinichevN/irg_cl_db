<?php

namespace controller;

class get_state {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
       \acp\sendPackBroadcast(ACP_CMD_APP_PING);
        return \acp\getBufParseStateData();
    }

}
