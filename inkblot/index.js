function initCommentSection(container) {
  const textarea = container.querySelector(".textarea");
  const button = container.querySelector(".button");
  const nameInput = container.querySelector(".name");
  let editing = false;
  let currentEditDiv = null;

  function addComment() {
    if (!textarea.value.trim()) {
      textarea.value = "";
      textarea.focus();
      return;
    }

    const name = nameInput.value.trim() || "Anonymous";
    const div = document.createElement("div");
    const pname = document.createElement("p");
    const p = document.createElement("p");
    const hr = document.createElement("hr");
    const deleteButton = document.createElement("input");
    const editButton = document.createElement("input");

    pname.textContent = `Written by ${name}`;
    p.textContent = textarea.value;

    pname.className = "pname";
    p.className = "p";
    hr.className = "hr";
    deleteButton.className = "delete";
    editButton.className = "edit";

    deleteButton.type = "button";
    deleteButton.value = "Delete";
    editButton.type = "button";
    editButton.value = "Edit";

    div.appendChild(pname);
    div.appendChild(p);
    div.appendChild(deleteButton);
    div.appendChild(editButton);
    div.appendChild(hr);

    container.appendChild(div);

    textarea.value = "";
    nameInput.value = "";
    textarea.focus();

    deleteButton.addEventListener("click", () => div.remove());

    editButton.addEventListener("click", () => {
      if (editing) return;
      editing = true;
      currentEditDiv = div;

      textarea.value = p.textContent;
      nameInput.value = name;

      const confirmButton = document.createElement("input");
      confirmButton.type = "button";
      confirmButton.value = "Confirm Edit";
      confirmButton.className = "confirm-button";

      div.replaceChild(confirmButton, editButton);

      confirmButton.addEventListener("click", () => {
        if (!textarea.value.trim()) {
          textarea.focus();
          return;
        }

        const updatedName = nameInput.value.trim() || "Anonymous";
        pname.textContent = `Edited by ${updatedName}`;
        p.textContent = textarea.value;

        div.replaceChild(editButton, confirmButton);

        textarea.value = "";
        nameInput.value = "";
        editing = false;
        currentEditDiv = null;
      });
    });
  }

  button.addEventListener("click", addComment);

  textarea.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      addComment();
    }
  });
}

// Initialize all comment sections
document.querySelectorAll(".comments").forEach((section) => {
  initCommentSection(section);
});






const details = document.querySelectorAll("details");

details.forEach((detail) => {
  const summary = detail.querySelector("summary");
  const content = detail.querySelector(":scope > *:not(summary)"); // Select everything except <summary>

  // Apply initial styles for smooth transitions
  content.style.transition = "max-height 0.3s ease";
  content.style.overflow = "hidden";
  content.style.maxHeight = "0"; // Collapsed by default

  summary.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default toggle behavior of <summary>

    const currentScroll = window.scrollY; // Store the current scroll position

    if (detail.open) {
      // Smoothly collapse
      content.style.maxHeight = "0";
      setTimeout(() => {
        detail.removeAttribute("open"); // Remove open attribute after animation ends
      }, 300); // Match transition duration
    } else {
      // Smoothly expand
      detail.setAttribute("open", ""); // Set open attribute first
      content.style.maxHeight = content.scrollHeight + "px";
    }

    // Restore scroll position to prevent page shift
    window.scrollTo({ top: currentScroll });
  });
});


// Get the modal
var modal = document.getElementById("imageModal");

// Get the modal image, caption, and paragraph
var modalImage = document.getElementById("modalImage");
var captionText = document.getElementById("caption");
var modalParagraph = document.getElementById("modalParagraph");

// Get all images in the gallery
var images = document.querySelectorAll(".clickable-image");

// Iterate through each image and add click event listener
images.forEach(function(image) {
  image.addEventListener("click", function() {
    modal.style.display = "block"; // Show the modal
    modalImage.style.display = "none"; // Hide the image element
    captionText.innerHTML = this.alt; // Update the caption text

    // Update the paragraph content (you can replace this with dynamic data)
    modalParagraph.innerHTML = this.getAttribute("data-description");
  });
});

// Get the <span> element to close the modal
var closeModal = document.querySelector(".close");

// When the user clicks on <span> (x), close the modal
closeModal.onclick = function() {
  modal.style.display = "none"; // Hide the modal
};