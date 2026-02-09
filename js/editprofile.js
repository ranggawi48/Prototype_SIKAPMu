document.addEventListener("DOMContentLoaded", function () {
  const avatarInput = document.getElementById("avatarInput");
  const avatarPreview = document.getElementById("avatarPreview");

  // Preview avatar when file selected
  avatarInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        avatarPreview.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // Form submission
  const btnSimpan = document.querySelector(".btn-simpan");
  btnSimpan.addEventListener("click", function () {
    const nama = document.getElementById("namaInput").value;

    if (!nama) {
      alert("Mohon masukkan nama");
      return;
    }

    console.log("Nama:", nama);
    alert("Profile berhasil diupdate!");
    window.location.href = "home.html";
  });
});
