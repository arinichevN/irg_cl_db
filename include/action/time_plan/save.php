<?php

namespace time_plan;

class save {

    public function getUser() {
        return ['stranger' => '*'];
    }

    public function execute($p) {
        global $name;
        $q = "truncate $name.time_plan";
        \db\command($q);
        $r = true;
        foreach ($p as $v) {
            $q = "insert into $name.time_plan(id, start_time) values ({$v['id']},{$v['start_time']})";
            $r = $r && \db\commandF($q);
        }
        if (!$r) {
            throw new \Exception('some of inserts failed');
        }
    }

}
