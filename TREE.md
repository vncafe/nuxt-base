```
.
├── .nuxt/                # Tự động tạo khi chạy dev/build (chứa code biên dịch, không commit)
├── .output/              # Kết quả build cuối cùng (dùng để deploy)
│
├── app/                  # Entry chính của app (layouts, middleware, plugins)
	├── assets/           # Tài nguyên tĩnh cần build (CSS, SCSS, font, hình ảnh import trong code)
	├── components/       # Các Vue components của ứng dụng (UI, layout, feature...). Chủ yếu chứa UI logic, tránh đặt business logic.. Bao gồm reusable components và feature components
		---| base/			# atomic/base components (Button, Input, Icon...). Không chứa business logic
		-----| foo/
		-------| MyButton.vue	# mặc định <BaseFooMyButton /> nếu defineNuxtConfig pathPrefix: false thì là <MyButton />
		---| global/
		-----| GlobalButton.vue	# với khai báo thư mục chứa global components trong defineNuxtConfig
		---| Comment.client.vue	# <Comment /> Sẽ chỉ render dưới máy khách
		---| HighlightedMarkdown.server.vue	# (thử nghiệm) <HighlightedMarkdown /> Render phía server. Phải là 1 single element. Có thể dùng server components hoặc island components để hydrate JS khi cần tương tác
		# Gọi <LazyMyButton /> cho lazy

	├── composables/      # Composition API logic (useXyz). Chứa reactive logic dùng lại trong nhiều nơi
	├── constants/      	# Lưu các hằng số
	├── layouts/          # Khung layout chính (default.vue, admin.vue, ...)
	├── middleware/       # Middleware chạy trước khi vào page (auth, logging, ...)
	├── pages/            # Trang ứng dụng, auto tạo route (index.vue -> '/', about.vue -> '/about')
	├── plugins/          # Inject global functionality vào Nuxt app (axios, pinia, i18n...)
	├── services/         # API/IO layer. Quản lý gọi API theo từng domain/service (user, auth, product...). Không chứa reactive state. Có thể được sử dụng bởi composables, stores hoặc server logic
	├── stores/           # Pinia stores (global reactive state)
	├── utils/            # Pure functions không phụ thuộc Vue/Nuxt (formatters, validators, helpers...)
	│
	├── app.vue           # Component gốc của ứng dụng (root component)
	├── app.config.ts     # Config tùy chỉnh app (head, meta, theme, app-level settings)
	└── error.vue         # Trang lỗi mặc định (hiển thị khi có lỗi server/client)


├── content/              # Quản lý nội dung Markdown/JSON (dùng @nuxt/content)
├── modules/              # Nuxt modules (local modules hoặc modules phát triển riêng)
├── node_modules/         # Thư viện cài bằng npm/pnpm/yarn
├── public/               # File tĩnh truy cập trực tiếp (ảnh, favicon, robots.txt)
├── server/               # Nitro server runtime (API routes, middleware, server utilities) của Nuxt
├── shared/               # Code dùng chung giữa client (app/) và server/ (types, constants, helpers...)
│
├── .env                  # Biến môi trường (API_KEY, DB_URL, ...)
├── .gitignore            # Quy định file/thư mục bỏ qua khi commit Git
├── .nuxtignore           # Quy định file/thư mục Nuxt bỏ qua khi build
├── .nuxtrc               # Cấu hình runtime bổ sung cho Nuxt (ít dùng)
├── nuxt.config.ts        # File cấu hình chính: plugin, route, meta, CSS, build
├── package.json          # Thông tin dự án + scripts (`dev`, `build`, `start`)
└── tsconfig.json         # Cấu hình TypeScript cho dự án

```

Dependency Flow:

```
components
   ↓        ↘
composables   stores
   ↓           ↓
   └────────→ services
                   ↓
               server/api/*
                   ↓
               database / external APIs
---
Rules:
- Tầng thấp hơn không import tầng cao hơn
- utils → không phụ thuộc Vue/Nuxt
- services → chỉ xử lý API / external IO
- composables → xử lý reactive logic
- stores → global state
- components → UI
- components không gọi API trực tiếp
```

Example usage flow:

```
Page
 ↓
Component
 ↓
Composable
 ↓
Service
 ↓
API
```

Naming convention

```
| Loại        | Convention          |
| ----------- | ------------------- |
| Folder      | `kebab-case`        |
| Components  | `PascalCase.vue`    |
| Pages       | `kebab-case.vue`    |
| Composables | `useCamelCase.ts`   |
| Utils       | `camelCase.ts`      |
| Stores      | `camelCaseStore.ts` |
| Plugins     | `kebab-case.ts`     |
| Middleware  | `kebab-case.ts`     |
| Layouts     | `kebab-case.ts`     |

```
