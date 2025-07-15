import "../scss/main.scss";

// Mobile menu
const body = document.querySelector("body");
const burgerBtn = document.querySelector(".site-header__mobile-menu");
const menu = document.querySelector(".site-header__nav-menu");

burgerBtn &&
    burgerBtn.addEventListener("click", () => {
        body.classList.toggle("no-scroll");
        burgerBtn.classList.toggle("active");
        menu.classList.toggle("active");

        const isExpanded = burgerBtn.getAttribute("aria-expanded") === "true";
        burgerBtn.setAttribute("aria-expanded", isExpanded ? "false" : "true");
        burgerBtn.setAttribute(
            "aria-label",
            isExpanded ? "Открыть мобильное меню" : "Закрыть мобильное меню"
        );
    });

// Parallax effect
const parallaxSections = document.querySelectorAll(".technologies__item");
const visibleSections = new Set();

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            const section = entry.target;
            if (entry.isIntersecting) {
                visibleSections.add(section);
            } else {
                visibleSections.delete(section);
            }
        });
    },
    {
        threshold: 0.1,
    }
);

parallaxSections.forEach((section) => observer.observe(section));

let ticking = false;

window.addEventListener("scroll", () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            visibleSections.forEach((section) => {
                const image = section.querySelector(
                    ".technologies__parallax-img"
                );
                const rect = section.getBoundingClientRect();
                image.style.transform = `translate(0, ${rect.top * 0.1}px)`;
            });
            ticking = false;
        });

        ticking = true;
    }
});

