# Thư mục dự án

```js
.
├── .nuxt/                # Tự động tạo khi chạy dev/build (chứa code biên dịch, không commit)
├── .output/              # Kết quả build cuối cùng (dùng để deploy)
│
├── app/                  # Entry chính của app (layouts, middleware, plugins)
	├── assets/           # Tài nguyên tĩnh cần build (CSS, SCSS, font, hình ảnh import trong code)
	├── components/       # Các Vue component tái sử dụng (Button.vue, Header.vue, ...)
		---| base/
		-----| foo/
		-------| MyButton.vue	# mặc định <BaseFooMyButton /> nếu defineNuxtConfig pathPrefix: false thì là <MyButton />
		---| global/
		-----| GlobalButton.vue	# với khai báo thư mục chứa global components trong defineNuxtConfig
		---| Comment.client.vue	# <Comment /> Sẽ chỉ render dưới máy khách
		---| HighlightedMarkdown.server.vue	# (thử nghiệm) <HighlightedMarkdown /> Render phía server. Phải là 1 single element. Phía server còn có island là component được hydrate hóa js để tương tác
		# Gọi <LazyMyButton /> cho lazy

	├── composables/      # Hàm composition API (useXyz) dùng lại trong nhiều nơi
	├── layouts/          # Khung layout chính (default.vue, admin.vue, ...)
	├── middleware/       # Middleware chạy trước khi vào page (auth, logging, ...)
	├── pages/            # Trang ứng dụng, auto tạo route (index.vue -> '/', about.vue -> '/about')
	├── plugins/          # Đăng ký plugin chạy trước khi render app (axios, pinia, i18n, ...)
	├── store/            # Đăng ký storage lưu trữ biến
	├── utils/            # Hàm tiện ích (helpers, formatters, validators, ...)
	│
	├── app.vue           # Component gốc của ứng dụng (root component)
	├── app.config.ts     # Config tùy chỉnh app (head, meta, theme, app-level settings)
	└── error.vue         # Trang lỗi mặc định (hiển thị khi có lỗi server/client)


├── content/              # Quản lý nội dung Markdown/JSON (dùng @nuxt/content)
├── modules/              # Module Nuxt tự viết hoặc thêm từ bên ngoài
├── node_modules/         # Thư viện cài bằng npm/pnpm/yarn
├── public/               # File tĩnh truy cập trực tiếp (ảnh, favicon, robots.txt)
├── server/               # API backend: routes, middleware, server functions
├── shared/               # Code dùng chung (utils, constants, helpers)
│
├── .env                  # Biến môi trường (API_KEY, DB_URL, ...)
├── .gitignore            # Quy định file/thư mục bỏ qua khi commit Git
├── .nuxtignore           # Quy định file/thư mục Nuxt bỏ qua khi build
├── .nuxtrc               # Cấu hình runtime bổ sung cho Nuxt (ít dùng)
├── nuxt.config.ts        # File cấu hình chính: plugin, route, meta, CSS, build
├── package.json          # Thông tin dự án + scripts (`dev`, `build`, `start`)
└── tsconfig.json         # Cấu hình TypeScript cho dự án

```
