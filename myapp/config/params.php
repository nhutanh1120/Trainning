<?php

return [
    'adminEmail' => 'admin@example.com',
    'senderEmail' => 'noreply@example.com',
    'senderName' => 'Example.com mailer',
    'jwt' => [
        'key' => 'your-secret-key',
        'issuer' => 'http://localhost:8080/',
        'audience' => 'http://localhost:3000/',
        'expire' => 360000,
    ],
];
