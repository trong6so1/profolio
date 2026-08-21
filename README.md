# Portfolio — Đinh Hiếu Trọng

Website portfolio cá nhân hiện đại cho Software Engineer / Backend Developer.
Xây dựng bằng Next.js 16, TypeScript, Tailwind CSS 4 và shadcn/ui — có Dark/Light
mode, animation mượt, SEO tối ưu và form liên hệ hoạt động end-to-end.

## ✨ Tính năng

- **Hero section** — avatar stylised, tên, role xoay động, nút tải CV & liên hệ,
  social links, mini-stats.
- **About Me** — giới thiệu chi tiết, điểm mạnh, định hướng nghề nghiệp, học vấn.
- **Skills** — kỹ năng theo nhóm (Backend / Database / DevOps / Architecture) với
  thanh mức độ animation.
- **Projects** — dự án nổi bật + dự án khác, có ảnh cover, mô tả, highlights,
  tech stack, link GitHub/Demo.
- **Experience** — timeline dọc two-side responsive, có role, thời gian, thành
  tựu và stack.
- **Contact** — thông tin liên hệ, social links, form liên hệ validate bằng
  Zod + API route + rate-limit đơn giản.
- **Dark / Light mode** — chuyển theme mượt, không hydration mismatch.
- **SEO** — metadata đầy đủ, Open Graph, Twitter Card, JSON-LD `Person`,
  `sitemap.xml`, `robots.txt`.
- **Responsive** — mobile-first, hoạt động tốt trên Desktop / Tablet / Mobile.
- **Accessibility** — semantic HTML, ARIA labels, focus-visible, keyboard friendly.

## 🧱 Tech Stack

| Mảng            | Công nghệ                                            |
| --------------- | --------------------------------------------------- |
| Framework       | Next.js 16 (App Router) + React 19                  |
| Ngôn ngữ        | TypeScript 5                                         |
| Styling         | Tailwind CSS 4 + tw-animate-css                     |
| UI Components   | shadcn/ui (New York) + Lucide icons                 |
| Animation       | Framer Motion                                       |
| Theme           | next-themes                                         |
| Form validation | Zod                                                  |
| Fonts           | Inter (body) + Sora (display) qua `next/font`       |

## 📁 Cấu trúc source code

```
src/
├── app/
│   ├── layout.tsx           # Root layout + SEO metadata + ThemeProvider
│   ├── page.tsx             # Trang chính — compose tất cả sections
│   ├── globals.css          # Design tokens (light/dark) + utilities
│   ├── robots.ts            # robots.txt
│   ├── sitemap.ts           # sitemap.xml
│   └── api/
│       └── contact/route.ts # POST /api/contact — validate + rate-limit
├── components/
│   ├── providers/
│   │   └── theme-provider.tsx
│   ├── shared/
│   │   ├── navbar.tsx           # Sticky nav + mobile drawer
│   │   ├── footer.tsx           # Footer sticky-bottom
│   │   ├── theme-toggle.tsx     # Dark/Light toggle
│   │   ├── section-heading.tsx  # Eyebrow + title + description
│   │   └── structured-data.tsx  # JSON-LD Person schema
│   ├── sections/
│   │   ├── hero-section.tsx
│   │   ├── about-section.tsx
│   │   ├── skills-section.tsx
│   │   ├── projects-section.tsx
│   │   ├── experience-section.tsx
│   │   └── contact-section.tsx
│   └── ui/                  # shadcn/ui components
└── lib/
    ├── data.ts              # Toàn bộ nội dung portfolio (profile, skills, projects, experience)
    ├── db.ts                # Prisma client (sẵn sàng khi cần)
    └── utils.ts             # cn() helper
```

> **Lưu ý**: mọi nội dung portfolio (tên, role, projects, kinh nghiệm...) đều
> được tách ra `src/lib/data.ts`. Khi cần cập nhật thông tin, chỉ cần sửa file
> này — không cần đụng vào UI.

## 🚀 Cài đặt & chạy local

Yêu cầu: Node.js ≥ 20 (khuyến nghị 22+) hoặc Bun.

```bash
# 1. Clone source code và di chuyển vào thư mục
git clone <url-repo-cua-ban>.git
cd profolio

# 2. Cài dependencies
bun install            # hoặc: npm install / pnpm install

# 3. Chạy dev server
bun run dev            # hoặc: npm run dev
# Mở http://localhost:3000

# 4. Build production
bun run build

# 5. Chạy production
bun run start

# 6. Lint
bun run lint
```

## ☁️ Deploy lên Vercel

Cách nhanh nhất — Vercel auto-detect Next.js:

