<?php

namespace app\modules\admin\controllers;

use Yii;
use app\components\JwtHelper;
use app\modules\admin\Response\UserResponse;

class AuthController extends CommonController
{
    public function actionRegister()
    {
        $request = json_decode(Yii::$app->request->getRawBody(), true);
        if (empty($request['username']) || empty($request['password'])) {
            return ['success' => false, 'message' => 'Username và mật khẩu không thể trống'];
        }

        $user = new UserResponse();
        $user->uuid = Yii::$app->security->generateRandomString(36);
        $user->full_name = $request['username'];
        $user->username = $request['username'];
        $user->setPassword($request['password']);

        if ($user->save()) {
            $token = JwtHelper::generateToken($user);
            Yii::$app->response->cookies->add(new \yii\web\Cookie([
                'name' => 'auth_token', // Tên cookie
                'value' => $token, // Giá trị cookie là token JWT
                'expire' => time() + 3600 * 24 * 24, // Thời gian hết hạn cookie (1 ngày)
                'path' => '/', // Đặt phạm vi cookie
                'secure' => false, // Chỉ gửi cookie qua HTTPS
                'httpOnly' => true, // Không thể truy cập cookie từ JavaScript
                'sameSite' => 'Strict', // Thiết lập SameSite để bảo vệ khỏi CSRF
            ]));

            return $this->asJson([
                'success' => true,
                'message' => 'Đăng ký thành công.',
                'token' => $token,
                'user' => $user,
            ]);
        }

        return $this->asJson([
            'success' => false,
            'message' => 'Đăng ký không thành công.',
        ]);
    }

    public function actionLogin()
    {
        $request = json_decode(Yii::$app->request->getRawBody(), true);

        if (empty($request['username']) || empty($request['password'])) {
            return ['success' => false, 'message' => 'Username và mật khẩu không thể trống'];
        }

        $user = UserResponse::getUserByUsername($request['username']);
        if ($user && $user->validatePassword($request['password'])) {

            $token = JwtHelper::generateToken($user);
            Yii::$app->response->cookies->add(new \yii\web\Cookie([
                'name' => 'auth_token', // Tên cookie
                'value' => $token, // Giá trị cookie là token JWT
                'expire' => time() + 3600 * 24 * 24, // Thời gian hết hạn cookie (1 ngày)
                'path' => '/', // Đặt phạm vi cookie
                'secure' => false, // Chỉ gửi cookie qua HTTPS
                'httpOnly' => true, // Không thể truy cập cookie từ JavaScript
                'sameSite' => 'Strict', // Thiết lập SameSite để bảo vệ khỏi CSRF
            ]));

            return $this->asJson([
                'success' => true,
                'message' => 'Đăng nhập thành công',
                'token' => $token,
                'user' => $user,
            ]);
        }

        return $this->asJson([
            'success' => false,
            'message' => 'Thông tin đăng nhập không đúng',
        ]);
    }

    public function actionLogout()
    {
        Yii::$app->response->cookies->remove('auth_token'); // Xóa cookie chứa token

        return $this->asJson([
            'success' => true,
            'message' => 'Đăng xuất thành công',
        ]);
    }

    public function actionMe()
    {
        $user = Yii::$app->user->identity; // Lấy user hiện tại

        if ($user) {
            return [
                'success' => true,
                'user' => [
                    'id' => $user->uuid,
                    'username' => $user->username,
                    'full_name' => $user->full_name,
                    'avatar' => $user->avatar,
                ],
            ];
        }

        return [
            'success' => false,
            'message' => 'User chưa đăng nhập.',
        ];
    }
}
