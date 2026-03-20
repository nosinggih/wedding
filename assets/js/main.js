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

    // 1. SETUP KELAS INISIAL ANIMASI (.is-hidden)
    // Menjamin Progressive Enhancement (jika JS mati, konten tetap tampil statis)
    var animElements = document.querySelectorAll('.scroll-zoom, .scroll-slide-left, .scroll-slide-right, .scroll-fade-up, .scroll-decor, .hero-fade-up, .hero-frame-anim');
    animElements.forEach(function (el) {
        el.classList.add('is-hidden');
    });

    // 2. SETUP INTERSECTION OBSERVER
    var observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    var scrollObserver = new IntersectionObserver(function(entries, observerRef) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.remove('is-hidden');
                observerRef.unobserve(entry.target);
            }
        });
    }, observerOptions);

    var scrollEls = document.querySelectorAll('.scroll-zoom, .scroll-slide-left, .scroll-slide-right, .scroll-fade-up, .scroll-decor');
    scrollEls.forEach(function(el) {
        scrollObserver.observe(el);
    });
});

document.addEventListener("visibilitychange", function () {
    var bgm = document.getElementById("bg-music");

    if (!bgm) return;

    if (document.hidden) {
        // ⛔ user pindah tab / minimize → pause
        bgm.pause();
    } else {
        // ▶️ user balik lagi → lanjut play
        bgm.play().catch(function () {
            console.log("Autoplay diblok saat kembali");
        });
    }
});

function openInvitation() {
    var coverScreen = document.getElementById('cover');

    // ambil audio
    var sfx = document.getElementById('sfx-open');
    var bgm = document.getElementById('bg-music');

    // animasi cover
    coverScreen.classList.add('hide');

    // reset scroll
    window.scrollTo(0, 0);
    document.body.style.overflow = '';

    // 🔊 1. play SFX (sekali)
    if (sfx) {
        sfx.currentTime = 0;
        sfx.play().catch(function () {
            console.log("SFX gagal diputar");
        });
    }

    // 🎵 2. delay 2 detik → play BGM (loop + fade in)
    setTimeout(function () {
        if (bgm) {
            bgm.currentTime = 0;
            fadeInAudio(bgm, 2000); // fade in 2 detik
        }
    }, 2000);

    // hide cover setelah animasi selesai (1.2s sesuai CSS kamu)
    setTimeout(function () {
        coverScreen.style.display = 'none';

        // 💫 3. TRIGGER HERO ANIMASI BERHARMONI (BINGKAI & KONTEN TEKS)
        var staggerOpts = [
            { sel: '.hero-frame-anim', delay: 100 }, // Bingkai scale-in duluan sedikit
            { sel: '.hero-fade-up', delay: 350 }     // Disusul teks konten lift-up
        ];
        staggerOpts.forEach(function (opt) {
            setTimeout(function () {
                var els = document.querySelectorAll(opt.sel);
                els.forEach(function(el) { el.classList.remove('is-hidden'); });
            }, opt.delay);
        });

    }, 1200);
}

/* === Fade In Audio (biar smooth, tidak “njeblak”) === */
function fadeInAudio(audio, duration) {
    audio.volume = 0;
    audio.play().catch(function () {
        console.log("BGM gagal diputar");
    });

    var step = 0.05;
    var interval = duration * step;

    var fade = setInterval(function () {
        if (audio.volume < 1) {
            audio.volume = Math.min(audio.volume + step, 1);
        } else {
            clearInterval(fade);
        }
    }, interval);
}