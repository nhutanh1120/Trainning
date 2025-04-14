<?php

namespace app\modules\admin\controllers;

use Yii;
use app\modules\admin\search\VideosSearch;
use app\modules\admin\models\Videos;
use app\modules\admin\models\Likes;
use app\modules\admin\Response\VideosResponse;

class VideosController extends CommonController
{
    const UPLOAD_DIR = '@webroot/uploads/videos/';

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

    public function actionView($uuid)
    {
        $video = VideosResponse::findVideo($uuid);
        if (!$video) {
            return [
                'success' => false,
                'message' => 'Video not found.',
            ];
        }

        return [
            'success' => true,
            'items' => $video->toResponse(),
        ];
    }

    public function actionCreate()
    {
        $request = json_decode(Yii::$app->request->getRawBody(), true);

        $tempPath = Yii::getAlias('@webroot') . $request['path'];
        $filename = basename($tempPath);
        $newPath = Yii::getAlias(self::UPLOAD_DIR) . $filename;
        $relativeNewPath = '/uploads/videos/' . $filename;

        // Di chuyển file
        if (!rename($tempPath, $newPath)) {
            return $this->asJson(['success' => false, 'message' => 'Không thể di chuyển video']);
        }

        $video = new Videos();
        $video->uuid = Yii::$app->security->generateRandomString(36);
        $video->user_uuid = Yii::$app->user->identity->uuid;
        $video->file_path = $relativeNewPath;
        $video->thumb_path = '/uploads/thumbs/.jpg';
        $video->description = $request['description'];
        // $video->music = $music;
        // $video->allows = $allows;
        // $video->viewable = $viewable;

        if ($video->save()) {
            return ['success' => true, 'items' => (new VideosResponse($video->attributes))->toResponse()];
        }

        return ['success' => false, 'errors' => $video->errors];
    }
}
