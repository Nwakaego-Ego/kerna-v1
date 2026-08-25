function detectHighlight() {
  document.addEventListener("mouseup", function (event) {
    const saveWords = window.getSelection().toString();
    if (saveWords.length === 0) {
      return;
    }

    const savedBtn = document.getElementById("kerna-save-btn");
    if (savedBtn) {
      savedBtn.style.left = event.clientX + "px";
      savedBtn.style.top = event.clientY + "px";
    } else {
      const createBtn = document.createElement("div");
      createBtn.id = "kerna-save-btn";
      createBtn.style.backgroundColor = "red";
      createBtn.style.position = "fixed";
      createBtn.textContent = "save-to-kerna";
      createBtn.style.padding = "12px";
      createBtn.style.zIndex = "9999";
      createBtn.style.width = "20px";
      createBtn.style.height = "20px";
      document.body.appendChild(createBtn);
      createBtn.style.left = event.clientX + "px";
      createBtn.style.top = event.clientY + "px";
    }
  });
}

detectHighlight();
