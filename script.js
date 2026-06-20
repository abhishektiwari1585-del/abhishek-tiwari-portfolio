/* =====================================================
   ABHISHEK KUMAR TIWARI — PORTFOLIO SCRIPT
   Interactive and premium animations
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initially on load

  // ===== MOBILE MENU HAMBURGER =====
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // ===== DYNAMIC TYPING EFFECT =====
  const words = [
    "Social Media Manager",
    "Meta Ads Specialist",
    "AI SMM Automation Expert",
    "Content & Copywriter",
    "Video Reels Editor",
    "SMM Strategist"
  ];
  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const dynamicTitle = document.getElementById("dynamicTitle");

  if (dynamicTitle) {
    const typeEffect = () => {
      const currentWord = words[wordIdx];
      if (isDeleting) {
        dynamicTitle.textContent = currentWord.substring(0, charIdx - 1);
        charIdx--;
      } else {
        dynamicTitle.textContent = currentWord.substring(0, charIdx + 1);
        charIdx++;
      }

      let typeSpeed = isDeleting ? 30 : 80;
      if (!isDeleting && charIdx === currentWord.length) {
        typeSpeed = 2000; // Keep the word on screen longer
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        typeSpeed = 400; // Pause before typing next word
      }
      setTimeout(typeEffect, typeSpeed);
    };
    typeEffect();
  }

  // ===== SCROLL REVEAL ANIMATIONS =====
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  
  // Set custom transition delays before observing
  revealElements.forEach(el => {
    const delay = el.style.getPropertyValue('--delay');
    if (delay) {
      el.style.transitionDelay = delay;
    }
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===== NUMERICAL STATS COUNTER ANIMATION =====
  const statsNumbers = document.querySelectorAll('.stat-number');
  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const stat = entry.target;
        const target = parseInt(stat.getAttribute('data-target'), 10);
        let count = 0;
        const duration = 1500; // Total count time in ms
        const stepTime = Math.max(Math.floor(duration / target), 15);
        
        const counter = setInterval(() => {
          count++;
          stat.textContent = count;
          if (count >= target) {
            clearInterval(counter);
            stat.textContent = target; // Ensure exact value at end
          }
        }, stepTime);
        
        observer.unobserve(stat);
      }
    });
  }, { threshold: 0.5 });

  statsNumbers.forEach(num => statsObserver.observe(num));

  // ===== SKILLS PROGRESS BARS ANIMATION =====
  const progressFills = document.querySelectorAll('.sk-progress-fill');
  const progressObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const bar = fill.closest('.sk-progress-bar');
        const targetWidth = bar ? bar.getAttribute('data-width') + '%' : '100%';
        fill.style.width = targetWidth;
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.2 });

  progressFills.forEach(fill => progressObserver.observe(fill));

  // ===== DYNAMIC ACTIVE NAVIGATION LINKS ON SCROLL =====
  const sections = document.querySelectorAll('section');
  const navLinksItems = document.querySelectorAll('.nav-links a, .nav-cta');
  
  window.addEventListener('scroll', () => {
    let currentSectionId = 'home';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      // Triggers active state when section is roughly in upper 40% of window
      if (window.scrollY >= sectionTop - window.innerHeight * 0.4) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinksItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // ===== REELS CAROUSEL SLIDER =====
  const track = document.getElementById('reelsTrack');
  const prevBtn = document.getElementById('prevReelBtn');
  const nextBtn = document.getElementById('nextReelBtn');
  
  if (track && prevBtn && nextBtn) {
    let currentIdx = 0;
    
    const getSlidesPerView = () => {
      const width = window.innerWidth;
      if (width > 1200) return 4;
      if (width > 800) return 3;
      if (width > 500) return 2;
      return 1;
    };
    
    const updateCarousel = () => {
      const slides = track.querySelectorAll('.carousel-slide');
      const totalSlides = slides.length;
      if (totalSlides === 0) return;
      const slidesPerView = getSlidesPerView();
      const maxIdx = Math.max(0, totalSlides - slidesPerView);
      
      // Keep within bounds
      if (currentIdx > maxIdx) currentIdx = maxIdx;
      if (currentIdx < 0) currentIdx = 0;
      
      // Calculate slide width and gap
      const gap = 24; // matches gap in CSS
      const slideWidth = slides[0].getBoundingClientRect().width;
      const amountToMove = (slideWidth + gap) * currentIdx;
      
      track.style.transform = `translateX(-${amountToMove}px)`;
      
      // Disable buttons at boundaries
      prevBtn.disabled = currentIdx === 0;
      nextBtn.disabled = currentIdx === maxIdx;
    };
    
    prevBtn.addEventListener('click', () => {
      currentIdx--;
      updateCarousel();
    });
    
    nextBtn.addEventListener('click', () => {
      currentIdx++;
      updateCarousel();
    });
    
    // Update on resize
    window.addEventListener('resize', updateCarousel);
    
    // Initial run
    setTimeout(updateCarousel, 300);
  }

});

// ===== VIDEO LIGHTBOX MODAL GLOBAL METHODS =====
window.openVideoModal = function(src, title) {
  const modal = document.getElementById('videoModal');
  const video = document.getElementById('modalVideo');
  const titleEl = document.getElementById('modalVideoTitle');
  if (modal && video) {
    video.src = src;
    if (titleEl) titleEl.textContent = title;
    modal.classList.add('active');
    video.play();
    document.body.style.overflow = 'hidden'; // stop background scroll
  }
};

window.closeVideoModal = function() {
  const modal = document.getElementById('videoModal');
  const video = document.getElementById('modalVideo');
  if (modal && video) {
    video.pause();
    video.src = '';
    modal.classList.remove('active');
    document.body.style.overflow = ''; // restore background scroll
  }
};

// ===== CONTACT FORM SUBMISSION =====
window.handleFormSubmit = function(event) {
  event.preventDefault();
  
  const submitBtn = document.getElementById('submitBtn');
  const originalText = submitBtn.innerHTML;
  
  // Show sending state
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span>Sending Message...</span>`;
  
  // Simulate API call for premium UX feedback
  setTimeout(() => {
    // Show success state
    submitBtn.innerHTML = `<span>Message Sent Successfully!</span>`;
    submitBtn.style.backgroundColor = 'var(--green)';
    submitBtn.style.borderColor = 'var(--green)';
    
    // Reset form after delay
    setTimeout(() => {
      event.target.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      submitBtn.style.backgroundColor = '';
      submitBtn.style.borderColor = '';
    }, 3000);
  }, 1500);
};
