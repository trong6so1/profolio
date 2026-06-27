/**
 * Central data file for the portfolio.
 * All profile / skills / projects / experience content lives here so the
 * page sections stay declarative and easy to maintain.
 */

export const profile = {
  name: "Đinh Hiếu Trọng",
  nameEn: "Dinh Hieu Trong",
  role: "Software Engineer",
  roles: ["Software Engineer", "Backend Developer", "PHP / Laravel Specialist"],
  tagline:
    "Tôi thích những dòng code chạy âm thầm lúc 3 giờ sáng — batch job xong việc, hệ thống vẫn êm, và không ai phải thức dậy vì alert.",
  shortBio:
    "Backend Developer sinh năm 2001 ở Biên Hoà. Yêu Laravel từ ngày thực tập, mê Docker từ khi ra quân, và tin rằng backend tử tế là backend có tài liệu đi kèm.",
  location: "Biên Hoà, Đồng Nai, Việt Nam",
  email: "trong6so1@gmail.com",
  phone: "+84 378 030 009",
  github: "https://github.com/trong6so1",
  linkedin: "https://www.linkedin.com/in/dinh-hieu-trong",
  cvUrl: "/cv/DINH-HIEU-TRONG-CV.pdf",
  avatarInitials: "ĐT",
  available: true,
};

