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
            'uuid' => $this->string(36)->notNull(), // UUID as the primary key
            'first_name' => $this->string(50),
            'last_name' => $this->string(50),
            'full_name' => $this->string(100),
            'nickname' => $this->string(50)->unique(),
            'avatar' => $this->string(255),
            'gender' => $this->string(10), // Example: male, female, other
            'bio' => $this->text(),
            'date_of_birth' => $this->integer(),
            'email' => $this->string(100)->notNull()->unique(),
            'username' => $this->string(50)->notNull()->unique(),
            'password' => $this->string(255)->notNull(), // Store password hash
            'website_url' => $this->string(255),
            'facebook_url' => $this->string(255),
            'youtube_url' => $this->string(255),
            'twitter_url' => $this->string(255),
            'instagram_url' => $this->string(255),
            'tick' => $this->boolean()->defaultValue(false), // Used for account verification
            'is_deleted' => $this->boolean()->defaultValue(false), // Check if user is deleted
            'created_at' => $this->integer()->notNull(),
            'updated_at' => $this->integer()->notNull(),
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