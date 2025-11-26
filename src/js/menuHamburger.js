// Logica di apertura/chiusura del menu hamburger per mobile.
export function initHamburgerMenu() {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("nav-menu");

  if (!hamburgerBtn || !navMenu) return;

  const closeHamburgerMenu = () => {
    navMenu.classList.remove("open");
    hamburgerBtn.classList.remove("active");
    hamburgerBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  const openHamburgerMenu = () => {
    navMenu.classList.add("open");
    hamburgerBtn.classList.add("active");
    hamburgerBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };

  hamburgerBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = navMenu.classList.contains("open");
    if (isOpen) {
      closeHamburgerMenu();
    } else {
      openHamburgerMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (!navMenu.contains(event.target) && !hamburgerBtn.contains(event.target)) {
      closeHamburgerMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1000) {
      closeHamburgerMenu();
    }
  });

  navMenu.querySelectorAll(".nav-btn").forEach((button) => {
    button.addEventListener("click", () => {
      closeHamburgerMenu();
    });
  });
}
