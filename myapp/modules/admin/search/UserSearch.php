<?php

namespace app\modules\admin\search;

use yii\data\ActiveDataProvider;
use app\modules\admin\Response\UserResponse;

class UserSearch extends UserResponse
{
    public $q;

    public function rules()
    {
        return [
            [['q'], 'safe'],
        ];
    }

    public function search($params)
    {
        $query = UserResponse::find();

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'pagination' => [
                'pageSize' => 10, 
            ],
            // 'sort' => [
            //     'defaultOrder' => [
            //         'uuid' => SORT_DESC, 
            //     ],
            // ],
        ]);

        $this->load($params);

        if (!$this->validate()) {
            $query->where('0=1');
            return $dataProvider;
        }

        if (!empty($this->q)) {
            $query->andFilterWhere([
                'and',
                ['like', 'username', $this->q],
                ['like', 'email', $this->q],
            ]);
        }

        return $dataProvider;
    }
}
