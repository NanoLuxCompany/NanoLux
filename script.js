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

window.addEventListener('load', typeCode);

const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function setTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('theme', themeName);
}


function switchTheme(e) {
    if (e.target.checked) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
}


toggleSwitch.addEventListener('change', switchTheme, false);


const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
} else {
    setTheme('dark');
    toggleSwitch.checked = true;
}

const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        const spans = this.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
        
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans.forEach(span => span.classList.remove('active'));
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

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

const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .tech-item, .stat-item, .project-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
    });
    
    // Animate tech progress bars
    const techBars = document.querySelectorAll('.tech-progress');
    techBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        if (barPosition < window.innerHeight / 1.2) {
            if (bar.classList.contains('python')) {
                bar.style.width = '95%';
            } else if (bar.classList.contains('lua')) {
                bar.style.width = '90%';
            }
        }
    });
    
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const statPosition = stat.getBoundingClientRect().top;
        if (statPosition < window.innerHeight / 1.2 && !stat.classList.contains('animated')) {
            const targetValue = parseInt(stat.getAttribute('data-count'));
            animateNumber(stat, 0, targetValue, 2000);
            stat.classList.add('animated');
        }
    });
};

function animateNumber(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

document.querySelectorAll('.service-card, .tech-item, .stat-item, .project-card').forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

const header = document.getElementById('header');
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.style.padding = '15px 0';
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.padding = '20px 0';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop;
});

const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        if (this.classList.contains('primary-btn')) {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 6px 20px rgba(108, 92, 231, 0.6)';
        } else {
            this.style.transform = 'translateY(-3px)';
        }
    });
    
    button.addEventListener('mouseleave', function() {
        if (this.classList.contains('primary-btn')) {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(108, 92, 231, 0.4)';
        } else {
            this.style.transform = 'translateY(0)';
        }
    });
});

const primaryBtn = document.querySelector('.primary-btn');
if (primaryBtn) {
    primaryBtn.addEventListener('click', function() {
        document.querySelector('#contact').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });
}

const secondaryBtn = document.querySelector('.secondary-btn');
if (secondaryBtn) {
    secondaryBtn.addEventListener('click', function() {
        document.querySelector('#services').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });
}