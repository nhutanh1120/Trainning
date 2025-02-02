<?php

namespace app\modules\admin\models;

use Yii;

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
 * @property string|null $date_of_birth
 * @property string $email
 * @property string $password
 * @property string|null $website_url
 * @property string|null $facebook_url
 * @property string|null $youtube_url
 * @property string|null $twitter_url
 * @property string|null $instagram_url
 * @property int|null $tick
 * @property string|null $created_at
 * @property string|null $updated_at
 */
class User extends \yii\db\ActiveRecord
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
    public function rules()
    {
        return [
            [['uuid', 'email', 'password'], 'required'],
            [['bio'], 'string'],
            [['date_of_birth', 'created_at', 'updated_at'], 'safe'],
            [['tick'], 'integer'],
            [['uuid'], 'string', 'max' => 36],
            [['first_name', 'last_name', 'nickname'], 'string', 'max' => 50],
            [['full_name', 'email'], 'string', 'max' => 100],
            [['avatar', 'password', 'website_url', 'facebook_url', 'youtube_url', 'twitter_url', 'instagram_url'], 'string', 'max' => 255],
            [['gender'], 'string', 'max' => 10],
            [['uuid'], 'unique'],
            [['email'], 'unique'],
            [['nickname'], 'unique'],
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
            'password' => 'Password',
            'website_url' => 'Website Url',
            'facebook_url' => 'Facebook Url',
            'youtube_url' => 'Youtube Url',
            'twitter_url' => 'Twitter Url',
            'instagram_url' => 'Instagram Url',
            'tick' => 'Tick',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }
}
