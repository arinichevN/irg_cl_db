<?php

namespace valve;

class save {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        global $name;
        $r = true;
        foreach ($p as $v) {
            $q = "update $name.valve set name='{$v['name']}', prog_id={$v['prog_id']}, prev_id={$v['prev_id']}, rain_sensitive={$v['rain_sensitive']} where id={$v['id']}";
            $r = $r && \db\commandF($q);
        }
        if (!$r) {
            throw new \Exception('some of updates failed');
        }
    }
}
