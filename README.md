# EmployeeHub — Employee Management

Mini backoffice aplikasi manajemen karyawan yang dibangun dengan **Angular 21** (standalone components) dan **Angular Material**.

## Fitur

- **Login** — autentikasi fungsional dengan kredensial hardcode, auth guard, dan sesi kedaluwarsa 1 jam.
- **Employee List** — 100 dummy data dengan paging, sorting, pencarian 2 parameter (username & email, rule AND), pilihan jumlah baris per halaman (5/10/25/50), serta aksi edit (notifikasi kuning) dan delete (notifikasi merah).
- **Add Employee** — seluruh field mandatory, datetime picker birthDate (maksimal hari ini), validasi format email, basic salary angka, dropdown group dengan search textbox (10 group), tombol Save & Cancel.
- **Employee Detail** — data terformat (basic salary `Rp. xx.xxx,xx`, tanggal lokal), tombol `ok` kembali ke list tanpa menghilangkan filter pencarian sebelumnya.
- **Clear Filters** — tombol untuk reset filter Username & Email ke kondisi awal, langsung kembali ke 100 data + kembali ke halaman 1.
- **Login UX** — password dengan tombol show/hide (icon mata), label mandatory `*` untuk Username & Password, dan 1 tombol Logout di sidebar.
- Responsive web design (desktop & mobile).

## Environment

| Kebutuhan   | Versi                                                                 |
| ----------- | --------------------------------------------------------------------- |
| Node.js     | `^20.19.0` \| `^22.12.0` \| `>=24.0.0` (requirement Angular 21)       |
| npm         | >= 10                                                                 |
| Angular CLI | 21 (sudah tersedia sebagai devDependency, tidak perlu install global) |

## Cara Menjalankan

```bash
# 1. Install dependencies
npm install

# 2. Jalankan development server
npm start
```

Buka browser ke `http://localhost:4200/`.

### Kredensial Login

| Username | Password   |
| -------- | ---------- |
| `admin`  | `admin123` |

## Build Production

```bash
npm run build
```

Artifact tersimpan di folder `dist/employee-management/`. Proyek ini dikonfigurasi dengan SSR; untuk menjalankan hasil build:

```bash
npm run serve:ssr:employee-management
```

## Unit Test

```bash
npm test
```

## Struktur Kode

```
src/app/
├── constants/    # konstanta (group, status, paging, routes)
├── guards/       # auth guard
├── layouts/      # dashboard shell, sidebar, topbar
├── models/       # interface Employee
├── pages/        # login, employee-list, add-employee, edit-employee, employee-detail
├── services/     # auth & employee (in-memory data store)
├── shared/       # OnlyNumberDirective (blokir input `e` di Basic Salary), LucideIcon
├── utils/        # filter storage, toast helper, group filter
└── validators/   # custom validator form employee
```
