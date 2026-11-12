
"use strict";

// Pixel Season Studio contact settings
const STUDIO = {
  whatsapp: "923214902917",
  email: "hassanrehan697@gmail.com"
};

// Footer: automatically show the current year
const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      menuToggle.textContent = "☰";
    });
  });
}

// Invitation gallery filters
const filterButtons = document.querySelectorAll(".filter-btn");
const designCards = document.querySelectorAll(".design-card");

function filterGallery(category) {
  filterButtons.forEach((button) => {
    const active = button.dataset.filter === category;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  designCards.forEach((card) => {
    const matches =
      category === "all" || card.dataset.category === category;

    card.hidden = !matches;

    if (matches) {
      card.style.animation = "none";
      void card.offsetWidth;
      card.style.animation = "";
    }
  });
}

filterButtons.forEach((button) => {
  button.setAttribute(
    "aria-pressed",
    String(button.classList.contains("active"))
  );

  button.addEventListener("click", () => {
    filterGallery(button.dataset.filter);
  });
});

// Service links: open the relevant gallery category
document.querySelectorAll("[data-filter-link]").forEach((link) => {
  link.addEventListener("click", () => {
    filterGallery(link.dataset.filterLink);
  });
});

// Quick order buttons on invitation cards
document.querySelectorAll(".order-design").forEach((button) => {
  button.addEventListener("click", () => {
    const designName = button.dataset.design || "Custom Invitation";
    const serviceSelect = document.getElementById("designType");
    const detailsField = document.getElementById("projectDetails");

    if (serviceSelect) {
      if (designName.toLowerCase().includes("birthday")) {
        serviceSelect.value = "Birthday Invitation";
      } else if (designName.toLowerCase().includes("engagement")) {
        serviceSelect.value = "Engagement Invitation";
      } else {
        serviceSelect.value = "Wedding Invitation";
      }
    }

    if (detailsField) {
      detailsField.value =
        "I am interested in this sample design: " +
        designName +
        ". Please share the available customisation options and price.";
    }

    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    document.getElementById("customerName")?.focus({
      preventScroll: true
    });
  });
});

// Contact form: prepare a WhatsApp message
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const customerName =
      document.getElementById("customerName").value.trim();

    const designType =
      document.getElementById("designType").value;

    const projectDetails =
      document.getElementById("projectDetails").value.trim();

    const message = [
      "Assalam-o-Alaikum Pixel Season Studio!",
      "",
      "I would like to enquire about a design.",
      "",
      "Name: " + customerName,
      "Service: " + designType,
      "Requirements: " + projectDetails,
      "",
      "Please share the price and next steps.",
      "",
      "Email: " + STUDIO.email
    ].join("\n");

    const whatsappURL =
      "https://wa.me/" +
      STUDIO.whatsapp +
      "?text=" +
      encodeURIComponent(message);

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  });
}

// Smooth scrolling for browsers that need a JavaScript fallback
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetID = link.getAttribute("href");
    if (!targetID || targetID === "#") return;

    const target = document.querySelector(targetID);
    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});
