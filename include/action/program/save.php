<?php

namespace program;

class save {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute($p) {
        global $name;
        $q = "truncate $name.prog";
        \db\command($q);
        $r = true;
        foreach ($p as $v) {
            $q = "insert into $name.prog(id, name, busy_time, idle_time, repeat, busy_infinite, repeat_infinite, start_kind, month_plan, weekday_plan, time_plan_id, change_plan_id) values ({$v['id']}, '{$v['name']}', '{$v['busy_time']}', '{$v['idle_time']}', {$v['repeat']}, {$v['busy_infinite']}, {$v['repeat_infinite']}, '{$v['start_kind']}', '{$v['month_plan']}', '{$v['weekday_plan']}', {$v['time_plan_id']}, {$v['change_plan_id']})";
            $r = $r && \db\commandF($q);
        }
        if (!$r) {
            throw new \Exception('some of inserts failed');
        }
    }
}
