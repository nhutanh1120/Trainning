<?php

namespace app\modules\admin\search;

use Yii;
use yii\data\ActiveDataProvider;
use app\modules\admin\models\Videos;

class VideosSearch extends Videos
{
    public $page;
    public $page_size;
    public $type;

    public function rules()
    {
        return [
            [['page', 'page_size'], 'integer'],
            [['type'], 'string'],
        ];
    }

    public function search($params)
    {
        $query = Videos::find();

        $this->load($params);

        $pageSize = !empty($this->page_size) ? (int)$this->page_size : 10;
        $currentPage = !empty($this->page) ? (int)$this->page - 1 : 0;

        if ($this->type === 'foryou') {
            $query->where(['user_uuid' => Yii::$app->user->identity->uuid]);
        }

        return new ActiveDataProvider([
            'query' => $query,
            'pagination' => [
                'pageSize' => $pageSize,
                'page' => $currentPage,
            ],
        ]);
    }
}
