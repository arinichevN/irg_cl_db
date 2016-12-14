<?php

namespace controller\valve;

class prog_stop {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        \acp\sendPackI1(ACP_CMD_STOP, $p);
    }

}
