// ===================================
// SPLASH & WELCOME SCREEN
// ===================================
document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("screenSplash");
  const welcome = document.getElementById("screenWelcome");
  const btn = document.getElementById("btnGetStarted");

  // Cek apakah elemen splash ada (hanya di index.html)
  if (splash && welcome && btn) {
    const DELAY = 1000;
    let moved = false;

    const goWelcome = () => {
      if (moved) return;
      moved = true;

      splash.classList.remove("is-active");
      splash.setAttribute("aria-hidden", "true");

      welcome.classList.add("is-active");
      welcome.setAttribute("aria-hidden", "false");
    };

    // Auto pindah setelah delay
    setTimeout(goWelcome, DELAY);

    // Optional: klik untuk skip
    splash.addEventListener("click", goWelcome);

    // Button Get Started
    btn.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }
});

// ===================================
// NOTIFICATION DROPDOWN
// ===================================
function toggleNotif() {
  const dropdown = document.getElementById("notifDropdown");
  if (dropdown) {
    dropdown.classList.toggle("show");
  }
}

// Tutup dropdown jika klik di luar
window.addEventListener("click", function (e) {
  const container = document.querySelector(".notif-container");
  const dropdown = document.getElementById("notifDropdown");

  if (container && dropdown && !container.contains(e.target)) {
    dropdown.classList.remove("show");
  }
});

// ===================================
// PASSWORD TOGGLE (LOGIN PAGE)
// ===================================
document.addEventListener("DOMContentLoaded", () => {
  let eyeicon = document.getElementById("eyeicon");
  let passwordInput = document.querySelector(".password-input");

  // Cek apakah elemen ada (hanya di login.html)
  if (eyeicon && passwordInput) {
    eyeicon.onclick = function () {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeicon.src = "./image/eye.png";
      } else {
        passwordInput.type = "password";
        eyeicon.src = "./image/hidden.png";
      }
    };
  }
});

// SIMPLE PRESENSI NAV FAB
document.addEventListener('DOMContentLoaded', function() {
    const navFabBtn = document.getElementById('navFabBtn');
    
    if (navFabBtn) {
        navFabBtn.addEventListener('click', function() {
            const presensiMasuk = localStorage.getItem('presensi_masuk');
            const presensiPulang = localStorage.getItem('presensi_pulang');
            
            if (!presensiMasuk) {
                // Belum masuk → ke masuk.html
                window.location.href = 'masuk.html';
            } else if (presensiMasuk && !presensiPulang) {
                // Sudah masuk, belum pulang → ke pulang.html
                window.location.href = 'pulang.html';
            } else {
                // Sudah masuk dan pulang
                alert('Presensi hari ini sudah selesai!');
            }
        });
    }
});