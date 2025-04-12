<?php

namespace app\modules\admin\controllers;

use Yii;
use yii\web\UploadedFile;

class UploadController extends CommonController
{
    const UPLOAD_DIR = '@webroot/uploads/temp/';

    public function actionVideo()
    {
        $file = UploadedFile::getInstanceByName('file');

        if (empty($file)) {
            return [
                'success' => false,
                'message' => 'No file uploaded.'
            ];
        }

        $uuid = Yii::$app->security->generateRandomString(36);
        $filePath = Yii::getAlias(self::UPLOAD_DIR) . $uuid . '.' . $file->extension;
        if ($file->saveAs($filePath)) {
            return [
                'success' => true,
                'message' => 'Video uploaded successfully!',
                'path' => '/uploads/temp/' . $uuid . '.' . $file->extension
            ];
        } else {
            return [
                'success' => false,
                'message' => 'Failed to upload video.',
            ];
        }
    }
}
