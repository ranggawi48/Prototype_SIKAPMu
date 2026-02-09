let stream = null;
let scanTimeout = null;

// Start Camera
async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
    });
    const video = document.getElementById("video");
    video.srcObject = stream;

    // Auto start scanning after 1 second
    setTimeout(() => {
      startScanning();
    }, 1000);
  } catch (error) {
    console.error("Error accessing camera:", error);
    alert("Gagal mengakses kamera. Pastikan izin kamera sudah diberikan.");
  }
}

// Start Scanning Animation
function startScanning() {
  const scanLine = document.getElementById("scanLine");
  scanLine.classList.add("active");

  // Simulate face recognition (3 seconds)
  scanTimeout = setTimeout(() => {
    capturePhoto();
  }, 3000);
}

// Capture Photo
function capturePhoto() {
  const video = document.getElementById("video");
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const context = canvas.getContext("2d");

  // Flip horizontal untuk un-mirror
  context.translate(canvas.width, 0);
  context.scale(-1, 1);
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const photoData = canvas.toDataURL("image/png");

  // Save to localStorage
  const now = new Date();
  const presensiData = {
    nama: "Rangga Wijaya",
    nis: "12345",
    waktu: now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    tanggal: now.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    foto: photoData,
    type: "pulang",
  };

  localStorage.setItem("presensi_pulang", JSON.stringify(presensiData));

  // Show success popup
  showSuccessPopup(presensiData);
}

// Show Success Popup
function showSuccessPopup(data) {
  // Stop camera
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }

  // Update popup content
  document.getElementById("successName").textContent = data.nama;
  document.getElementById("successTime").textContent =
    `${data.tanggal} Pukul ${data.waktu}`;

  // Show popup
  const popup = document.getElementById("successPopup");
  popup.classList.add("show");
}

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  startCamera();
});
