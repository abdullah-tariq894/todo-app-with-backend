const checkboxes = document.querySelectorAll(".status-checkbox");

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", async (e) => {
    const id = e.target.getAttribute("data-id");
    const status = e.target.checked; // checked = true, unchecked = false
    const listItem = document.getElementById(`todo-${id}`);

    try {
      const response = await fetch(`/update-status/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (data.success) {
        if (status) {
          listItem.classList.add("completed");
        } else {
          listItem.classList.remove("completed");
        }
      } else {
        alert("Something went wrong. Try again.");
        e.target.checked = !status;
      }
    } catch (err) {
      console.error("Error updating status:", err);
      e.target.checked = !status;
    }
  });
});