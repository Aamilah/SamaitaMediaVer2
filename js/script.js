new WOW().init();

const hamburgerMenu = document.getElementById('hamburgerMenu');
const navMenu = document.getElementById('navMenu');
const closeMenu = document.getElementById('closeMenu');
const menuIcon = document.getElementById('menuIcon');
const navbar = document.querySelector('.navbar-container');
const sections = document.querySelectorAll('section');
const menuListItems = document.querySelectorAll('.menu-list li');
const cursor = document.querySelector('.cursor');
const logoLight = document.querySelector('.logo-light');
const logoDark = document.querySelector('.logo-dark');
const proposalLink = document.querySelector('.proposal-link a');
const underline = document.querySelector('.proposal-link .underline');

// Function to toggle menu icon between open/close
function toggleMenuIcon(isOpen) {
    if (menuIcon) {
        menuIcon.classList.toggle('open', isOpen);
        menuIcon.classList.toggle('close', !isOpen);
    }
}

hamburgerMenu?.addEventListener('click', () => {
    navMenu?.classList.add('show');
    toggleMenuIcon(true);
    navbar?.classList.add('hidden');

    // Reset animation classes for fade-in effect
    menuListItems.forEach(item => {
        item.classList.remove('animate__fadeIn');
        void item.offsetWidth; // Trigger reflow
        item.classList.add('animate__fadeIn');
    });
});

closeMenu?.addEventListener('click', () => {
    navMenu?.classList.remove('show');
    toggleMenuIcon(false);
    navbar?.classList.remove('hidden');
});

// Function to update dark mode state
function isDarkModeEnabled() {
    return document.body.classList.contains('dark-mode');
}

// Set initial cursor state based on dark mode
function updateCursorMode() {
    if (cursor) {
        cursor.classList.toggle('light', isDarkModeEnabled());
    }
}
updateCursorMode();

// Update cursor position
document.addEventListener('mousemove', (e) => {
    if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    }
});

// Update navbar and cursor color on scroll
window.addEventListener('scroll', () => {
    const top = window.scrollY;
    
    navbar?.classList.toggle('sticky', top > 0 && !navMenu?.classList.contains('show') && !navbar?.classList.contains('hidden'));

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const inView = top >= sectionTop - sectionHeight / 3 && top < sectionTop + sectionHeight;

        if (inView) {
            navbar.style.backgroundColor = getComputedStyle(section).backgroundColor;
            const logoColor = section.getAttribute('data-logo-color');

            // Toggle cursor color only if not in dark mode
            if (!isDarkModeEnabled()) {
                cursor?.classList.toggle('light', logoColor === 'light');
                cursor?.classList.toggle('dark', logoColor === 'dark');
            }
        }
    });
});

// Intersection Observer options for logos and link styling
const observerOptions = {
    root: null, // Use the viewport as root
    threshold: 0.5 // 50% of the section must be visible to trigger
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const logoColor = entry.target.getAttribute('data-logo-color');

            if (logoColor === 'light') {
                logoLight?.classList.remove('hidden');
                logoDark?.classList.add('hidden');
                proposalLink?.classList.add('light');
                proposalLink?.classList.remove('dark');
                underline?.classList.add('light');
                underline?.classList.remove('dark');
            } else if (logoColor === 'dark') {
                logoLight?.classList.add('hidden');
                logoDark?.classList.remove('hidden');
                proposalLink?.classList.add('dark');
                proposalLink?.classList.remove('light');
                underline?.classList.add('dark');
                underline?.classList.remove('light');
            }
        }
    });
}, observerOptions);

// Observe each section
sections.forEach(section => {
    observer.observe(section);
});
