document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const root = document.documentElement;
    const hueSlider = document.getElementById('spectrum-hue');
    const activeColorName = document.getElementById('active-color-name');
    const presetBtns = document.querySelectorAll('.preset-btn');
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterStatus = document.getElementById('newsletter-status');
    const newsletterEmail = document.getElementById('newsletter-email');
    const prismCard = document.querySelector('.prism-card');

    // Color names mapped by hue range
    const getColorName = (hue) => {
        if (hue >= 0 && hue < 15) return 'Crimson Red';
        if (hue >= 15 && hue < 45) return 'Amber Orange';
        if (hue >= 45 && hue < 70) return 'Solar Yellow';
        if (hue >= 70 && hue < 140) return 'Emerald Green';
        if (hue >= 140 && hue < 190) return 'Teal Ocean';
        if (hue >= 190 && hue < 260) return 'Royal Blue';
        if (hue >= 260 && hue < 310) return 'Amethyst Purple';
        if (hue >= 310 && hue < 345) return 'Vibrant Rose';
        return 'Crimson Red'; // 345 to 360
    };

    // Update the accent color theme
    const updateThemeColor = (hue) => {
        // Set CSS custom property on :root
        root.style.setProperty('--hue', hue);
        
        // Update text label
        const colorName = getColorName(hue);
        activeColorName.textContent = colorName;
        
        // Highlight active preset (if any matches exactly)
        presetBtns.forEach(btn => {
            const btnHue = btn.getAttribute('data-hue');
            if (btnHue === hue.toString()) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    };

    // Slider Event Listener
    if (hueSlider) {
        hueSlider.addEventListener('input', (e) => {
            updateThemeColor(e.target.value);
        });
    }

    // Preset Button Click Event Listeners
    presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const hue = btn.getAttribute('data-hue');
            if (hueSlider) {
                hueSlider.value = hue;
            }
            updateThemeColor(hue);
        });
    });

    // Interactive Prism Card Tilt Effect (Micro-interaction)
    if (prismCard) {
        prismCard.addEventListener('mousemove', (e) => {
            const rect = prismCard.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position inside element
            const y = e.clientY - rect.top;  // y position inside element
            
            // Calculate tilt degrees
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const tiltX = (centerY - y) / 10; // scale down
            const tiltY = (x - centerX) / 10; // scale down
            
            prismCard.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`;
        });

        prismCard.addEventListener('mouseleave', () => {
            prismCard.style.transform = '';
        });
    }

    // Newsletter Form Submission
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = newsletterEmail.value.trim();
            if (!email) return;

            // Simple micro-animation for the submit button
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;

            // Simulate API Request
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Set success message
                newsletterStatus.className = 'status-msg success';
                newsletterStatus.textContent = `Thank you! ${email} has been subscribed to Spectrum.`;
                
                // Clear input
                newsletterEmail.value = '';
                
                // Clear success message after 5 seconds
                setTimeout(() => {
                    newsletterStatus.textContent = '';
                    newsletterStatus.className = 'status-msg';
                }, 5000);
            }, 1000);
        });
    }

    // Header border style on scroll
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            header.style.boxShadow = '0 4px 20px rgba(15, 23, 42, 0.03)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            header.style.boxShadow = 'none';
        }
    });

    // Initialize theme color (default is 230 - Indigo)
    updateThemeColor(230);
});
