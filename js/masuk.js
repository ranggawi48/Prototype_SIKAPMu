// CONFIG
const schoolLocation = {
  lat: -6.398768763630452,
  lng: 106.96570539610443,
};
const allowedRadius = 100; // 100 meter radius (untuk display saja)

// GLOBAL VARIABLES
let map;
let userMarker;
let schoolMarker;
let radiusCircle;
let userLocation = null;

// INITIALIZE MAP
function initMap() {
  // Create map
  map = L.map("map", {
    zoomControl: false,
  }).setView([schoolLocation.lat, schoolLocation.lng], 16);

  // Add tile layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "",
  }).addTo(map);

  // Add school marker (RED - untuk masuk)
  const schoolIcon = L.divIcon({
    className: "school-marker-custom",
    html: `
      <div style="
        width: 32px;
        height: 32px;
        background: #EA4335;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid #fff;
        box-shadow: 0 3px 10px rgba(0,0,0,0.4);
        position: relative;
      ">
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
          width: 8px;
          height: 8px;
          background: #fff;
          border-radius: 50%;
        "></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  schoolMarker = L.marker([schoolLocation.lat, schoolLocation.lng], {
    icon: schoolIcon,
  }).addTo(map);

  // Add radius circle (visual only)
  radiusCircle = L.circle([schoolLocation.lat, schoolLocation.lng], {
    color: "#4CAF50",
    fillColor: "#4CAF50",
    fillOpacity: 0.1,
    radius: allowedRadius,
  }).addTo(map);

  // Get user location
  getUserLocation();
}

// GET USER LOCATION
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Add/update user marker
        addUserMarker(userLocation);

        // Check distance (for display only)
        checkDistance();

        // Reverse geocode
        reverseGeocode(userLocation);

        // Center map between user and school
        const bounds = L.latLngBounds(
          [userLocation.lat, userLocation.lng],
          [schoolLocation.lat, schoolLocation.lng],
        );
        map.fitBounds(bounds, { padding: [50, 50] });
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert(
          "Gagal mendapatkan lokasi. Pastikan GPS aktif dan izin lokasi diberikan.",
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  } else {
    alert("Browser tidak mendukung geolocation");
  }
}

// ADD USER MARKER WITH PULSE
function addUserMarker(location) {
  if (userMarker) {
    map.removeLayer(userMarker);
  }

  const userIcon = L.divIcon({
    className: "user-location-marker",
    html: `
      <div class="user-marker-container">
        <div class="user-location-pulse"></div>
        <div class="user-location-dot"></div>
      </div>
    `,
    iconSize: [70, 70],
    iconAnchor: [35, 35],
  });

  userMarker = L.marker([location.lat, location.lng], {
    icon: userIcon,
  }).addTo(map);
}

// CHECK DISTANCE (Display only - no restriction)
function checkDistance() {
  if (!userLocation) return;

  const distance = map.distance(
    [userLocation.lat, userLocation.lng],
    [schoolLocation.lat, schoolLocation.lng],
  );

  const btnPresensi = document.getElementById("btnPresensi");

  // ALWAYS ENABLE BUTTON (untuk prototipe)
  btnPresensi.disabled = false;
  btnPresensi.style.opacity = "1";
  btnPresensi.style.cursor = "pointer";

  console.log(
    "Jarak dari sekolah:",
    Math.round(distance),
    "meter (tidak dibatasi untuk prototipe)",
  );
}

// REVERSE GEOCODE
function reverseGeocode(location) {
  const lokasiText = document.getElementById("lokasiText");
  lokasiText.textContent = "Mengambil alamat...";

  fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${location.lat}&lon=${location.lng}&format=json`,
  )
    .then((response) => response.json())
    .then((data) => {
      const address = data.display_name || "Alamat tidak ditemukan";
      lokasiText.textContent = address;
    })
    .catch((error) => {
      console.error("Geocoding error:", error);
      lokasiText.textContent = `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`;
    });
}

// UPDATE TIME
function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
  document.getElementById("waktuText").textContent = timeString;
}

// BUTTON CURRENT LOCATION
document.getElementById("btnCurrentLocation").addEventListener("click", () => {
  if (userLocation) {
    map.setView([userLocation.lat, userLocation.lng], 18);
  } else {
    getUserLocation();
  }
});

// BUTTON PRESENSI (No distance restriction)
document.getElementById("btnPresensi").addEventListener("click", () => {
  if (!userLocation) {
    alert("Lokasi belum terdeteksi");
    return;
  }

  const distance = map.distance(
    [userLocation.lat, userLocation.lng],
    [schoolLocation.lat, schoolLocation.lng],
  );

  // LANGSUNG ALLOW TANPA CEK JARAK (untuk prototipe)
  // Save location data to localStorage
  localStorage.setItem(
    "presensi_masuk_location",
    JSON.stringify({
      lat: userLocation.lat,
      lng: userLocation.lng,
      distance: Math.round(distance),
      timestamp: new Date().toISOString(),
    }),
  );

  // Redirect to face recognition
  window.location.href = "face-recognition.html";
});

// INITIALIZE ON LOAD
document.addEventListener("DOMContentLoaded", () => {
  initMap();
  updateTime();
  setInterval(updateTime, 1000);
});
