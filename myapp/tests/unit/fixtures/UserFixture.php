<?php

namespace tests\unit\fixtures;

use yii\test\ActiveFixture;

class UserFixture extends ActiveFixture
{
    public $modelClass = 'app\modules\admin\models\User'; // Path to the User model
    public $dataFile = __DIR__ . '/data/user.php'; // Path to the sample data file
}
