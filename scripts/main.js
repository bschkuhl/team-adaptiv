// Main JavaScript for Team Adaptiv Portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add loading animation for project images
    const projectImages = document.querySelectorAll('.project-image img');
    projectImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Add placeholder styling while loading
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });

    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe project cards for animation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        // Set initial state for animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        observer.observe(card);
    });

    // Add active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    });

    // Add mobile menu functionality (if needed later)
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinksContainer) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinksContainer.classList.toggle('nav-links--mobile-open');
            this.classList.toggle('mobile-menu-toggle--active');
        });
    }

    // Add search functionality (placeholder for future enhancement)
    function initializeSearch() {
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', function(e) {
                const searchTerm = e.target.value.toLowerCase();
                const projectCards = document.querySelectorAll('.project-card');
                
                projectCards.forEach(card => {
                    const title = card.querySelector('.project-title').textContent.toLowerCase();
                    const description = card.querySelector('.project-description').textContent.toLowerCase();
                    
                    if (title.includes(searchTerm) || description.includes(searchTerm)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        }
    }

    // Initialize search if search input exists
    initializeSearch();

    // Add lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    console.log('Team Adaptiv Portfolio initialized successfully');
});
