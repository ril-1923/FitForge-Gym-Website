/* ===========================
   FitForge - Main JavaScript
   All interactive functionality
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ----- 1. Sticky Navbar Scroll Effect ----- */
    const navbar = document.getElementById('mainNav');

    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll();

    /* ----- 2. Smooth Scrolling for Anchor Links ----- */
    // CSS handles scroll-behavior: smooth, but we add JS for better cross-browser support
    // and to close the mobile offcanvas when a link is clicked.
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#' || targetId.length < 2) return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const offset = 70;
                const top = targetEl.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    /* ----- 3. Active Navigation Link on Scroll ----- */
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('#mainNav .nav-link');

    function updateActiveLink() {
        const scrollY = window.scrollY + 100;
        let current = '';

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollY >= top && scrollY < top + height) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    /* ----- 4. Animated Counters ----- */
    const counters = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    function animateCounters() {
        if (countersStarted) return;
        const heroStats = document.querySelector('.hero-stats');
        if (!heroStats) return;

        const rect = heroStats.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            countersStarted = true;
            counters.forEach(counter => {
                const target = parseInt(counter.dataset.count, 10);
                const suffix = counter.dataset.suffix || '';
                const duration = 2000;
                const stepTime = 30;
                const steps = duration / stepTime;
                const increment = target / steps;
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target.toLocaleString() + suffix;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current).toLocaleString() + suffix;
                    }
                }, stepTime);
            });
        }
    }

    window.addEventListener('scroll', animateCounters);
    animateCounters();

    /* ----- 5. Scroll Reveal Animations ----- */
    const revealElements = document.querySelectorAll('.reveal');

    function checkReveal() {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50 && rect.bottom > 0) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkReveal);
    checkReveal();

    /* ----- 6. Pricing Monthly/Yearly Toggle ----- */
    const pricingToggle = document.getElementById('pricingToggle');
    const monthlyLabel = document.getElementById('monthlyLabel');
    const yearlyLabel = document.getElementById('yearlyLabel');
    const priceAmounts = document.querySelectorAll('.pricing-price .amount');

    function updatePricing() {
        const isYearly = pricingToggle.checked;
        if (isYearly) {
            monthlyLabel.classList.remove('active');
            yearlyLabel.classList.add('active');
        } else {
            monthlyLabel.classList.add('active');
            yearlyLabel.classList.remove('active');
        }

        priceAmounts.forEach(amount => {
            const monthly = amount.dataset.monthly;
            const yearly = amount.dataset.yearly;
            // Animate the number change
            amount.style.opacity = '0';
            setTimeout(() => {
                amount.textContent = isYearly ? yearly : monthly;
                amount.style.opacity = '1';
            }, 150);
        });
    }

    if (pricingToggle) {
        monthlyLabel.classList.add('active');
        pricingToggle.addEventListener('change', updatePricing);
    }

    /* ----- 7. BMI Calculator ----- */
    const bmiForm = document.getElementById('bmiForm');
    const bmiHeight = document.getElementById('bmiHeight');
    const bmiWeight = document.getElementById('bmiWeight');
    const bmiAlert = document.getElementById('bmiAlert');
    const bmiResult = document.getElementById('bmiResult');
    const bmiValue = document.getElementById('bmiValue');
    const bmiCategory = document.getElementById('bmiCategory');
    const bmiProgressBar = document.getElementById('bmiProgressBar');
    const bmiHealthy = document.getElementById('bmiHealthy');

    function getBMICategory(bmi) {
        if (bmi < 18.5) return { category: 'Underweight', color: '#4dabf7', percent: 20 };
        if (bmi < 25) return { category: 'Normal', color: '#51cf66', percent: 45 };
        if (bmi < 30) return { category: 'Overweight', color: '#fcc419', percent: 70 };
        return { category: 'Obese', color: '#ff6b6b', percent: 95 };
    }

    if (bmiForm) {
        bmiForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const height = parseFloat(bmiHeight.value);
            const weight = parseFloat(bmiWeight.value);

            // Validation
            bmiAlert.innerHTML = '';
            if (!height || height < 50 || height > 300) {
                bmiAlert.innerHTML = '<div class="alert alert-danger py-2 mb-0"><i class="bi bi-exclamation-circle me-2"></i>Please enter a valid height between 50 and 300 cm.</div>';
                return;
            }
            if (!weight || weight < 10 || weight > 500) {
                bmiAlert.innerHTML = '<div class="alert alert-danger py-2 mb-0"><i class="bi bi-exclamation-circle me-2"></i>Please enter a valid weight between 10 and 500 kg.</div>';
                return;
            }

            // Calculate BMI: weight(kg) / (height(m))^2
            const heightM = height / 100;
            const bmi = weight / (heightM * heightM);
            const bmiRounded = bmi.toFixed(1);
            const cat = getBMICategory(bmi);

            // Display result
            bmiResult.classList.remove('d-none');
            bmiValue.textContent = bmiRounded;
            bmiCategory.textContent = cat.category;
            bmiCategory.style.color = cat.color;
            bmiProgressBar.style.width = '0%';
            bmiProgressBar.style.background = cat.color;
            setTimeout(() => {
                bmiProgressBar.style.width = cat.percent + '%';
            }, 100);

            // Healthy range message
            const minHealthy = (18.5 * heightM * heightM).toFixed(1);
            const maxHealthy = (24.9 * heightM * heightM).toFixed(1);
            bmiHealthy.innerHTML = `<i class="bi bi-info-circle me-1"></i>Healthy weight range for your height: <strong>${minHealthy} kg - ${maxHealthy} kg</strong>`;

            // Show toast
            showToast('success', `Your BMI is ${bmiRounded} (${cat.category})`);
        });
    }

    /* ----- 8. Contact Form Validation ----- */
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fields = contactForm.querySelectorAll('input[required], select[required], textarea[required]');
            let isValid = true;

            fields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('is-invalid');
                    isValid = false;
                } else if (field.type === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value)) {
                        field.classList.add('is-invalid');
                        isValid = false;
                    } else {
                        field.classList.remove('is-invalid');
                        field.classList.add('is-valid');
                    }
                } else {
                    field.classList.remove('is-invalid');
                    field.classList.add('is-valid');
                }
            });

            if (isValid) {
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const btnText = submitBtn.querySelector('.btn-text');
                const spinner = submitBtn.querySelector('.spinner-border');

                // Show loading spinner
                btnText.classList.add('d-none');
                spinner.classList.remove('d-none');
                submitBtn.disabled = true;

                // Simulate sending (no backend in this project)
                setTimeout(() => {
                    btnText.classList.remove('d-none');
                    spinner.classList.add('d-none');
                    submitBtn.disabled = false;
                    contactForm.reset();
                    fields.forEach(f => f.classList.remove('is-valid'));
                    showToast('success', 'Message sent! We will get back to you soon.');
                }, 1500);
            }
        });

        // Real-time validation reset
        contactForm.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('input', () => {
                if (field.classList.contains('is-invalid') && field.value.trim()) {
                    field.classList.remove('is-invalid');
                }
            });
        });
    }

    /* ----- 9. Newsletter Validation ----- */
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterError = document.getElementById('newsletterError');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('newsletterEmail');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!email.value.trim()) {
                newsletterError.textContent = 'Please enter your email address.';
                email.classList.add('is-invalid');
                return;
            }
            if (!emailRegex.test(email.value)) {
                newsletterError.textContent = 'Please enter a valid email address.';
                email.classList.add('is-invalid');
                return;
            }

            newsletterError.textContent = '';
            email.classList.remove('is-invalid');
            email.classList.add('is-valid');
            showToast('success', 'Subscribed! Welcome to the FitForge newsletter.');
            newsletterForm.reset();
            setTimeout(() => email.classList.remove('is-valid'), 2000);
        });
    }

    /* ----- 10. Join Form Validation ----- */
    const joinForm = document.getElementById('joinForm');

    if (joinForm) {
        joinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fields = joinForm.querySelectorAll('input[required], select[required]');
            let isValid = true;

            fields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('is-invalid');
                    isValid = false;
                } else if (field.type === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value)) {
                        field.classList.add('is-invalid');
                        isValid = false;
                    } else {
                        field.classList.remove('is-invalid');
                    }
                } else {
                    field.classList.remove('is-invalid');
                }
            });

            if (isValid) {
                const submitBtn = joinForm.querySelector('button[type="submit"]');
                const btnText = submitBtn.querySelector('.btn-text');
                const spinner = submitBtn.querySelector('.spinner-border');

                btnText.classList.add('d-none');
                spinner.classList.remove('d-none');
                submitBtn.disabled = true;

                setTimeout(() => {
                    btnText.classList.remove('d-none');
                    spinner.classList.add('d-none');
                    submitBtn.disabled = false;
                    joinForm.reset();

                    // Close the offcanvas
                    const offcanvasEl = document.getElementById('joinOffcanvas');
                    const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
                    if (offcanvas) offcanvas.hide();

                    showToast('success', 'Welcome to FitForge! Check your email to complete registration.');
                }, 1500);
            }
        });

        joinForm.querySelectorAll('input, select').forEach(field => {
            field.addEventListener('input', () => {
                if (field.classList.contains('is-invalid') && field.value.trim()) {
                    field.classList.remove('is-invalid');
                }
            });
        });
    }

    /* ----- 11. Class Booking Interaction ----- */
    document.querySelectorAll('.book-class').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const className = btn.dataset.class;

            btn.classList.add('booked');
            btn.innerHTML = '<i class="bi bi-check-circle me-1"></i>Booked';
            btn.disabled = true;

            showToast('success', `Booked: ${className}`);
        });
    });

    /* ----- 12. Program "View Program" Interaction ----- */
    document.querySelectorAll('[data-program]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const program = btn.dataset.program;
            showToast('success', `Inquiry sent for: ${program}. Our team will contact you!`);
        });
    });

    /* ----- 13. Gallery Modal ----- */
    const galleryModal = document.getElementById('galleryModal');
    const galleryModalImg = document.getElementById('galleryModalImg');
    const galleryModalLabel = document.getElementById('galleryModalLabel');

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.dataset.img;
            const title = item.dataset.title;
            galleryModalImg.src = imgSrc;
            galleryModalImg.alt = title;
            galleryModalLabel.textContent = title;
        });
    });

    /* ----- 14. Back to Top Button ----- */
    const backToTop = document.getElementById('backToTop');

    function handleBackToTop() {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleBackToTop);

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ----- 15. Toast Notification System ----- */
    // Creates and displays a Bootstrap toast with a custom message.
    // type: 'success' or 'error'
    function showToast(type, message) {
        const toastContainer = document.getElementById('toastContainer');
        const icon = type === 'success' ? 'bi-check-circle-fill' : 'bi-x-circle-fill';
        const toastClass = type === 'success' ? 'toast-success' : 'toast-error';

        const toastEl = document.createElement('div');
        toastEl.className = `toast ${toastClass}`;
        toastEl.setAttribute('role', 'alert');
        toastEl.setAttribute('aria-live', 'assertive');
        toastEl.setAttribute('aria-atomic', 'true');
        toastEl.innerHTML = `
            <div class="toast-body">
                <i class="bi ${icon}"></i>
                <span>${message}</span>
            </div>
        `;

        toastContainer.appendChild(toastEl);
        const toast = new bootstrap.Toast(toastEl, { delay: 4000, autohide: true });
        toast.show();

        // Remove from DOM after hidden
        toastEl.addEventListener('hidden.bs.toast', () => {
            toastEl.remove();
        });
    }

    // Expose for use in other contexts if needed
    window.FitForgeToast = showToast;

    /* ----- 16. Pre-fill Join Plan from Pricing Buttons ----- */
    document.querySelectorAll('[data-plan]').forEach(btn => {
        btn.addEventListener('click', () => {
            const plan = btn.dataset.plan;
            const joinPlanSelect = document.getElementById('joinPlan');
            if (joinPlanSelect) {
                for (const option of joinPlanSelect.options) {
                    if (option.value.startsWith(plan)) {
                        option.selected = true;
                        break;
                    }
                }
            }
        });
    });

    /* ----- 17. Prevent form resubmission on page reload ----- */
    if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href);
    }

    /* ----- 18. Hero parallax effect (subtle) ----- */
    const heroSection = document.querySelector('.hero-section');
    if (heroSection && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                const heroContent = heroSection.querySelector('.hero-content');
                if (heroContent) {
                    heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
                    heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
                }
            }
        });
    }
});
