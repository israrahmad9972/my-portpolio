/* ================= PORTFOLIO JAVASCRIPT ================= */

/* ---------- 1. Navbar Scroll Shadow ---------- */
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


/* ---------- 2. Active Nav Link on Scroll ---------- */
const sections = document.querySelectorAll("section, main");
const navLinks = document.querySelectorAll(".navitem a");

window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
});


/* ---------- 3. Skills Progress Bar Animation ---------- */
const skillBars = document.querySelectorAll(".skill-bar");
const skillsSection = document.querySelector("#skills");
let skillsAnimated = false;

window.addEventListener("scroll", () => {
    const sectionTop = skillsSection.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight / 1.3;

    if (sectionTop < triggerPoint && !skillsAnimated) {
        skillBars.forEach(bar => {
            const percent = bar.getAttribute("data-percent");
            bar.style.width = percent + "%";
        });
        skillsAnimated = true;
    }
});


/* ---------- 4. Reveal Sections on Scroll ---------- */
const revealElements = document.querySelectorAll(
    ".about, .skills, .projects, .contact, .footer"
);

const revealOnScroll = () => {
    revealElements.forEach(el => {
        const top = el.getBoundingClientRect().top;
        const visiblePoint = window.innerHeight - 100;

        if (top < visiblePoint) {
            el.classList.add("reveal-active");
        }
    });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


/* ---------- 5. Smooth Scroll Fix for Anchor Click ---------- */
navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        const targetId = link.getAttribute("href");

        if (targetId.startsWith("#")) {
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            const offsetTop = targetSection.offsetTop - 80;

            window.scrollTo({
                top: offsetTop,
                behavior: "smooth"
            });
        }
    });
});


/* ---------- 6. Contact Form Validation ---------- */
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = contactForm.querySelector("#name").value.trim();
        const email = contactForm.querySelector("#email").value.trim();
        const message = contactForm.querySelector("#message").value.trim();

        if (!name || !email || !message) {
            alert("⚠️ Please fill all fields");
            return;
        }

        if (!validateEmail(email)) {
            alert("⚠️ Please enter a valid email address");
            return;
        }

        alert("✅ Message sent successfully!");
        contactForm.reset();
    });
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


/* ---------- 7. Mobile Navbar Toggle ---------- */
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    // Close menu when clicking any nav link (mobile)
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });
    });
}
