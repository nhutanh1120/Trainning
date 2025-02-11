<?php

namespace app\modules\admin\controllers;

use Yii;
use yii\web\UploadedFile;

class UploadController extends CommonController
{
    public function actionVideo()
    {
        $file = UploadedFile::getInstanceByName('file');
        $description = Yii::$app->request->post('description');
        
        if ($file) {
            $filePath = Yii::getAlias('@webroot/uploads/videos/') . $file->baseName . '.' . $file->extension;
            
            if ($file->saveAs($filePath)) {
                return [
                    'status' => 'success',
                    'message' => 'Video uploaded successfully!',
                    'file_path' => '/uploads/videos/' . $file->baseName . '.' . $file->extension
                ];
            } else {
                return ['status' => 'error', 'message' => 'Failed to upload video.'];
            }
        }

        return ['status' => 'error', 'message' => 'No file uploaded.'];
    }
}
