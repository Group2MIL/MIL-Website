/* =========================================================
   THE INITIATIVE FOR HUMAN & ENVIRONMENTAL WELLBEING
   JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    const navbar = document.getElementById("navbar");

    function updateNavbar() {

        if (window.scrollY > 50) {
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

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });

    }


    /* =====================================================
       CLOSE MOBILE MENU AFTER CLICKING A LINK
    ===================================================== */

    const navigationLinks = document.querySelectorAll(
        ".nav-links a"
    );

    navigationLinks.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

        });

    });


    /* =====================================================
       REVEAL ON SCROLL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);

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


    /* =====================================================
       SMOOTH SCROLL WITH NAVBAR OFFSET
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function(event) {

            const targetId =
                this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const navbarHeight =
                navbar.offsetHeight;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight -
                15;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections = document.querySelectorAll(
        "section[id]"
    );

    const navAnchors = document.querySelectorAll(
        ".nav-links > a"
    );

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop -
                navbar.offsetHeight -
                150;

            const sectionBottom =
                sectionTop +
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {
                currentSection = section.id;
            }

        });

        navAnchors.forEach(anchor => {

            anchor.classList.remove("active");

            const href =
                anchor.getAttribute("href");

            if (href === "#" + currentSection) {
                anchor.classList.add("active");
            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

    updateActiveNavigation();


    /* =====================================================
       ESSAY CARD STAGGER ANIMATION
    ===================================================== */

    const cards =
        document.querySelectorAll(
            ".essay-card, .person-card, .topic-link-group"
        );

    cards.forEach((card, index) => {

        card.style.transitionDelay =
            `${(index % 3) * 0.08}s`;

    });


    /* =====================================================
       IMAGE ERROR HANDLING
    ===================================================== */

    document.querySelectorAll("img").forEach(image => {

        image.addEventListener("error", () => {

            image.style.background =
                "linear-gradient(135deg, #d9dfd7, #b7c5b9)";

            image.alt =
                "Contributor photograph";

        });

    });


    /* =====================================================
       ESCAPE KEY CLOSES MOBILE MENU
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            navLinks.classList.remove("active");
        }

    });

});
