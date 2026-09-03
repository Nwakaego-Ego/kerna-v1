function detectHighlight() {
  let currentSelection = "";
  document.addEventListener("mouseup", function (event) {
    // document.getElementById("kerna-save-btn") asks the DOM to find the element carrying that ID. This prevents Kerna from creating duplicate buttons.
    //event.target.id === "kerna-save-btn" reads the ID of the element where mouseup originated. This distinguishes clicking Kerna from releasing the mouse over normal webpage content.//
    if (event.target.id === "kerna-save-btn") {
      return;
    }

    const saveWords = window.getSelection().toString();
    if (saveWords.length === 0) {
      return;
    }

    currentSelection = saveWords;

    const savedBtn = document.getElementById("kerna-save-btn");

    // the event.client y and x gives the position of the mouse so that the dom knows exaclty where to put the button on the screen.

    if (savedBtn) {
      savedBtn.style.left = event.clientX + "px";
      savedBtn.style.top = event.clientY + "px";
    } else {
      const createBtn = document.createElement("button");
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

      createBtn.addEventListener("click", function () {
        const entry = {
          text: currentSelection,
          sourceUrl: window.location.href,
          id: crypto.randomUUID(),
        };

        chrome.storage.local.get("entries", function (result) {
          const entries = result.entries || [];
          const isDuplicate = entries.some((existingEntry) => {
            return (
              existingEntry.text === entry.text &&
              existingEntry.sourceUrl === entry.sourceUrl
            );
          });
          if (isDuplicate === true) {
            return;
          }
          entries.push(entry);
          console.log("New entries", entries);

          const storageData = {
            entries: entries,
          };

          chrome.storage.local.set(storageData, function () {
            console.log("Entries saved", storageData);
          });
        });
      });
    }
  });
}

detectHighlight();

// createBtn.id gives the element its identity.
// event.target.id reveals the identity of the event’s origin.
// getElementById searches the DOM using that identity.
