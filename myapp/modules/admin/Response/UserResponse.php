<?php

namespace app\modules\admin\Response;

use Yii;
use app\modules\admin\models\Users;
use app\modules\admin\models\Follows;

class UserResponse extends Users
{
    /**
     * toResponse
     * 
     * @return array
     */
    public function toResponse()
    {
        $currentUserUuid = Yii::$app->user->identity->uuid ?? null;
        $allows = $currentUserUuid === $this->uuid ? 0 : 1;

        return array_merge($this->toArray(), [
            'allows_followers' => $allows,
            'is_followed' => $this->getIsFollowed(),
            'followings_count' => $this->getFollowings()->count(),
            'followers_count' => $this->getFollowers()->count(),
        ]);
    }

    /**
     * getIsFollowed
     * 
     * @return bool
     */
    private function getIsFollowed()
    {
        if (Yii::$app->user->isGuest) {
            return 0;
        }

        $currentUserUuid = Yii::$app->user->identity->uuid;
        $follow = Follows::findOne(['follower_uuid' => $currentUserUuid, 'following_uuid' => $this->uuid]);

        return $follow ? 1 : 0;
    }

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