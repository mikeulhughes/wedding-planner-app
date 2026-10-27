const state = {
  venues: [
    {
      name: "Rosewood Manor",
      category: "Estate",
      location: "Hudson Valley",
      guests: 180,
      price: "$8,500",
      description: "Garden ceremony space with a ballroom reception and a romantic vineyard backdrop.",
      tags: ["Outdoor", "Ballroom", "Vineyard"]
    },
    {
      name: "Harbor Light Hall",
      category: "Waterfront",
      location: "Cape Cod",
      guests: 220,
      price: "$10,900",
      description: "Modern coastal venue with sunset views, open decks, and elegant reception spaces.",
      tags: ["Waterfront", "Modern", "Sunset"]
    },
    {
      name: "Cedar & Glass",
      category: "Garden",
      location: "Napa Valley",
      guests: 140,
      price: "$7,200",
      description: "Minimal glasshouse venue with lush greenery, warm cedar textures, and intimate ceremony areas.",
      tags: ["Garden", "Minimal", "Indoor-Outdoor"]
    }
  ],
  guests: [
    { name: "Emma Collins", group: "Family", rsvp: "Confirmed", meal: "Vegetarian" },
    { name: "Daniel Brooks", group: "Friends", rsvp: "Pending", meal: "Standard" },
    { name: "Maya Patel", group: "Work", rsvp: "Confirmed", meal: "Vegan" },
    { name: "Sofia Nguyen", group: "Friends", rsvp: "Declined", meal: "Gluten-free" }
  ],
  photographers: [
    {
      name: "Velvet Lens Studio",
      package: "Full-day coverage",
      price: "$3,400",
      description: "Documentary-style photography and cinematic video with a relaxed editorial approach.",
      highlight: "Wedding films"
    },
    {
      name: "North & Rose",
      package: "Signature package",
      price: "$2,900",
      description: "Artful portraits, natural light coverage, and curated highlight reels.",
      highlight: "Portrait sessions"
    },
    {
      name: "Golden Hour Collective",
      package: "Classic album",
      price: "$4,100",
      description: "Traditional coverage, second shooter, and luxury printed album design options.",
      highlight: "Album design"
    }
  ],
  djs: [
    {
      name: "Afterglow Sound",
      style: "Romantic dance floor",
      price: "$1,800",
      description: "Custom playlists, live MC announcements, and a warm mix of pop, funk, and classics.",
      detail: "Lighting + sound"
    },
    {
      name: "Velvet Echo",
      style: "Luxury lounge",
      price: "$2,300",
      description: "A polished event experience with a DJ booth, lounge audio, and elegant ambience cues.",
      detail: "Audio branding"
    },
    {
      name: "Moonlight Mix",
      style: "Modern party set",
      price: "$1,500",
      description: "High-energy sets that transition seamlessly from ceremony music to late-night dance hits.",
      detail: "Late-night set"
    }
  ],
  decorations: [
    "Floral arches",
    "Candles",
    "Gold accents",
    "Linen textures",
    "Minimal centerpieces",
    "Soft neutrals",
    "Garden path lighting",
    "Photo wall",
    "Welcome signage",
    "Statement table numbers"
  ]
};

const venueList = document.getElementById("venue-list");
const guestListEl = document.getElementById("guest-list");
const guestSummary = document.getElementById("guest-summary");
const photographyList = document.getElementById("photography-list");
const djList = document.getElementById("dj-list");
const decorList = document.getElementById("decor-list");
const guestForm = document.getElementById("guest-form");

const updateStats = () => {
  document.getElementById("guest-count").textContent = state.guests.length;
  document.getElementById("venue-count").textContent = state.venues.length;
  document.getElementById("photo-count").textContent = state.photographers.length;
  document.getElementById("dj-count").textContent = state.djs.length;
};

const renderVenues = () => {
  venueList.innerHTML = state.venues
    .map(
      (venue) => `
        <article class="vendor-card">
          <div class="meta">
            <span class="badge">${venue.category}</span>
            <span>${venue.location}</span>
          </div>
          <h4>${venue.name}</h4>
          <p>${venue.description}</p>
          <div class="meta">
            <span>${venue.guests} guests</span>
            <span class="price">${venue.price}</span>
          </div>
          <div class="tag-cloud">
            ${venue.tags.map((tag) => `<span class="style-tag">${tag}</span>`).join("")}
          </div>
          <div class="card-footer">
            <button class="card-btn" type="button">View details</button>
          </div>
        </article>
      `
    )
    .join("");
};

const renderGuestSummary = () => {
  const confirmed = state.guests.filter((guest) => guest.rsvp === "Confirmed").length;
  const pending = state.guests.filter((guest) => guest.rsvp === "Pending").length;
  const declined = state.guests.filter((guest) => guest.rsvp === "Declined").length;

  guestSummary.innerHTML = `
    <span class="summary-pill">Confirmed: ${confirmed}</span>
    <span class="summary-pill">Pending: ${pending}</span>
    <span class="summary-pill">Declined: ${declined}</span>
  `;
};

const renderGuests = () => {
  renderGuestSummary();

  guestListEl.innerHTML = state.guests
    .map(
      (guest) => `
        <li class="guest-item">
          <div class="guest-details">
            <span class="guest-name">${guest.name}</span>
            <small>${guest.group} • ${guest.meal}</small>
          </div>
          <span class="guest-status status-${guest.rsvp.toLowerCase()}">${guest.rsvp}</span>
        </li>
      `
    )
    .join("");
};

const renderPhotography = () => {
  photographyList.innerHTML = state.photographers
    .map(
      (vendor) => `
        <article class="vendor-card">
          <div class="meta">
            <span class="badge">${vendor.highlight}</span>
            <span>${vendor.package}</span>
          </div>
          <h4>${vendor.name}</h4>
          <p>${vendor.description}</p>
          <div class="card-footer">
            <span class="price">${vendor.price}</span>
            <button class="card-btn" type="button">Book</button>
          </div>
        </article>
      `
    )
    .join("");
};

const renderDjs = () => {
  djList.innerHTML = state.djs
    .map(
      (dj) => `
        <article class="vendor-card">
          <div class="meta">
            <span class="badge">${dj.style}</span>
            <span>${dj.detail}</span>
          </div>
          <h4>${dj.name}</h4>
          <p>${dj.description}</p>
          <div class="card-footer">
            <span class="price">${dj.price}</span>
            <button class="card-btn" type="button">Reserve</button>
          </div>
        </article>
      `
    )
    .join("");
};

const renderDecorations = () => {
  decorList.innerHTML = state.decorations
    .map((item) => `<span class="style-tag">${item}</span>`)
    .join("");
};

guestsFormSubmitHandler = (event) => {
  event.preventDefault();

  const formData = new FormData(guestForm);
  const guest = {
    name: formData.get("guest-name").toString().trim(),
    group: formData.get("guest-group").toString(),
    rsvp: formData.get("guest-rsvp").toString(),
    meal: formData.get("guest-meal").toString()
  };

  if (!guest.name) return;

  state.guests.unshift(guest);
  guestForm.reset();
  renderGuests();
  updateStats();
};

guestForm.addEventListener("submit", guestsFormSubmitHandler);

const init = () => {
  renderVenues();
  renderGuests();
  renderPhotography();
  renderDjs();
  renderDecorations();
  updateStats();
};

init();
