<?php

namespace app\components;

use Yii;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JwtHelper
{
    public static function generateToken($user)
    {
        $jwtParams = Yii::$app->params['jwt'];

        $payload = [
            'iss' => $jwtParams['issuer'],
            'aud' => $jwtParams['audience'],
            'iat' => time(),
            'exp' => time() + $jwtParams['expire'],
            'uuid' => $user->uuid,
        ];

        return JWT::encode($payload, $jwtParams['key'], 'HS256');
    }

    public static function validateToken($token)
    {
        $jwtParams = Yii::$app->params['jwt'];

        try {
            return JWT::decode($token, new Key($jwtParams['key'], 'HS256'));
        } catch (Exception $e) {
            return null;
        }
    }
}
