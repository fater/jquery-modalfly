<?php
$json = [
    'assign_element' => [
        '#example3-1' => 'Content 1',
        '#example3-2' => '<a href="javascript:;" data-module="modalfly" data-url="example3-1.php">Get new dynamic content</a>',
    ]
];

echo json_encode($json);