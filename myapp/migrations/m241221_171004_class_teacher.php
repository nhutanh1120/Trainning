<?php

use yii\db\Migration;

/**
 * Class m241221_171004_class_teacher
 */
class m241221_171004_class_teacher extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('class_teacher', [
            'uuid' => $this->string(36)->notNull(),
            'name' => $this->string()->notNull(),
            'order' => $this->integer()->notNull(),
            'created_at' => $this->integer()->notNull(),
            'created_by' => $this->integer()->notNull(),
            'updated_at' => $this->integer()->notNull(),
            'updated_by' => $this->integer()->notNull(),
            'is_deleted' => $this->boolean()->defaultValue(false),
            'foreign_uuid' => $this->string(36),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('class_teacher');
    }
}
