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

### 1. Quy Tắc Viết File Markdown Dữ Liệu Đề Thi (Rules)

Để Script có thể bóc tách chính xác 100% dữ liệu, hãy tuân thủ nghiêm ngặt các quy tắc trình bày trong file `.md` sau đây:

**a. Quy tắc phân chia Phần thi (Headers):**
- Đề thi phải được chia làm 3 phần, có tiêu đề chứa chữ (không phân biệt viết hoa/thường):
  - `## PHẦN I` (Dành cho trắc nghiệm nhiều phương án)
  - `## PHẦN II` (Dành cho trắc nghiệm Đúng/Sai)
  - `## PHẦN III` (Dành cho tự luận/trả lời ngắn)
*(Lưu ý: Có thể viết thêm chữ phía sau, ví dụ: `## PHẦN I. CÂU TRẮC NGHIỆM...`, nhưng bắt buộc phải có `## PHẦN I`)*

**b. Quy tắc khai báo Câu hỏi:**
- Bắt đầu mỗi câu hỏi BẮT BUỘC phải dùng định dạng in đậm: `**Câu X:**` hoặc `**Câu X.**` (trong đó X là số thứ tự).
- Ví dụ: `**Câu 1:** Theo thuyết tiến hóa...`

**c. Quy tắc khai báo Đáp án cho từng phần:**
- **Phần I (Nhiều lựa chọn):** 
  - Các đáp án phải bắt đầu bằng chữ cái hoa và dấu chấm, có khoảng trắng: `A. `, `B. `, `C. `, `D. `.
  - **Đáp án đúng** phải được đánh dấu bằng ký tự `*` sát ngay trước chữ cái. Ví dụ: `*A. Nội dung đáp án đúng.`
- **Phần II (Đúng/Sai):** 
  - Các ý phải bắt đầu bằng chữ cái thường và dấu ngoặc: `a) `, `b) `, `c) `, `d) `.
  - Cuối mỗi ý **bắt buộc** phải chốt lại bằng từ khóa `*ĐÚNG` hoặc `*SAI`. 
  - Ví dụ: `a) Chim cánh cụt biết bay. *SAI`
- **Phần III (Trả lời ngắn):** 
  - Ghi câu trả lời đúng ở dòng cuối cùng của câu hỏi, bắt đầu bằng từ khóa `*Đáp án: ` hoặc `Đáp án: `. 
  - Ví dụ: `*Đáp án: 12.5`

**d. Quy tắc hình ảnh và công thức Toán học/Hóa học:**
- **Hình ảnh:** Cứ chèn ảnh bình thường bằng cú pháp Markdown `![Tên ảnh](đường/dẫn/ảnh.png)`. Bạn có thể copy ảnh trực tiếp vào Typora.
  - *Cơ chế tự động:* Khi chạy lệnh parser, script sẽ quét và tìm đường dẫn ảnh gốc trên máy tính của bạn (VD: `C:\Users\...\AppData\Roaming\Typora\image.png`). Sau đó, nó tự động copy bức ảnh này bỏ vào thư mục `quiz-app/public/images/` của dự án, và sửa lại đường dẫn trong bộ nhớ web để trang web có thể hiển thị được ngay.
- **Công thức Toán/Hóa (LaTeX):** 
  - Đặt công thức nội suy (cùng hàng) trong cặp dấu `$`. Ví dụ: `$H' = -\sum_{i=1}^{S}$`
  - Đặt công thức thành khối (xuống dòng) trong cặp dấu `$$`. Ví dụ: `$$ x = \frac{-b \pm \sqrt{\Delta}}{2a} $$`

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
