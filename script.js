const details = document.querySelectorAll("details");

details.forEach(detail => {
  const summary = detail.querySelector("summary");
  const content = detail.querySelector("p");

  // Apply initial styles for smooth transitions
  content.style.transition = "max-height 0.3s ease";
  content.style.overflow = "hidden";
  content.style.maxHeight = "0"; // Collapsed by default

  summary.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default summary behavior

    if (detail.open) {
      // Smoothly collapse
      content.style.maxHeight = "0";
      setTimeout(() => {
        detail.removeAttribute("open"); // Wait until animation finishes to toggle
      }, 300); // Match transition duration
    } else {
      // Smoothly expand
      detail.setAttribute("open", ""); // Open before expanding
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});