export type SkillGroup = {
  category: string;
  icon: string; // lucide icon name
  accent: string; // tailwind color class for the chip
  skills: { name: string; level: number; note?: string; detail?: string }[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Backend",
    icon: "Server",
    accent: "text-primary",
    skills: [
      {
        name: "PHP",
        level: 90,
        note: "Ngôn ngữ quen thuộc nhất",
        detail:
          "Viết code PHP từ năm nhất đại học. Đã qua giai đoạn “sửa bug bằng echo”, giờ nghiện clean code và type hint.",
      },
      {
        name: "Laravel",
        level: 90,
        note: "Framework chính",
        detail:
          "Framework mình dành nhiều đêm nhất. Queue, Job, Event, Policy — thuộc lòng và dùng đúng chỗ.",
      },
      {
        name: "Node.js",
        level: 75,
        note: "Side quest",
        detail:
          "Mỗi khi cần microservice chạy async hoặc xử lý real-time, Node.js là lựa chọn mình reach tới đầu tiên.",
      },
      {
        name: "NestJS",
        level: 70,
        note: "Enterprise taste",
        detail:
          "Học để mở rộng tư duy OOP và dependency injection. Module hoá rõ ràng — cảm giác như viết Java mà không nặng Java.",
      },
    ],
  },
  {
    category: "Database",
    icon: "Database",
    accent: "text-warning",
    skills: [
      {
        name: "MySQL",
        level: 90,
        note: "Đã setup Master-Slave",
        detail:
          "Thiết kế schema, tối ưu query, viết replication Master-Slave cho production. Index là bạn, N+1 là thù.",
      },
      {
        name: "PostgreSQL",
        level: 75,
        note: "Khi cần JSONB & CTE",
        detail:
          "Chọn Postgres khi cần tính năng mà MySQL không có sẵn: JSONB, window function, common table expression.",
      },
      {
        name: "Redis",
        level: 70,
        note: "Cache & queue",
        detail:
          "Dùng làm cache layer cho API nóng, làm queue driver cho Laravel Horizon. Hiểu TTL là sức mạnh.",
      },
    ],
  },
  {
    category: "DevOps",
    icon: "Container",
    accent: "text-accent-foreground",
    skills: [
      {
        name: "Docker",
        level: 80,
        note: "Triển khai production",
        detail:
          "Đóng gói mọi thứ thành image trước khi đưa lên server. “Works on my machine” không phải câu mình thích nói.",
      },
      {
        name: "GitHub Actions",
        level: 70,
        note: "CI/CD pipelines",
        detail:
          "Automate cái gì lặp lại 3 lần trở lên. Lint, test, build, deploy — để máy làm, mình đi cà phê.",
      },
    ],
  },
  {
    category: "Architecture & Khác",
    icon: "Boxes",
    accent: "text-accent-foreground",
    skills: [
      {
        name: "REST API",
        level: 88,
        note: "Thiết kế & versioning",
        detail:
          "Versioning bằng URL, status code đúng ngữ nghĩa, pagination nhất quán. API contract là thứ mình never skip review.",
      },
      {
        name: "CQRS",
        level: 65,
        note: "Tách đọc / ghi",
        detail:
          "Áp dụng cho vài module có read/write ratio lệch hẳn. Hiểu trade-off — không phải lúc nào cũng cần.",
      },
      {
        name: "DDD",
        level: 65,
        note: "Domain modelling",
        detail:
          "Học để nghĩ về business trước, table sau. Bounded context, aggregate root — còn hơi trừu tượng nhưng đang đi đúng hướng.",
      },
    ],
  },
];

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  tech: string[];
  gradient: string; // tailwind gradient class for placeholder cover
  emoji: string;
  github?: string;
  demo?: string;
  year: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "tool-pm",
    title: "Tool PM — Product Management",
    subtitle: "Hệ thống quản trị sản phẩm Webike (đa quốc gia)",
    description:
      "Nền tảng quản lý toàn bộ sản phẩm của Webike trên nhiều quốc gia. Cho phép thêm sản phẩm từ kho Nhật Bản, phát hành sang các website quốc gia khác và đồng bộ dữ liệu hằng ngày bằng batch command.",
    highlights: [
      "API cho phép các quốc gia thêm sản phẩm vào website nội địa.",
      "Hàm Release sản phẩm — đẩy lên các site bán hàng quốc tế.",
      "Batch command chạy hằng ngày đồng bộ từ kho Nhật → các quốc gia.",
      "Bash SSH dump dữ liệu chéo giữa các database quốc gia.",
      "Giao diện quản lý số lượng sản phẩm bằng Vue.js.",
      "MySQL Replication Master-Slave để sao lưu dự phòng.",
    ],
    tech: ["Laravel", "Vue.js", "Docker", "MySQL", "Bash"],
    gradient: "from-[oklch(0.62_0.17_230)]/80 via-[oklch(0.65_0.18_290)]/60 to-[oklch(0.62_0.16_155)]/40",
    emoji: "📦",
    year: "2024",
    featured: true,
  },
  {
    id: "tool-tm",
    title: "Tool TM — Translate Management",
    subtitle: "Quản lý dịch thuật sản phẩm Webike (Key–Value)",
    description:
      "Hệ thống quản lý dịch thông tin sản phẩm từ tiếng Nhật sang các ngôn ngữ khác theo mô hình Key–Value, gồm Translated Keys và Untranslated Keys (thông số sản phẩm). Tích hợp Google Translate API và nhiều phần mềm dịch thuật khác.",
    highlights: [
      "Màn hình đếm số Translated Keys theo từng trang.",
      "Batch command đếm số key đã dịch hằng ngày cho từng trang.",
      "CRUD translated keys + xuất dữ liệu ra file TSV.",
      "Tích hợp Google API và nhiều dịch vụ dịch thuật bên thứ ba.",
      "MySQL Replication Master-Slave + Docker cho production.",
    ],
    tech: ["Laravel", "Vue.js", "Docker", "MySQL", "Google API"],
    gradient: "from-[oklch(0.75_0.15_75)]/80 via-[oklch(0.65_0.20_25)]/60 to-[oklch(0.62_0.20_25)]/40",
    emoji: "🌐",
    year: "2024",
    featured: true,
  },
  {
    id: "drinks-store",
    title: "Website bán đồ uống trực tuyến",
    subtitle: "Sàn thương mại điện tử (Internship)",
    description:
      "Website thương mại điện tử bán đồ uống với đầy đủ luồng đặt hàng, giỏ hàng và thanh toán. Thiết kế cơ sở dữ liệu bằng MySQL, viết backend bằng Laravel và front-end bằng jQuery.",
    highlights: [
      "Thiết kế database bằng MySQL cho sản phẩm, đơn hàng, người dùng.",
      "Viết backend REST API với Laravel (CRUD, giỏ hàng, đơn hàng).",
      "Phát triển front-end bằng jQuery cho trải nghiệm động.",
      "Tích hợp cổng thanh toán MoMo cho toàn bộ đơn hàng.",
    ],
    tech: ["Laravel", "MySQL", "jQuery", "MoMo API"],
    gradient: "from-[oklch(0.65_0.18_290)]/80 via-[oklch(0.62_0.20_290)]/60 to-[oklch(0.62_0.17_230)]/40",
    emoji: "🥤",
    year: "2023",
  },
  {
    id: "wedding-cards",
    title: "Website bán thiệp cưới",
    subtitle: "Sàn đặt thiệp cưới tuỳ chỉnh (Internship)",
    description:
      "Website cho phép khách hàng chọn mẫu thiệp cưới, tuỳ chỉnh thông tin và đặt hàng. Backend Laravel + MySQL, front-end bằng jQuery, luồng đặt hàng tối giản.",
    highlights: [
      "Quản lý mẫu thiệp với nhiều danh mục và tuỳ chỉnh nội dung.",
      "Backend Laravel cho CRUD sản phẩm và đơn hàng.",
      "Giao diện jQuery cho phép xem trước thiệp trực tiếp.",
      "Tích hợp cổng thanh toán MoMo.",
    ],
    tech: ["Laravel", "MySQL", "jQuery", "MoMo API"],
    gradient: "from-[oklch(0.65_0.20_25)]/80 via-[oklch(0.62_0.20_25)]/60 to-[oklch(0.75_0.15_75)]/40",
    emoji: "💌",
    year: "2023",
  },
];

