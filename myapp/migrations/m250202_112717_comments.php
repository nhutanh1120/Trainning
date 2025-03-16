<?php

use yii\db\Migration;

/**
 * Class m250202_112717_comments
 */
class m250202_112717_comments extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('comments', [
            'uuid' => $this->string(36)->notNull(),  // UUID as the primary key
            'user_uuid' => $this->string(36)->notNull(),  // Foreign key to "users" table (user who commented)
            'video_uuid' => $this->string(36)->notNull(),  // Foreign key to "videos" table (video being commented)
            'parent_uuid' => $this->string(36)->null(),  // UUID of the parent comment (if this is a reply)
            'content' => $this->text()->notNull(),  // The comment content
            'created_at' => $this->integer()->notNull(),
            'updated_at' => $this->integer()->notNull(),
        ]);

        $this->addPrimaryKey('pk_comments_uuid', 'comments', 'uuid');

        $this->addForeignKey(
            'fk-comments-user_uuid',
            'comments',
            'user_uuid',
            'users',
            'uuid',
            'CASCADE',
            'CASCADE'
        );

        $this->addForeignKey(
            'fk-comments-video_uuid',
            'comments',
            'video_uuid',
            'videos',
            'uuid',
            'CASCADE',
            'CASCADE'
        );

        $this->addForeignKey(
            'fk-comments-parent_uuid',
            'comments',
            'parent_uuid',
            'comments',
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
        $this->dropForeignKey('fk-comments-user_uuid', 'comments');
        $this->dropForeignKey('fk-comments-video_uuid', 'comments');
        $this->dropForeignKey('fk-comments-parent_uuid', 'comments');

        $this->dropTable('comments');
    }
}