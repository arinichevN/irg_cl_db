<?php

namespace stranger\controller;

class master_state {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute() {
        \uds\init();
        $q = 'c';
        $kind = \uds\getKind($q);
        if ($kind === "t") {
            $size = \uds\getInt();
            if ($size > 0) {
                $data = \uds\getChar($size);
                return $data;
            } else {
                throw new \Exception("uds: protocol: no active programs");
            }
        } else {
            throw new \Exception("uds: protocol: server said nothing");
        }
    }

}
