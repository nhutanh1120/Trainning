<?php

namespace app\controllers;

use yii\rest\ActiveController;
use yii\filters\Cors;

class CommonController extends ActiveController
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();

        $behaviors['authenticator'] = [
            'class' => HttpBearerAuth::class,
        ];

        // Thêm cấu hình CORS
        $behaviors['corsFilter'] = [
            'class' => Cors::class,
            'cors' => [
                'Origin' => ['*'], // Cho phép mọi nguồn, thay đổi nếu cần
                'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
                'Access-Control-Allow-Credentials' => true,
                'Access-Control-Max-Age' => 3600,
                'Access-Control-Allow-Headers' => ['Authorization', 'Content-Type'],
            ],
        ];

        return $behaviors;
    }
}
