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
    const IMAGE_DIR = '@webroot/uploads/images/';

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

        // Paths for video
        $tempVideoPath = Yii::getAlias('@webroot') . $request['videoPath'];
        $videoFileName = basename($tempVideoPath);
        $finalVideoPath = Yii::getAlias(self::UPLOAD_DIR) . $videoFileName;
        $videoWebPath = '/uploads/videos/' . $videoFileName;

        // Paths for image
        $tempImagePath = Yii::getAlias('@webroot') . $request['imagePath'];
        $imageFileName = basename($tempImagePath);
        $finalImagePath = Yii::getAlias(self::IMAGE_DIR) . $imageFileName;
        $imageWebPath = '/uploads/images/' . $imageFileName;

        // Check file exists
        if (!file_exists($tempVideoPath) || !file_exists($tempImagePath)) {
            return $this->asJson(['success' => false, 'message' => 'File tạm không tồn tại']);
        }

        // Move video
        if (!rename($tempVideoPath, $finalVideoPath)) {
            return $this->asJson(['success' => false, 'message' => 'Không thể di chuyển video']);
        }

        // Move image
        if (!rename($tempImagePath, $finalImagePath)) {
            return $this->asJson(['success' => false, 'message' => 'Không thể di chuyển ảnh']);
        }
        $video = new Videos();
        $video->uuid = Yii::$app->security->generateRandomString(36);
        $video->user_uuid = Yii::$app->user->identity->uuid;
        $video->file_path = $videoWebPath;
        $video->thumb_path = $imageWebPath;
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
