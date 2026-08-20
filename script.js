/* =====================================================
   MOBILE MENU
===================================================== */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("active");

    if (mainNav.classList.contains("active")) {
        menuToggle.textContent = "✕";
    } else {
        menuToggle.textContent = "☰";
    }
});


/* =====================================================
   CLOSE MOBILE MENU AFTER CLICKING A LINK
===================================================== */

const navLinks = document.querySelectorAll("#mainNav a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        mainNav.classList.remove("active");

        menuToggle.textContent = "☰";

    });

});


/* =====================================================
   NAVBAR SCROLL EFFECT
===================================================== */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.style.boxShadow =
            "0 8px 30px rgba(30, 45, 35, 0.08)";

    } else {

        navbar.style.boxShadow = "none";

    }

});


/* =====================================================
   REVEAL ANIMATION
===================================================== */

const revealElements = document.querySelectorAll(
    ".bio-card, .essay-link-card, .about-content, .rationale-box"
);

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("revealed");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* =====================================================
   ADD REVEAL STYLES
===================================================== */

const revealStyle = document.createElement("style");

revealStyle.textContent = `

    .reveal {
        opacity: 0;
        transform: translateY(25px);
        transition:
            opacity 0.7s ease,
            transform 0.7s ease;
    }

    .reveal.revealed {
        opacity: 1;
        transform: translateY(0);
    }

`;

document.head.appendChild(revealStyle);


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections = document.querySelectorAll(
    "section[id]"
);

const navigationLinks = document.querySelectorAll(
    "#mainNav a"
);

const activeObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                navigationLinks.forEach(link => {
                    link.classList.remove("active-link");
                });

                const activeLink =
                    document.querySelector(
                        `#mainNav a[href="#${entry.target.id}"]`
                    );

                if (activeLink) {
                    activeLink.classList.add("active-link");
                }

            }

        });

    },
    {
        rootMargin: "-35% 0px -60% 0px"
    }
);


sections.forEach(section => {
    activeObserver.observe(section);
});


/* =====================================================
   SMOOTH ESSAY LINK TRANSITION
===================================================== */

document.querySelectorAll(".essay-link-card").forEach(card => {

    card.addEventListener("click", function () {

        const targetID = this.getAttribute("href");

        const target = document.querySelector(targetID);

        if (target) {

            setTimeout(() => {

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 50);

        }

    });

});
