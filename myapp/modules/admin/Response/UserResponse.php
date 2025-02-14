<?php

namespace app\modules\admin\Response;

use Yii;
use app\modules\admin\models\Users;

class UserResponse extends Users
{
    
    /**
     * getUserByUsername
     * 
     * @param string $username
     * @return UserResponse|null
     */
    public static function getUserByUsername($username)
    {
        return self::findOne(['username' => $username]);
    }

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