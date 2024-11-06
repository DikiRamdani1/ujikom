import { getServerSession } from "next-auth"
import getData from "@/lib/api-libs/api"
import UserLayout from "@/app/layout/userLayout"

const Page = async () => {
    const session = await getServerSession()
    const user = await getData("/user", `?email=${session.user.email}`)


    return (
        <UserLayout currentUser={user} >
            <div className="p-6 w-full mt-5 text-opacity-90">
                <h1 className="text-4xl font-bold mb-6">Tentang Sistem Peminjaman Parka</h1>

                <p className="mb-4 text-lg">
                    Selamat datang di sistem peminjaman barang di sekolah kami! Sistem ini dirancang untuk memudahkan siswa dan guru
                    dalam meminjam berbagai barang yang diperlukan untuk kegiatan belajar mengajar, termasuk buku, alat tulis,
                    dan peralatan lainnya.
                </p>

                <h2 className="text-3xl font-semibold mt-6 mb-4">Tujuan Sistem Peminjaman</h2>
                <p className="mb-4 text-lg">Tujuan utama dari sistem peminjaman barang ini adalah untuk:</p>
                <ul className="list-disc list-inside mb-4 text-lg">
                    <li>Mempermudah akses siswa dan guru terhadap barang yang dibutuhkan.</li>
                    <li>Mengelola peminjaman barang dengan lebih efisien dan terorganisir.</li>
                    <li>Meningkatkan tanggung jawab pengguna dalam merawat dan mengembalikan barang yang dipinjam.</li>
                    <li>Menjamin bahwa semua barang yang dipinjam tersedia dan terjaga kondisinya.</li>
                </ul>

                <h2 className="text-3xl font-semibold mt-6 mb-4">Proses Peminjaman</h2>
                <p className="mb-4 text-lg">Proses peminjaman barang terdiri dari beberapa langkah berikut:</p>
                <ol className="list-decimal list-inside mb-4 text-lg">
                    <li>Pendaftaran pengguna (siswa/yang ingin meminjam barang) melalui formulir online.</li>
                    <li>Memilih barang yang ingin dipinjam melalui katalog yang tersedia di platform.</li>
                    <li>Melakukan konfirmasi peminjaman secara langsung dengan petugas di sekolah.</li>
                    <li>Pengambilan barang yang telah disetujui oleh petugas.</li>
                    <li>Mengembalikan barang setelah masa peminjaman berakhir di lokasi yang ditentukan.</li>
                </ol>

                <h2 className="text-3xl font-semibold mt-6 mb-4">Peraturan Peminjaman</h2>
                <p className="mb-4 text-lg">Kami menerapkan beberapa peraturan untuk menjaga keadilan dan keteraturan dalam sistem peminjaman:</p>
                <ul className="list-disc list-inside mb-4 text-lg">
                    <li>Barang yang dipinjam harus dirawat dengan baik dan dikembalikan tepat waktu.</li>
                    <li>Pengguna yang terlambat mengembalikan barang akan dikenakan sanksi tertentu.</li>
                    <li>Barang yang hilang atau rusak harus diganti sesuai dengan nilai barang tersebut.</li>
                    <li>Setiap pengguna hanya diperbolehkan meminjam maksimal 3 barang dalam satu waktu.</li>
                    <li>Peminjaman hanya diperbolehkan untuk barang yang tercantum dalam katalog peminjaman.</li>
                </ul>

                <h2 className="text-3xl font-semibold mt-6 mb-4">Keuntungan Menggunakan Sistem Ini</h2>
                <p className="mb-4 text-lg">
                    Menggunakan sistem peminjaman barang ini memberikan banyak keuntungan, antara lain:
                </p>
                <ul className="list-disc list-inside mb-4 text-lg">
                    <li>Peningkatan efisiensi dalam proses peminjaman dan pengembalian barang.</li>
                    <li>Peningkatan transparansi dalam pengelolaan barang sekolah.</li>
                    <li>Mempermudah siswa dan guru untuk menemukan barang yang mereka butuhkan.</li>
                    <li>Memberikan pengalaman belajar yang lebih baik melalui akses terhadap berbagai sumber daya.</li>
                </ul>

                <h2 className="text-3xl font-semibold mt-6 mb-4">Kontak Kami</h2>
                <p className="mb-4 text-lg">
                    Jika Anda memiliki pertanyaan atau masukan tentang sistem peminjaman barang ini, silakan hubungi kami melalui
                    email di <a href="mailto:parabotEka@gmail.com" className="text-blue-500">parabotEka@gmail.com</a>.
                </p>
                <p className="text-lg">Terima kasih telah menggunakan sistem peminjaman barang di sekolah kami!</p>
            </div>
        </UserLayout>
    )
}

export default Page