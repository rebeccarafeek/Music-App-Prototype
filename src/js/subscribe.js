document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("newsletter-form");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const email = formData.get("email");
  
      try {
        const response = await fetch("https://httpbin.org/post", {
          method: "POST",
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error("Network response failed");
        }
  
        const result = await response.json();
        alert(`Thank you for subscribing, ${email}! Here is the response we received: \n\n` + JSON.stringify(result, null, 2));
        form.reset();
      } catch (error) {
        alert("An error occurred while submitting the form. Please try again.");
        console.error("Error:", error);
      }
    });
  });
  