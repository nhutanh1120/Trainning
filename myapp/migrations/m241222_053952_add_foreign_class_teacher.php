<?php

use yii\db\Migration;

/**
 * Class m241222_053952_add_foreign_class_teacher
 */
class m241222_053952_add_foreign_class_teacher extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        // Thêm foreign key
        $this->addForeignKey(
            'fk-class_teacher-foreign_uuid', // Tên của foreign key
            'class_teacher',                 // Bảng chứa khóa ngoại
            'foreign_uuid',                  // Cột làm khóa ngoại
            'class_teacher_category',        // Bảng tham chiếu
            'uuid',                          // Cột trong bảng tham chiếu
        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey('fk-class_teacher-foreign_uuid', 'class_teacher');
    }
}
