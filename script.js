/* =====================================================
   THE INITIATIVE
   SCRIPT.JS
===================================================== */


/* =====================================================
   SMOOTH SCROLLING
===================================================== */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetID =
                    this.getAttribute("href");

                const target =
                    document.querySelector(targetID);

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });



/* =====================================================
   NAVBAR SHADOW
===================================================== */

const navbar =
    document.querySelector(".navbar");


window.addEventListener(
    "scroll",
    function () {

        if (window.scrollY > 50) {

            navbar.style.boxShadow =
                "0 8px 30px rgba(0,0,0,0.10)";

        } else {

            navbar.style.boxShadow =
                "none";

        }

    }
);



/* =====================================================
   TABLE OF CONTENTS LINK EFFECT
===================================================== */

const contentsLinks =
    document.querySelectorAll(
        ".contents-link"
    );


contentsLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function () {

                const targetID =
                    this.getAttribute("href");

                const target =
                    document.querySelector(targetID);

                if (!target) {
                    return;
                }

                target.classList.add(
                    "essay-focus"
                );


                setTimeout(
                    function () {

                        target.classList.remove(
                            "essay-focus"
                        );

                    },
                    1800
                );

            }
        );

    }
);



/* =====================================================
   ESSAY FOCUS ANIMATION
===================================================== */

const focusStyle =
    document.createElement("style");


focusStyle.innerHTML = `

    .essay-focus {
        animation:
            essayFocus 1.8s ease;
    }

    @keyframes essayFocus {

        0% {
            transform: translateY(0);
            box-shadow:
                0 30px 80px
                rgba(0,0,0,0.30);
        }

        30% {
            transform: translateY(-8px);
            box-shadow:
                0 35px 90px
                rgba(0,0,0,0.45);
        }

        100% {
            transform: translateY(0);
            box-shadow:
                0 30px 80px
                rgba(0,0,0,0.30);
        }

    }

`;

document.head.appendChild(
    focusStyle
);



/* =====================================================
   FADE-IN CARDS
===================================================== */

const cards =
    document.querySelectorAll(
        ".about-card, .takeaway-card, .contributor-card, .contents-category"
    );


const observer =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(
                function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


cards.forEach(
    function (card) {

        card.style.opacity = "0";

        card.style.transform =
            "translateY(25px)";

        card.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";

        observer.observe(card);

    }
);



/* =====================================================
   CURRENT SECTION TRACKING
===================================================== */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navLinks =
    document.querySelectorAll(
        ".navbar nav a"
    );


window.addEventListener(
    "scroll",
    function () {

        let current = "";


        sections.forEach(
            function (section) {

                const sectionTop =
                    section.offsetTop - 160;

                const sectionBottom =
                    sectionTop +
                    section.offsetHeight;


                if (
                    window.scrollY >= sectionTop &&
                    window.scrollY < sectionBottom
                ) {

                    current =
                        section.getAttribute("id");

                }

            }
        );


        navLinks.forEach(
            function (link) {

                link.classList.remove(
                    "active"
                );


                if (
                    link.getAttribute("href") ===
                    "#" + current
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    }
);



/* =====================================================
   PAGE LOADED
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "The Initiative for Human and Environmental Wellbeing is ready."
        );

    }
);
