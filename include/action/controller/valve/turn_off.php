<?php

namespace controller\valve;

class turn_off {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        \acp\sendPackI1(ACP_CMD_IRG_VALVE_TURN_OFF, $p);
    }

}
