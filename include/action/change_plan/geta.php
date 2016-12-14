<?php

namespace change_plan;

class geta {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute() {
        global $name;
        $data = [];
        $q = "select id, seq, extract(epoch from gap) gap, shift from $name.change_plan order by id asc, seq asc";
        $r = \db\getData($q);
        while ($row = \db\fetch_assoc($r)) {
            \array_push($data, [
                'id'=>$row['id'],
                'seq'=>$row['seq'],
                'gap'=>$row['gap'],
                'shift'=>$row['shift']
                    ]);
        }
        return $data;
    }

}
