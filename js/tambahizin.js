document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');
    const tanggalInput = document.getElementById('tanggalInput');
    const jenisLaporan = document.getElementById('jenisLaporan');
    const keterangan = document.getElementById('keterangan');
    const btnKirim = document.querySelector('.btn-kirim');
    const btnBatal = document.querySelector('.btn-batal');
    
    let selectedFiles = [];

    // ============================================
    // FLATPICKR INITIALIZATION - UPDATED CONFIG
    // ============================================
    flatpickr("#tanggalInput", {
        dateFormat: "d F Y",
        locale: "id",
        defaultDate: new Date(),
        minDate: "today",
        maxDate: new Date().fp_incr(30),
        disableMobile: false,
        static: true, // Tidak inline, popup biasa
        position: "auto center", // Auto position
        animate: true,
        monthSelectorType: "dropdown", // Dropdown untuk pilih bulan
        showMonths: 1, // Tampilkan 1 bulan
        inline: false, // Popup, bukan inline
        onChange: function(selectedDates, dateStr, instance) {
            console.log("Tanggal dipilih:", dateStr);
        },
        onOpen: function(selectedDates, dateStr, instance) {
            console.log("Calendar opened");
        },
        onClose: function(selectedDates, dateStr, instance) {
            console.log("Calendar closed");
        }
    });

    // ============================================
    // FILE UPLOAD HANDLER
    // ============================================
    fileInput.addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        
        files.forEach(file => {
            const exists = selectedFiles.find(f => 
                f.name === file.name && f.size === file.size
            );
            
            if (!exists) {
                selectedFiles.push(file);
                addFileToList(file);
            }
        });
        
        fileInput.value = '';
    });

    // ============================================
    // ADD FILE TO LIST
    // ============================================
    function addFileToList(file) {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        
        const fileName = document.createElement('span');
        fileName.className = 'file-item-name';
        fileName.textContent = file.name;
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn-remove-file';
        removeBtn.type = 'button';
        removeBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="#F44336" stroke-width="2" stroke-linecap="round"/>
            </svg>
        `;
        
        removeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            selectedFiles = selectedFiles.filter(f => 
                !(f.name === file.name && f.size === file.size)
            );
            fileItem.remove();
            console.log('File removed:', file.name);
        });
        
        fileItem.appendChild(fileName);
        fileItem.appendChild(removeBtn);
        fileList.appendChild(fileItem);
        
        console.log('File added:', file.name);
    }

    // ============================================
    // FORM VALIDATION
    // ============================================
    function validateForm() {
        const tanggal = tanggalInput.value.trim();
        const jenis = jenisLaporan.value;
        
        if (!tanggal) {
            alert('Mohon pilih Tanggal Kejadian');
            return false;
        }
        
        if (!jenis) {
            alert('Mohon pilih Jenis Laporan');
            jenisLaporan.focus();
            return false;
        }
        
        return true;
    }

    // ============================================
    // FORM SUBMISSION
    // ============================================
    btnKirim.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        const formData = {
            tanggal: tanggalInput.value,
            jenis: jenisLaporan.value,
            keterangan: keterangan.value.trim(),
            files: selectedFiles.map(f => ({
                name: f.name,
                size: f.size,
                type: f.type
            })),
            timestamp: new Date().toISOString()
        };
        
        console.log('Form Data:', formData);
        
        const existingData = JSON.parse(localStorage.getItem('izin_data') || '[]');
        existingData.push(formData);
        localStorage.setItem('izin_data', JSON.stringify(existingData));
        
        alert('Laporan izin berhasil dikirim!');
        window.location.href = 'izin.html';
    });

    // ============================================
    // CANCEL BUTTON
    // ============================================
    btnBatal.addEventListener('click', function(e) {
        e.preventDefault();
        
        const hasData = tanggalInput.value || 
                       jenisLaporan.value || 
                       keterangan.value.trim() || 
                       selectedFiles.length > 0;
        
        if (hasData) {
            const confirm = window.confirm('Data yang Anda masukkan akan hilang. Yakin ingin membatalkan?');
            if (!confirm) {
                return;
            }
        }
        
        window.location.href = 'izin.html';
    });

    console.log('Tambah Izin page loaded');
    console.log('Flatpickr initialized');
});
