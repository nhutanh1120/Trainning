<?php

namespace tests\unit\fixtures;

use yii\test\ActiveFixture;

class UsersFixture extends ActiveFixture
{
    public $modelClass = 'app\modules\admin\models\Users'; // Path to the User model
    public $dataFile = __DIR__ . '/data/users.php'; // Path to the sample data file
}
