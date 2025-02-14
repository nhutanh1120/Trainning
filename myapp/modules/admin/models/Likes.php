<?php

namespace app\modules\admin\models;

use Yii;
use yii\db\ActiveRecord;
use yii\db\Expression;
use yii\behaviors\TimestampBehavior;

/**
 * This is the model class for table "likes".
 *
 * @property string $uuid
 * @property string $user_uuid
 * @property string $video_uuid
 * @property string|null $created_at
 *
 * @property Users $user
 * @property Videos $video
 */
class Likes extends ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'likes';
    }

    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return [
            [
                'class' => TimestampBehavior::class,
                'createdAtAttribute' => 'created_at',
                'updatedAtAttribute' => false,
                'value' => new Expression('UNIX_TIMESTAMP()'),
            ],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['uuid', 'user_uuid', 'video_uuid'], 'required'],
            [['created_at'], 'safe'],
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
            'created_at' => 'Created At',
        ];
    }

    /**
     * Gets query for [[User]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getUser()
    {
        return $this->hasOne(Users::class, ['uuid' => 'user_uuid']);
    }

    /**
     * Gets query for [[Video]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getVideo()
    {
        return $this->hasOne(Videos::class, ['uuid' => 'video_uuid']);
    }
}