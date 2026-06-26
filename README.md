# Node / Express / TypeORM Starter

Starter này là một nền tảng backend cho Node.js, Express và TypeORM, phù hợp để bắt đầu các API có kết nối PostgreSQL, validate dữ liệu bằng Zod và tổ chức code theo lớp controller/service/repository.

## Tính năng chính

- Express.js làm web framework.
- TypeORM kết nối PostgreSQL.
- Zod để validate body, query và params.
- Cấu trúc rõ ràng theo `controllers`, `services`, `repository`, `routes`, `middlewares`.
- Hỗ trợ path alias `~/*` để import gọn hơn.
- Có sẵn module user làm ví dụ cho luồng CRUD.

## Yêu cầu môi trường

- Node.js 20+.
- Một PostgreSQL database.
- Trình quản lý package tương thích với `package.json` này, ví dụ npm hoặc pnpm.

## Cài đặt

```bash
npm install
```

Nếu bạn dùng pnpm:

```bash
pnpm install
```

## Biến môi trường

Tạo file `.env` ở thư mục gốc và khai báo tối thiểu:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
PORT=8081
```

`PORT` là tùy chọn, nếu không khai báo server sẽ dùng port mặc định trong code.

## Chạy dự án

Chạy ở chế độ development:

```bash
npm run dev
```

Chạy bằng script hiện tại:

```bash
npm start
```

## Scripts

- `npm run dev`: chạy ứng dụng với nodemon và tsx.
- `npm start`: chạy entrypoint hiện tại của dự án.
- `npm test`: placeholder, hiện chưa có test suite.

## Cấu trúc thư mục

```text
src/
  constant/
  controllers/
  db/
  entities/
  interfaces/
  middlewares/
  modules/
  repository/
  routes/
  services/
  utils/
```

Ý nghĩa nhanh:

- `controllers`: xử lý request/response.
- `services`: chứa business logic.
- `repository`: truy cập dữ liệu.
- `entities`: khai báo entity và schema validate.
- `middlewares`: middleware chung, như validate request.
- `routes`: khai báo router theo module.
- `utils`: response helper, error helper, async handler.

## Luồng khởi động

1. Load biến môi trường bằng `dotenv`.
2. Khởi tạo kết nối TypeORM.
3. Gắn middleware `express.json()`, `cors()` và router chính.
4. Server lắng nghe ở port cấu hình trong `.env` hoặc port mặc định.

## API hiện có

Base path của API là `/api`.

### Health check

- `GET /`

Trả về:

```json
{ "message": "all good" }
```

### User

Module user đang là ví dụ cho luồng API có validate.

- `GET /api/user`
- `GET /api/user/:id`

Query hỗ trợ cho danh sách user:

- `page`
- `limit`
- `search`

Params cho chi tiết user:

- `id`

## Validate dữ liệu

Dự án có middleware `validate` để kiểm tra và chuẩn hóa:

- `body`
- `query`
- `params`

Nếu dữ liệu không hợp lệ, request sẽ trả lỗi 400 với thông báo từ Zod.

## Ghi chú

- TypeORM đang cấu hình `synchronize: true`, phù hợp cho starter hoặc môi trường phát triển, nhưng nên cân nhắc tắt khi lên production.
- Repository hiện là bộ khung để mở rộng thêm các module khác như auth, upload hoặc excels.

## Mở rộng tiếp theo

- Thêm migration thay vì phụ thuộc vào `synchronize`.
- Bổ sung tài liệu cho từng endpoint.
- Thêm test cho service và controller.
- Hoàn thiện các module `auth`, `upload` và `excels` nếu cần.