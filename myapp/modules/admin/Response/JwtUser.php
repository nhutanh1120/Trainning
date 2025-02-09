<?php

namespace app\modules\admin\Response;

use yii\web\IdentityInterface;
use app\components\JwtHelper;
use app\modules\admin\models\Users;

class JwtUser extends Users implements IdentityInterface
{
    /**
     * findIdentity
     * 
     * @param string $id
     * @return JwtUser|null
     */
    public static function findIdentity($id)
    {
        return self::findOne(['uuid' => $id]);
    }

    /**
     * getId
     * 
     * @return string
     */
    public function getId()
    {
        return $this->uuid;
    }

    /**
     * getAuthKey
     * 
     * @return string|null
     */
    public function getAuthKey()
    {
        return $this->password;
    }

    /**
     * validateAuthKey
     * 
     * @param string $authKey
     * @return bool
     */
    public function validateAuthKey($authKey)
    {
        return $this->getAuthKey() === $authKey;
    }

    /**
     * findByUuid
     * 
     * @param string $uuid
     * @return JwtUser|null
     */
    public static function findByUuid($uuid)
    {
        return self::findOne(['uuid' => $uuid]);
    }

    /**
     * findIdentityByAccessToken
     * 
     * @param string $token
     * @return JwtUser|null
     */
    public static function findIdentityByAccessToken($token, $type = null)
    {
        $decodedToken = JwtHelper::validateToken($token);

        if ($decodedToken) {
            return self::findOne(['uuid' => $decodedToken->uuid]);
        }

        return null;
    }
}
