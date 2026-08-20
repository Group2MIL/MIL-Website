/* =========================================================
   THE INITIATIVE
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       NAVIGATION
    ====================================================== */

    const navbar = document.querySelector(".navbar");
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");


    /* -----------------------------------------------------
       Mobile Menu
    ----------------------------------------------------- */

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                navMenu.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

            menuToggle.classList.toggle(
                "active",
                isOpen
            );

        });

    }


    /* -----------------------------------------------------
       Close menu after clicking a link
    ----------------------------------------------------- */

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            if (navMenu) {
                navMenu.classList.remove("open");
            }

            if (menuToggle) {
                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.classList.remove("active");
            }

        });

    });


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ====================================================== */

    function updateNavbar() {

        if (!navbar) {
            return;
        }

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    }

    updateNavbar();

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );


    /* =====================================================
       ACTIVE NAVIGATION
    ====================================================== */

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    function updateActiveNavigation() {

        let currentSection = "";

        const scrollPosition =
            window.scrollY + 150;

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                    sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach((link) => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

    }

    updateActiveNavigation();

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );


    /* =====================================================
       SMOOTH SCROLL
    ====================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((anchor) => {

            anchor.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    const navbarHeight =
                        navbar
                            ? navbar.offsetHeight
                            : 0;

                    const targetPosition =
                        target.getBoundingClientRect().top +
                        window.pageYOffset -
                        navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });

                }
            );

        });


    /* =====================================================
       REVEAL ANIMATIONS
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            ".topic-card, .bio-card, .essay-content"
        );


    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries, observerInstance) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observerInstance.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.08
                }
            );


        revealElements.forEach((element) => {
            observer.observe(element);
        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("visible");
        });

    }


    /* =====================================================
       CURRENT YEAR
    ====================================================== */

    const currentYear =
        document.getElementById(
            "currentYear"
        );

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       IMAGE FALLBACK
       
       If an autobiography image cannot be found,
       the card won't completely break.
    ====================================================== */

    const images =
        document.querySelectorAll(
            ".bio-image img"
        );


    images.forEach((image) => {

        image.addEventListener(
            "error",
            () => {

                image.style.display =
                    "none";

                image.parentElement.classList.add(
                    "image-missing"
                );

            }
        );

    });


    /* =====================================================
       ESC KEY — CLOSE MOBILE MENU
    ====================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                navMenu
            ) {

                navMenu.classList.remove(
                    "open"
                );

                if (menuToggle) {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        }
    );

});