1. Push repo lên GitHub / GitLab / Bitbucket.
2. Vào [vercel.com/new](https://vercel.com/new), chọn repo.
3. Framework Preset: **Next.js** (tự động).
4. Build Command: `next build` (mặc định).
5. Output Directory: `.next` (mặc định).
6. Bấm **Deploy** — xong trong ~1 phút.

Sau deploy, gắn custom domain ở **Settings → Domains**. Sitemap sẽ tự động có
tại `https://<your-domain>/sitemap.xml`, robots tại `/robots.txt`.

### Cấu hình biến môi trường (tuỳ chọn)

Hiện portfolio không bắt buộc env vars. Nếu bạn muốn forward email liên hệ
qua Resend / SendGrid / Mailgun, thêm vào `.env`:

```bash
# .env.local
CONTACT_EMAIL_TO=trong6so1@gmail.com
RESEND_API_KEY=re_xxx
```

Rồi chỉnh `src/app/api/contact/route.ts` để forward qua provider bạn chọn.

## 🐳 Deploy bằng Docker (Self-hosted)

Dự án đã được cấu hình sẵn `Dockerfile` và `docker-compose.app.yml` để bạn có thể tự host trên VPS hoặc server cá nhân.

### 1. Chuẩn bị

Đảm bảo server của bạn đã cài đặt [Docker](https://docs.docker.com/get-docker/) và [Docker Compose](https://docs.docker.com/compose/install/).

Đầu tiên, clone source code về server và di chuyển vào thư mục dự án:

```bash
git clone <url-repo-cua-ban>.git
cd profolio
```

Tiếp theo, tạo network cho Docker (vì cấu hình compose yêu cầu external network):

```bash
docker network create profolio-net
```

*(Tuỳ chọn)* Nếu bạn muốn dùng ngrok để publish web ra ngoài internet nhanh chóng, hãy tạo file `.env` (hoặc `.env.ngrok`) ngang hàng với file compose và điền token của bạn:

```bash
NGROK_AUTHTOKEN=your_ngrok_auth_token_here
```

### 2. Build và Khởi chạy

Build Docker image từ `Dockerfile`:

```bash
docker build -t profolio-app:latest .
```

Khởi chạy các service (Next.js server + Caddy + Ngrok) ở chế độ background:

```bash
# Hoặc dùng docker compose -f ... (tuỳ phiên bản docker compose)
docker-compose -f docker-compose.app.yml up -d
```

Sau khi chạy thành công:
- Web của bạn sẽ hoạt động tại: **http://localhost:81**
- Nếu có cấu hình ngrok, bạn có thể xem public URL trong logs hoặc ở Dashboard: **http://localhost:4040**

Để xem logs trong quá trình chạy:
```bash
docker logs -f profolio-app
```

## 🤖 Triển khai tự động (CI/CD) với Jenkins & Ngrok

Dự án đã tích hợp sẵn `Jenkinsfile` để thiết lập một pipeline tự động deploy (CI/CD) mỗi khi có thay đổi code. Ngrok được cấu hình kèm theo qua Docker để cấp public URL.

### 1. Yêu cầu server Jenkins
Máy chủ chạy Jenkins cần cài đặt sẵn:
- **Docker** & **Docker Compose**
- **Bun** (Node.js package manager)
- **Tạo network**: Bạn cần tạo sẵn Docker network bằng lệnh: `docker network create profolio-net` trên server chạy Jenkins.

### 2. Cấu hình Credentials (Ngrok Token)
Để pipeline có thể đọc được token ngrok bảo mật:
1. Mở Jenkins, vào **Manage Jenkins → Credentials → System → Global credentials**.
2. Chọn **Add Credentials**, cấu hình loại **Secret text**.
3. **Secret**: Dán Ngrok Auth Token của bạn vào đây.
4. **ID**: Bắt buộc đặt là `ngrok-token` (để khớp với biến môi trường trong file Jenkins).

### 3. Tạo Job Pipeline
1. Ở trang chủ Jenkins, tạo một Job mới với loại **Pipeline**.
2. Ở tab **Build Triggers**, bạn có thể tick **GitHub hook trigger for GITScm polling** (đồng thời cấu hình Webhook trên GitHub để Jenkins tự build khi có code mới).
3. Ở tab **Pipeline**: mục Definition chọn **Pipeline script from SCM**. Cấu hình URL kho lưu trữ Git trỏ về repo này. Script Path mặc định là `Jenkinsfile`.

### 4. Kết quả quá trình Deploy
Sau khi pipeline hoàn thành (bao gồm Checkout, Build, Docker Deploy, và Health Check):
- Web của bạn sẽ được tự động host ở cổng `81` của server Jenkins.
- Truy cập Dashboard Ngrok tại **http://<IP-Jenkins>:4040** để lấy đường link public có đuôi `.ngrok-free.app` để chia sẻ cho mọi người.

## 🎨 Tuỳ chỉnh

| Việc                           | Sửa file                                  |
| ------------------------------ | ----------------------------------------- |
| Đổi tên / role / bio / CV link | `src/lib/data.ts` → `profile`             |
| Thêm / sửa project             | `src/lib/data.ts` → `projects`            |
| Thêm / sửa kinh nghiệm         | `src/lib/data.ts` → `experiences`         |
| Đổi kỹ năng                    | `src/lib/data.ts` → `skillGroups`         |
| Đổi palette màu                | `src/app/globals.css` → `:root` & `.dark` |
| Đổi fonts                      | `src/app/layout.tsx` (Inter, Sora, ...)   |
| Đổi favicon                    | `public/favicon.svg`                      |
| Đổi SEO metadata               | `src/app/layout.tsx`                      |

## 📝 Giấy phép

MIT — dùng tự do cho mục đích cá nhân. attribute sẽ được trân trọng.
