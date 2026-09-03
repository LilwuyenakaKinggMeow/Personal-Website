const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const { error } = await supabase
                .from("contacts")
                .insert([
                    {
                        name: name,
                        email: email,
                        message: message
                    }
                ]);

            if (error) {
                console.error("Supabase error:", error);
                alert("Failed to send your message.");
                return;
            }

            alert(`Thank you, ${name}! Your message has been received.`);
            contactForm.reset();

        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong.");
        }
    });
}