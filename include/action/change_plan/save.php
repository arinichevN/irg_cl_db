<?php

namespace change_plan;

class save {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        global $name;
        $q = "truncate $name.change_plan";
        \db\command($q);
        $r = true;
        foreach ($p as $v) {
            $q = "insert into $name.change_plan(id, seq, gap, shift) values ({$v['id']},{$v['seq']},'{$v['gap']}',{$v['shift']})";
            $r = $r && \db\commandF($q);
        }
        if (!$r) {
            throw new \Exception('some of inserts failed');
        }
    }
}
