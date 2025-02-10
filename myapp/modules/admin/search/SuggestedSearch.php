<?php

namespace app\modules\admin\search;

use Yii;
use yii\data\ActiveDataProvider;
use app\modules\admin\Response\UserResponse;

class SuggestedSearch extends UserResponse
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
        $query = UserResponse::find();

        $this->load($params, '');

        if (!$this->validate()) {
            $query->where('0=1');
            return new ActiveDataProvider([
                'query' => $query,
                'pagination' => false,
            ]);
        }

        if ($this->type === 'foryou') {
            $query->innerJoin('follows', 'follows.followed_user_id = users.id')
                  ->where(['follows.follower_user_id' => Yii::$app->user->identity->uuid]);
        }

        $pageSize = !empty($this->page_size) ? (int)$this->page_size : 10;
        $currentPage = !empty($this->page) ? (int)$this->page - 1 : 0;

        return new ActiveDataProvider([
            'query' => $query,
            'pagination' => [
                'pageSize' => $pageSize,
                'page' => $currentPage,
            ],
        ]);
    }
}
