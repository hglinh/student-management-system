# Đồng Bộ Hóa Dữ Liệu - Hướng Dẫn Hoàn Chỉnh

## ✅ Những Gì Đã Được Hoàn Thành

### 1. **Backend API** (PHP/MySQL)
- ✅ Tạo 7 bảng database: users, students, classes, grades, attendance, schedules, notifications
- ✅ API authentication: Login, Register, Logout
- ✅ API student: Get, Create, Update, Delete (CRUD)
- ✅ API class: Get, Create, Update, Delete (CRUD)
- ✅ CORS support cho React frontend
- ✅ JWT token authentication
- ✅ Prepared statements cho bảo mật

**Vị trí Backend:** `d:\QL học sinh\backend\`

### 2. **Frontend API Services** (React/TypeScript)
- ✅ `api.config.ts` - Cấu hình API chung
- ✅ `authApi.ts` - Các hàm authentication
- ✅ `studentApi.ts` - Các hàm quản lý học sinh
- ✅ `classApi.ts` - Các hàm quản lý lớp học

**Vị trí Services:** `d:\QL học sinh\src\services\`

### 3. **DataContext Updated**
- ✅ Tích hợp API vào DataContext
- ✅ Tự động fetch dữ liệu từ phpMyAdmin khi app khởi động
- ✅ Fallback to localStorage nếu API không hoạt động
- ✅ Thêm loading & error states

**Vị trí Context:** `d:\QL học sinh\context\DataContext.tsx`

---

## 🚀 Cách Sử Dụng

### Bước 1: Đảm Bảo XAMPP Hoạt Động

```
1. Mở XAMPP Control Panel
2. Click "Start" cho Apache ✅
3. Click "Start" cho MySQL ✅
4. Cả hai đều có dấu tích xanh
```

### Bước 2: Tạo Database

```
1. Mở phpMyAdmin: http://localhost/phpmyadmin/
2. Tạo database: student_management
3. Import file: d:\QL học sinh\backend\database\schema.sql
4. Bấm Import
```

### Bước 3: Khởi Động React App

```bash
cd d:\QL học sinh
npm start
```

**Điều gì xảy ra:**
```
App starts
    ↓
DataContext loads
    ↓
fetchStudents() & fetchClasses() called
    ↓
API requests sent to backend
    ↓
Backend queries MySQL database
    ↓
Data returns to React
    ↓
Components display real data from phpMyAdmin
```

---

## 📊 Luồng Dữ Liệu

### Khi Bạn Xem Danh Sách Học Sinh:

```
Web (React) 
    → API: GET /api/students/list
    → Backend (PHP)
    → MySQL (phpMyAdmin)
    → Lấy tất cả học sinh từ bảng `students`
    → Trả về JSON
    → React hiển thị dữ liệu
```

### Khi Bạn Thêm Học Sinh:

```
Form nhập dữ liệu
    → Click "Lưu"
    → API: POST /api/students/store
    → Backend kiểm tra & lưu
    → MySQL chèn dòng mới
    → Trả về student mới
    → React cập nhật danh sách
    → Dữ liệu lưu vào phpMyAdmin ngay lập tức
```

### Khi Bạn Sửa Học Sinh:

```
Form chỉnh sửa dữ liệu
    → Click "Cập nhật"
    → API: PUT /api/students/update?id=1
    → Backend cập nhật
    → MySQL thay đổi dòng
    → React cập nhật UI
    → Dữ liệu thay đổi ngay trong phpMyAdmin
```

### Khi Bạn Xóa Học Sinh:

```
Click nút xóa
    → Xác nhận
    → API: DELETE /api/students/delete?id=1
    → Backend xóa
    → MySQL xóa dòng
    → React loại bỏ khỏi danh sách
    → Dữ liệu bị xóa khỏi phpMyAdmin
```

---

## 📍 Xem Dữ Liệu Ở Đâu?

### **Nơi Dữ Liệu Được Lưu:**
```
phpMyAdmin → student_management database → students table
```

### **Nơi Dữ Liệu Được Hiển Thị:**
```
Web App → http://localhost:5173 → Học sinh page
```

### **Kiểm Tra Dữ Liệu Trong phpMyAdmin:**

1. Mở: `http://localhost/phpmyadmin/`
2. Click vào database `student_management` (trái)
3. Click vào table `students` (dưới cùng bên trái)
4. Nhấn tab **Browse** để xem dữ liệu
5. Bạn sẽ thấy các học sinh

**Tất cả học sinh bạn thêm trên web đều sẽ xuất hiện ở đây!**

---

## 🔗 Kết Nối Hoàn Chỉnh

```
┌─────────────────────────────────────────────┐
│         Web App (React)                     │
│    http://localhost:5173                    │
└────────────────┬────────────────────────────┘
                 │
                 │ HTTP Requests
                 │ (GET, POST, PUT, DELETE)
                 ↓
┌─────────────────────────────────────────────┐
│      Backend API (PHP)                      │
│   http://localhost/student-management-api   │
└────────────────┬────────────────────────────┘
                 │
                 │ SQL Queries
                 │ (SELECT, INSERT, UPDATE, DELETE)
                 ↓
┌─────────────────────────────────────────────┐
│     MySQL Database (phpMyAdmin)             │
│      student_management                     │
│  ├─ students                                │
│  ├─ classes                                 │
│  ├─ users                                   │
│  ├─ grades                                  │
│  ├─ attendance                              │
│  ├─ schedules                               │
│  └─ notifications                           │
└─────────────────────────────────────────────┘
```

