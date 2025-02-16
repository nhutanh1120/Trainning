<?php

namespace app\modules\admin\Response;

use Yii;
use app\modules\admin\models\Videos;
use app\modules\admin\models\Likes;
use app\modules\admin\Response\UserResponse;

class VideosResponse extends Videos
{
    /**
     * toResponse
     * 
     * @return array
     */
    public function toResponse()
    {
        $user = (new UserResponse($this->user))->toResponse();
        return array_merge($this->toArray(), [
            'is_liked' => $this->isLiked,
            'likes_count' => count($this->likes),
            'comments_count' => count($this->comments),
            'bookmarks_count' => 0,
            'shares_count' => 0,
            'user' => $user,
        ]);
    }

    /**
     * getIsLiked
     * 
     * @return int
     */
    public function getIsLiked()
    {
        if (Yii::$app->user->isGuest) {
            return 0;
        }

        $userUuid = Yii::$app->user->identity->uuid;
        $like = Likes::findOne(['user_uuid' => $userUuid, 'video_uuid' => $this->uuid]);

        return $like ? 1 : 0;
    }
}