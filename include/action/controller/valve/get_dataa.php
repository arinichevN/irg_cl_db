<?php

namespace controller\valve;

class get_dataa {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute() {
       \acp\sendPackBroadcast(ACP_CMD_IRG_VALVE_GET_DATA);
        return \acp\getIrgValveState();
    }

}
