let video = document.getElementById("video");
let canvas = document.getElementById("canvas");
let scanLine = document.getElementById("scanLine");
let successPopup = document.getElementById("successPopup");
let stream = null;
let scanningStarted = false;

// Start camera
async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
    });

    video.srcObject = stream;
    console.log("Camera started");

    // Mulai scanning setelah 1 detik
    setTimeout(() => {
      startScanning();
    }, 1000);
  } catch (error) {
    console.error("Error accessing camera:", error);
    alert("Tidak dapat mengakses kamera. Pastikan izin kamera diaktifkan.");
  }
}

// Stop camera
function stopCamera() {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }
}

// Start scanning animation
function startScanning() {
  if (scanningStarted) return;
  scanningStarted = true;

  // Aktifkan scan line animation
  scanLine.classList.add("active");

  // Simulasi scanning selama 3 detik
  setTimeout(() => {
    // Stop scan line
    scanLine.classList.remove("active");

    // Capture photo
    capturePhoto();

    // Show success popup setelah 0.5 detik
    setTimeout(() => {
      showSuccessPopup();
    }, 500);
  }, 3000);
}

// Capture photo
function capturePhoto() {
  // Set canvas size
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // Draw video frame to canvas
  const context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Get image data
  const imageData = canvas.toDataURL("image/jpeg");

  console.log("Photo captured");

  // Save to localStorage
  const now = new Date();
  const presensiData = {
    nama: "Rangga Wijaya",
    nis: "998928282",
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
    foto: imageData.substring(0, 100),
  };

  localStorage.setItem("lastPresensi", JSON.stringify(presensiData));

  // Update success popup time
  document.getElementById("successTime").textContent =
    `${presensiData.tanggal} Pukul ${presensiData.waktu}`;
}

// Show success popup
function showSuccessPopup() {
  // Stop camera
  stopCamera();

  // Show popup
  successPopup.classList.add("show");
}

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  startCamera();
});

// Cleanup on page unload
window.addEventListener("beforeunload", stopCamera);
