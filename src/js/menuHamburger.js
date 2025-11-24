export function inizializzaMenuHamburger() {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("nav-menu");

  if (!hamburgerBtn || !navMenu) return;

  hamburgerBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = navMenu.classList.contains("open");

    if (isOpen) {
      chiudiMenu();
    } else {
      apriMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (!navMenu.contains(event.target) && !hamburgerBtn.contains(event.target)) {
      chiudiMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1000) {
      chiudiMenu();
    }
  });

  const navButtons = navMenu.querySelectorAll(".nav-btn");
  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      chiudiMenu();
    });
  });

  function apriMenu() {
    navMenu.classList.add("open");
    hamburgerBtn.classList.add("active");
    hamburgerBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function chiudiMenu() {
    navMenu.classList.remove("open");
    hamburgerBtn.classList.remove("active");
    hamburgerBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
}
