const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

input.addEventListener("keydown", async (e) => {
    if (e.key === "Enter" && input.value.trim() !== "") {
        const message = input.value;
        appendMessage("user", message);
        input.value = "";

        const response = await fetch("http://localhost:3000/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }),
        });

        const data = await response.json();
        appendMessage("ai", data.reply);
    }
});

function appendMessage(role, text) {
    const msg = document.createElement("div");
    msg.className = role === "user" ? "text-right text-blue-400" : "text-left text-green-400";
    msg.textContent = (role === "user" ? "👤 " : "🤖 ") + text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}
