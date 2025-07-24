// Mobile Menu Toggle
function hamburg() {
    const navbar = document.querySelector(".dropdown");
    navbar.classList.add("active");
    document.body.style.overflow = "hidden";
}

function cancel() {
    const navbar = document.querySelector(".dropdown");
    navbar.classList.remove("active");
    document.body.style.overflow = "auto";
}

// Typewriter Effect
const texts = [
    "WEB-DESIGNER",
    "Front-End Developer",
    "Back-End Developer",
    "UI/UX Developer"
];
let speed = 100;
const textElement = document.querySelector(".typewriter-text");
let textIndex = 0;
let charIndex = 0;

function typeWriter() {
    if (charIndex < texts[textIndex].length) {
        textElement.innerHTML += texts[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, speed);
    } else {
        setTimeout(eraseText, 1000);
    }
}

function eraseText() {
    if (textElement.innerHTML.length > 0) {
        textElement.innerHTML = textElement.innerHTML.slice(0, -1);
        setTimeout(eraseText, 50);
    } else {
        textIndex = (textIndex + 1) % texts.length;
        charIndex = 0;
        setTimeout(typeWriter, 500);
    }
}

window.onload = typeWriter;

// Navigation Active State
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('section');

function setActiveNavItem() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === current) {
            item.classList.add('active');
        }
    });
}

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = item.getAttribute('data-section');
        const section = document.getElementById(sectionId);
        
        // Close mobile menu if open
        if (window.innerWidth <= 992) {
            cancel();
        }
        
        window.scrollTo({
            top: section.offsetTop,
            behavior: 'smooth'
        });
    });
});

// Sticky Header
window.onscroll = function() {
    setActiveNavItem();
    stickyHeader();
};

const header = document.querySelector("header");
const sticky = header.offsetTop;

function stickyHeader() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}

// Initialize AOS
AOS.init({
    offset: 0,
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const dropdown = document.querySelector('.dropdown');
    const hamburger = document.querySelector('.hamburg');
    
    if (dropdown.classList.contains('active') && 
        !dropdown.contains(e.target) && 
        e.target !== hamburger) {
        cancel();
    }
});

// Filter buttons for portfolio
const filterButtons = document.querySelectorAll('.bt1');
const portBoxes = document.querySelectorAll('.port-box');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.textContent.trim().toLowerCase();
        
        portBoxes.forEach(box => {
            if (filterValue === 'all') {
                box.style.display = 'block';
            } else {
                const boxCategory = box.querySelector('h3').textContent.trim().toLowerCase();
                if (boxCategory.includes(filterValue)) {
                    box.style.display = 'block';
                } else {
                    box.style.display = 'none';
                }
            }
        });
    });
});

// Set first filter button as active by default
if (filterButtons.length > 0) {
    filterButtons[0].classList.add('active');
}
