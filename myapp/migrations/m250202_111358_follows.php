<?php

use yii\db\Migration;

/**
 * Class m250202_111358_follows
 */
class m250202_111358_follows extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('follows', [
            'uuid' => $this->string(36)->notNull()->unique(),  // UUID as the primary key
            'follower_uuid' => $this->string(36)->notNull(),  // Foreign key to "users" table (follower)
            'following_uuid' => $this->string(36)->notNull(),  // Foreign key to "users" table (following)
            'accepted_at' => $this->timestamp()->defaultValue(null),  // Timestamp when the follow request was accepted
            'created_at' => $this->timestamp()->defaultExpression('CURRENT_TIMESTAMP'),
            'updated_at' => $this->timestamp()->defaultExpression('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        ]);

        $this->addPrimaryKey('pk_follows_uuid', 'follows', 'uuid');

        // Add foreign key constraint for "follower_uuid" referencing "uuid" in the "users" table
        $this->addForeignKey(
            'fk-follows-follower_uuid',
            'follows',
            'follower_uuid',
            'users',
            'uuid',
            'CASCADE',
            'CASCADE'
        );

        // Add foreign key constraint for "following_uuid" referencing "uuid" in the "users" table
        $this->addForeignKey(
            'fk-follows-following_uuid',
            'follows',
            'following_uuid',
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

        $this->dropForeignKey('fk-follows-follower_uuid', 'follows');
        $this->dropForeignKey('fk-follows-following_uuid', 'follows');

        $this->dropTable('follows');
    }
}
