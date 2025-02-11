<?php

namespace app\modules\admin\controllers;

use Yii;
use yii\web\Controller;
use yii\filters\Cors;
// use yii\filters\auth\HttpBearerAuth;
use yii\filters\VerbFilter;
use yii\filters\ContentNegotiator;
use yii\web\Response; 
use app\components\JwtAuth;

class CommonController extends Controller
{
    // Khai báo thuộc tính để lưu trữ trạng thái success
    private $isSuccessful = false;

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
                // 'Origin' => ['*'], // Cho phép mọi nguồn
                'Origin' => ['http://localhost:3000'],
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
        $behaviors['authenticator'] = [
			'class' => JwtAuth::class,
			'except' => [
				'login',
				'register',
				'search',
				'suggested',
				'video',
			],
		];

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
            'class' => ContentNegotiator::class,
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

        Yii::$app->response->on(Response::EVENT_BEFORE_SEND, function ($event) {
            $response = $event->sender;
            $data = $response->data;

            // Chuẩn hóa dữ liệu trả về
            $response->data = [
                'status' => $this->getIsSuccessful() ? 'success' : 'error',
                'code' => $response->statusCode,
                'result' => $data,
            ];

            // Thêm CSRF token vào header phản hồi
            $csrfToken = Yii::$app->getRequest()->getCsrfToken();
            $response->headers->set('X-CSRF-Token', $csrfToken);
        });

        return true;
    }

    // Đặt isSuccessful là public để có thể gọi từ controller con
    public function isSuccessful()
    {
        $this->isSuccessful = true; // Cập nhật giá trị của isSuccessful
    }

    private function getIsSuccessful()
    {
        // Trả về giá trị của biến isSuccessful
        return $this->isSuccessful;
    }
}
