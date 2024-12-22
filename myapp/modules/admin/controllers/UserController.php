<?php

namespace app\modules\admin\controllers;

use Yii;
use app\models\ClassTeacher;
use app\models\ClassTeacherCategory;

class UserController extends CommonController
{
    // Action index trả về danh sách người dùng dưới dạng JSON
    public function actionIndex()
    {
        $teachers = ClassTeacher::find()
         ->joinWith('foreignUu')
        ->all();

        return  $teachers;
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
