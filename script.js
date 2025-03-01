// Code Animation
const codeContent = document.getElementById('code-animation');
const pythonCode = `print('hello world')
`;

let i = 0;
const typeCode = () => {
    if (i < pythonCode.length) {
        codeContent.textContent += pythonCode.charAt(i);
        i++;
        setTimeout(typeCode, Math.random() * 10 + 10);
    } else {
        setTimeout(() => {
            i = 0;
            codeContent.textContent = '';
            typeCode();
        }, 5000);
    }
};

// Start typing animation when page loads
window.addEventListener('load', typeCode);

// Theme switcher
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

// Function to set a theme
function setTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('theme', themeName);
}

// Function to toggle between themes
function switchTheme(e) {
    if (e.target.checked) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
}

// Event listener for theme switch
toggleSwitch.addEventListener('change', switchTheme, false);

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
} else {
    // Default to dark theme
    setTheme('dark');
    toggleSwitch.checked = true;
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // In a real application, you would send this data to a server
        // For this demo, we'll just show an alert
        alert(`Thank you, ${name}! Your message has been received. We'll contact you at ${email} soon.`);
        
        // Reset the form
        contactForm.reset();
    });
}

// Animate elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .tech-item, .stat-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animated elements
document.querySelectorAll('.service-card, .tech-item, .stat-item').forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// CTA button effect
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 6px 20px rgba(108, 92, 231, 0.6)';
    });
    
    ctaButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(108, 92, 231, 0.4)';
    });
    
    ctaButton.addEventListener('click', function() {
        document.querySelector('#contact').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });
}