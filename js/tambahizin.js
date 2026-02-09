// Flatpickr untuk date picker (optional - bisa pakai native date input)
document.addEventListener("DOMContentLoaded", function () {
  const tanggalInput = document.getElementById("tanggalInput");

  // Simple click to open native date picker alternative
  tanggalInput.addEventListener("click", function () {
    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.style.position = "absolute";
    dateInput.style.opacity = "0";
    dateInput.style.pointerEvents = "none";
    document.body.appendChild(dateInput);

    dateInput.addEventListener("change", function () {
      if (dateInput.value) {
        const date = new Date(dateInput.value);
        const options = { day: "numeric", month: "long", year: "numeric" };
        tanggalInput.value = date.toLocaleDateString("id-ID", options);
      }
      document.body.removeChild(dateInput);
    });

    dateInput.showPicker();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.getElementById("fileInput");
  const fileList = document.getElementById("fileList");
  let selectedFiles = [];

  // Handle file selection
  fileInput.addEventListener("change", function (e) {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      // Check if file already exists
      if (
        !selectedFiles.find((f) => f.name === file.name && f.size === file.size)
      ) {
        selectedFiles.push(file);
        addFileToList(file);
      }
    });

    // Reset input
    fileInput.value = "";
  });

  function addFileToList(file) {
    const fileItem = document.createElement("div");
    fileItem.className = "file-item";

    const fileName = document.createElement("span");
    fileName.className = "file-item-name";
    fileName.textContent = file.name;

    const removeBtn = document.createElement("button");
    removeBtn.className = "btn-remove-file";
    removeBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="#F44336" stroke-width="2" stroke-linecap="round"/>
            </svg>
        `;

    removeBtn.addEventListener("click", function () {
      // Remove from array
      selectedFiles = selectedFiles.filter(
        (f) => !(f.name === file.name && f.size === file.size),
      );
      // Remove from DOM
      fileItem.remove();
    });

    fileItem.appendChild(fileName);
    fileItem.appendChild(removeBtn);
    fileList.appendChild(fileItem);
  }

  // Form submission
  const btnKirim = document.querySelector(".btn-kirim");
  btnKirim.addEventListener("click", function () {
    const tanggal = document.getElementById("tanggalInput").value;
    const jenis = document.getElementById("jenisLaporan").value;
    const keterangan = document.getElementById("keterangan").value;

    if (!tanggal || !jenis) {
      alert("Mohon lengkapi semua field yang wajib diisi");
      return;
    }

    // Handle form submission
    console.log({
      tanggal,
      jenis,
      keterangan,
      files: selectedFiles,
    });

    alert("Laporan berhasil dikirim!");
    window.location.href = "izin.html";
  });
});

document.addEventListener('DOMContentLoaded', function() {
    const tanggalInput = document.getElementById('tanggalInput');
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');
    let selectedFiles = [];

    // Force trigger date picker on mobile
    tanggalInput.addEventListener('click', function(e) {
        // For mobile browsers that don't auto-trigger
        if (this.showPicker) {
            try {
                this.showPicker();
            } catch (error) {
                console.log('showPicker not supported:', error);
                // Fallback: focus will trigger native picker
                this.focus();
            }
        } else {
            this.focus();
        }
    });

    // Set default date placeholder
    if (!tanggalInput.value) {
        tanggalInput.setAttribute('placeholder', '7 March 2025');
    }

    // Handle file selection
    fileInput.addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        
        files.forEach(file => {
            if (!selectedFiles.find(f => f.name === file.name && f.size === file.size)) {
                selectedFiles.push(file);
                addFileToList(file);
            }
        });
        
        fileInput.value = '';
    });

    function addFileToList(file) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        
        const fileName = document.createElement('span');
        fileName.className = 'file-item-name';
        fileName.textContent = file.name;
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn-remove-file';
        removeBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="#F44336" stroke-width="2" stroke-linecap="round"/>
            </svg>
        `;
        
        removeBtn.addEventListener('click', function() {
            selectedFiles = selectedFiles.filter(f => 
                !(f.name === file.name && f.size === file.size)
            );
            fileItem.remove();
        });
        
        fileItem.appendChild(fileName);
        fileItem.appendChild(removeBtn);
        fileList.appendChild(fileItem);
    }

    // Form submission
    const btnKirim = document.querySelector('.btn-kirim');
    btnKirim.addEventListener('click', function() {
        const tanggal = tanggalInput.value;
        const jenis = document.getElementById('jenisLaporan').value;
        const keterangan = document.getElementById('keterangan').value;
        
        if (!tanggal || !jenis) {
            alert('Mohon lengkapi Tanggal dan Jenis Laporan');
            return;
        }
        
        console.log({
            tanggal,
            jenis,
            keterangan,
            files: selectedFiles
        });
        
        alert('Laporan berhasil dikirim!');
        window.location.href = 'izin.html';
    });
});
