document.addEventListener("DOMContentLoaded", () => {
    // ---- TYPING EFFECT ----
    const nameElement = document.getElementById("heroName");
    const titleElement = document.getElementById("heroTitle");
    const nameText = "Bekithemba Mrwetyana";
    const titleText = "Aspiring Software Developer";

    let nameIndex = 0;
    let titleIndex = 0;

    function typeName() {
        if (nameIndex < nameText.length) {
            nameElement.textContent = nameText.substring(0, nameIndex + 1);
            nameElement.classList.add("type-cursor");
            nameIndex++;
            setTimeout(typeName, 60);
        } else {
            nameElement.classList.remove("type-cursor");
            setTimeout(typeTitle, 300);
        }
    }

    function typeTitle() {
        if (titleIndex < titleText.length) {
            titleElement.textContent = titleText.substring(0, titleIndex + 1);
            titleElement.classList.add("type-cursor");
            titleIndex++;
            setTimeout(typeTitle, 50);
        } else {
            titleElement.classList.remove("type-cursor");
        }
    }

    typeName();

    // ---- SCROLL ANIMATIONS WITH INTERSECTION OBSERVER ----
    const animateElements = document.querySelectorAll(".scroll-animate");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px",
        },
    );

    animateElements.forEach((el) => observer.observe(el));

    // Also observe stagger children containers
    const staggerContainers = document.querySelectorAll(".stagger-children");
    const staggerObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px",
        },
    );

    staggerContainers.forEach((el) => staggerObserver.observe(el));

    // ---- Mobile menu ----
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            const isActive = navLinks.classList.toggle("active");
            menuToggle.setAttribute("aria-expanded", isActive);
        });
    }
    document.querySelectorAll(".nav-links a").forEach((l) =>
        l.addEventListener("click", () => {
            navLinks.classList.remove("active");
            if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
        }),
    );

    // ---- Smooth scroll ----
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (href === "#" || href === "") return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });
                history.pushState(null, null, href);
            }
        });
    });

    // ---- Resume toast ----
    document.getElementById("resumeBtn")?.addEventListener("click", (e) => {
        e.preventDefault();
        showToast("Resume download demo — contact me for the actual PDF.");
    });

    const form = document.getElementById("contactForm");
    const toast = document.getElementById("toastMsg");

    function showToast(msg) {
        toast.textContent = msg;
        toast.style.opacity = "1";
        setTimeout(() => (toast.style.opacity = "0"), 3000);
    }

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("name")?.value.trim();
            const email = document.getElementById("email")?.value.trim();
            const message = document.getElementById("message")?.value.trim();
            if (name && email && message) {
                showToast(`Thanks ${name}! I'll get back soon.`);
                form.reset();
            } else {
                showToast("Please fill all fields");
            }
        });
    }

    // ---- DARK MODE ----
    const darkToggle = document.getElementById("darkToggle");
    const darkIcon = darkToggle?.querySelector("i");

    // Check for saved preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        darkIcon?.classList.replace("fa-moon", "fa-sun");
    }

    darkToggle?.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        // Toggle icon
        if (document.body.classList.contains("dark-mode")) {
            darkIcon?.classList.replace("fa-moon", "fa-sun");
            localStorage.setItem("theme", "dark");
        } else {
            darkIcon?.classList.replace("fa-sun", "fa-moon");
            localStorage.setItem("theme", "light");
        }
    });
});
