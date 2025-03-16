<?php

namespace app\modules\admin\controllers;

use Yii;
use app\modules\admin\models\Comments;
use app\modules\admin\Response\CommentResponse;

class CommentController extends CommonController
{
    public function actionView($uuid)
    {
        $comments = CommentResponse::findCommentsByVideoUuid($uuid);

        return [
            'success' => true,
            'items' => array_map(function ($comment) {
                return $comment->toResponse();
            }, $comments),
        ];
    }

    public function actionCreate()
    {
        $request = json_decode(Yii::$app->request->getRawBody(), true);
        $comment = new Comments();
        $comment->uuid = Yii::$app->security->generateRandomString(36);
        $comment->user_uuid = Yii::$app->user->identity->uuid;
        $comment->video_uuid = $request['uuid'];
        $comment->content = $request['content'];

        if ($comment->save()) {
            return ['success' => true, 'items' => (new CommentResponse($comment->attributes))->toResponse()];
        }

        return ['success' => false, 'errors' => $comment->errors];
    }

    public function actionCreateReply()
    {
        $request = json_decode(Yii::$app->request->getRawBody(), true);
        $comment = new Comments();
        $comment->uuid = Yii::$app->security->generateRandomString(36);
        $comment->user_uuid = Yii::$app->user->identity->uuid;
        $comment->video_uuid = $request['video_uuid'];
        $comment->parent_uuid = $request['parent_uuid'];
        $comment->content = $request['content'];

        if ($comment->save()) {
            return ['success' => true, 'items' => (new CommentResponse($comment->attributes))->toResponse()];
        }

        return ['success' => false, 'errors' => $comment->errors];
    }
}
