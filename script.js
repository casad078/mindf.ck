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