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
      slidesPerGroup: 2,
    },
    992: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
  },
});
