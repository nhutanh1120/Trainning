<?php

use yii\db\Migration;

/**
 * Class m250202_110645_users
 */
class m250202_110645_users extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('users', [
            'uuid' => $this->string(36)->notNull()->unique(), // UUID as the primary key
            'first_name' => $this->string(50),
            'last_name' => $this->string(50),
            'full_name' => $this->string(100),
            'nickname' => $this->string(50)->unique(),
            'avatar' => $this->string(255),
            'gender' => $this->string(10), // Example: male, female, other
            'bio' => $this->text(),
            'date_of_birth' => $this->date(),
            'email' => $this->string(100)->notNull()->unique(),
            'password' => $this->string(255)->notNull(), // Store password hash
            'website_url' => $this->string(255),
            'facebook_url' => $this->string(255),
            'youtube_url' => $this->string(255),
            'twitter_url' => $this->string(255),
            'instagram_url' => $this->string(255),
            'tick' => $this->boolean()->defaultValue(false), // Used for account verification
            'created_at' => $this->timestamp()->defaultExpression('CURRENT_TIMESTAMP'),
            'updated_at' => $this->timestamp()->defaultExpression('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        ]);

        $this->addPrimaryKey('pk_users', 'users', 'uuid');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('users');
    }
}
