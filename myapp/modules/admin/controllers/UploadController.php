<?php

namespace app\modules\admin\controllers;

use Yii;
use yii\web\UploadedFile;
use app\modules\admin\models\Videos;

class UploadController extends CommonController
{
    public function actionVideo()
    {
        $file = UploadedFile::getInstanceByName('file');

        if ($file) {
            $uuid = Yii::$app->security->generateRandomString(36);
            $user_uuid = Yii::$app->user->identity->uuid;
            $description = Yii::$app->request->post('description');
            $filePath = Yii::getAlias('@webroot/uploads/videos/') . $uuid . '.' . $file->extension;
            $thumbPath = Yii::getAlias('@webroot/uploads/thumbs/') . $uuid . '.jpg';

            if ($file->saveAs($filePath)) {
                $video = new Videos();
                $video->uuid = $uuid;
                $video->user_uuid = $user_uuid;
                $video->file_path = '/uploads/videos/' . $uuid . '.' . $file->extension;
                $video->thumb_path = '/uploads/thumbs/' . $uuid . '.jpg';
                $video->description = $description;
                // $video->music = $music;
                // $video->allows = $allows;
                // $video->viewable = $viewable;

                if ($video->save()) {
                    return [
                        'success' => true,
                        'message' => 'Video uploaded successfully!',
                        'file_path' => $video->file_path,
                        'thumb_path' => $video->thumb_path,
                    ];
                } else {
                    return [
                        'success' => false, 
                        'message' => 'Failed to save video.', 
                        'errors' => $video->errors
                    ];
                }
            } else {
                return [
                    'success' => false, 
                    'message' => 'Failed to upload video.'
                ];
            }
        } else {
            return [
                'success' => false, 
                'message' => 'Failed to upload video.'
            ];
        }

        return [
            'success' => false, 
            'message' => 'No file uploaded.'
        ];
    }
}
