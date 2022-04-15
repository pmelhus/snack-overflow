window.addEventListener("DOMContentLoaded", (event) => {
  const editButtons = document.querySelectorAll(".editButton");

  for (let i = 0; i < editButtons.length; i++) {
    const button = editButtons[i];
    button.addEventListener("click", (e) => {
      const postId = e.target.id.split("-")[2];
      const form = document.getElementById(`edit-form-${postId}`);
      if (form.classList.contains("hidden")) {
        form.classList.remove("hidden");
      } else {
        form.classList.add("hidden");
      }

      const submitButton = document.getElementById(`edit-submit-${postId}`);
      submitButton.addEventListener("click", async (subEvent) => {
        subEvent.preventDefault();
        const body = document.getElementById(`${postId}-edit-content`).value;

        const res = await fetch(`/answers/${postId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            body,
          }),
        });
        const data = await res.json();
        if (data.message === "Success") {
          const answerBodyEle = document.getElementById(
            `${postId}-edit-content`
          );
          answerBodyEle.innerHTML = data.answer.body;
          form.classList.add("hidden");
        } else {
        }
      });
    });
  }
});
