<?php

namespace program;

class geta {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute() {
        global $name;
        $data = [];
        $q = "select id, name, extract(epoch from busy_time) busy_time, extract(epoch from idle_time) idle_time, repeat, busy_infinite, repeat_infinite, start_kind, month_plan, weekday_plan, time_plan_id, change_plan_id from $name.prog order by id";
        $r = \db\getData($q);
        while ($row = \db\fetch_assoc($r)) {
            \array_push($data, [
                'id' => $row['id'],
                'name' => $row['name'],
                'busy_time' => $row['busy_time'],
                'idle_time' => $row['idle_time'],
                'repeat' => $row['repeat'],
                'busy_infinite' => $row['busy_infinite'],
                'repeat_infinite' => $row['repeat_infinite'],
                'start_kind' => $row['start_kind'],
                'month_plan' => $row['month_plan'],
                'weekday_plan' => $row['weekday_plan'],
                'time_plan_id' => $row['time_plan_id'],
                'change_plan_id' => $row['change_plan_id']
            ]);
        }
        return $data;
    }

}
