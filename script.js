/* =========================================================
   THE INITIATIVE FOR HUMAN AND ENVIRONMENTAL WELLBEING
   MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       NAVBAR
       ===================================================== */

    const navbar = document.querySelector(".navbar");

    function updateNavbar() {
        if (!navbar) return;

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateNavbar);
    updateNavbar();


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("open");

            const isOpen = navLinks.classList.contains("open");

            menuToggle.setAttribute("aria-expanded", isOpen);

            const spans = menuToggle.querySelectorAll("span");

            if (isOpen) {
                if (spans.length >= 3) {
                    spans[0].style.transform = "translateY(7px) rotate(45deg)";
                    spans[1].style.opacity = "0";
                    spans[2].style.transform = "translateY(-7px) rotate(-45deg)";
                }
            } else {
                spans.forEach(span => {
                    span.style.transform = "";
                    span.style.opacity = "";
                });
            }
        });


        /* Close mobile menu when a link is clicked */

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {
                navLinks.classList.remove("open");

                menuToggle.setAttribute("aria-expanded", "false");

                navLinks.querySelectorAll("span").forEach(span => {
                    span.style.transform = "";
                    span.style.opacity = "";
                });
            });

        });

    }


    /* =====================================================
       SMOOTH SCROLLING
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const navbarHeight = navbar
                ? navbar.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight -
                10;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       SCROLL REVEAL ANIMATIONS
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".topic-card, .bio-card, .about-text, .about-image, .article-content, .article-header, .section-heading, .references"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });


    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* =====================================================
       ACTIVE NAVIGATION LINK
       ===================================================== */

    const sections = document.querySelectorAll("section[id]");
    const navigationLinks = document.querySelectorAll(
        ".nav-links a[href^='#']"
    );

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 160;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navigationLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", updateActiveNavigation);
    updateActiveNavigation();


    /* =====================================================
       TABLE OF CONTENTS ACTIVE STATE
       ===================================================== */

    const tocLinks = document.querySelectorAll(
        ".toc-links a[href^='#']"
    );

    const tocSections = [];

    tocLinks.forEach(link => {

        const targetId = link.getAttribute("href");

        const target = document.querySelector(targetId);

        if (target) {
            tocSections.push({
                element: target,
                link: link
            });
        }

    });

    function updateTOC() {

        let current = null;

        tocSections.forEach(item => {

            const top =
                item.element.getBoundingClientRect().top;

            if (top <= 180) {
                current = item;
            }

        });

        tocLinks.forEach(link => {
            link.classList.remove("active");
        });

        if (current) {
            current.link.classList.add("active");
        }

    }

    if (tocSections.length) {
        window.addEventListener("scroll", updateTOC);
        updateTOC();
    }


    /* =====================================================
       BACK TO TOP BUTTON
       ===================================================== */

    let backToTop = document.querySelector(".back-to-top");

    if (!backToTop) {

        backToTop = document.createElement("button");

        backToTop.className = "back-to-top";
        backToTop.type = "button";
        backToTop.setAttribute(
            "aria-label",
            "Back to top"
        );

        backToTop.innerHTML = "↑";

        document.body.appendChild(backToTop);

    }


    function updateBackToTop() {

        if (window.scrollY > 500) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    }

    window.addEventListener("scroll", updateBackToTop);

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* =====================================================
       EXTERNAL LINKS
       ===================================================== */

    document.querySelectorAll(
        'a[href^="http://"], a[href^="https://"]'
    ).forEach(link => {

        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");

    });


    /* =====================================================
       IMAGE FALLBACK
       ===================================================== */

    document.querySelectorAll("img").forEach(image => {

        image.addEventListener("error", () => {

            image.style.display = "none";

            const parent = image.parentElement;

            if (parent) {
                parent.classList.add("image-missing");
            }

        });

    });


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    document.querySelectorAll(".current-year").forEach(element => {
        element.textContent = new Date().getFullYear();
    });


    /* =====================================================
       KEYBOARD ACCESSIBILITY FOR MOBILE MENU
       ===================================================== */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            navLinks &&
            navLinks.classList.contains("open")
        ) {

            navLinks.classList.remove("open");

            if (menuToggle) {
                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle
                    .querySelectorAll("span")
                    .forEach(span => {
                        span.style.transform = "";
                        span.style.opacity = "";
                    });
            }

        }

    });


    /* =====================================================
       LAZY LOAD IMAGES
       ===================================================== */

    document.querySelectorAll("img").forEach(image => {

        if (!image.hasAttribute("loading")) {
            image.setAttribute("loading", "lazy");
        }

    });


    /* =====================================================
       CONSOLE MESSAGE
       ===================================================== */

    console.log(
        "The Initiative for Human and Environmental Wellbeing website loaded successfully."
    );

});
