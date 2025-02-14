<?php

namespace app\modules\admin\controllers;

use Yii;
use app\modules\admin\search\VideosSearch;

class VideosController extends CommonController
{
    public function actionIndex()
    {
        $searchModel = new VideosSearch();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams);

        return [
            'items' => array_map(function ($video) {
                return $video->toResponse();
            }, $dataProvider->getModels()),
            'pagination' => [
                'totalCount' => $dataProvider->getTotalCount(),
                'pageSize' => $dataProvider->pagination->pageSize,
                'currentPage' => $dataProvider->pagination->page + 1,
            ],
        ];
    }
}
