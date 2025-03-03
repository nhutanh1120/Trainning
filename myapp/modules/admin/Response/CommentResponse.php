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
                'user' => $this->getUser()->toResponse(),
            ]
        );
    }

    /**
     * findCommentByUuid
     * 
     * @param string $uuid
     * @return CommentResponse|null
     */
    public static function findCommentByUuid($uuid)
    {
        return self::findOne(['uuid' => $uuid]);
    }
}
