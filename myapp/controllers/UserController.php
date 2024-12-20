<?php

namespace app\controllers;

use yii\rest\ActiveController;

class UserController extends CommonController
{
    public $modelClass = 'app\models\UserS'; // Model liên kết với API

    // Nếu cần tùy chỉnh thêm, bạn có thể override các hành động mặc định
    public function actions()
    {
        $actions = parent::actions();

        // Tắt hành động "delete"
        unset($actions['delete']);

        return $actions;
    }

    // Tạo thêm action nếu cần
    public function actionCustom()
    {
        return ['message' => 'Hello from custom action!'];
    }
}
