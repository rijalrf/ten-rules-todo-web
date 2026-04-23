# Dokumentasi Standar Pengembangan: Aplikasi Todo Web

Dokumentasi ini berfungsi sebagai panduan arsitektur dan standar teknis untuk pengembangan aplikasi React skala industri. Proyek ini mengintegrasikan keamanan tipe data, manajemen state tingkat lanjut, dan prinsip desain modular.

---

## 1. Arsitektur & Struktur Proyek (Separation of Concerns)

Penerapan prinsip _Separation of Concerns_ (SoC) dilakukan dengan memisahkan tanggung jawab antara antarmuka pengguna, logika bisnis, dan komunikasi data.

### 1.1. Detail Organisasi Direktori

- **`src/components/`**: Berisi komponen UI yang dibagi menjadi `common` (global), `domain` (fitur spesifik), dan `ui` (atomik).
- **`src/pages/`**: Tempat orkestrasi halaman utama yang terikat pada rute (URL).
- **`src/hooks/`**: Isolasi logika bisnis dan state management dalam bentuk Custom Hooks.
- **`src/services/`**: Layer abstraksi API untuk menangani semua request ke backend.
- **`src/types/`**: Definisi kontrak data (Interface/Type) untuk menjamin tipe data yang konsisten.

### 1.2. Use Case

Pemisahan ini memungkinkan developer untuk mengubah logika pengambilan data di `todoService.ts` tanpa harus menyentuh komponen visual di `ListPage.jsx`.

---

## 2. Keamanan Tipe Data (Type Safety)

Penggunaan TypeScript diwajibkan untuk menjamin integritas data di seluruh siklus hidup aplikasi, meminimalisir kesalahan saat _runtime_.

### 2.1. Manfaat Implementasi

- **Pencegahan Error**: Menghindari akses ke properti yang tidak ada (_undefined property_).
- **Produktivitas**: Menyediakan _auto-completion_ yang akurat saat penulisan kode.
- **Maintainability**: Mempermudah _refactoring_ kode dalam skala besar tanpa merusak fitur lain.

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

Proyek ini mengadopsi `@tanstack/react-query` sebagai standar pengelolaan data dari server, menggantikan pola `useEffect` manual yang cenderung rentan terhadap _race conditions_.

### 3.1. Detail Fitur

- **Caching**: Data disimpan secara lokal untuk mengurangi beban request berulang ke server.
- **Mutations**: Pengelolaan perubahan data (POST, PUT, DELETE) dengan sinkronisasi otomatis menggunakan `invalidateQueries`.
- **Loading/Error States**: Status aplikasi dikelola secara otomatis oleh library.

### 3.2. Contoh Implementasi (`src/hooks/useTodos.ts`)

```typescript
const { data: todos, isLoading } = useQuery<Todo[]>({
  queryKey: ["todos"],
  queryFn: getAllTodos,
});
```

---

## 4. Functional Components & Modern Hooks

Pengembangan dilakukan sepenuhnya menggunakan paradigma fungsional dengan dukungan fitur React 19 terbaru guna meningkatkan efisiensi dan kemudahan pengujian.

### 4.1. Penerapan Hooks

- **Custom Hooks**: Menggabungkan logika `useQuery` dan `useMutation` ke dalam satu hook `useTodos`.
- **Standard Hooks**: Penggunaan `useNavigate` untuk alur navigasi aplikasi yang mulus.

### 4.2. Use Case

Penggunaan `useTodos` di `ListPage.jsx` menyembunyikan kompleksitas manajemen state di balik antarmuka hook yang sederhana dan bersih.

---

## 5. Manajemen Props & Alur Data Satu Arah

Data dialirkan secara searah dari induk ke anak melalui _props_, menjamin prediktabilitas perubahan aplikasi dan mempermudah pelacakan bug.

### 5.1. Detail Teknis

- **Destructuring Props**: Wajib dilakukan pada level parameter fungsi untuk transparansi dependensi data.
- **Callback Functions**: Digunakan untuk mengirimkan aksi dari komponen anak kembali ke induk.

### 5.2. Contoh Implementasi (`src/components/TodoItem.jsx`)

```javascript
const TodoItem = ({ todo, onToggle, onDelete }) => {
  // 'todo' adalah data, 'onToggle' & 'onDelete' adalah aksi balik ke parent
};
```

---

## 6. Styling & UI Modular (Atomic Design)

Menggunakan pendekatan modular untuk komponen UI guna memastikan konsistensi desain dan kemudahan pemeliharaan antarmuka.

### 6.1. Komponen UI Atomik

- **Reusable UI**: Komponen dasar seperti tombol diisolasi dalam `src/components/ui/` agar dapat digunakan secara konsisten.
- **Framework CSS**: Menggunakan Bootstrap 5 untuk pondasi layout dan sistem grid yang responsif.

### 6.2. Contoh Implementasi (`src/components/ui/Button.jsx`)

Komponen `Button` menerima prop `variant` (primary, danger, success) untuk menyesuaikan gaya visual secara dinamis.

---

## 7. Abstraksi API & Service Layer

