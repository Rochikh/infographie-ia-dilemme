// JavaScript pour l'infographie interactive IA - Nouvelle charte graphique
document.addEventListener('DOMContentLoaded', function() {
    
    // Gestion des questions interactives
    const questionBoxes = document.querySelectorAll('.question-box');
    
    questionBoxes.forEach(box => {
        box.addEventListener('click', function() {
            const details = this.querySelector('.question-details');
            const isHidden = details.classList.contains('hidden');
            
            // Fermer toutes les autres questions
            questionBoxes.forEach(otherBox => {
                if (otherBox !== this) {
                    const otherDetails = otherBox.querySelector('.question-details');
                    otherDetails.classList.remove('visible');
                    otherDetails.classList.add('hidden');
                    otherBox.classList.remove('active');
                }
            });
            
            // Toggle la question actuelle
            if (isHidden) {
                details.classList.remove('hidden');
                details.classList.add('visible');
                this.classList.add('active');
            } else {
                details.classList.remove('visible');
                details.classList.add('hidden');
                this.classList.remove('active');
            }
        });
    });

    // Animation de la balance au scroll
    const balanceSection = document.querySelector('.balance-section');
    const balanceScale = document.querySelector('.balance-scale');
    
    function animateBalanceOnScroll() {
        if (!balanceSection || !balanceScale) return;
        
        const rect = balanceSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight && rect.bottom > 0) {
            balanceScale.style.transform = 'scale(1)';
            balanceScale.style.opacity = '1';
        }
    }

    // Animation des colonnes au scroll
    const columns = document.querySelectorAll('.column');
    
    function animateColumnsOnScroll() {
        columns.forEach((column, index) => {
            const rect = column.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight - 100) {
                setTimeout(() => {
                    column.style.opacity = '1';
                    column.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }

    // Initialisation des styles pour les animations
    columns.forEach(column => {
        column.style.opacity = '0';
        column.style.transform = 'translateY(40px)';
        column.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    if (balanceScale) {
        balanceScale.style.opacity = '0';
        balanceScale.style.transform = 'scale(0.8)';
        balanceScale.style.transition = 'opacity 1s ease, transform 1s ease';
    }

    // Animation du point de bascule
    const tippingPoint = document.querySelector('.tipping-point');
    const choiceCircle = document.querySelector('.choice-circle');
    
    function animateTippingPoint() {
        if (!tippingPoint || !choiceCircle) return;
        
        const rect = tippingPoint.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight - 50) {
            choiceCircle.style.animationPlayState = 'running';
        }
    }

    // Event listeners pour le scroll
    window.addEventListener('scroll', () => {
        animateBalanceOnScroll();
        animateColumnsOnScroll();
        animateTippingPoint();
    });

    // Déclenchement initial des animations
    animateBalanceOnScroll();
    animateColumnsOnScroll();
    animateTippingPoint();

    // Effet de survol amélioré sur les colonnes
    columns.forEach(column => {
        column.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.boxShadow = '0 16px 32px rgba(22, 52, 95, 0.2)';
            }
        });
        
        column.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '';
            }
        });
    });

    // Interaction avec le cercle de choix
    if (choiceCircle) {
        choiceCircle.addEventListener('click', function() {
            // Animation de pulsation renforcée
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'pulse-glow 1s ease-in-out 3';
            }, 10);
            
            // Scroll vers les questions avec un effet plus fluide
            const callToAction = document.querySelector('.call-to-action');
            if (callToAction) {
                callToAction.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });

        // Effet de survol sur le cercle de choix
        choiceCircle.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.08)';
            this.style.boxShadow = '0 8px 24px rgba(245, 129, 12, 0.3)';
        });

        choiceCircle.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '';
        });
    }

    // Effet de parallaxe léger sur le titre
    const mainTitle = document.querySelector('.main-title');
    
    if (mainTitle) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.2;
            mainTitle.style.transform = `translateY(${parallax}px)`;
        });
    }

    // Animation d'apparition progressive du contenu avec Intersection Observer
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);

    // Observer tous les éléments principaux
    const elementsToObserve = document.querySelectorAll(
        '.hero-section, .balance-section, .three-columns, .tipping-point, .call-to-action'
    );
    
    elementsToObserve.forEach(el => {
        el.classList.add('fade-in-element');
        observer.observe(el);
    });

    // Animation spéciale pour les plateaux de la balance
    const leftPlate = document.querySelector('.balance-left-plate');
    const rightPlate = document.querySelector('.balance-right-plate');
    
    if (leftPlate && rightPlate) {
        // Interaction au survol des plateaux
        leftPlate.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.05)';
        });
        
        leftPlate.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        rightPlate.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.05)';
        });
        
        rightPlate.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }

    // Gestion responsive améliorée
    function handleResponsiveInteractions() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Désactiver les effets de survol sur mobile
            columns.forEach(column => {
                column.style.transform = 'translateY(0) scale(1)';
                column.style.boxShadow = '';
            });
            
            if (choiceCircle) {
                choiceCircle.style.transform = 'scale(1)';
                choiceCircle.style.boxShadow = '';
            }
        }
    }

    // Animation des flèches du point de bascule
    const arrowLeft = document.querySelector('.arrow-left');
    const arrowRight = document.querySelector('.arrow-right');
    
    if (arrowLeft && arrowRight) {
        // Interaction au clic sur les flèches
        arrowLeft.addEventListener('click', function() {
            this.style.animation = 'arrow-pulse 0.5s ease-in-out 2';
        });
        
        arrowRight.addEventListener('click', function() {
            this.style.animation = 'arrow-pulse 0.5s ease-in-out 2';
        });
    }

    // Ajout d'un effet de focus amélioré pour l'accessibilité
    const focusableElements = document.querySelectorAll(
        '.question-box, .choice-circle, .column'
    );
    
    focusableElements.forEach(element => {
        element.setAttribute('tabindex', '0');
        
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #f5810c';
            this.style.outlineOffset = '4px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
        
        // Support clavier pour les éléments interactifs
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // Event listeners pour le redimensionnement
    window.addEventListener('resize', () => {
        handleResponsiveInteractions();
        
        // Recalculer les animations si nécessaire
        setTimeout(() => {
            animateBalanceOnScroll();
            animateColumnsOnScroll();
            animateTippingPoint();
        }, 100);
    });

    // Initialisation responsive
    handleResponsiveInteractions();

    // Animation de "typing" pour le titre principal (effet bonus)
    function animateTitle() {
        const title = document.querySelector('.main-title');
        if (!title) return;
        
        const text = title.textContent;
        title.textContent = '';
        title.style.borderRight = '3px solid #f5810c';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            title.textContent += text.charAt(i);
            i++;
            
            if (i >= text.length) {
                clearInterval(typeInterval);
                setTimeout(() => {
                    title.style.borderRight = 'none';
                }, 500);
            }
        }, 100);
    }

    // Démarrer l'animation du titre après un petit délai
    setTimeout(animateTitle, 1000);

    // Log de confirmation
    console.log('🎨 Infographie IA avec nouvelle charte graphique chargée !');
    console.log('✅ Couleurs: Bleu BF, Rouge/Vert pour contraste, Orange dynamique');
    console.log('✅ Typographies: Space Grotesk + Arial, tailles augmentées');
    console.log('✅ Pictogrammes SVG originaux intégrés');
    console.log('✅ Fond blanc majoritaire respecté');
});