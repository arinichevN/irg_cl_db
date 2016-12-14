<?php

return [
    'name' => 'irrigation',
    'db' => [
        'use' => 'p',
        'conninfo'=>'host=localhost port=5432 user=postgres password=bananapi dbname=control'
    ],
    'uds' => [
        'use' => '1',
    ],
    'session' => [
        'use' => '3',
    ],
    'check' => [
        'use' => [1],
    ]
];

