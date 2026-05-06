
# KẾ HOẠCH XÂY DỰNG WEBSITE TRẮC NGHIỆM ONLINE

## 1. Tổng quan dự án (Project Overview)
Xây dựng một ứng dụng web trắc nghiệm tĩnh (Static Web App) cho phép học sinh làm bài tập từ dữ liệu có sẵn. Giao diện tối giản, trực quan, lấy cảm hứng từ nền tảng Azota (có sidebar bên trái hiển thị điểm số/thông tin, nội dung bài làm ở khung chính bên phải).

**Stack công nghệ đề xuất:**
*   Frontend: React.js (Vite) hoặc thuần HTML/CSS/JS. Đề xuất dùng React + Tailwind CSS để thiết kế giao diện nhanh và giống ảnh mẫu nhất.
*   Data: File JSON (được parse tự động từ các file Markdown chứa dữ liệu đề thi).

## 2. Quy tắc đánh dấu đáp án trong file Markdown (Parsing Rules)
*Lưu ý quan trọng cho AI Coding Assistant (Antigravity): Cần viết một script (ví dụ: Node.js hoặc Python) sử dụng Regex để đọc các file `.md` và convert sang `.json` dựa trên các dấu hiệu nhận biết (markers) cố định sau:*

*   **Phần I (Trắc nghiệm nhiều lựa chọn):** 
    *   Đáp án đúng được đánh dấu bằng ký tự `*` nằm ngay trước chữ cái của đáp án.
    *   *Ví dụ Regex Target:* `*A. Nội dung đáp án` hoặc `*B. Nội dung đáp án`.
*   **Phần II (Trắc nghiệm Đúng/Sai):** 
    *   Mỗi câu hỏi lớn gồm 4 mệnh đề a, b, c, d. Đáp án đúng hoặc sai được gắn ở tận cùng của mỗi dòng mệnh đề bằng chuỗi `*ĐÚNG` hoặc `*SAI`.
    *   *Ví dụ Regex Target:* `a) Nội dung mệnh đề... *ĐÚNG` hoặc `b) Nội dung mệnh đề... *SAI`.
*   **Phần III (Trả lời ngắn):** 
    *   Đáp án được cung cấp ở dòng cuối cùng của mỗi câu hỏi, bắt đầu bằng chuỗi `*Đáp án:` hoặc `Đáp án:`.
    *   *Ví dụ Regex Target:* `*Đáp án: 12` hoặc `Đáp án: 3,14`.

> Đặc biệt chú ý: trong các file md tôi có chèn ảnh bạn hãy lần theo đường dẫn ảnh tôi bỏ trong 4 file md rồi copy tất cả các ảnh đó vào folder image đặt tại trong folder dự án đồng thời đảm bảo rằng khi số hoá lên web thi online các ảnh sẽ nằm đúng vị trí 

## 3. Cấu trúc dữ liệu JSON mục tiêu (Target Data Structure)
Dựa vào các rules trên, Script cần xuất ra cấu trúc JSON có 3 phần rõ ràng như sau:
```json
{
  "part1_multipleChoice": [
    {
      "id": "q1",
      "question": "Nội dung câu hỏi trắc nghiệm?",
      "options": [
        {"key": "A", "text": "Đáp án A", "isCorrect": false},
        {"key": "B", "text": "Đáp án B", "isCorrect": true},
        {"key": "C", "text": "Đáp án C", "isCorrect": false},
        {"key": "D", "text": "Đáp án D", "isCorrect": false}
      ]
    }
  ],
  "part2_trueFalse": [
    {
      "id": "q2",
      "question": "Nội dung câu hỏi lớn (VD: Cho đoạn thông tin sau...)?",
      "statements": [
        {"id": "a", "text": "Mệnh đề a", "isTrue": true},
        {"id": "b", "text": "Mệnh đề b", "isTrue": false}
      ]
    }
  ],
  "part3_shortAnswer": [
    {
      "id": "q3",
      "question": "Nội dung câu hỏi trả lời ngắn?",
      "correctAnswer": "12"
    }
  ]
}
```

## 4. Các tính năng cốt lõi (Core Features)

