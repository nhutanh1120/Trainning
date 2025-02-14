<?php

namespace app\modules\admin\Response;

use Yii;
use app\modules\admin\models\Videos;

class VideosResponse extends Videos
{
    public function toResponse()
    {
        return array_merge($this->toArray(), [
            'user' => $this->user,
        ]);
    }
}
