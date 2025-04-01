document.addEventListener("DOMContentLoaded", () => {
    const notepad = document.getElementById("notepad");
    const darkModeToggle = document.getElementById("dark-mode-toggle");

    // Load saved content (including images)
    notepad.innerHTML = localStorage.getItem("notepadContent") || "";

    // Auto-save content (including images) when modified
    notepad.addEventListener("input", () => {
        localStorage.setItem("notepadContent", notepad.innerHTML);
    });

    // Dark mode toggle
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    });

    // Load dark mode preference
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }

    // Handle image pasting
    notepad.addEventListener("paste", (event) => {
        const items = (event.clipboardData || event.originalEvent.clipboardData).items;
        for (let item of items) {
            if (item.type.startsWith("image/")) {
                event.preventDefault();
                const file = item.getAsFile();
                const reader = new FileReader();
                reader.onload = (e) => {
                    const img = document.createElement("img");
                    img.src = e.target.result;
                    img.alt = "Pasted Image";
                    img.classList.add("pasted-image");
                    notepad.appendChild(img);
                    saveContent(); // Save after inserting image
                };
                reader.readAsDataURL(file);
            }
        }
    });

    // Save content to localStorage
    function saveContent() {
        localStorage.setItem("notepadContent", notepad.innerHTML);
    }
});
