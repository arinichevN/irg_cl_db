<?php

namespace controller\valve;

class get_data {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
       \acp\sendPackI1(ACP_CMD_IRG_VALVE_GET_DATA, $p);
        return \acp\getIrgValveState();
    }

}
