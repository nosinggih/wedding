// ========================
// GET NAMA TAMU DARI URL
// ========================
function getGuestName() {
    const params = new URLSearchParams(window.location.search);
    let name = params.get('to');

    if (!name) return "Tamu Undangan";

    name = decodeURIComponent(name);

    return name
        .toLowerCase()
        .replace(/\b\w/g, l => l.toUpperCase());
}

// ========================
// OPEN INVITATION
// ========================
function openInvitation() {
    window.scrollTo(0, 0);

    document.getElementById('cover').classList.add('hide');
    document.body.style.overflow = 'auto';
}

// ========================
// INIT
// ========================
window.onload = function () {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    const guestElement = document.getElementById("guest-name");
    if (guestElement) {
        guestElement.innerText = getGuestName();
    }
};