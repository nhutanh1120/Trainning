<?php

namespace app\modules\admin\controllers;

use Yii;
use app\modules\admin\models\User;

class UsersController extends CommonController
{
    public function actionSearch()
    {
        $user = User::find()->all();
        return $user;
    }
}
