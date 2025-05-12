ok tạo giúp t file hoàn chỉnh

# PHP Code Review Checklist – Yii2 Framework (PHP 8.3+)

## General PHP Guidelines

- [ ] Sử dụng cú pháp PHP 8.3+ hợp lệ (readonly, typed constants, v.v.)
- [ ] Tuân thủ chuẩn PSR-12
- [ ] Mọi class đều có namespace đúng
- [ ] Hàm/method có type hint và return type (xxxx)
- [ ] Không dùng $\_GET, $\_POST, biến global
- [ ] Không dùng giá trị hardcoded – ưu tiên hằng số const

---

## Controller Rules

- [ ] Tên class controller kết thúc bằng Controller (VD: UserController)
- [ ] Action viết dạng public function actionXyz()
- [ ] Dữ liệu đầu vào lấy từ $request->get() hoặc ->post()  
         (**Không dùng** $\_GET, $\_POST)
- [ ] Validate dữ liệu đầu vào trước khi xử lý
- [ ] Sử dụng `$this->successful()` để trả về phản hồi thành công

---

## Model Rules

- [ ] Validation nằm trong rules()
- [ ] Tên thuộc tính có định nghĩa attributeLabels()
- [ ] Validate dữ liệu trước khi lưu
- [ ] Không chứa business logic trong model (xxxx)

---

## Naming Conventions

- [ ] Class đặt theo **PascalCase** (VD: UserProfile)
- [ ] Biến, thuộc tính, hàm dùng **camelCase**
- [ ] Tên rõ nghĩa, không viết tắt

---

## Error Handling & Logging

- [ ] Có try/catch cho thao tác rủi ro (DB, API...)
- [ ] Không hiện lỗi raw cho người dùng

---

## Documentation

- [ ] Mô tả rõ ràng các tham số đầu vào và đầu ra
- [ ] Ghi chú các đoạn mã phức tạp

---

## Best Practices

- [ ] Controller chỉ xử lý luồng, **không chứa logic nghiệp vụ**

---

## Ghi chú Reviewer

> Reviewer ghi chú các lỗi cần cải thiện tại đây:
