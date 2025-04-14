<?php

namespace app\modules\admin\models;

use Yii;
use yii\db\ActiveRecord;
use yii\behaviors\TimestampBehavior;

/**
 * This is the model class for table "users".
 *
 * @property string $uuid
 * @property string|null $first_name
 * @property string|null $last_name
 * @property string|null $full_name
 * @property string|null $nickname
 * @property string|null $avatar
 * @property string|null $gender
 * @property string|null $bio
 * @property int|null $date_of_birth
 * @property string|null $email
 * @property string $username
 * @property string $password
 * @property string|null $website_url
 * @property string|null $facebook_url
 * @property string|null $youtube_url
 * @property string|null $twitter_url
 * @property string|null $instagram_url
 * @property int|null $tick
 * @property int|null $is_deleted
 * @property int|null $created_at
 * @property int|null $updated_at
 */
class Users extends ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'users';
    }

    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return [
            [
                'class' => TimestampBehavior::class,
            ],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['uuid', 'username', 'password'], 'required'],
            [['bio'], 'string'],
            [['date_of_birth', 'created_at', 'updated_at', 'is_deleted'], 'safe'],
            [['tick', 'is_deleted'], 'integer'],
            [['uuid'], 'string', 'max' => 36],
            [['first_name', 'last_name', 'nickname', 'username'], 'string', 'max' => 50],
            [['full_name', 'email'], 'string', 'max' => 100],
            [['avatar', 'password', 'website_url', 'facebook_url', 'youtube_url', 'twitter_url', 'instagram_url'], 'string', 'max' => 255],
            [['gender'], 'string', 'max' => 10],
            [['uuid'], 'unique'],
            [['nickname'], 'unique'],
            [['username'], 'unique'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'uuid' => 'Uuid',
            'first_name' => 'First Name',
            'last_name' => 'Last Name',
            'full_name' => 'Full Name',
            'nickname' => 'Nickname',
            'avatar' => 'Avatar',
            'gender' => 'Gender',
            'bio' => 'Bio',
            'date_of_birth' => 'Date Of Birth',
            'email' => 'Email',
            'username' => 'Username',
            'password' => 'Password',
            'website_url' => 'Website Url',
            'facebook_url' => 'Facebook Url',
            'youtube_url' => 'Youtube Url',
            'twitter_url' => 'Twitter Url',
            'instagram_url' => 'Instagram Url',
            'tick' => 'Tick',
            'is_deleted' => 'Is Deleted',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }

    /**
     * Gets query for [[Followers]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getFollowers()
    {
        return $this->hasMany(Follows::class, ['following_uuid' => 'uuid']);
    }

    /**
     * Gets query for [[Followings]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getFollowings()
    {
        return $this->hasMany(Follows::class, ['follower_uuid' => 'uuid']);
    }
}