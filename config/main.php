<?php

return [
    'name' => 'irg',
    'db' => [
        'use' => 'p',
        'conninfo' => 'host=localhost port=5432 user=postgres password=654321 dbname=control'
    ],
    'acp' => [
        'use' => '1',
    ],
    'udp' => [
         'use' => '1',
        'port' => '49183',
        'addr' => 'localhost'
    ],
    'session' => [
        'use' => '4',
    ],
    'check' => [
        'use' => [1],
    ]
];