export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  period: string;
  periodLabel: string;
  type: "Intern" | "Full-time" | "Freelance";
  summary: string;
  achievements: string[];
  stack: string[];
};

export const experiences: ExperienceItem[] = [
  {
    id: "rivercrane",
    role: "Backend Developer (Staff)",
    company: "Rivercrane — ADC Office",
    period: "2024-03 — 2025-03",
    periodLabel: "1 năm",
    type: "Full-time",
    summary:
      "Phát triển các công cụ quản trị nội bộ cho nền tảng Webike — hệ thống thương mại điện tử xe máy / phụ tùng lớn của Nhật Bản. Làm việc trực tiếp với team Nhật Bản, đảm bảo chất lượng production và vận hành ổn định.",
    achievements: [
      "Xây dựng Tool PM — hệ thống quản lý sản phẩm đa quốc gia với batch command tự động chạy hằng ngày.",
      "Phát hành sản phẩm từ kho Nhật sang website các quốc gia khác (Trung Quốc, Thái Lan, Indonesia...).",
      "Triển khai MySQL Replication Master-Slave để sao lưu dự phòng.",
      "Đưa mọi tính năng lên production bằng Docker, đảm bảo môi trường nhất quán.",
      "Xây dựng Tool TM — quản lý dịch thuật Key-Value, tích hợp Google Translate API.",
    ],
    stack: ["Laravel", "Vue.js", "MySQL", "Docker", "Bash", "Google API"],
  },
  {
    id: "smart-digitech",
    role: "Backend Developer (Intern)",
    company: "Smart Digitech",
    period: "2023-10 — 2024-01",
    periodLabel: "4 tháng",
    type: "Intern",
    summary:
      "Thực tập phát triển website thương mại điện tử với Laravel + MySQL. Tham gia đầy đủ các giai đoạn từ thiết kế database, viết backend, làm front-end và tích hợp cổng thanh toán.",
    achievements: [
      "Thiết kế database MySQL cho website bán đồ uống và website bán thiệp cưới.",
      "Phát triển backend REST API với Laravel.",
      "Tham gia viết front-end bằng jQuery.",
      "Tích hợp API thanh toán MoMo cho đơn hàng.",
    ],
    stack: ["Laravel", "MySQL", "jQuery", "MoMo API"],
  },
];

export type EducationItem = {
  school: string;
  degree: string;
  period: string;
  gpa: string;
};

export const education: EducationItem = {
  school: "Trường Đại học Công nghệ Đồng Nai",
  degree: "Cử nhân Công nghệ Thông tin",
  period: "2019-08 — 2023-08",
  gpa: "3.24 / 4.0",
};

export type StatItem = { label: string; value: string; hint: string };

export const stats: StatItem[] = [
  { label: "Kinh nghiệm", value: "1+ năm", hint: "Backend development" },
  { label: "Dự án thực tế", value: "4+", hint: "Production-grade" },
  { label: "Sản phẩm quốc tế", value: "5+", hint: "Quốc gia triển khai" },
  { label: "GPA", value: "3.24", hint: "ĐH Công nghệ Đồng Nai" },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];
