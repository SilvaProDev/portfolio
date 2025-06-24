document.addEventListener('DOMContentLoaded', function() {
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

    // Fonction d'initialisation
    function initPage() {
        // Active la première section par défaut
        activateSection(0);
        
        // Ajoute les écouteurs d'événements
        setupEventListeners();
    }

    // Configuration des écouteurs d'événements
    function setupEventListeners() {
        // Menu mobile
        menuIcon.addEventListener('click', toggleMobileMenu);

        // Navigation par liens
        navLinks.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                if (!isAnimating && currentSectionIndex !== index) {
                    navigateToSection(index);
                }
            });
        });

        // Logo click
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (!isAnimating && currentSectionIndex !== 0) {
                navigateToSection(0);
            }
        });

        // Gestion du scroll
        window.addEventListener('wheel', handleScroll, { passive: false });
    }

    // Navigation entre sections
    function navigateToSection(index) {
        if (isAnimating) return;
        
        isAnimating = true;
        currentSectionIndex = index;

        // Animation de transition
        startTransitionAnimation(() => {
            activateSection(index);
            isAnimating = false;
        });
    }

    // Animation de transition entre sections
    function startTransitionAnimation(callback) {
        // Masque le contenu
        header.classList.remove('active');
        barsBox.classList.remove('active');
        
        // Désactive toutes les sections
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Réactive après un délai
        setTimeout(() => {
            header.classList.add('active');
            barsBox.classList.add('active');
            if (callback) callback();
        }, 800);
    }

    // Activation d'une section spécifique
    function activateSection(index) {
        // Met à jour la navigation
        navLinks.forEach(link => link.classList.remove('active'));
        navLinks[index].classList.add('active');

        // Active la section
        sections[index].classList.add('active');

        // Scroll vers le haut de la section
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Ferme le menu mobile si ouvert
        closeMobileMenu();
    }

    // Gestion du menu mobile
    function toggleMobileMenu() {
        menuIcon.classList.toggle('bx-x');
        navBar.classList.toggle('active');
    }

    function closeMobileMenu() {
        menuIcon.classList.remove('bx-x');
        navBar.classList.remove('active');
    }

    // Gestion du scroll
    function handleScroll(e) {
        if (isAnimating) {
            e.preventDefault();
            return;
        }

        const delta = Math.sign(e.deltaY);
        let newIndex = currentSectionIndex;

        if (delta > 0 && currentSectionIndex < sections.length - 1) {
            // Scroll vers le bas
            newIndex = currentSectionIndex + 1;
        } else if (delta < 0 && currentSectionIndex > 0) {
            // Scroll vers le haut
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

    // Initialisation du carousel
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
});