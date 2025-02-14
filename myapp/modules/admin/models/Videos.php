<?php

namespace app\modules\admin\models;

use Yii;
use yii\db\ActiveRecord;
use yii\behaviors\TimestampBehavior;

/**
 * This is the model class for table "videos".
 *
 * @property string $uuid
 * @property string $user_uuid
 * @property string $file_path
 * @property string $thumb_path
 * @property string|null $description
 * @property string|null $music
 * @property string|null $meta
 * @property int|null $allows
 * @property int|null $viewable
 * @property string|null $published_at
 * @property string|null $created_at
 * @property string|null $updated_at
 *
 * @property Comments[] $comments
 * @property Likes[] $likes
 * @property Users $user
 */
class Videos extends ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'videos';
    }

    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return [
            TimestampBehavior::class,
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['uuid', 'user_uuid', 'file_path', 'thumb_path'], 'required'],
            [['file_path', 'thumb_path', 'description', 'music'], 'string'],
            [['meta', 'published_at', 'created_at', 'updated_at'], 'safe'],
            [['allows', 'viewable'], 'integer'],
            [['uuid', 'user_uuid'], 'string', 'max' => 36],
            [['uuid'], 'unique'],
            [['user_uuid'], 'exist', 'skipOnError' => true, 'targetClass' => Users::class, 'targetAttribute' => ['user_uuid' => 'uuid']],
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
            'file_path' => 'File Path',
            'thumb_path' => 'Thumb Path',
            'description' => 'Description',
            'music' => 'Music',
            'meta' => 'Meta',
            'allows' => 'Allows',
            'viewable' => 'Viewable',
            'published_at' => 'Published At',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }

    /**
     * Gets query for [[Comments]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getComments()
    {
        return $this->hasMany(Comments::class, ['video_uuid' => 'uuid']);
    }

    /**
     * Gets query for [[Likes]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getLikes()
    {
        return $this->hasMany(Likes::class, ['video_uuid' => 'uuid']);
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
}