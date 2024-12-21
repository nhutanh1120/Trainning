<?php

namespace app\modules\admin\controllers;

use Yii;

class UserController extends CommonController
{
    // Action index trả về danh sách người dùng dưới dạng JSON
    public function actionIndex()
    {
        // Dữ liệu giả lập
        $users = [
            [
                'id' => '100',
                'username' => 'admin',
                'password' => 'admin',
                'authKey' => 'test100key',
                'accessToken' => '100-token',
            ],
        ];
        $this->isSuccessful();
        return $users;
    }

    // Action hiển thị thông tin user với ID
    public function actionView($id)
    {
        // Dữ liệu giả lập
        $user = [
            'id' => $id,
            'name' => 'John Doe',
            'email' => 'john@example.com',
        ];

        return $user;
    }
}
