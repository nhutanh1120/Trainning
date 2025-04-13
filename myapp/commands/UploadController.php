<?php

namespace app\commands;

use Yii;
use yii\console\Controller;

class UploadController extends Controller
{
    private $tempPath = '@app/web/uploads/temp';

    public function actionClear()
    {
        $path = Yii::getAlias($this->tempPath);

        if (!is_dir($path)) {
            echo "Thư mục không tồn tại: $path\n";
            return;
        }

        $files = glob($path . '/*');

        if (empty($files)) {
            echo "Không có file nào trong thư mục tạm.\n";
            return;
        }

        foreach ($files as $file) {
            if (is_file($file)) {
                if (unlink($file)) {
                    echo "Đã xóa: " . basename($file) . "\n";
                } else {
                    echo "Không thể xóa: " . basename($file) . "\n";
                }
            }
        }

        echo "Hoàn tất việc dọn thư mục tạm.\n";
    }
}
