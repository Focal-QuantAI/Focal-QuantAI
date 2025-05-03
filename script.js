// config variable to store the config.json content
let config;

// Function to load config.json
async function loadConfig() {
    try {
        const response = await fetch('config.json');
        if (!response.ok) {
            throw new Error('Failed to load config.json');
        }
        config = await response.json();

        if (!config) return;
        initialize();
        populateContent();

    } catch (error) {
        console.error('Error loading config:', error);
    }
}

function initialize(){
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Add shadow to navbar on scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 10) {
            nav.classList.add('shadow-lg');
        } else {
            nav.classList.remove('shadow-lg');
        }
    });
}

function populateContent() {
    if (!config) return;

    // Replace company name
    const companyNameElements = document.querySelectorAll('.company-name');
    companyNameElements.forEach(element => {
        element.textContent = config.companyName;
    });

    // Replace company slogan
    const companySloganElements = document.querySelectorAll('.company-slogan');
    companySloganElements.forEach(element => {
        element.textContent = config.companySlogan;
    });

    // Replace location
    const locationElements = document.querySelectorAll('.company-location');
    locationElements.forEach(element => {
        element.textContent = config.location;
    });

    // Replace contact details
    document.querySelector('.company-email').textContent = config.email;
    document.querySelector('.company-phone').textContent = config.phone;

    // Replace operating hours
    document.querySelector('.operating-hours-weekdays').textContent = config.operatingHours.weekdays;
    document.querySelector('.operating-hours-weekends').textContent = config.operatingHours.weekends;

    // Replace social media links
    document.querySelector('.social-twitter').href = config.socialMedia.twitter;
    document.querySelector('.social-linkedin').href = config.socialMedia.linkedin;
    document.querySelector('.social-github').href = config.socialMedia.github;
    document.querySelector('.social-medium').href = config.socialMedia.medium;

    // Replace copyright year
    document.querySelector('.copyright-year').textContent = config.copyrightYear;
}

// Call loadConfig on script load
loadConfig();