### 4.1. Cơ chế đảo câu hỏi (Randomization)
*   Mỗi khi trang được load hoặc người dùng nhấn "Làm lại bài", hệ thống phải xáo trộn (shuffle) ngẫu nhiên thứ tự các câu hỏi bên trong từng phần (Phần 1 đảo riêng, Phần 2 đảo riêng, Phần 3 đảo riêng).
*   *Lưu ý:* Giữ nguyên thứ tự các đáp án A, B, C, D và thứ tự mệnh đề a, b, c, d (chỉ đảo vị trí câu hỏi lớn).

### 4.2. Chế độ làm bài (Taking Quiz State)
*   Thí sinh cuộn trang để xem toàn bộ câu hỏi.
*   **Phần I:** Render dạng Radio buttons (chỉ chọn 1).
*   **Phần II:** Render dạng Radio buttons hoặc Button Group (True/False) cho từng mệnh đề.
*   **Phần III:** Render Input text (chỉ nhập số hoặc chữ ngắn).
*   Có nút "Nộp bài" (Submit) cố định ở cuối trang hoặc trôi nổi ở góc màn hình.

### 4.3. Cơ chế chấm điểm (Scoring Logic)
*   Tổng điểm là 10.
*   Điểm chia đều dựa trên tổng số thao tác thí sinh phải làm. Ví dụ: Nếu có 20 câu MCQ (20 thao tác) + 5 câu Đ/S (20 mệnh đề = 20 thao tác) + 5 câu ngắn (5 thao tác) = Tổng 45 thao tác. Mỗi thao tác đúng được (10 / 45) điểm.
*   Điểm được làm tròn đến 2 chữ số thập phân (VD: 9.71/10).

### 4.4. Chế độ xem lại (Review State)
Sau khi nhấn "Nộp bài", giao diện chuyển sang chế độ Review chia làm 2 khu vực:
*   **Sidebar (Bảng điều khiển bên trái):**
    *   Hiển thị khối "Điểm: X/10" nổi bật.
    *   Hiển thị chi tiết: "Thời gian làm bài", "Thời gian nộp bài", "Số câu đúng/Tổng câu".
*   **Main Content (Nội dung bài làm bên phải):** 
    *   Khóa toàn bộ input, không cho phép chỉnh sửa.
    *   *Câu làm đúng:* Hiển thị màu xanh lá cây (tick V, viền xanh).
    *   *Câu làm sai:* Hiển thị màu đỏ (dấu X, viền đỏ) và có thêm dòng thông báo màu xanh lá: "Đáp án đúng: [Giá trị đáp án]".

## 5. Các bước triển khai cho Antigravity (Execution Steps)

1.  **Bước 1: Viết Script Bóc tách dữ liệu (Parser)**
    *   Viết đoạn code đọc file `.md`, dùng Regex bắt các dấu hiệu `*`, `*ĐÚNG`/`*SAI`, `*Đáp án:` để trích xuất mảng JSON theo chuẩn mục 3.
2.  **Bước 2: Setup Frontend Framework & UI**
    *   Khởi tạo dự án (Vite + React + Tailwind). Tạo layout cơ bản (Sidebar & Main Content).
3.  **Bước 3: Quản lý Trạng thái (State Management)**
    *   Thiết lập state: `quizData` (đã shuffle câu hỏi), `userAnswers` (object lưu `{questionId: answer}`), `isSubmitted` (boolean), `score` (number).
4.  **Bước 4: Xây dựng UI Component (Chế độ làm bài)**
    *   Tạo các component tái sử dụng: `MultipleChoice`, `TrueFalse`, `ShortAnswer`.
5.  **Bước 5: Logic Chấm điểm & Xem lại (Grading & Review)**
    *   Viết hàm `calculateScore()` so sánh `userAnswers` với `quizData` gốc để tính điểm hệ 10.
    *   Đổi state `isSubmitted = true`, render lại UI với Tailwind classes (xanh/đỏ) tương ứng với kết quả đúng/sai.
6.  **Bước 6: Hoàn thiện (Refine)**
    *   Thêm hộp thoại "Xác nhận nộp bài".
    *   Thêm tính năng "Làm lại bài" (Reset toàn bộ state và shuffle lại dữ liệu).
