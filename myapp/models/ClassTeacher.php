<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "class_teacher".
 *
 * @property string $uuid
 * @property string $name
 * @property int $order
 * @property int $created_at
 * @property int $created_by
 * @property int $updated_at
 * @property int $updated_by
 * @property int|null $is_deleted
 * @property string|null $foreign_uuid
 *
 * @property ClassTeacherCategory $foreignUu
 */
class ClassTeacher extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'class_teacher';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['uuid', 'name', 'order', 'created_at', 'created_by', 'updated_at', 'updated_by'], 'required'],
            [['order', 'created_at', 'created_by', 'updated_at', 'updated_by', 'is_deleted'], 'integer'],
            [['uuid', 'foreign_uuid'], 'string', 'max' => 36],
            [['name'], 'string', 'max' => 255],
            [['uuid'], 'unique'],
            [['foreign_uuid'], 'exist', 'skipOnError' => true, 'targetClass' => ClassTeacherCategory::class, 'targetAttribute' => ['foreign_uuid' => 'uuid']],
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
            'order' => 'Order',
            'created_at' => 'Created At',
            'created_by' => 'Created By',
            'updated_at' => 'Updated At',
            'updated_by' => 'Updated By',
            'is_deleted' => 'Is Deleted',
            'foreign_uuid' => 'Foreign Uuid',
        ];
    }

    /**
     * Gets query for [[ForeignUu]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getForeignUu()
    {
        return $this->hasOne(ClassTeacherCategory::class, ['uuid' => 'foreign_uuid']);
    }
}
