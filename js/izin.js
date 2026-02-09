document.addEventListener("DOMContentLoaded", function () {
  const btnFilter = document.getElementById("btnFilter");
  const filterDropdown = document.getElementById("filterDropdown");
  const filterOptions = document.querySelectorAll(".filter-option");
  const izinItems = document.querySelectorAll(".izin-item");

  let currentFilter = "semua";

  // Toggle filter dropdown
  btnFilter.addEventListener("click", function (e) {
    e.stopPropagation();
    filterDropdown.classList.toggle("show");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function (e) {
    if (!filterDropdown.contains(e.target) && e.target !== btnFilter) {
      filterDropdown.classList.remove("show");
    }
  });

  // Filter options click
  filterOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");
      currentFilter = filter;

      // Update active state
      filterOptions.forEach((opt) => opt.classList.remove("active"));
      this.classList.add("active");

      // Filter items
      filterItems(filter);

      // Close dropdown
      filterDropdown.classList.remove("show");
    });
  });

  function filterItems(filter) {
    izinItems.forEach((item) => {
      const jenis = item.getAttribute("data-jenis");

      if (filter === "semua") {
        item.style.display = "flex";
      } else {
        if (jenis === filter) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
      }
    });
  }

  // Set default active
  document.querySelector('[data-filter="semua"]').classList.add("active");
});
