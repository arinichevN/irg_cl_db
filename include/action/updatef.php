<?php

namespace stranger;

class updatef {

    public static function getUser() {
        return ['stranger' => '*'];
    }

    public static function execute() {
        global $basePath;
        $d = [
            'a' => [],
            'ai' => [],
            'aa' => [],
            'e' => [],
            'ab' => []
        ];
        $q = "select id, header,value, seq from article order by seq asc";
        $r = \db\getData($q);
        while ($row = \db\fetch_assoc($r)) {
            array_push($d['a'], [(int) $row['id'], $row['header'], $row['value'], (int) $row['seq']]);
        }
        $q = "select ai.p, ai.c from article_inh ai left join (select id, seq from article) a on ai.c=a.id order by a.seq asc";
        $r = \db\getData($q);
        while ($row = \db\fetch_assoc($r)) {
            array_push($d['ai'], [(int) $row['p'], (int) $row['c']]);
        }
        $q = "select * from also";
        $r = \db\getData($q);
        while ($row = \db\fetch_assoc($r)) {
            array_push($d['aa'], [(int) $row['main'], $row['similar']]);
        }
        $q = "select * from example order by id";
        $r = \db\getData($q);
        while ($row = \db\fetch_assoc($r)) {
            array_push($d['e'], [(int) $row['id'], $row['header'], $row['value'], (int) $row['article_id']]);
        }
        $q = "select * from abbr";
        $r = \db\getData($q);
        while ($row = \db\fetch_assoc($r)) {
            array_push($d['ab'], [$row['s'], $row['l']]);
        }
        // $jd = "var data=JSON.parse('" . json_encode($d) . "');";
        $jd = "var data=" . \json_encode($d, JSON_UNESCAPED_UNICODE) . ";";
       // $jd = implode("\n", str_split($jd, 500));//split string into lines
        //  $jd = wordwrap($jd,500);//split string into lines
        $jd=str_replace('],[', "],\n[", $jd);
        $file = $basePath . DIRECTORY_SEPARATOR .'download'. DIRECTORY_SEPARATOR. 'full' . DIRECTORY_SEPARATOR . 'data.js';
        if (!file_put_contents($file, $jd)) {
            throw new \Exception('full version update failed');
        }
        return 'full version data updated ';
    }

}
