<?php

namespace app\modules\admin\controllers;

use yii\web\Controller;
use yii\filters\Cors;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\VerbFilter;
use yii\web\Response; 

class CommonController extends Controller
{
    /**
     * Cấu hình behaviors cho tất cả các controller kế thừa.
     *
     * @return array
     */
    public function behaviors()
    {
        $behaviors = parent::behaviors();

        // Cấu hình CORS
        $behaviors['corsFilter'] = [
            'class' => Cors::class,
            'cors' => [
                'Origin' => ['*'], // Cho phép mọi nguồn
                'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Các phương thức được hỗ trợ
                'Access-Control-Allow-Credentials' => true, // Cho phép gửi cookie
                'Access-Control-Max-Age' => 3600, // Thời gian cache của trình duyệt
                'Access-Control-Allow-Headers' => ['Authorization', 'Content-Type'], // Các header được phép
            ],
        ];

                // Cấu hình xác thực bằng Bearer Token
        // $behaviors['authenticator'] = [
        //     'class' => HttpBearerAuth::class,
        // ];

        // Cấu hình phương thức HTTP cho từng action
        $behaviors['verbs'] = [
            'class' => VerbFilter::class,
            'actions' => [
                'index' => ['GET'],              // Chỉ cho phép GET
                'create' => ['POST'],            // Chỉ cho phép POST
                'update' => ['PUT', 'PATCH'],    // Cho phép PUT và PATCH
                'delete' => ['DELETE'],          // Chỉ cho phép DELETE
            ],
        ];

        $behaviors['contentNegotiator'] = [
            'class' => \yii\filters\ContentNegotiator::class,
            'formats' => [
                'application/json' => Response::FORMAT_JSON,
            ],
        ];

        return $behaviors;
    }

    /**
     * Ghi đè beforeAction để chuẩn hóa dữ liệu trả về
     */
    public function beforeAction($action)
    {
        $parentBeforeAction = parent::beforeAction($action);
        if (!$parentBeforeAction) {
            return false;
        }

        \Yii::$app->response->on(Response::EVENT_BEFORE_SEND, function ($event) {
            $response = $event->sender;
            $data = $response->data;

            // Chuẩn hóa dữ liệu trả về
            $response->data = [
                'status' => $response->isSuccessful ? 'success' : 'error',
                'code' => $response->statusCode,
                'result' => $data,
            ];
        });

        return true;
    }
}