# Dokumentasi Standar Pengembangan: Aplikasi Todo Web

Dokumentasi ini berfungsi sebagai panduan arsitektur dan standar teknis untuk pengembangan aplikasi React skala industri. Proyek ini mengintegrasikan keamanan tipe data, manajemen state tingkat lanjut, dan prinsip desain modular yang bersih.

---

## 1. Arsitektur & Struktur Proyek (Separation of Concerns)

Penerapan prinsip _Separation of Concerns_ (SoC) dilakukan dengan memisahkan tanggung jawab secara ketat guna meningkatkan skalabilitas tim dan kode.

### 1.1. Detail Organisasi Direktori

- **`src/components/`**: Komponen UI yang dibagi menjadi `domain` (fitur spesifik) dan `ui` (atomik/reusable).
- **`src/pages/`**: Komponen halaman utama yang terikat pada rute (URL).
- **`src/hooks/`**: Isolasi logika bisnis dan state management (Custom Hooks).
- **`src/services/`**: Layer abstraksi komunikasi API (Axios Client & Services).
- **`src/templates/`**: Layout besar atau boilerplate halaman (e.g., `MainLayout`).
- **`src/themes/`**: Konfigurasi tema sentral (Warna, Tipografi).
- **`src/types/`**: Definisi kontrak data (Interface/Type TypeScript).
- **`src/validators/`**: Skema validasi input untuk formulir.

### 1.2. Use Case

Pemisahan ini memungkinkan developer untuk mengubah skema validasi di `authValidator.ts` tanpa harus memodifikasi logika render di `LoginPage.tsx`.

---

## 2. Keamanan Tipe Data (Type Safety)

Penggunaan TypeScript diwajibkan untuk menjamin integritas data dan meminimalisir kesalahan saat _runtime_.

### 2.1. Manfaat Implementasi

- **Pencegahan Error**: Menghindari akses ke properti yang tidak ada (_undefined property_).
- **Produktivitas**: Menyediakan _auto-completion_ yang akurat melalui alias `@src/`.
- **Maintainability**: Mempermudah _refactoring_ kode melalui sistem pengetikan statis.

### 2.2. Contoh Implementasi (`src/types/todo.ts`)

```typescript
export interface Todo {
  id: number;
  title: string;
  description: string;
  is_completed: boolean;
  created_at: string;
}
```

---

## 3. Advanced Server-State Management (TanStack Query)

Proyek ini mengadopsi `@tanstack/react-query` untuk pengelolaan data dari server secara efisien.

### 3.1. Detail Fitur

- **Caching & Revalidation**: Mengurangi request berulang ke server.
- **Mutations**: Pengelolaan perubahan data dengan sinkronisasi otomatis menggunakan `invalidateQueries`.
- **Modern State**: Menangani status `loading`, `error`, dan `data` secara deklaratif.

### 3.2. Contoh Implementasi (`src/hooks/useTodos.ts`)

```typescript
const { data: todos, isLoading } = useQuery<Todo[]>({
  queryKey: ["todos"],
  queryFn: getAllTodos,
});
```

---

## 4. Functional Components & Modern Hooks

Pengembangan dilakukan sepenuhnya menggunakan paradigma fungsional dengan dukungan fitur React 19.

### 4.1. Penerapan Hooks

- **Custom Hooks**: Menggabungkan logika data ke dalam hook `useTodos`.
- **Standard Hooks**: Penggunaan `useNavigate` dan `useLocation` untuk alur navigasi yang dinamis.

### 4.2. Use Case

Komponen `ListPage.tsx` hanya bertugas merender data, sementara seluruh logika fetching dan manipulasi data disembunyikan di dalam `useTodos.ts`.

---

## 5. Manajemen Props & Alur Data Satu Arah

Data dialirkan secara searah dari induk ke anak melalui _props_ untuk menjamin prediktabilitas aplikasi.

### 5.1. Detail Teknis

- **Destructuring Props**: Wajib dilakukan pada level parameter fungsi.
- **Callback Functions**: Digunakan untuk mengirimkan aksi dari komponen anak kembali ke induk.

### 5.2. Contoh Implementasi (`src/components/TodoItem.tsx`)

```typescript
const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  // todo = data, onToggle/onDelete = callback ke parent
};
```

---

## 6. Styling & UI Modular (Tailwind CSS v4)

Mengadopsi **Modern Minimalist Design** menggunakan Tailwind CSS v4 untuk antarmuka yang bersih dan ringan.

### 6.1. Konsep Desain

- **Clean & Simple**: Penggunaan _whitespace_ yang lega dan tipografi Slate/Indigo.
- **Glassmorphism**: Implementasi efek blur pada Navbar (`bg-white/80 backdrop-blur-md`).
- **Micro-interactions**: Menambahkan animasi transisi halus (`animate-in`) dan efek klik (`active:scale-95`).

### 6.2. Contoh Implementasi (`src/components/ui/Button.tsx`)

Komponen `Button` menggunakan sistem variant (primary, ghost, danger) yang dibangun di atas utilitas Tailwind untuk konsistensi visual.

---

## 7. Abstraksi API & Service Layer

Seluruh detail teknis komunikasi HTTP diisolasi dalam folder `services/`.