---

## 🧪 Kiểm Tra Đồng Bộ Hóa

### Kiểm Tra 1: Xem Dữ Liệu Được Tải Từ Database

1. Mở Web App: `http://localhost:5173`
2. Vào trang **Học sinh**
3. Nếu bạn thấy học sinh từ database → ✅ Hoạt động!
4. Kiểm tra phpMyAdmin để xác nhận

### Kiểm Tra 2: Thêm Học Sinh Mới

1. Web: Click **+ Thêm mới**
2. Nhập thông tin & lưu
3. Mở phpMyAdmin
4. Xem bảng `students`
5. Nếu thấy học sinh mới → ✅ Đồng bộ!

### Kiểm Tra 3: Chỉnh Sửa Dữ Liệu

1. Web: Click sửa học sinh
2. Thay đổi tên
3. Lưu thay đổi
4. Mở phpMyAdmin
5. Xem bảng `students`
6. Nếu tên thay đổi → ✅ Cập nhật thành công!

### Kiểm Tra 4: Xóa Dữ Liệu

1. Web: Click xóa học sinh
2. Xác nhận xóa
3. Mở phpMyAdmin
4. Xem bảng `students`
5. Nếu học sinh bị xóa → ✅ Xóa thành công!

---

## 🎓 Ví Dụ: Quy Trình Thêm Học Sinh

### Bước Trên Web:
```
1. Vào trang Học sinh
2. Click "+ Thêm mới"
3. Nhập:
   - Tên: Phạm Văn G
   - Mã: HS007
   - Lớp: 10A
   - Ngày sinh: 2008-10-10
   - Giới tính: Nam
4. Click "Lưu"
```

### Phía Backend (Tự động xảy ra):
```
API nhận request → 
Validate dữ liệu → 
INSERT INTO students VALUES (...) → 
Database lưu dòng mới → 
API trả về success
```

### Phía phpMyAdmin:
```
Mở phpMyAdmin → 
student_management → 
students table → 
Click Browse → 
Bạn sẽ thấy "Phạm Văn G" ở cuối bảng
```

---

## 🔑 Tài Khoản Mặc Định

```
Admin:
- Username: admin
- Password: password
- Email: admin@school.com

Teacher:
- Username: teacher1
- Password: password
- Email: teacher@school.com
```

---

## ⚠️ Nếu Có Lỗi

### Lỗi: "Network error - Backend may not be running"

✅ **Giải pháp:**
```
1. Kiểm tra XAMPP - Apache phải xanh
2. Kiểm tra MySQL phải xanh
3. Kiểm tra folder backend ở đúng vị trí:
   C:\users\hp\documents\xampp\htdocs\student-management-api\
4. Thử mở: http://localhost/student-management-api/
   Nếu không có lỗi = Backend OK
```

### Lỗi: "Cannot connect to database"

✅ **Giải pháp:**
```
1. Kiểm tra MySQL running
2. Kiểm tra phpMyAdmin: http://localhost/phpmyadmin/
3. Kiểm tra database student_management tồn tại
4. Kiểm tra file schema.sql đã import
```

### Lỗi: Dữ liệu không hiển thị trên web

✅ **Giải pháp:**
```
1. Mở Browser Console: F12
2. Xem lỗi gì xuất hiện
3. Kiểm tra Network tab
4. Thử refresh trang
5. Kiểm tra backend có dữ liệu: http://localhost/phpmyadmin/
```

---

## 📋 Checklist Đồng Bộ Hóa

- [ ] XAMPP Apache running ✅
- [ ] XAMPP MySQL running ✅
- [ ] Backend folder ở đúng vị trí ✅
- [ ] Database `student_management` tạo ✅
- [ ] File `schema.sql` import ✅
- [ ] Mở phpMyAdmin, xem dữ liệu ✅
- [ ] Khởi động React app ✅
- [ ] Xem dữ liệu trên web ✅
- [ ] Thêm học sinh & kiểm tra phpMyAdmin ✅
- [ ] Sửa học sinh & kiểm tra phpMyAdmin ✅
- [ ] Xóa học sinh & kiểm tra phpMyAdmin ✅

---

## 📖 Tài Liệu Tham Khảo

| File | Nội dung |
|------|---------|
| `backend/SETUP.md` | Hướng dẫn setup backend chi tiết |
| `backend/README.md` | API documentation |
| `API_INTEGRATION_GUIDE.md` | Hướng dẫn tích hợp API |
| `backend/database/schema.sql` | SQL schema |
| `src/services/api.config.ts` | Cấu hình API |
| `src/services/studentApi.ts` | API student |
| `context/DataContext.tsx` | React context |

---

## 🎉 Kết Quả

**Trước đây:**
```
Web ↔ localStorage
Dữ liệu chỉ lưu trên trình duyệt, không có database
```

**Bây giờ:**
```
Web ↔ Backend API ↔ MySQL Database (phpMyAdmin)
Dữ liệu lưu vĩnh viễn, đồng bộ, an toàn
```

---

**Status:** ✅ Đồng Bộ Hóa Hoàn Chỉnh & Sẵn Sàng Sử Dụng!

Bây giờ bạn có một hệ thống hoàn chỉnh với:
- ✅ Web frontend (React)
- ✅ Backend API (PHP)
- ✅ Database (MySQL via phpMyAdmin)
- ✅ Data synchronization (tự động)
