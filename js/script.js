

new WOW().init();

const hamburgerMenu = document.getElementById('hamburgerMenu');
const navMenu = document.getElementById('navMenu');
const closeMenu = document.getElementById('closeMenu');
const menuIcon = document.getElementById('menuIcon');
const navbar = document.querySelector('.navbar-container');
const sections = document.querySelectorAll('section');
const menuListItems = document.querySelectorAll('.menu-list li');

// Function to toggle menu icon between open/close
function toggleMenuIcon(isOpen) {
    if (isOpen) {
        menuIcon.classList.add('open');
        menuIcon.classList.remove('close');
    } else {
        menuIcon.classList.add('close');
        menuIcon.classList.remove('open');
    }
}

hamburgerMenu.addEventListener('click', function() {
    navMenu.classList.add('show');
    toggleMenuIcon(true);
    navbar.classList.add('hidden'); // Hide navbar

    // Reset animation classes for fade-in effect
    menuListItems.forEach((item) => {
        item.classList.remove('animate__fadeIn'); // Remove the fade-in class
        void item.offsetWidth; // Trigger reflow
        item.classList.add('animate__fadeIn'); // Add the fade-in class
    });
});

closeMenu.addEventListener('click', function() {
    navMenu.classList.remove('show');
    toggleMenuIcon(false);
    navbar.classList.remove('hidden'); // Show navbar
});

window.addEventListener('scroll', function() {
    const top = window.scrollY;

    navbar.classList.toggle('sticky', top > 0 && !navMenu.classList.contains('show') && !navbar.classList.contains('hidden'));

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (top >= sectionTop - sectionHeight / 3 && top < sectionTop + sectionHeight) {
            navbar.style.backgroundColor = getComputedStyle(section).backgroundColor;
        }
    });
});

const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

// Change cursor color based on section
window.addEventListener('scroll', function() {
    const top = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        // Check if section is in view
        if (top >= sectionTop - sectionHeight / 3 && top < sectionTop + sectionHeight) {
            const logoColor = section.getAttribute('data-logo-color');

            // Change cursor color based on section's logo color
            if (logoColor === 'light') {
                cursor.classList.add('light');
                cursor.classList.remove('dark');
            } else if (logoColor === 'dark') {
                cursor.classList.add('dark');
                cursor.classList.remove('light');
            }
        }
    });
});
;

// Select the logos and proposal link
const logoLight = document.querySelector('.logo-light');
const logoDark = document.querySelector('.logo-dark');
const proposalLink = document.querySelector('.proposal-link a');
const underline = document.querySelector('.proposal-link .underline');

// Intersection Observer options
const options = {
    root: null,  // Use the viewport as root
    threshold: 0.5  // 50% of the section must be visible to trigger
};

// Create the intersection observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Get the logo color from the section's data attribute
            const logoColor = entry.target.getAttribute('data-logo-color');

            // Log for debugging purposes
            console.log('Logo color:', logoColor);

            if (logoColor === 'light') {
                // Show light logo, hide dark logo
                logoLight.classList.remove('hidden');
                logoDark.classList.add('hidden');
                proposalLink.classList.add('light'); 
                proposalLink.classList.remove('dark');
                underline.classList.add('light'); 
                underline.classList.remove('dark');
            } else if (logoColor === 'dark') {
                // Show dark logo, hide light logo
                logoLight.classList.add('hidden');
                logoDark.classList.remove('hidden');
                proposalLink.classList.add('dark'); 
                proposalLink.classList.remove('light');
                underline.classList.add('dark'); 
                underline.classList.remove('light');
            }
        }
    });
}, options);

// Observe each section
sections.forEach(section => {
    observer.observe(section);
});
