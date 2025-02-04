<?php

namespace app\modules\admin\controllers;

use Yii;
use app\modules\admin\search\UserSearch;

class UsersController extends CommonController
{
    public function actionSearch()
    {
        $searchModel = new UserSearch();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams);

        return [
            'items' => $dataProvider->getModels(),
            'pagination' => [
                'totalCount' => $dataProvider->getTotalCount(),
                'pageSize' => $dataProvider->pagination->pageSize,
                'currentPage' => $dataProvider->pagination->page + 1,
            ],
        ];
    }
}
