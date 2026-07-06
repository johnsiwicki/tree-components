const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector("#primary-menu");
const dropdownItems = document.querySelectorAll(".has-dropdown");
const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

menuButton?.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

function closeDropdowns(exceptItem) {
  dropdownItems.forEach((item) => {
    if (item === exceptItem) return;
    item.classList.remove("is-open");
    item.querySelector(".dropdown-toggle")?.setAttribute("aria-expanded", "false");
  });
}

dropdownToggles.forEach((toggle) => {
  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const item = toggle.closest(".has-dropdown");
    const willOpen = !item.classList.contains("is-open");
    closeDropdowns(item);
    item.classList.toggle("is-open", willOpen);
    toggle.setAttribute("aria-expanded", String(willOpen));
  });
});

menu?.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menu.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
    closeDropdowns();
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".nav")) closeDropdowns();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeDropdowns();
    menu?.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const compare = document.querySelector(".compare");
const range = document.querySelector("#compare-range");
const afterImage = document.querySelector("#after-img");
const handle = document.querySelector(".compare-handle");

function updateCompare(value) {
  afterImage.style.clipPath = `inset(0 0 0 ${value}%)`;
  handle.style.left = `${value}%`;
}

range?.addEventListener("input", (event) => updateCompare(event.target.value));
compare?.addEventListener("pointermove", (event) => {
  if (event.buttons !== 1) return;
  const rect = compare.getBoundingClientRect();
  const next = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
  range.value = next;
  updateCompare(next);
});

const projects = [
  {
    title: "Brand New Roof",
    text: "These homeowners in Southbury don't have to worry about costly water damage to their siding, foundation, and landscaping with their brand-new roof installed by the experts at Brown Roofing.",
    before: "https://cdn.treehouseinternetgroup.com/cdn-cgi/image/format=auto/cms_images/1253/hp-ba-before-1.jpeg",
    after: "https://cdn.treehouseinternetgroup.com/cdn-cgi/image/format=auto/cms_images/1253/hp-ba-after-1.jpeg"
  },
  {
    title: "Seamless Installation",
    text: "Our team replaced this homeowner's shingle roof with standing seam roof panels to achieve a modern look and enhance the curb appeal of this beautiful home.",
    before: "https://cdn.treehouseinternetgroup.com/cdn-cgi/image/format=auto/cms_images/1253/hp-ba-before-2.jpeg",
    after: "https://cdn.treehouseinternetgroup.com/cdn-cgi/image/format=auto/cms_images/1253/hp-ba-after-2.jpeg"
  },
  {
    title: "Complete Transformation",
    text: "This roof in Beacon Falls had damage around the chimney and algae stains. Brown Roofing installed Estate Gray shingles to boost the value of the home.",
    before: "https://cdn.treehouseinternetgroup.com/cdn-cgi/image/format=auto/cms_images/1253/hp-ba-before-3.jpeg",
    after: "https://cdn.treehouseinternetgroup.com/cdn-cgi/image/format=auto/cms_images/1253/hp-ba-after-3.jpeg"
  }
];

const title = document.querySelector("#project-title");
const text = document.querySelector("#project-text");
const beforeImage = document.querySelector("#before-img");
const dotButtons = document.querySelectorAll("[data-project]");

dotButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const project = projects[Number(button.dataset.project)];
    title.textContent = project.title;
    text.textContent = project.text;
    beforeImage.src = project.before;
    afterImage.src = project.after;
    dotButtons.forEach((dot) => dot.classList.toggle("active", dot === button));
    range.value = 54;
    updateCompare(54);
  });
});

updateCompare(54);
