document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MOBILE MENU
    ========================================= */

    const menuButton = document.getElementById("menuButton");
    const navLinks = document.getElementById("navLinks");

    if (menuButton && navLinks) {

        menuButton.addEventListener("click", () => {

            navLinks.classList.toggle("active");

            menuButton.textContent =
                navLinks.classList.contains("active")
                    ? "×"
                    : "☰";
        });


        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                menuButton.textContent = "☰";
            });

        });

    }


    /* =========================================
       ПРОЕКТИ
    ========================================= */

    const projects = {

        project1: {

            title: "Проект 01",

            images: [
                "images/IMG_6547.jpeg",
                "images/IMG_6548.jpeg"
            ]

        },


        project2: {

            title: "Проект 02",

            images: [
                "images/IMG_6549.jpeg",
                "images/IMG_6550.jpeg",
                "images/IMG_6551.jpeg"
            ]

        },


        project3: {

            title: "Проект 03",

            images: [
                "images/IMG_6552.jpeg",
                "images/IMG_6553.jpeg",
                "images/IMG_6554.jpeg"
            ]

        },


        project4: {

            title: "Проект 04",

            images: [
                "images/IMG_6555.jpeg",
                "images/IMG_6556.jpeg",
                "images/IMG_6557.jpeg"
            ]

        }

    };


    /* =========================================
       GALLERY ELEMENTS
    ========================================= */

    const modal =
        document.getElementById("galleryModal");

    const backdrop =
        document.getElementById("galleryBackdrop");

    const closeButton =
        document.getElementById("galleryClose");

    const title =
        document.getElementById("galleryTitle");

    const counter =
        document.getElementById("galleryCounter");

    const galleryImage =
        document.getElementById("galleryImage");

    const previousButton =
        document.getElementById("galleryPrevious");

    const nextButton =
        document.getElementById("galleryNext");

    const thumbnails =
        document.getElementById("galleryThumbnails");

    const projectCards =
        document.querySelectorAll(".project-card");


    /* =========================================
       SMOOTH SCROLL ANIMATIONS
    ========================================= */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    const revealGroups = [

        {
            selector: ".intro-image",
            type: "left"
        },

        {
            selector: ".intro-text",
            type: "right"
        },

        {
            selector:
                ".section-heading, " +
                ".about-statement > div, " +
                ".cta > div, " +
                ".contact > div, " +
                ".portfolio-hero",

            type: "up"
        },

        {
            selector:
                ".featured-project, " +
                ".number-box, " +
                ".process-box, " +
                ".about-value-card, " +
                ".portfolio-card",

            type: "up",

            stagger: true
        },

        {
            selector: ".about-intro-image",
            type: "left"
        },

        {
            selector: ".about-intro-content",
            type: "right"
        }

    ];


    const revealElements = [];

    const seenRevealElements =
        new Set();


    revealGroups.forEach(group => {

        document
            .querySelectorAll(group.selector)
            .forEach((element, index) => {

                if (
                    seenRevealElements.has(element)
                ) {
                    return;
                }


                seenRevealElements.add(element);


                element.classList.add(
                    "reveal-ready"
                );


                element.dataset.reveal =
                    group.type;


                if (group.stagger) {

                    const delay =
                        Math.min(
                            index % 4,
                            3
                        ) * 90;


                    element.style.setProperty(
                        "--reveal-delay",
                        `${delay}ms`
                    );

                }


                revealElements.push(
                    element
                );

            });

    });


    function revealElement(element) {

        requestAnimationFrame(() => {

            element.classList.add(
                "is-visible"
            );

        });

    }


    if (
        prefersReducedMotion ||
        !("IntersectionObserver" in window)
    ) {

        revealElements.forEach(
            revealElement
        );

    } else {

        const revealObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        revealElement(
                            entry.target
                        );


                        revealObserver.unobserve(
                            entry.target
                        );

                    });

                },

                {
                    threshold: 0.14,

                    rootMargin:
                        "0px 0px -7% 0px"
                }

            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

    }


    /* =========================================
       GALLERY CHECK
    ========================================= */

    /*
       ВАЖНО:
       Scroll animations са ПРЕДИ този return.
       Така работят и на index.html/about.html,
       дори страницата да няма gallery modal.
    */

    if (
        !modal ||
        !galleryImage ||
        !thumbnails ||
        projectCards.length === 0
    ) {

        return;
    }


    let currentProject = null;
    let currentIndex = 0;


    /* =========================================
       OPEN GALLERY
    ========================================= */

    function openGallery(projectID) {

        const selectedProject =
            projects[projectID];


        if (!selectedProject) {
            return;
        }


        currentProject =
            selectedProject;


        currentIndex = 0;


        if (title) {

            title.textContent =
                currentProject.title;

        }


        buildThumbnails();

        showCurrentImage();


        modal.classList.add(
            "active"
        );


        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow =
            "hidden";

    }


    /* =========================================
       CLOSE GALLERY
    ========================================= */

    function closeGallery() {

        modal.classList.remove(
            "active"
        );


        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow =
            "";


        currentProject = null;

    }


    /* =========================================
       SHOW IMAGE
    ========================================= */

    function showCurrentImage() {

        if (!currentProject) {
            return;
        }


        const imagePath =
            currentProject.images[
                currentIndex
            ];


        /*
           Малък transition при смяна
           на снимката.
        */

        galleryImage.style.opacity =
            "0";


        galleryImage.style.transform =
            "scale(0.985)";


        setTimeout(() => {

            galleryImage.src =
                imagePath;


            galleryImage.alt =
                `${currentProject.title} - снимка ${currentIndex + 1}`;


            requestAnimationFrame(() => {

                galleryImage.style.opacity =
                    "1";


                galleryImage.style.transform =
                    "scale(1)";

            });

        }, 110);


        if (counter) {

            counter.textContent =
                `${currentIndex + 1} / ${currentProject.images.length}`;

        }


        updateActiveThumbnail();

    }


    /* =========================================
       BUILD THUMBNAILS
    ========================================= */

    function buildThumbnails() {

        thumbnails.innerHTML =
            "";


        currentProject.images.forEach(
            (imagePath, index) => {

                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";


                button.className =
                    "gallery-thumbnail";


                button.setAttribute(
                    "aria-label",
                    `Покажи снимка ${index + 1}`
                );


                const img =
                    document.createElement(
                        "img"
                    );


                img.src =
                    imagePath;


                img.alt =
                    `Снимка ${index + 1}`;


                button.appendChild(
                    img
                );


                button.addEventListener(
                    "click",
                    event => {

                        event.stopPropagation();


                        currentIndex =
                            index;


                        showCurrentImage();

                    }
                );


                thumbnails.appendChild(
                    button
                );

            }

        );

    }


    /* =========================================
       ACTIVE THUMBNAIL
    ========================================= */

    function updateActiveThumbnail() {

        const thumbnailButtons =
            thumbnails.querySelectorAll(
                ".gallery-thumbnail"
            );


        thumbnailButtons.forEach(
            (button, index) => {

                button.classList.toggle(
                    "active",
                    index === currentIndex
                );

            }
        );

    }


    /* =========================================
       NEXT
    ========================================= */

    function nextImage() {

        if (!currentProject) {
            return;
        }


        currentIndex++;


        if (
            currentIndex >=
            currentProject.images.length
        ) {

            currentIndex = 0;

        }


        showCurrentImage();

    }


    /* =========================================
       PREVIOUS
    ========================================= */

    function previousImage() {

        if (!currentProject) {
            return;
        }


        currentIndex--;


        if (currentIndex < 0) {

            currentIndex =
                currentProject.images.length - 1;

        }


        showCurrentImage();

    }


    /* =========================================
       PROJECT CLICK
    ========================================= */

    projectCards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const projectID =
                    card.dataset.project;


                openGallery(
                    projectID
                );

            }
        );


        card.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();


                    const projectID =
                        card.dataset.project;


                    openGallery(
                        projectID
                    );

                }

            }
        );

    });


    /* =========================================
       NEXT ARROW
    ========================================= */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                nextImage();

            }
        );

    }


    /* =========================================
       PREVIOUS ARROW
    ========================================= */

    if (previousButton) {

        previousButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                previousImage();

            }
        );

    }


    /* =========================================
       CLOSE BUTTON
    ========================================= */

    if (closeButton) {

        closeButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                closeGallery();

            }
        );

    }


    /* =========================================
       BACKDROP
    ========================================= */

    if (backdrop) {

        backdrop.addEventListener(
            "click",
            closeGallery
        );

    }


    /* =========================================
       KEYBOARD
    ========================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !modal.classList.contains(
                    "active"
                )
            ) {
                return;
            }


            if (
                event.key ===
                "ArrowRight"
            ) {

                nextImage();

            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                previousImage();

            }


            if (
                event.key ===
                "Escape"
            ) {

                closeGallery();

            }

        }
    );


    /* =========================================
       MOBILE SWIPE
    ========================================= */

    let startX = 0;


    galleryImage.addEventListener(
        "touchstart",
        event => {

            startX =
                event
                    .changedTouches[0]
                    .clientX;

        },
        {
            passive: true
        }
    );


    galleryImage.addEventListener(
        "touchend",
        event => {

            const endX =
                event
                    .changedTouches[0]
                    .clientX;


            const difference =
                startX - endX;


            if (
                difference > 50
            ) {

                nextImage();

            }


            if (
                difference < -50
            ) {

                previousImage();

            }

        },
        {
            passive: true
        }
    );

});