### 7.1. Detail Implementasi

- **Axios Interceptors**: Penanganan token keamanan secara otomatis pada setiap request.
- **Path Aliasing**: Menggunakan alias `@src/services/` untuk menjaga kode tetap bersih.

### 7.2. Use Case (`src/services/apiClient.ts`)

Interceptor secara otomatis mengambil token dari `localStorage` dan menyuntikkannya ke header `Authorization` sebelum request dikirim.

---

## 8. Penanganan Error (Double Try-Catch)

Sistem penanganan error berlapis untuk menjaga stabilitas teknis dan pengalaman pengguna.

### 8.1. Lapisan 1: Service Level

Bertanggung jawab menangkap kegagalan jaringan dan mencatatnya ke log teknis.

### 8.2. Lapisan 2: UI Level

Menangkap error dari service dan menyajikannya ke pengguna dalam bentuk alert yang informatif dan estetis.

### 8.3. Contoh Implementasi (`src/pages/ListPage.tsx`)

```javascript
{
  error && (
    <div className="bg-rose-50 text-rose-600 p-4 rounded-2xl">{error}</div>
  );
}
```

---

## 9. Automated Testing Infrastructure

Menyediakan infrastruktur pengujian otomatis menggunakan **Vitest** dan **React Testing Library**.

### 9.1. Standar Pengujian

- Unit Test untuk logika bisnis (Hooks & Utils).
- Integration Test untuk alur pengguna kritikal (Login & CRUD).

### 9.2. Standar

Logika bisnis kritikal wajib memiliki cakupan tes minimal 80% untuk mencegah regresi kode.

---

## 10. Praktik Clean Code & Best Practices (SRP, DRY, KISS)

Menjaga kode tetap berkualitas tinggi melalui prinsip rekayasa perangkat lunak standar.

### 10.1. Prinsip Utama

- **SRP (Single Responsibility)**: Memisahkan utilitas tanggal ke `formatDate.ts`.
- **DRY (Don't Repeat Yourself)**: Menggunakan komponen UI atomik di `src/components/ui/`.
- **Early Return**: Segera keluar dari fungsi render jika kondisi pengecualian (seperti loading) terpenuhi.

### 10.2. Path Alias Configuration

Menggunakan `@src/*` untuk menghindari "Relative Path Hell" (`../../../`).

### 10.3. Konvensi Penamaan (Naming Convention)

- **PascalCase (Huruf Awal Besar):** Wajib digunakan untuk file Komponen, file Halaman, dan nama Fungsi Komponen (e.g., `TodoItem.tsx`, `ListPage.tsx`).
- **camelCase (Huruf Awal Kecil):** Digunakan untuk nama fungsi bisnis, variabel, Custom Hooks, dan file non-render (e.g., `useTodos.ts`, `apiClient.ts`, `formatDate.ts`).

### 10.4. Key Identitas yang Stabil

Selalu menggunakan ID unik database (bukan index array) pada operasi `.map()` untuk memastikan rekonsiliasi DOM yang efisien dan mencegah bug render.

---

## 11. Perangkat Kerja & Toolkit (Tooling)

Ekosistem pengembangan modern untuk produktivitas maksimal.

### 11.1. Vite & Biome

- **Vite**: Alat pembangun super cepat dengan HMR instan.
- **Biome**: Solusi tunggal yang sangat cepat untuk linting dan formatting kode.

### 11.2. Tailwind CSS & PostCSS

Menggunakan mesin JIT (Just-In-Time) Tailwind untuk performa CSS yang optimal.

---

## 12. Panduan Inisialisasi Proyek Baru (New Project Setup)

Langkah-langkah untuk membangun proyek dengan standar ini dari awal.

### 12.1. Inisialisasi Vite & TypeScript

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
```

### 12.2. Instalasi Dependensi Industri

```bash
# UI & Styling
npm install tailwindcss @tailwindcss/postcss postcss autoprefixer
npm install lucide-react # (Opsional untuk icon)

# Networking & Logic
npm install axios react-router-dom @tanstack/react-query

# Testing (Dev)
npm install vitest @testing-library/react jsdom --save-dev
```

### 12.3. Konfigurasi Struktur Folder

```bash
mkdir -p src/{components/{ui,domain},hooks,pages,services,templates,themes,types,utils,validators}
```

### 12.4. Konfigurasi Path Alias (@src)

Untuk menghindari "Relative Path Hell", lakukan konfigurasi alias pada proyek baru:

1. **`tsconfig.json`**: Tambahkan di dalam `compilerOptions`:

   ```json
   "paths": { "@src/*": ["./src/*"] }
   ```

2. **`vite.config.ts`**: Tambahkan konfigurasi alias:

   ```typescript
   resolve: {
     alias: { "@src": fileURLToPath(new URL("./src", import.meta.url)) }
   }
   ```

### 12.5. Operasional Pengembangan

- **Mode Dev:** `npm run dev`
- **Build Produksi:** `npm run build`
- **Unit Test:** `npm run test`

---

Pastikan Anda menggunakan editor **VS Code** dengan ekstensi **ESLint**, **Prettier**, dan **Tailwind CSS IntelliSense** untuk pengalaman pengembangan yang optimal sesuai standar proyek ini.
