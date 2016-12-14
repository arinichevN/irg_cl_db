<?php

namespace valve;

class geta_n {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute() {
        global $name;
        $data = [];
        $q = "select id, name from $name.valve order by id";
        $r = \db\getData($q);
        while ($row = \db\fetch_assoc($r)) {
            \array_push($data, [
                'id' => $row['id'],
                'name' => $row['name']
            ]);
        }
        return $data;
    }

}
