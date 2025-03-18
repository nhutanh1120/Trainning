<?php

namespace app\modules\admin\search;

use yii\data\ActiveDataProvider;
use app\modules\admin\Response\UserResponse;

class UserSearch extends UserResponse
{
    public $q;

    public $type;

    public function rules()
    {
        return [
            [['q', 'type'], 'safe'],
            [['q', 'type'], 'string'],
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

        if (!empty($this->q)) {
            $query->andFilterWhere([
                'and',
                ['like', 'username', $this->q],
                ['like', 'email', $this->q],
            ]);
        }

        return new ActiveDataProvider([
            'query' => $query,
            'pagination' => [
                'pageSize' => 10,
                // 'page' => $currentPage,
            ],
        ]);
    }
}
