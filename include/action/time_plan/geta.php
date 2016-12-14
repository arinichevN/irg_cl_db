<?php

namespace time_plan;

class geta {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute() {
        global $name;
        $data = [];
        $q = "select id, start_time from $name.time_plan order by id";
        $r = \db\getData($q);
        while ($row = \db\fetch_assoc($r)) {
            \array_push($data, [
                'id'=>$row['id'],
                'start_time'=>$row['start_time']
                    ]);
        }
        return $data;
    }

}
