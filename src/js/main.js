// for tab component
const tabGroups = document.querySelectorAll("[data-tab-group]");
tabGroups.forEach((tabGroup) => {
  const tabsNav = tabGroup.querySelector("[data-tab-nav]");
  const tabsNavItem = tabsNav.querySelectorAll("[data-tab]");

  const activeTabName =
    localStorage.getItem(`activeTabName-${tabGroup.dataset.tabGroup}`) ||
    tabsNavItem[0].getAttribute("data-tab");

  // Set the active tab
  setActiveTab(tabGroup, activeTabName);

  // Add a click event listener to each tab nav item
  tabsNavItem.forEach((tabNavItem) => {
    tabNavItem.addEventListener("click", (e) => {
      e.preventDefault();

      const tabName = tabNavItem.dataset.tab;
      setActiveTab(tabGroup, tabName);

      localStorage.setItem(
        `activeTabName-${tabGroup.dataset.tabGroup}`,
        tabName
      );
    });
  });
});

// Function to set the active tab for a given tab group
function setActiveTab(tabGroup, tabName) {
  // Get the tabs nav and content for this tab group
  const tabsNav = tabGroup.querySelector("[data-tab-nav]");
  const tabsContent = tabGroup.querySelector("[data-tab-content]");

  // Remove the active class from all tab nav items and content panes
  tabsNav.querySelectorAll("[data-tab]").forEach((tabNavItem) => {
    tabNavItem.classList.remove("active");
  });
  tabsContent.querySelectorAll("[data-tab-panel]").forEach((tabPane) => {
    tabPane.classList.remove("active");
  });

  // Add the active class to the selected tab nav item and content pane
  const selectedTabNavItem = tabsNav.querySelector(`[data-tab="${tabName}"]`);
  selectedTabNavItem.classList.add("active");
  const selectedTabPane = tabsContent.querySelector(
    `[data-tab-panel="${tabName}"]`
  );
  selectedTabPane.classList.add("active");
}

//reviews-carousel
new Swiper(".reviews-carousel", {
  loop: true,
  spaceBetween: 20,
  pagination: {
    el: ".reviews-carousel-pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
  },
});

// Header
(function navToggleInit() {
  const showBtn = document.getElementById("show-button");
  const hideBtn = document.getElementById("hide-button");
  const navMenu = document.getElementById("nav-menu");
  const header = document.querySelector(".header");
  const navLink = document.querySelector(".nav-link");
  if (!navMenu) return;
  const open = () => {
    navMenu.classList.remove("hidden");
    showBtn?.classList.add("hidden");
    hideBtn?.classList.remove("hidden");
    navMenu.setAttribute("aria-expanded", "true");
    header.classList.add("bg-white", "shadow-lg", "rounded-md");
    navLink.classList.remove("mr-[-1.25rem]");
  };
  const close = () => {
    navMenu.classList.add("hidden");
    showBtn?.classList.remove("hidden");
    hideBtn?.classList.add("hidden");
    navMenu.setAttribute("aria-expanded", "false");
    header.classList.remove("bg-white", "shadow-lg", "rounded-md");
    navLink.classList.add("mr-[-1.25rem]");
  };
  showBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    open();
  });
  hideBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    close();
  });
  // optional: close when clicking a link
  navMenu
    .querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", () => close()));

  // Mobile dropdown: show "Pages" on hover/tap
  const dropdowns = navMenu.querySelectorAll(".nav-dropdown");
  dropdowns.forEach((dd) => {
    const trigger =
      dd.querySelector("[data-dropdown-trigger]") ||
      dd.querySelector(".nav-link");
    const list = dd.querySelector(".nav-dropdown-list");
    if (!trigger || !list) return;

    const isDesktop = () => window.matchMedia("(min-width: 1024px)").matches;

    // On mobile: show submenu on mouseenter or touchstart
    const showDropdown = () => {
      if (isDesktop()) return; // desktop uses CSS group-hover
      list.classList.remove("hidden");
      // close other open dropdowns
      dropdowns.forEach((other) => {
        if (other !== dd)
          other.querySelector(".nav-dropdown-list")?.classList.add("hidden");
      });
    };

    trigger.addEventListener("mouseenter", showDropdown);
    trigger.addEventListener(
      "touchstart",
      (e) => {
        showDropdown();
        e.preventDefault(); // prevent ghost click
      },
      { passive: false }
    );

    // Close when mouse leaves or clicking outside (mobile only)
    dd.addEventListener("mouseleave", () => {
      if (!isDesktop()) list.classList.add("hidden");
    });
    document.addEventListener("click", (evt) => {
      if (isDesktop()) return;
      if (!dd.contains(evt.target)) list.classList.add("hidden");
    });
  });
})();
// --- Video Play Button ---
document.addEventListener("DOMContentLoaded", function () {
  const playButton = document.querySelector(".video-play-btn");
  const thumbnail = document.querySelector(".video-thumbnail");
  const player = document.querySelector(".video-player");

  if (playButton && thumbnail && player) {
    playButton.addEventListener("click", function () {
      thumbnail.style.display = "none"; // hide thumbnail + button
      player.classList.remove("hidden"); // show iframe
    });
  }
});