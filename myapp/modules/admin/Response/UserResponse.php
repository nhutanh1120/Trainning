<?php

namespace app\modules\admin\Response;

use Yii;
use app\modules\admin\models\Users;

class UserResponse extends Users
{
    /**
     * setPassword
     * 
     * @param string $password
     * @return void
     */
    public function setPassword($password)
    {
        $this->password = Yii::$app->security->generatePasswordHash($password);
    }

    /**
     * validatePassword
     * 
     * @param string $password
     * @return bool
     */
    public function validatePassword($password)
    {
        return Yii::$app->security->validatePassword($password, $this->password);
    }
}
