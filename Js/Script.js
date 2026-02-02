(() => {
  const header = document.getElementById("header");
  const mobileToggle = document.getElementById("mobile-toggle");
  const nav = document.getElementById("main-nav");
  const pageSections = Array.from(document.querySelectorAll(".page-section"));
  const navLinks = Array.from(document.querySelectorAll(".nav-link, [data-page]"));

  const updateHeaderState = () => {
    if (!header) return;
    const isScrolled = window.scrollY > 20;
    header.classList.toggle("scrolled", isScrolled);

    const logoImg = header.querySelector(".logo-img img");
    if (logoImg) {
      const defaultSrc = logoImg.dataset.logoDefault || logoImg.src;
      const scrolledSrc = logoImg.dataset.logoScrolled || logoImg.src;
      const forceOverlay = header.classList.contains("solid");
      logoImg.src = isScrolled || forceOverlay ? scrolledSrc : defaultSrc;
    }
  };

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  if (mobileToggle && nav) {
    mobileToggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }

  const setActivePage = (pageId) => {
    if (!pageId) return;
    pageSections.forEach((section) => {
      section.classList.toggle("active", section.id === pageId);
    });

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.page === pageId);
    });

    if (header) {
      const isHome = pageId === "home";
      header.classList.toggle("solid", !isHome);
      if (isHome) {
        updateHeaderState();
      } else {
        const logoImg = header.querySelector(".logo-img img");
        if (logoImg) {
          const scrolledSrc = logoImg.dataset.logoScrolled || logoImg.src;
          logoImg.src = scrolledSrc;
        }
      }
    }

    if (nav) {
      nav.classList.remove("active");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // navLinks.forEach((link) => {
  //   link.addEventListener("click", (event) => {
  //     const pageId = link.dataset.page;
  //     if (!pageId) return;
  //     event.preventDefault();
  //     setActivePage(pageId);
  //   });
  // });

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const pageId = link.dataset.page;
    const scrollTarget = link.dataset.scroll;

    if (!pageId) return;
    event.preventDefault();

    setActivePage(pageId);

    if (scrollTarget) {
      setTimeout(() => {
        const targetEl = document.getElementById(scrollTarget);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  });
});


  const hashPage = window.location.hash.replace("#", "");
  if (hashPage) {
    setActivePage(hashPage);
  }
})();
