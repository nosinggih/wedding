// Personalisasi Nama Tamu (Berjalan Otomatis Saat Halaman Dimuat)
document.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var guestName = urlParams.get('to');
    var guestNameElement = document.getElementById('guest-name');

    // Ubah teks jika parameter ?to= tersedia
    if (guestName && guestName.trim() !== '') {
        guestNameElement.innerText = guestName;
    }

    // Pastikan halaman tidak bisa di-scroll saat cover aktif
    document.body.style.overflow = 'hidden';
});

// Logika Buka Undangan (Dipanggil via atribut onclick pada tombol di index.html)
function openInvitation() {
    // Di index.html, ID covernya adalah "cover", bukan "cover-screen"
    var coverScreen = document.getElementById('cover');
    
    // Jalankan animasi CSS (menambahkan class 'hide' sesuai deklarasi di style.css)
    coverScreen.classList.add('hide');

    // Kembalikan scroll pada halaman utama ke atas
    window.scrollTo(0, 0);
    document.body.style.overflow = '';

    // Hilangkan elemen dari aliran dokumen setelah animasi CSS selesai
    // Catatan: Durasi transisi di style.css adalah 1.2s (1200ms)
    setTimeout(function () {
        coverScreen.style.display = 'none';
    }, 1200);
}