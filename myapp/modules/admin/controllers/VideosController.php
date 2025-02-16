<?php

namespace app\modules\admin\controllers;

use Yii;
use app\modules\admin\search\VideosSearch;
use app\modules\admin\models\Videos;
use app\modules\admin\models\Likes;

class VideosController extends CommonController
{
    public function actionIndex()
    {
        $searchModel = new VideosSearch();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams);

        return [
            'items' => array_map(function ($video) {
                return $video->toResponse();
            }, $dataProvider->getModels()),
            'pagination' => [
                'totalCount' => $dataProvider->getTotalCount(),
                'pageSize' => $dataProvider->pagination->pageSize,
                'currentPage' => $dataProvider->pagination->page + 1,
            ],
        ];
    }

    public function actionLikes()
    {
        $request = json_decode(Yii::$app->request->getRawBody(), true);

        if (!$request['uuid']) {
            return [
                'success' => false,
                'message' => 'Video UUID is required.',
            ];
        }

        $video = Videos::findOne(['uuid' => $request['uuid']]);
        if (!$video) {
            return [
                'success' => false,
                'message' => 'Video not found.',
            ];
        }
        
        $userUuid = Yii::$app->user->identity->uuid;
        $like = Likes::findOne(['user_uuid' => $userUuid, 'video_uuid' => $request['uuid']]);

        if ($like) {
            $like->delete();
            $isLiked = 0;
        } else {
            $like = new Likes();
            $like->uuid = Yii::$app->security->generateRandomString(36);
            $like->user_uuid = $userUuid;
            $like->video_uuid = $request['uuid'];
            $like->save();
            $isLiked = 1;
        }

        $likesCount = Likes::find()->where(['video_uuid' => $request['uuid']])->count();

        return [
            'success' => true,
            'is_liked' => $isLiked,
            'likes_count' => $likesCount,
        ];
    }
}
