// Initialize Locomotive Scroll with responsive settings
function initSmoothScroll() {
    gsap.registerPlugin(ScrollTrigger);
    
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
        smartphone: {
            smooth: true,
            breakpoint: 768
        },
        tablet: {
            smooth: true,
            breakpoint: 1024
        }
    });
    
    locoScroll.on("scroll", ScrollTrigger.update);
    
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
    
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
}

// Mobile menu toggle
function setupMobileMenu() {
    const menuToggle = document.querySelector('#mobile-menu-toggle');
    const mobileMenu = document.createElement('div');
    mobileMenu.id = 'mobile-menu';
    mobileMenu.innerHTML = `
        <a href="#page1">Home</a>
        <a href="#page2">About</a>
        <a href="#page3">Video</a>
        <a href="#page4">Flavors</a>
        <a href="#page5">Availability</a>
        <a href="#page6">Recipes</a>
        <button>Buy Beer</button>
    `;
    document.body.appendChild(mobileMenu);
    
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
    });
    
    // Close menu when clicking on links
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}

// Animations
function setupAnimations() {
    // Initial animations
    let tl = gsap.timeline();
    tl.from("#page1_dog_image", {
        opacity: 0,
        duration: 1,
        scale: 0.1,
        ease: "back.out(1.7)"
    })
    .from("#bottle", {
        opacity: 0,
        duration: 1,
        scale: 0.2,
        ease: "back.out(1.7)"
    }, "-=0.5")
    .from("#nav_top button", {
        xPercent: 200,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.5");
    
    // Scroll animations
    gsap.to("#bottle", {
        rotate: -15,
        scrollTrigger: {
            trigger: "#bottle",
            scroller: "#main",
            start: "top 5%",
            end: "top -416%",
            scrub: true,
            pin: true
        }
    });
    
    gsap.to("#bottle", {
        scale: 0.5,
        scrollTrigger: {
            trigger: "#page5 h1",
            scroller: "#main",
            start: "top 430%",
            end: "top -430%",
            scrub: true,
            pin: true
        }
    });
    
    gsap.from("#page2_part1 button", {
        xPercent: -300,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#page2_part1 button",
            scroller: "#main",
            start: "top 70%",
            toggleActions: "play none none none"
        }
    });
    
    gsap.from("#page6_part2 button", {
        xPercent: 300,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#page6_part2 button",
            scroller: "#main",
            start: "top 70%",
            toggleActions: "play none none none"
        }
    });
    
    // Flavor items animation
    gsap.utils.toArray(".flavor-item").forEach((item, i) => {
        gsap.from(item, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            scrollTrigger: {
                trigger: item,
                scroller: "#main",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            delay: i * 0.2
        });
    });
    
    // Bottle items animation
    gsap.utils.toArray(".bottle-item").forEach((item, i) => {
        gsap.from(item, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            scrollTrigger: {
                trigger: item,
                scroller: "#main",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            delay: i * 0.1
        });
    });
}

// Responsive adjustments
function handleResponsiveChanges() {
    function checkScreenSize() {
        if (window.innerWidth < 768) {
            // Mobile adjustments
            gsap.set("#bottle", { scale: 0.7 });
        } else {
            // Desktop adjustments
            gsap.set("#bottle", { scale: 1 });
        }
    }
    
    // Run on load and resize
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    setupMobileMenu();
    setupAnimations();
    handleResponsiveChanges();
});
