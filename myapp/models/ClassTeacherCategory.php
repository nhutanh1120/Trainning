<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "class_teacher_category".
 *
 * @property string $uuid
 * @property string $name
 * @property int $created_at
 * @property int $created_by
 * @property int $updated_at
 * @property int $updated_by
 * @property int|null $is_deleted
 *
 * @property ClassTeacher[] $classTeachers
 */
class ClassTeacherCategory extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'class_teacher_category';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['uuid', 'name', 'created_at', 'created_by', 'updated_at', 'updated_by'], 'required'],
            [['created_at', 'created_by', 'updated_at', 'updated_by', 'is_deleted'], 'integer'],
            [['uuid'], 'string', 'max' => 36],
            [['name'], 'string', 'max' => 255],
            [['uuid'], 'unique'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'uuid' => 'Uuid',
            'name' => 'Name',
            'created_at' => 'Created At',
            'created_by' => 'Created By',
            'updated_at' => 'Updated At',
            'updated_by' => 'Updated By',
            'is_deleted' => 'Is Deleted',
        ];
    }

    /**
     * Gets query for [[ClassTeachers]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getClassTeachers()
    {
        return $this->hasMany(ClassTeacher::class, ['foreign_uuid' => 'uuid']);
    }
}
