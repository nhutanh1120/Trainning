<?php

namespace app\modules\admin;

use yii\base\Module as BaseModule;

class Module extends BaseModule
{
    public $controllerNamespace = 'app\modules\admin\controllers'; // Đặt controller namespace cho module admin

    public function init()
    {
        parent::init();
    }
}
