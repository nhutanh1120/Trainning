<?php

namespace app\modules\admin\controllers;

use Yii;
use app\modules\admin\models\Users;

class AuthController extends CommonController
{
    public function actionRegister()
    {
        $data = Yii::$app->request->post();
        if (empty($data['email']) || empty($data['password'])) {
            return ['success' => false, 'message' => 'Email và mật khẩu không thể trống'];
        }

        $user = new Users();
        $user->email = $data['email'];
        $user->password = Yii::$app->security->generatePasswordHash($data['password']);

        if ($user->save()) {
            return $this->asJson([
                'success' => true,
                'message' => 'Đăng ký thành công.',
            ]);
        }

        return $this->asJson([
            'success' => false,
            'message' => 'Đăng ký không thành công.',
        ]);
    }

    public function actionLogin()
    {
        // $data = Yii::$app->request->post();
        $email = Yii::$app->request->post('email');
        $password = Yii::$app->request->post('password');

        if (empty($email) || empty($password)) {
            return ['status' => 'error', 'message' => 'Email và mật khẩu không thể trống'];
        }

        // $user = Users::findByEmail($email);
        // if ($user && $user->validatePassword($password)) {
        //     return $this->asJson([
        //         'success' => true,
        //         'message' => 'Đăng nhập thành công',
        //         'data' => Yii::$app->user->identity, // trả về thông tin người dùng sau khi đăng nhập
        //     ]);
        // }

        return $this->asJson([
            'success' => false,
            'message' => 'Thông tin đăng nhập không đúng',
        ]);
    }
}
