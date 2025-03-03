<?php

use yii\db\Migration;

/**
 * Class m250202_111340_videos
 */
class m250202_111340_videos extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('videos', [
            'uuid' => $this->string(36)->notNull(),
            'user_uuid' => $this->string(36)->notNull(),
            'file_path' => $this->text()->notNull(),
            'thumb_path' => $this->text()->notNull(),
            'description' => $this->text(),
            'music' => $this->text(),
            'meta' => $this->json(),
            'allows' => $this->boolean()->defaultValue(true),
            'viewable' => $this->boolean()->defaultValue(true),
            'published_at' => $this->integer()->defaultValue(null),
            'created_at' => $this->integer()->notNull(),
            'updated_at' => $this->integer()->notNull(),
        ]);

        $this->addPrimaryKey('pk_videos_uuid', 'videos', 'uuid');

        $this->addForeignKey(
            'fk-videos-user_uuid',
            'videos',
            'user_uuid',
            'users',
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
        $this->dropForeignKey('fk-videos-user_uuid', 'videos');

        $this->dropTable('videos');
    }
}