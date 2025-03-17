<?php

namespace app\modules\admin\search;

use Yii;
use yii\db\Query;
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

        if (!Yii::$app->user->isGuest) {
            $currentUserUuid = Yii::$app->user->identity->uuid;
            $query->andWhere(['!=', 'uuid', $currentUserUuid]);
        }

        $subQuery = (new Query())
            ->select('following_uuid')
            ->from('follows')
            ->where(['follows.follower_uuid' => Yii::$app->user->identity->uuid]);
        if ($this->type === 'foryou') {
            $query->andWhere(['uuid' => $subQuery]);
        } else {
            $query->andWhere(['not in', 'uuid', $subQuery]);
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
