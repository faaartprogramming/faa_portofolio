// ======================================
// 1. NAVIGATION & MENU TOGGLE
// ======================================
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
  menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
  });
}

// ======================================
// 2. TYPING EFFECT
// ======================================
const texts = ["Web Developer", "Content Creator", "Graphic Designer", "Student"];
const typingElement = document.getElementById("typing");

if (typingElement) {
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

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
}

// ======================================
// 3. EMAILJS INTEGRATION + ANTI-SPAM
// ======================================
(function() {
  emailjs.init("2IfOZmzv2_G0TiZWc");
})();

const contactForm = document.getElementById("contact-form");

if (contactForm) {
  const submitBtn = contactForm.querySelector('input[type="submit"]');

  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    // Cooldown Protection
    const cooldownTime = 30000; // 30 detik
    const lastSent = sessionStorage.getItem("lastMessageTime");
    if (lastSent && Date.now() - lastSent < cooldownTime) {
      const remaining = Math.ceil((cooldownTime - (Date.now() - lastSent)) / 1000);
      alert(`Tunggu ${remaining} detik sebelum mengirim pesan lagi.`);
      return;
    }

    // Max Messages per Session
    const maxMessages = 3;
    let messageCount = parseInt(sessionStorage.getItem("messageCount")) || 0;
    if (messageCount >= maxMessages) {
      alert("Batas pesan tercapai. Silakan refresh halaman untuk mengirim lagi.");
      return;
    }

    // Honeypot Check
    const honeypot = document.getElementById("phone_secondary");
    if (honeypot && honeypot.value !== "") {
      console.log("Bot detected (honeypot)");
      return;
    }

    // Message Length Validation
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

    // reCAPTCHA Validation
    const recaptcha = grecaptcha.getResponse();
    if (recaptcha.length === 0) {
      alert("Silakan verifikasi reCAPTCHA terlebih dahulu");
      return;
    }

    // Kirim Email
    submitBtn.value = "Mengirim...";
    submitBtn.disabled = true;

    emailjs.sendForm("service_5jv999v", "template_iqjhgsc", this)
      .then(() => {
        alert("Pesan berhasil dikirim ✅");

        // Simpan data session
        sessionStorage.setItem("lastMessageTime", Date.now());
        let count = parseInt(sessionStorage.getItem("messageCount") || 0);
        sessionStorage.setItem("messageCount", count + 1);

        contactForm.reset();
        grecaptcha.reset();

        submitBtn.value = "Send Message";
        submitBtn.disabled = false;
      })
      .catch((error) => {
        alert("Gagal mengirim ❌");
        console.error("EmailJS Error:", error);

        submitBtn.value = "Send Message";
        submitBtn.disabled = false;
      });
  });
}

// ======================================
// 4. CONTACT SIDEBAR PANEL
// ======================================
window.addEventListener("DOMContentLoaded", () => {
  const contactBtn = document.querySelector(".gradient-btn");
  const panel = document.getElementById("contactPanel");
  const closePanel = document.getElementById("closePanel");

  if (contactBtn && panel) {
    // Buka panel
    contactBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      panel.classList.add("active");
    });

    // Tutup panel dengan tombol close
    if (closePanel) {
      closePanel.addEventListener("click", () => {
        panel.classList.remove("active");
      });
    }

    // Tutup panel jika klik di luar
    document.addEventListener('click', (e) => {
      if (panel.classList.contains('active') &&
        !panel.contains(e.target) &&
        !contactBtn.contains(e.target)) {
        panel.classList.remove('active');
      }
    });

    // Mencegah klik di dalam panel menutup panel
    panel.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Tutup panel dengan tombol ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && panel.classList.contains('active')) {
        panel.classList.remove('active');
      }
    });
  }
});

// ======================================
// 5. SCROLL REVEAL ANIMATIONS
// ======================================
if (typeof ScrollReveal !== 'undefined') {
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
}

// ==========================================
// 6. LOADING SCREEN CONTROL
// ==========================================
window.addEventListener('load', function() {
  const loadingScreen = document.getElementById('loadingScreen');
  if (!loadingScreen) return;

  if (!sessionStorage.getItem('siteLoadedOnce')) {
    // Pertama kali: tampilkan loading selama 1.55 detik
    sessionStorage.setItem('siteLoadedOnce', 'true');

    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 1000); // Sembunyikan setelah transisi fade selesai
    }, 1400); // Durasi loading
  } else {
    // Bukan pertama kali: sembunyikan langsung
    loadingScreen.classList.add('hidden');
    loadingScreen.style.display = 'none';
  }
});