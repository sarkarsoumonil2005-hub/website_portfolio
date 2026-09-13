document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Sticky Header Background on Scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Navigation Toggles
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavClose = document.getElementById('mobile-nav-close');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    const closeMobileNav = () => {
        if (mobileNav) {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', closeMobileNav);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });

    // 3. Section Scrolling Indicator Highlight
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -40% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        if (section.getAttribute('id')) {
            observer.observe(section);
        }
    });

    // 4. Contact Form Modal Actions
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');
    const modalClose = document.getElementById('modal-close');
    const modalBtnClose = document.getElementById('modal-btn-close');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            setTimeout(() => {
                if (successModal) {
                    successModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
                
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                contactForm.reset();
            }, 1200);
        });
    }

    const closeModal = () => {
        if (successModal) {
            successModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalBtnClose) modalBtnClose.addEventListener('click', closeModal);

    window.addEventListener('click', (e) => {
        if (e.target === successModal) {
            closeModal();
        }
    });

    // 5. Smooth Scroll offsets for Sticky Header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 6. Typewriter Tagline Animation (sequential word writing)
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const words = ["Data.", "Code.", "DBMS.", "Software."];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 120;

        const type = () => {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 60; // Faster deleting phase
            } else {
                typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 150; // Standard typing phase
            }

            // Word typed completely, pause before deleting
            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 2200; 
            } 
            // Word deleted completely, cycle to next word
            else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 600; 
            }

            setTimeout(type, typeSpeed);
        };
        
        setTimeout(type, 800);
    }

    // 7. Coral-Red Tech Particles Mesh Background (HTML5 Canvas)
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        let particles = [];
        const maxParticles = 65;
        const connectionDist = 120;
        let mouse = { x: null, y: null, radius: 140 };

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });

        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            init();
        });

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.radius = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.radius) {
                        const force = (mouse.radius - dist) / mouse.radius;
                        this.x -= (dx / dist) * force * 0.5;
                        this.y -= (dy / dist) * force * 0.5;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 75, 92, 0.35)'; // Coral Red Particles
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < maxParticles; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            // Background fill matches primary dark variable
            ctx.fillStyle = '#040712';
            ctx.fillRect(0, 0, width, height);

            // Render mesh connecting nodes
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDist) {
                        const alpha = (1 - dist / connectionDist) * 0.12;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(255, 75, 92, ${alpha})`; // Coral Red Mesh Lines
                        ctx.lineWidth = 0.7;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        };

        init();
        animate();
    }

    // 8. Document & Certificate Modal Functions
    window.openCertModal = function(pdfPath, customTitle) {
        const modal = document.getElementById('cert-modal');
        const iframe = document.getElementById('cert-iframe');
        const titleEl = document.getElementById('cert-modal-title');
        const openLink = document.getElementById('cert-modal-open-link');

        if (modal && iframe) {
            iframe.src = pdfPath;
            if (titleEl) {
                titleEl.textContent = customTitle || 'Document Preview';
            }
            if (openLink) {
                openLink.href = pdfPath;
            }
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
            document.body.style.overflow = 'hidden'; // Disable background scrolling
        }
    };

    window.closeCertModal = function() {
        const modal = document.getElementById('cert-modal');
        const iframe = document.getElementById('cert-iframe');
        if (modal && iframe) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
                iframe.src = '';
            }, 300);
            document.body.style.overflow = ''; // Re-enable background scrolling
        }
    };

    // Close modal when clicking outside content
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('cert-modal');
        if (modal && e.target === modal) {
            window.closeCertModal();
        }
    });

    // 9. 3D Holographic Preloader Logic
    const preloader = document.getElementById('preloader');
    const preloaderCard = document.getElementById('preloader-card');
    const preloaderProgress = document.getElementById('preloader-progress');
    const preloaderCounter = document.getElementById('preloader-counter');
    const statusLabel = document.querySelector('.preloader-status-row .status-label');
    
    if (preloader && preloaderProgress) {
        document.body.style.overflow = 'hidden'; // Lock scrolling during intro
        let isPreloaderActive = true;

        // Interactive 3D Tilt on Mouse Move
        const handle3DTilt = (e) => {
            if (!isPreloaderActive || !preloaderCard) return;
            const width = window.innerWidth;
            const height = window.innerHeight;
            const mouseX = (e.clientX - width / 2) / (width / 2);
            const mouseY = (e.clientY - height / 2) / (height / 2);

            const rotateX = -mouseY * 14; // Max 14 deg tilt
            const rotateY = mouseX * 14;

            preloaderCard.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(15px)`;
        };

        const reset3DTilt = () => {
            if (!preloaderCard) return;
            preloaderCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        };

        window.addEventListener('mousemove', handle3DTilt);
        window.addEventListener('mouseleave', reset3DTilt);

        // Smooth Counter & Progress Simulation
        let currentProgress = 0;
        const totalDuration = 2200; // 2.2 seconds total animation
        const intervalTime = 30;
        const stepIncrement = 100 / (totalDuration / intervalTime);

        const progressTimer = setInterval(() => {
            currentProgress += stepIncrement * (Math.random() * 0.8 + 0.6); // organic easing
            
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(progressTimer);

                if (preloaderCounter) preloaderCounter.textContent = '100%';
                if (preloaderProgress) preloaderProgress.style.width = '100%';
                if (statusLabel) {
                    statusLabel.innerHTML = '<i class="fa-solid fa-circle-check" style="color: #34d399;"></i> System Ready • Welcome';
                }

                // Seamless 3D Exit transition
                setTimeout(() => {
                    isPreloaderActive = false;
                    window.removeEventListener('mousemove', handle3DTilt);
                    window.removeEventListener('mouseleave', reset3DTilt);

                    preloader.classList.add('fade-out');
                    document.body.style.overflow = ''; // Unlock scrolling

                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 900);
                }, 400);
            } else {
                const rounded = Math.floor(currentProgress);
                if (preloaderCounter) preloaderCounter.textContent = rounded + '%';
                if (preloaderProgress) preloaderProgress.style.width = rounded + '%';

                if (statusLabel) {
                    if (rounded < 35) {
                        statusLabel.innerHTML = '<i class="fa-solid fa-microchip"></i> Initializing 3D Core...';
                    } else if (rounded < 70) {
                        statusLabel.innerHTML = '<i class="fa-solid fa-network-wired"></i> Loading Neural Assets...';
                    } else {
                        statusLabel.innerHTML = '<i class="fa-solid fa-bolt"></i> Finalizing Workspace...';
                    }
                }
            }
        }, intervalTime);
    }



});
