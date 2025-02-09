<?php

namespace app\components;

use Yii;
use yii\filters\auth\AuthMethod;
use yii\web\UnauthorizedHttpException;
use app\modules\admin\Response\JwtUser;

class JwtAuth extends AuthMethod
{
    public function authenticate($user, $request, $response)
    {
        // $authHeader = $request->getHeaders()->get('Authorization');
        $cookies = $request->cookies->get('auth_token');

        // if ($authHeader && preg_match('/^Bearer\s+(.*?)$/', $authHeader, $matches)) {
        if ($cookies) {
            // $token = $matches[1];
            $token = $cookies->value;
            $decodedToken = JwtHelper::validateToken($token);

            if ($decodedToken) {
                $user = JwtUser::findIdentity($decodedToken->uuid);
                Yii::$app->user->identity = $user;
                return $user;
            }
        }

        throw new UnauthorizedHttpException('Bạn cần đăng nhập để truy cập tài nguyên này.');
    }
}
