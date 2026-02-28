// ==========================================
// 1. NAVIGATION & MENU
// ==========================================
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

// ==========================================
// 2. TYPING EFFECT
// ==========================================
const texts = ["Web Developer", "Content Creator", "Graphic Designer"];
const typingElement = document.getElementById("typing");

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isPaused = false;

// Pengaturan Kecepatan
const typingSpeed = 110;
const deletingSpeed = 60;
const pauseAfterTyping = 2000;
const pauseAfterDeleting = 500;

function typingEffect() {
  if (isPaused) return;

  const currentText = texts[textIndex];

  if (!isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex);
    charIndex++;

    if (charIndex > currentText.length) {
      isPaused = true;
      isDeleting = true;
      setTimeout(() => {
        isPaused = false;
        typingEffect();
      }, pauseAfterTyping);
      return;
    }
  } else {
    charIndex--;
    typingElement.textContent = currentText.substring(0, charIndex);

    if (charIndex === 0) {
      isPaused = true;
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(() => {
        isPaused = false;
        typingEffect();
      }, pauseAfterDeleting);
      return;
    }
  }

  const speed = isDeleting ? deletingSpeed : typingSpeed;
  setTimeout(typingEffect, speed);
}

typingEffect();

// ==========================================
// 3. EMAIL JS
// ==========================================
(function () {
  emailjs.init("2IfOZmzv2_G0TiZWc");
})();

const contactForm = document.getElementById("contact-form");

if (contactForm) {
  const submitBtn = contactForm.querySelector('input[type="submit"]');

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    submitBtn.value = "Mengirim...";
    submitBtn.disabled = true;

    emailjs.sendForm("service_5jv999v", "template_iqjhgsc", this)
      .then(function () {
        alert("Pesan berhasil dikirim ✅");
        contactForm.reset();
        submitBtn.value = "Send Message";
        submitBtn.disabled = false;
      }, function (error) {
        alert("Gagal mengirim ❌");
        console.log(error);
        submitBtn.value = "Send Message";
        submitBtn.disabled = false;
      });
  });
}

// ==========================================
// 4. SIDEBAR CONTACT PANEL
// ==========================================
window.addEventListener("DOMContentLoaded", () => {
  const contactBtn = document.querySelector(".gradient-btn");
  const panel = document.getElementById("contactPanel");
  const closePanel = document.getElementById("closePanel");

  if (contactBtn && panel) {
    contactBtn.addEventListener("click", () => {
      panel.classList.add("active");
    });
  }

  if (closePanel) {
    closePanel.addEventListener("click", () => {
      panel.classList.remove("active");
    });
  }
});

// ==========================================
// 5. SCROLL REVEAL
// ==========================================
ScrollReveal({
  distance: '60px',
  duration: 1200,
  delay: 200,
  reset: true
});

ScrollReveal().reveal('.home-content', { origin: 'left' });
ScrollReveal().reveal('.home-img', { origin: 'right' });
ScrollReveal().reveal('.service-box', { origin: 'bottom', interval: 200 });
ScrollReveal().reveal('.project-card', { origin: 'bottom', interval: 200 });
ScrollReveal().reveal('.about-img', { origin: 'left' });
ScrollReveal().reveal('.about-content', { origin: 'right' });

// ==========================================
// 6. LOADING SCREEN (PERBAIKAN UTAMA)
// ==========================================

// --- HAPUS BAGIAN SESSION STORAGE CHECK DI SINI (YANG LAMA) ---
// Biarkan hanya bagian window.addEventListener di bawah ini.

window.addEventListener('load', function() {
  const loadingScreen = document.getElementById('loadingScreen');
  
  // Cek apakah ini pertama kali加载 (menggunakan sessionStorage)
  if (!sessionStorage.getItem('siteLoadedOnce')) {
    
    // PERTAMA KALI: Jalankan animasi loading
    
    // Tandai sudah dimuat agar下次 refresh cepat (tidak loading lama)
    sessionStorage.setItem('siteLoadedOnce', 'true');

    // ===== UBAH ANGKA 2500 (MS) DI BAWAH INI =====
    // 1000 = 1 detik, 2500 = 2.5 detik, 5000 = 5 detik
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      
      // Opsional: hapus elemen setelah transisi fade out selesai (misal 1 detik)
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 1000); // Ini wajib disesuaikan dengan CSS transition jika ada
      
    }, 2500); 
    // =================================================

  } else {
    // BUKAN PERTAMA KALI (Reload/Halaman sudah dibuka sebelumnya):
    // Langsung sembunyikan tanpa jeda (opsional)
    loadingScreen.classList.add('hidden');
    loadingScreen.style.display = 'none';
  }
});