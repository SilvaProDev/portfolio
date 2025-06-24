document.addEventListener('DOMContentLoaded', function () {
    // Sélection des éléments
    const navLinks = document.querySelectorAll('header nav a');
    const logoLink = document.querySelector('.logo');
    const sections = document.querySelectorAll('section');
    const menuIcon = document.querySelector('#menu-icon');
    const navBar = document.querySelector('header nav');
    const barsBox = document.querySelector('.bars-box');
    const header = document.querySelector('header');

    // Variables d'état
    let currentSectionIndex = 0;
    let isAnimating = false;

    // Initialisation
    initPage();

    function initPage() {
        activateSection(0);
        setupEventListeners();
    }

    function setupEventListeners() {
        menuIcon.addEventListener('click', toggleMobileMenu);

        navLinks.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                if (!isAnimating && currentSectionIndex !== index) {
                    navigateToSection(index);
                }
            });
        });

        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (!isAnimating && currentSectionIndex !== 0) {
                navigateToSection(0);
            }
        });

        // Scroll section par section uniquement sur desktop
        if (!isMobile()) {
            window.addEventListener('wheel', handleScroll, { passive: false });
        } else {
            // Sur mobile, gestion du swipe
            let touchStartY = 0;
            let touchEndY = 0;

            window.addEventListener('touchstart', (e) => {
                touchStartY = e.changedTouches[0].screenY;
            });

            window.addEventListener('touchend', (e) => {
                touchEndY = e.changedTouches[0].screenY;
                handleTouchScroll();
            });

            function handleTouchScroll() {
                if (isAnimating) return;

                const deltaY = touchStartY - touchEndY;
                let newIndex = currentSectionIndex;

                if (deltaY > 50 && currentSectionIndex < sections.length - 1) {
                    newIndex++;
                } else if (deltaY < -50 && currentSectionIndex > 0) {
                    newIndex--;
                }

                if (newIndex !== currentSectionIndex) {
                    navigateToSection(newIndex);
                }
            }
        }
    }

    function navigateToSection(index) {
        if (isAnimating) return;

        isAnimating = true;
        currentSectionIndex = index;

        startTransitionAnimation(() => {
            activateSection(index);
            isAnimating = false;
        });
    }

    function startTransitionAnimation(callback) {
        header.classList.remove('active');
        barsBox.classList.remove('active');
        sections.forEach(section => section.classList.remove('active'));

        setTimeout(() => {
            header.classList.add('active');
            barsBox.classList.add('active');
            if (callback) callback();
        }, 800);
    }

    function activateSection(index) {
        navLinks.forEach(link => link.classList.remove('active'));
        navLinks[index].classList.add('active');

        sections.forEach(section => section.classList.remove('active'));
        sections[index].classList.add('active');

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        closeMobileMenu();
    }

    function toggleMobileMenu() {
        menuIcon.classList.toggle('bx-x');
        navBar.classList.toggle('active');
    }

    function closeMobileMenu() {
        menuIcon.classList.remove('bx-x');
        navBar.classList.remove('active');
    }

    function handleScroll(e) {
        if (isAnimating) {
            e.preventDefault();
            return;
        }

        const delta = Math.sign(e.deltaY);
        let newIndex = currentSectionIndex;

        if (delta > 0 && currentSectionIndex < sections.length - 1) {
            newIndex = currentSectionIndex + 1;
        } else if (delta < 0 && currentSectionIndex > 0) {
            newIndex = currentSectionIndex - 1;
        }

        if (newIndex !== currentSectionIndex) {
            e.preventDefault();
            navigateToSection(newIndex);
        }
    }

    // Section Resume
    const resumeBtns = document.querySelectorAll('.resume-btn');
    const resumeDetails = document.querySelectorAll('.resume-detail');

    resumeBtns.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            resumeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            resumeDetails.forEach(detail => detail.classList.remove('active'));
            resumeDetails[idx].classList.add('active');
        });
    });

    // Portfolio Carousel
    const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
    const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');
    let carouselIndex = 0;

    function updatePortfolio() {
        const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
        const portfolioDetails = document.querySelectorAll('.portfolio-detail');

        imgSlide.style.transform = `translateX(calc(${carouselIndex * -100}% - ${carouselIndex * 2}rem))`;

        portfolioDetails.forEach(detail => detail.classList.remove('active'));
        portfolioDetails[carouselIndex].classList.add('active');

        arrowLeft.classList.toggle('disabled', carouselIndex === 0);
        arrowRight.classList.toggle('disabled', carouselIndex === 4);
    }

    updatePortfolio();

    arrowRight.addEventListener('click', () => {
        if (carouselIndex < 4) {
            carouselIndex++;
            updatePortfolio();
        }
    });

    arrowLeft.addEventListener('click', () => {
        if (carouselIndex > 0) {
            carouselIndex--;
            updatePortfolio();
        }
    });

    // Détection mobile
    function isMobile() {
        return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    }
});
