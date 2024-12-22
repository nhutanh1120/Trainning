<?php

use yii\db\Migration;

/**
 * Class m241221_172531_class_room
 */
class m241221_172531_class_room extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('class_room', [
            'uuid' => $this->string(36)->notNull(),
            'name' => $this->string()->notNull(),
            'created_at' => $this->integer()->notNull(),
            'created_by' => $this->integer()->notNull(),
            'updated_at' => $this->integer()->notNull(),
            'updated_by' => $this->integer()->notNull(),
            'is_deleted' => $this->boolean()->defaultValue(false),
        ]);

        $this->addPrimaryKey(
            'pk-class_room',
            'class_room', 
            'uuid'  
        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('class_room');
    }
}
