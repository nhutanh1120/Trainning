<?php

use yii\db\Migration;

/**
 * Class m241222_053547_class_teacher_category
 */
class m241222_053547_class_teacher_category extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('class_teacher_category', [
            'uuid' => $this->string(36)->notNull(),
            'name' => $this->string()->notNull(),
            'created_at' => $this->integer()->notNull(),
            'created_by' => $this->integer()->notNull(),
            'updated_at' => $this->integer()->notNull(),
            'updated_by' => $this->integer()->notNull(),
            'is_deleted' => $this->boolean()->defaultValue(false),
        ]);

        $this->addPrimaryKey(
            'pk-class_teacher_category',
            'class_teacher_category', 
            'uuid'  
        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('class_teacher_category');
    }
}
