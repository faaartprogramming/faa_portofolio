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
// 3. EMAIL JS + ANTI SPAM PROTECTION
// ==========================================
(function () {
  emailjs.init("2IfOZmzv2_G0TiZWc");
})();

const contactForm = document.getElementById("contact-form");

if (contactForm) {
  const submitBtn = contactForm.querySelector('input[type="submit"]');

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    
    // ===============================
// COOLDOWN PROTECTION
// ===============================
const cooldownTime = 30000; // 30 detik
const lastSent = sessionStorage.getItem("lastMessageTime");

if (lastSent && Date.now() - lastSent < cooldownTime) {
  const remaining = Math.ceil((cooldownTime - (Date.now() - lastSent)) / 1000);
  alert("Tunggu " + remaining + " detik sebelum mengirim pesan lagi.");
  return;
}

// ===============================
// MAX MESSAGE PER SESSION
// ===============================
const maxMessages = 3;
let messageCount = parseInt(sessionStorage.getItem("messageCount")) || 0;

if (messageCount >= maxMessages) {
  alert("Batas pesan tercapai. Silakan refresh halaman untuk mengirim lagi.");
  return;
}

    // ===============================
    // 1. HONEYPOT CHECK
    // ===============================
    const honeypot = document.getElementById("website");
    if (honeypot && honeypot.value !== "") {
      console.log("Bot detected (honeypot)");
      return;
    }

    // ===============================
    // 2. MESSAGE LENGTH VALIDATION
    // ===============================
    const messageField = document.getElementById("message");

    if (messageField) {
      const message = messageField.value.trim();

      if (message.length < 10) {
        alert("Pesan terlalu pendek (minimal 10 karakter)");
        return;
      }

      if (message.length > 500) {
        alert("Pesan terlalu panjang (maksimal 500 karakter)");
        return;
      }
    }

    // ===============================
    // 3. RECAPTCHA VALIDATION
    // ===============================
    const recaptcha = grecaptcha.getResponse();

    if (recaptcha.length === 0) {
      alert("Silakan verifikasi reCAPTCHA terlebih dahulu");
      return;
    }

    // ===============================
    // 4. KIRIM EMAIL
    // ===============================
    submitBtn.value = "Mengirim...";
    submitBtn.disabled = true;

    emailjs.sendForm("service_5jv999v", "template_iqjhgsc", this)
      .then(function () {
        alert("Pesan berhasil dikirim ✅");

// simpan waktu kirim
sessionStorage.setItem("lastMessageTime", Date.now());

// tambah jumlah pesan
let count = sessionStorage.getItem("messageCount") || 0;
sessionStorage.setItem("messageCount", parseInt(count) + 1);

        contactForm.reset();
        grecaptcha.reset();

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
  reset: false
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
      
    }, 1150); 
    // =================================================

  } else {
    // BUKAN PERTAMA KALI (Reload/Halaman sudah dibuka sebelumnya):
    // Langsung sembunyikan tanpa jeda (opsional)
    loadingScreen.classList.add('hidden');
    loadingScreen.style.display = 'none';
  }
});