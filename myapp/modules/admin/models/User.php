namespace app\models;

use yii\db\ActiveRecord;

class UserS extends ActiveRecord
{
    public static function tableName()
    {
        return 'user'; // Tên bảng trong cơ sở dữ liệu
    }

    public function rules()
    {
        return [
            [['username', 'email'], 'required'],
            [['email'], 'email'],
        ];
    }
}
