<?php

namespace valve;

class geta {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute() {
        global $name;
        $data = [
            'valve' => [],
            'prog' => []
        ];
        $q = "select id, name, prev_id, prog_id, master_id, rain_sensitive from $name.valve where is_master=0 order by id";
        $r = \db\getData($q);
        while ($row = \db\fetch_assoc($r)) {
            \array_push($data['valve'], [
                'id' => $row['id'],
                'name' => $row['name'],
                'prev_id' => $row['prev_id'],
                'prog_id' => $row['prog_id'],
                'master_id' => $row['master_id'],
                'rain_sensitive' => $row['rain_sensitive']
            ]);
        }
        $q = "select id, name from $name.prog";
        $r = \db\getData($q);
        while ($row = \db\fetch_assoc($r)) {
            \array_push($data['prog'], [
                'id' => $row['id'],
                'name' => $row['name']
            ]);
        }
        return $data;
    }

}
