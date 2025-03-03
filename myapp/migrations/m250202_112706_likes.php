<?php

use yii\db\Migration;

/**
 * Class m250202_112706_likes
 */
class m250202_112706_likes extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('likes', [
            'uuid' => $this->string(36)->notNull(),  // UUID as the primary key
            'user_uuid' => $this->string(36)->notNull(),  // Foreign key to "users" table (user who liked)
            'video_uuid' => $this->string(36)->notNull(),  // Foreign key to "videos" table (video being liked)
            'created_at' => $this->integer()->notNull(),
        ]);

        $this->addPrimaryKey('pk_likes_uuid', 'likes', 'uuid');

        $this->addForeignKey(
            'fk-likes-user_uuid',
            'likes',
            'user_uuid',
            'users',
            'uuid',
            'CASCADE',
            'CASCADE'
        );

        $this->addForeignKey(
            'fk-likes-video_uuid',
            'likes',
            'video_uuid',
            'videos',
            'uuid',
            'CASCADE',
            'CASCADE'
        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey('fk-likes-user_uuid', 'likes');
        $this->dropForeignKey('fk-likes-video_uuid', 'likes');

        $this->dropTable('likes');
    }
}