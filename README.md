# HeaBio - Hệ Thống Trắc Nghiệm Online

HeaBio là một ứng dụng web trắc nghiệm trực tuyến dạng tĩnh (Static Web App). Nền tảng được xây dựng với mục tiêu giúp quá trình làm bài và ôn tập trở nên trực quan, đơn giản với giao diện hiện đại tương tự các nền tảng lớn như Azota.

Dự án bao gồm một công cụ parser mạnh mẽ giúp chuyển đổi đề thi từ các file Markdown (`.md`) thành dữ liệu JSON sử dụng cho Frontend React.

## Stack Công Nghệ

- **Frontend:** React.js, Vite, React Router DOM
- **Styling:** Tailwind CSS v4, Tailwind Typography (kết hợp với `react-markdown` và `remark-gfm` để hiển thị Markdown chuẩn xác).
- **Parser Script:** Node.js thuần (sử dụng Regex).

## Cấu trúc dự án

```text
webonline thi sinh/
├── parser.js               # Script chuyển đổi file .md thành data.json và copy ảnh
├── BÀI 26...md             # Các file dữ liệu đề thi gốc
├── BÀI 28...md             
├── quiz-app/               # Thư mục chứa mã nguồn Frontend React + Vite
│   ├── public/
│   │   ├── data.json       # File dữ liệu được tự động tạo ra từ parser
│   │   └── images/         # Thư mục ảnh được tự động copy từ parser
│   ├── src/
│   │   ├── components/     # Các UI Component (Navbar, Sidebar, Trắc nghiệm...)
│   │   ├── pages/          # Các trang (Home, Quiz)
│   │   ├── App.jsx         # App chính thiết lập Router
│   │   └── index.css       # Cấu hình TailwindCSS
```

## Cách sử dụng

### 1. Chuẩn bị Dữ Liệu Đề Thi

Viết đề thi bằng các file Markdown (`.md`) với quy tắc sau:
- **Phần I (Nhiều lựa chọn):** Đặt đáp án đúng với dấu `*` ở đầu, VD: `*A. Nội dung`. Đánh số thứ tự câu hỏi là `**Câu 1:**` hoặc `**Câu 1.**`.
- **Phần II (Đúng/Sai):** Kết thúc mệnh đề bằng `*ĐÚNG` hoặc `*SAI`. VD: `a) Nội dung... *ĐÚNG`.
- **Phần III (Trả lời ngắn):** Ghi đáp án đúng dưới cùng, VD: `*Đáp án: 12` hoặc `Đáp án: 12`.
- **Hình ảnh:** Bạn có thể chèn ảnh trực tiếp vào file Markdown bằng đường dẫn nội bộ máy tính của bạn. Script sẽ tự động tìm và copy ảnh đó vào thư mục dự án.

### 2. Cập nhật Dữ liệu (Chạy Parser)

Khi bạn thêm file `.md` mới hoặc chỉnh sửa file cũ, hãy mở Terminal tại thư mục `webonline thi sinh` và chạy lệnh sau để cập nhật dữ liệu:

```bash
node parser.js
```

Script sẽ tự động sinh ra file `quiz-app/public/data.json` và copy mọi hình ảnh vào `quiz-app/public/images/`.

### 3. Khởi chạy Website

Để xem website, chuyển vào thư mục `quiz-app` và khởi chạy server Vite:

```bash
cd quiz-app
npm install     # Nếu đây là lần chạy đầu tiên
npm run dev
```

Website sẽ hiển thị tại `http://localhost:5173`. Bạn có thể nhấp vào một bài để làm, bài thi sẽ được mở trên một URL riêng biệt (`/quiz/bai-so...`).
