<?php

namespace app\modules\admin\infrastructure;

use Yii;

/**
 * This is the model class for table "comments".
 *
 * @property string $uuid
 * @property string $user_uuid
 * @property string $video_uuid
 * @property string $comment
 * @property string|null $created_at
 * @property string|null $updated_at
 *
 * @property Users $userUu
 * @property Videos $videoUu
 */
class Comments extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'comments';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['uuid', 'user_uuid', 'video_uuid', 'comment'], 'required'],
            [['comment'], 'string'],
            [['created_at', 'updated_at'], 'safe'],
            [['uuid', 'user_uuid', 'video_uuid'], 'string', 'max' => 36],
            [['uuid'], 'unique'],
            [['user_uuid'], 'exist', 'skipOnError' => true, 'targetClass' => Users::class, 'targetAttribute' => ['user_uuid' => 'uuid']],
            [['video_uuid'], 'exist', 'skipOnError' => true, 'targetClass' => Videos::class, 'targetAttribute' => ['video_uuid' => 'uuid']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'uuid' => 'Uuid',
            'user_uuid' => 'User Uuid',
            'video_uuid' => 'Video Uuid',
            'comment' => 'Comment',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }

    /**
     * Gets query for [[UserUu]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getUserUu()
    {
        return $this->hasOne(Users::class, ['uuid' => 'user_uuid']);
    }

    /**
     * Gets query for [[VideoUu]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getVideoUu()
    {
        return $this->hasOne(Videos::class, ['uuid' => 'video_uuid']);
    }
}
