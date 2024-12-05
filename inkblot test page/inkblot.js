const details = document.querySelectorAll("details");

    details.forEach(detail => {
      const summary = detail.querySelector("summary");
      const content = detail.querySelector("p");

      summary.addEventListener("click", () => {
        if (detail.open) {
          // Closing: Smoothly collapse
          content.style.maxHeight = null;
        } else {
          // Opening: Smoothly expand
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    });



    // Get the modal
var modal = document.getElementById("imageModal");

// Get the modal image and caption
var modalImage = document.getElementById("modalImage");
var captionText = document.getElementById("caption");

// Get all images in the gallery
var images = document.querySelectorAll(".clickable-image");

// Iterate through each image and add click event listener
images.forEach(function(image) {
  image.addEventListener("click", function() {
    modal.style.display = "block";
    modalImage.src = this.src;
    captionText.innerHTML = this.alt;
  });
});

// Get the <span> element to close the modal
var closeModal = document.querySelector(".close");

// When the user clicks on <span> (x), close the modal
closeModal.onclick = function() {
  modal.style.display = "none";
}


var comments = document.getElementById("comments");
var button = document.getElementById("button");
var textarea = document.getElementById("textarea");
var nameInput = document.getElementById("name");
var name;
var editing = false;

function addComment() {
  if (
    textarea === null ||
    textarea.value.length === 0 ||
    /^\s+$/.test(textarea.value)
  ) {
    textarea.value = "";
    textarea.focus();
  } else if (editing === false) {
    if (
      nameInput === null ||
      nameInput.value.length === 0 ||
      /^\s+$/.test(nameInput.value)
    ) {
      name = "Anonymous";
    } else {
      name = nameInput.value;
    }
    var div = document.createElement("div");
    comments.appendChild(div);
    var pname = document.createElement("p");
    var p = document.createElement("p");
    var hr = document.createElement("hr");
    var deleteButton = document.createElement("input");
    var editButton = document.createElement("input");

    pname.innerHTML = "Written by " + name;
    p.innerHTML = textarea.value;

    pname.setAttribute("class", "pname");
    p.setAttribute("class", "p");
    hr.setAttribute("class", "hr");
    deleteButton.setAttribute("class", "delete");
    editButton.setAttribute("class", "edit");

    div.appendChild(pname);
    div.appendChild(p);
    div.appendChild(deleteButton);
    div.appendChild(editButton);
    div.appendChild(hr);

    textarea.value = "";
    nameInput.value = "";

    deleteButton.type = "button";
    deleteButton.value = "<DELETE>";
    editButton.type = "button";
    editButton.value = "<EDIT>";

    textarea.focus();

    function deleteComment() {
      div.remove();
    }

    deleteButton.addEventListener("click", deleteComment);

    function editComment() {
      var confirmButton = document.createElement("input");
      confirmButton.type = "button";
      confirmButton.value = "<CONFIRM>";
      div.replaceChild(confirmButton, editButton);
      confirmButton.setAttribute("class", "confirm-button");
      textarea.value = p.innerText;
      p.innerHTML = "";
      nameInput.value = name;
      textarea.focus();
      editing = true;

      function confirmEdit() {
        if (
          textarea === null ||
          textarea.value.length === 0 ||
          /^\s+$/.test(textarea.value)
        ) {
          textarea.value = "";
          textarea.focus();
        } else {
          if (
            nameInput === null ||
            nameInput.value.length === 0 ||
            /^\s+$/.test(nameInput.value)
          ) {
            name = "Anonymous";
          } else {
            name = nameInput.value;
          }
          pname.innerHTML = "Edited by " + name;
          p.innerHTML = textarea.value;
          div.replaceChild(editButton, confirmButton);
          textarea.value = "";
          nameInput.value = "";
          textarea.focus();
          editing = false;
        }
      }
      confirmButton.addEventListener("click", confirmEdit);
    }
    editButton.addEventListener("click", editComment);
  }
}

button.addEventListener("click", addComment);

function handleEnter(event) {
  var code = event.keyCode;
  if (code == 13) {
    addComment();
  }
}

textarea.addEventListener("keypress", handleEnter);
