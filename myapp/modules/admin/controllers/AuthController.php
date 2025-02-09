<?php

namespace app\modules\admin\controllers;

use Yii;
use app\components\JwtHelper;
use app\modules\admin\Response\UserReponse;

class AuthController extends CommonController
{
    public function actionRegister()
    {
        $request = json_decode(Yii::$app->request->getRawBody(), true);
        if (empty($request['email']) || empty($request['password'])) {
            return ['success' => false, 'message' => 'Email và mật khẩu không thể trống'];
        }

        $user = new UserReponse();
        $user->email = $request['email'];
        $user->setPassword($request['password']);

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
        $request = json_decode(Yii::$app->request->getRawBody(), true);

        if (empty($request['email']) || empty($request['password'])) {
            return ['success' => false, 'message' => 'Email và mật khẩu không thể trống'];
        }

        $user = UserReponse::findOne(['email' => $request['email']]);
        if ($user && $user->validatePassword($request['password'])) {
            
            $token = JwtHelper::generateToken($user);
            Yii::$app->response->cookies->add(new \yii\web\Cookie([
                'name' => 'auth_token', // Tên cookie
                'value' => $token, // Giá trị cookie là token JWT
                'expire' => time() + 3600 * 24, // Thời gian hết hạn cookie (1 ngày)
                'path' => '/', // Đặt phạm vi cookie
                'secure' => false, // Chỉ gửi cookie qua HTTPS
                'httpOnly' => true, // Không thể truy cập cookie từ JavaScript
                'sameSite' => 'Strict', // Thiết lập SameSite để bảo vệ khỏi CSRF
            ]));

            return $this->asJson([
                'success' => true,
                'message' => 'Đăng nhập thành công',
                'token' => $token,
                'user' => Yii::$app->user->identity,
            ]);
        }

        return $this->asJson([
            'success' => false,
            'message' => 'Thông tin đăng nhập không đúng',
        ]);
    }
}
