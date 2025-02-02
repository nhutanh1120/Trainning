<?php

namespace app\modules\admin\models;

use Yii;

/**
 * This is the model class for table "follows".
 *
 * @property string $uuid
 * @property string $follower_uuid
 * @property string $following_uuid
 * @property string|null $accepted_at
 * @property string|null $created_at
 * @property string|null $updated_at
 *
 * @property Users $followerUu
 * @property Users $followingUu
 */
class Follow extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'follows';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['uuid', 'follower_uuid', 'following_uuid'], 'required'],
            [['accepted_at', 'created_at', 'updated_at'], 'safe'],
            [['uuid', 'follower_uuid', 'following_uuid'], 'string', 'max' => 36],
            [['uuid'], 'unique'],
            [['follower_uuid'], 'exist', 'skipOnError' => true, 'targetClass' => Users::class, 'targetAttribute' => ['follower_uuid' => 'uuid']],
            [['following_uuid'], 'exist', 'skipOnError' => true, 'targetClass' => Users::class, 'targetAttribute' => ['following_uuid' => 'uuid']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'uuid' => 'Uuid',
            'follower_uuid' => 'Follower Uuid',
            'following_uuid' => 'Following Uuid',
            'accepted_at' => 'Accepted At',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }

    /**
     * Gets query for [[FollowerUu]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getFollowerUu()
    {
        return $this->hasOne(Users::class, ['uuid' => 'follower_uuid']);
    }

    /**
     * Gets query for [[FollowingUu]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getFollowingUu()
    {
        return $this->hasOne(Users::class, ['uuid' => 'following_uuid']);
    }
}
