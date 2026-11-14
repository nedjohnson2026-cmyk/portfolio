// Mobile nav toggle, active link highlighting, footer year
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });
  }

  // Highlight the current page in the nav (set data-page on <body>)
  const page = document.body.dataset.page;
  if (page) {
    document.querySelectorAll(".nav-links a[data-nav]").forEach((a) => {
      if (a.dataset.nav === page) a.classList.add("active");
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});

// Click-to-enlarge for project images
document.addEventListener("DOMContentLoaded", () => {
  const imgs = [...document.querySelectorAll(".fig img, .feature-row img")].filter((i) => !i.closest(".yt"));
  if (!imgs.length) return;
  const box = document.createElement("div");
  box.className = "lightbox";
  box.innerHTML = '<img alt="">';
  document.body.appendChild(box);
  const big = box.querySelector("img");
  imgs.forEach((img) =>
    img.addEventListener("click", () => {
      big.src = img.currentSrc || img.src;
      big.alt = img.alt;
      box.classList.add("open");
    })
  );
  box.addEventListener("click", () => box.classList.remove("open"));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") box.classList.remove("open"); });
});

// YouTube facade: show a poster + play button; load the real player only on click
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".yt[data-id]").forEach((box) => {
    const btn = box.querySelector(".yt-play");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(box.dataset.id) +
        "?autoplay=1&playsinline=1&rel=0";
      f.title = box.getAttribute("title") || "YouTube video";
      f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      f.allowFullscreen = true;
      f.referrerPolicy = "strict-origin-when-cross-origin";
      box.replaceChildren(f);
    }, { once: true });
  });
});