Seluruh detail teknis komunikasi HTTP diisolasi dalam folder `services/` untuk memisahkan logika bisnis dari tampilan antarmuka.

### 7.1. Detail Implementasi

- **Axios Interceptors**: Injeksi token keamanan (`Bearer Token`) otomatis pada setiap request ke API.
- **Base Configuration**: Pengaturan URL dasar yang terpusat untuk mempermudah transisi lingkungan.

### 7.2. Use Case (`src/services/api/api.js`)

Interceptor secara otomatis mengambil token dari `localStorage` dan melampirkannya pada header `Authorization`.

---

## 8. Penanganan Error (Double Try-Catch)

Sistem penanganan error dibagi menjadi dua lapisan untuk menjamin stabilitas teknis sekaligus memberikan pengalaman pengguna yang baik.

### 8.1. Lapisan 1: Service Level (Teknis)

Bertanggung jawab menangkap kegagalan jaringan atau respons status HTTP yang tidak valid dan mencatatnya ke log teknis.

### 8.2. Lapisan 2: UI Level (User Experience)

Bertanggung jawab menangkap error dari service dan menampilkannya kepada pengguna dalam bentuk pesan yang mudah dimengerti (misal: Alert).

### 8.3. Contoh Implementasi (`src/pages/ListPage.jsx`)

```javascript
{
  error && <div className="alert alert-danger">{error}</div>;
}
```

---

## 9. Automated Testing Infrastructure

Menyediakan infrastruktur pengujian otomatis untuk menjamin stabilitas fitur jangka panjang dan mencegah regresi kode.

### 9.1. Ekosistem Testing

- **Vitest**: Test runner modern yang sangat cepat dan terintegrasi penuh dengan ekosistem Vite.
- **React Testing Library**: Digunakan untuk menguji komponen berdasarkan interaksi nyata pengguna.

### 9.2. Standar

Logika bisnis kritikal (seperti perhitungan atau transformasi data) wajib memiliki unit test dengan cakupan minimal 80%.

---

## 10. Praktik Clean Code & Best Practices (SRP, DRY, KISS)

Menjaga kode tetap berkualitas tinggi, mudah dibaca, dan berkelanjutan seiring pertumbuhan proyek melalui prinsip rekayasa perangkat lunak standar.

### 10.1. Single Responsibility Principle (SRP)

Setiap modul, fungsi, atau komponen hanya boleh memiliki satu tanggung jawab spesifik.

- **Use Case:** Memisahkan fungsi format tanggal ke `src/utils/formatDate.ts`.

### 10.2. DRY (Don't Repeat Yourself) & KISS

- **DRY:** Menghindari duplikasi kode dengan mengabstraksi logika yang berulang ke dalam utilitas atau komponen atomik.
- **KISS:** Memilih solusi yang paling sederhana dan lugas tanpa optimasi prematur yang rumit.

### 10.3. Early Return & Guard Clauses

Segera keluar dari fungsi jika kondisi prasyarat tidak terpenuhi untuk menghindari struktur `if-else` yang mendalam.

```javascript
if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage message={error} />;
return <MainContent />;
```

### 10.4. Stable Identity Keys

Menggunakan ID unik database (bukan index array) pada operasi `.map()` untuk rekonsiliasi DOM yang efisien.

---

## 11. Perangkat Kerja & Toolkit (Tooling)

Ekosistem pengembangan yang mendukung produktivitas dan standarisasi kualitas kode secara otomatis.

### 11.1. Vite & TypeScript

- **Vite:** Build tool generasi berikutnya untuk pengalaman pengembangan yang instan.
- **TypeScript:** Menyediakan sistem pengetikan statis untuk mendeteksi bug lebih awal.

### 11.2. ESLint & Prettier

- **ESLint:** Menganalisis kode secara statis untuk menemukan pola yang bermasalah.
- **Prettier:** Secara otomatis memformat kode untuk menjaga konsistensi visual.

---

## 12. Panduan Setup Proyek (Getting Started)

Ikuti langkah-langkah berikut untuk menyiapkan lingkungan pengembangan di mesin lokal Anda.

### 12.1. Prasyarat (Prerequisites)

- **Node.js**: Versi LTS terbaru (minimal v18+).
- **NPM**: Pengelola paket standar Node.js.

### 12.2. Instalasi & Konfigurasi

1. **Clone Repositori:**

    ```bash
    git clone <url-repository>
    cd todo-web
    ```

2. **Instal Dependensi:**

    ```bash
    npm install
    ```

3. **Setup Environment:**
    Buat file `.env` di root proyek dan tentukan `VITE_API_BASE_URL`.

### 12.3. Operasional Pengembangan

- **Menjalankan Mode Dev:** `npm run dev` (Aplikasi berjalan di `http://localhost:5173`)
- **Build Produksi:** `npm run build`
- **Menjalankan Unit Test:** `npm run test`

---

Pastikan Anda menggunakan editor **VS Code** dengan ekstensi **ESLint** dan **Prettier** aktif untuk pengalaman pengembangan yang optimal sesuai standar proyek ini.
# ten-rules-todo-web
