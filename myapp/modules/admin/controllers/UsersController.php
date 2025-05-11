<?php

namespace app\modules\admin\controllers;

use Yii;
use app\modules\admin\search\UserSearch;
use app\modules\admin\search\SuggestedSearch;
use app\modules\admin\models\Users;
use app\modules\admin\models\Follows;

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

    public function actionSuggested()
    {
        $searchModel = new SuggestedSearch();
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

    public function actionFollows()
    {
        $request = json_decode(Yii::$app->request->getRawBody(), true);

        if (!$request['uuid']) {
            return [
                'success' => false,
                'message' => 'User UUID is required.',
            ];
        }

        $followingUuid = $request['uuid'];
        $user = Users::findOne(['uuid' => $followingUuid]);
        if (!$user) {
            return [
                'success' => false,
                'message' => 'User not found.',
            ];
        }

        $userUuid = Yii::$app->user->identity->uuid;
        $follow = Follows::findOne(['follower_uuid' => $userUuid, 'following_uuid' => $followingUuid]);

        if ($follow) {
            $follow->delete();
            $isFollowed = 0;
        } else {
            $follow = new Follows();
            $follow->uuid = Yii::$app->security->generateRandomString(36);
            $follow->follower_uuid = $userUuid;
            $follow->following_uuid = $followingUuid;
            $follow->save();
            $isFollowed = 1;
        }

        $followersCount = Follows::find()->where(['following_uuid' => $followingUuid])->count();
        $followingsCount = Follows::find()->where(['follower_uuid' => $userUuid])->count();

        return [
            'success' => true,
            'is_followed' => $isFollowed,
            'followers_count' => $followersCount,
            'followings_count' => $followingsCount,
        ];
    }
}
