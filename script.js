/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", function () {

        navLinks.classList.toggle("open");

    });

}


/* =====================================================
   CLOSE MOBILE NAVIGATION
===================================================== */

document.querySelectorAll(".nav-links a").forEach(function (link) {

    link.addEventListener("click", function () {

        if (navLinks) {
            navLinks.classList.remove("open");
        }

    });

});


/* =====================================================
   SMOOTH SCROLL
===================================================== */

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") {
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
   ACTIVE NAVIGATION
===================================================== */

const sections = document.querySelectorAll(
    "#education, #health, #environment, #contributors, #references"
);

const links = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver(

    function (entries) {

        entries.forEach(function (entry) {

            if (!entry.isIntersecting) {
                return;
            }

            links.forEach(function (link) {

                link.classList.remove("active");

            });

            const activeLink = document.querySelector(
                '.nav-links a[href="#' +
                entry.target.id +
                '"]'
            );

            if (activeLink) {

                activeLink.classList.add("active");

            }

        });

    },

    {
        rootMargin: "-35% 0px -55% 0px"
    }

);

sections.forEach(function (section) {

    observer.observe(section);

});


/* =====================================================
   ESSAY REVEAL
===================================================== */

const essayElements = document.querySelectorAll(
    ".individual-essay, .essay-link, .topic-card, .contributor-card"
);

const revealObserver = new IntersectionObserver(

    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.08
    }

);

essayElements.forEach(function (element) {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* =====================================================
   PAGE LOAD
===================================================== */

window.addEventListener("load", function () {

    document.body.classList.add("loaded");

});
