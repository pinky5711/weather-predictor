export function showError(error) {
  const errorCard = document.createElement("div");
  errorCard.classList.add("error-card");
  errorCard.innerHTML = `
    <p class="error-message">${error}</p>
    <button id="close-error-btn">Close</button>
  `;

  const errorContainer = document.querySelector(".container");
  if (!errorContainer) {
    console.error("Error container not found");
    return;
  }

  const errorElement = errorContainer.querySelector(".error-card");
  if (errorElement) {
    errorContainer.insertBefore(errorCard, errorElement.nextSibling);
  } else {
    errorContainer.appendChild(errorCard);
  }

  const closeButton = document.getElementById("close-error-btn");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      errorCard.remove();
    });
  }

  setTimeout(() => {
    errorCard.remove();
  }, 5000); // close error message after 5 seconds
}
