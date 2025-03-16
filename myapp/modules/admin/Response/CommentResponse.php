<?php

namespace app\modules\admin\Response;

use Yii;
use app\modules\admin\models\Comments;

class CommentResponse extends Comments
{
    /**
     * toResponse
     * 
     * @return array
     */
    public function toResponse()
    {
        return array_merge(
            $this->toArray(),
            [
                'user' => $this->getUser()->one()->toArray(),
                'replies' => array_map(function ($reply) {
                    return (new CommentResponse($reply->attributes))->toResponse();
                }, $this->getReplies()->all()),
                'likes_count' => 0,
            ]
        );
    }

    /**
     * findCommentsByVideoUuid
     * 
     * @param string $videoUuid
     * @return CommentResponse[]
     */
    public static function findCommentsByVideoUuid($videoUuid)
    {
        return self::findAll(['video_uuid' => $videoUuid]);
    }
}
