/* =====================================================
   SMOOTH SCROLL
===================================================== */

document.querySelectorAll('a[href^="#"]').forEach(function(link) {

    link.addEventListener("click", function(event) {

        const targetId = this.getAttribute("href");

        if (targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


/* =====================================================
   NAVBAR SHADOW
===================================================== */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function() {

    if (window.scrollY > 30) {

        navbar.style.boxShadow =
            "0 8px 30px rgba(0,0,0,0.08)";

    } else {

        navbar.style.boxShadow = "none";

    }

});


/* =====================================================
   REVEAL ANIMATION
===================================================== */

const revealElements = document.querySelectorAll(
    ".essay-card, .topic-box, .contributor-card, .category-heading"
);

const revealObserver = new IntersectionObserver(
    function(entries) {

        entries.forEach(function(entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.08
    }
);


revealElements.forEach(function(element) {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections = document.querySelectorAll(
    "#about, #rationale, #contents, #education, #health, #environment, #contributors"
);

const navLinks = document.querySelectorAll(".navbar nav a");

window.addEventListener("scroll", function() {

    let currentSection = "";

    sections.forEach(function(section) {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            currentSection = section.getAttribute("id");

        }

    });


    navLinks.forEach(function(link) {

        link.style.opacity = "0.6";

        if (
            link.getAttribute("href") === "#" + currentSection
        ) {

            link.style.opacity = "1";

        }

    });

});


/* =====================================================
   PAGE LOAD
===================================================== */

window.addEventListener("load", function() {

    document.body.classList.add("loaded");

});
