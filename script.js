// ===== Animasi Scroll (looping) =====
const sections = document.querySelectorAll("section, footer");

// Fungsi untuk menambahkan/removing class saat scroll
const animateOnScroll = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      // Jika ingin animasi bisa ulang saat scroll kembali ke atas
      entry.target.classList.remove("show");
    }
  });
};

const observer = new IntersectionObserver(animateOnScroll, { threshold: 0.1 });
sections.forEach(section => observer.observe(section));

// ===== Prevent scroll to top on lightbox close =====
document.querySelectorAll(".lightbox a").forEach(link => {
  link.addEventListener("click", e => {
    if (link.getAttribute("href") === "#") {
      e.preventDefault();
      history.replaceState(null, null, " "); // hilangkan hash URL
      link.parentElement.style.display = "none";
    }
  });
});

// ===== Navbar scroll effect =====
window.addEventListener("scroll", () => {
  const nav = document.querySelector("nav");
  if (window.scrollY > 60) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

// ===== FIX LIGHTBOX BUG =====
const lightboxes = document.querySelectorAll(".lightbox");

// Tutup lightbox saat klik di luar gambar
lightboxes.forEach(lb => {
  lb.addEventListener("click", e => {
    if (e.target === lb) {
      lb.style.display = "none";
      history.replaceState(null, null, " "); // hapus hash
    }
  });
});

// Cegah spam klik / klik ganda
let lightboxOpen = false;
document.querySelectorAll(".gallery a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    if (lightboxOpen) return; // cegah spam
    lightboxOpen = true;

    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.style.display = "flex";
      target.style.opacity = "0";
      setTimeout(() => (target.style.opacity = "1"), 10);
    }

    // reset agar bisa dibuka lagi nanti
    setTimeout(() => (lightboxOpen = false), 400);
  });
});
