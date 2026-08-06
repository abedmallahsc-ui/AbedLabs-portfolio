// ==========================
// Typing Effect
// ==========================

const text = [
    "AI Agents",
    "AI Automation",
    "Software Development",
    "Web Applications",
    "Mobile Applications"
];

let index = 0;
let charIndex = 0;

const typingElement = document.createElement("h2");
typingElement.style.color = "#7f8cff";
typingElement.style.marginTop = "20px";
typingElement.style.minHeight = "40px";

document.querySelector(".hero-text").appendChild(typingElement);

function type() {

    if (charIndex < text[index].length) {

        typingElement.innerHTML += text[index].charAt(charIndex);
        charIndex++;
        setTimeout(type, 80);

    } else {

        setTimeout(erase, 1800);

    }

}

function erase() {

    if (charIndex > 0) {

        typingElement.innerHTML = text[index].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 40);

    } else {

        index++;
        if (index >= text.length) index = 0;
        setTimeout(type, 400);

    }

}

type();

// ==========================
// Scroll Reveal
// ==========================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, { threshold: 0.2 });

document.querySelectorAll(".card").forEach(card => {

    card.classList.add("hidden");
    observer.observe(card);

});

// ==========================
// Mouse Glow
// ==========================

const glow = document.createElement("div");
glow.className = "cursor-glow";
document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

});

// ==========================
// Navbar
// ==========================

window.addEventListener("scroll", () => {

    const nav = document.querySelector("nav");

    if (window.scrollY > 50) {

        nav.style.background = "rgba(5,8,22,.85)";
        nav.style.boxShadow = "0 0 30px rgba(100,120,255,.3)";

    } else {

        nav.style.background = "rgba(0,0,0,.25)";
        nav.style.boxShadow = "none";

    }

});

// ==========================
// Chat
// ==========================

const chatToggle = document.getElementById("chatToggle");
const chatContainer = document.getElementById("chatContainer");
const closeChat = document.getElementById("closeChat");
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatMessages = document.getElementById("chatMessages");
const typing = document.getElementById("typing");
const submitProjectBtn = document.getElementById("submitProject");

let conversationHistory = [];

chatToggle.addEventListener("click", () => {

    chatContainer.style.display = "flex";
    chatToggle.style.display = "none";

});

closeChat.addEventListener("click", () => {

    chatContainer.style.display = "none";
    chatToggle.style.display = "flex";

});

async function sendMessage() {

    const message = userInput.value.trim();

    if (!message) return;

    conversationHistory.push({
        role: "user",
        content: message
    });

    const userDiv = document.createElement("div");
    userDiv.className = "user-message";
    userDiv.innerHTML = message;
    chatMessages.appendChild(userDiv);

    userInput.value = "";

    typing.style.display = "block";

    try {

        const response = await fetch("/api/chat", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                history: conversationHistory

            })

        });

        const data = await response.json();

        typing.style.display = "none";

        const botDiv = document.createElement("div");
        botDiv.className = "bot-message";
        botDiv.innerHTML = data.reply;

        chatMessages.appendChild(botDiv);

        conversationHistory.push({

            role: "assistant",
            content: data.reply

        });

        chatMessages.scrollTop = chatMessages.scrollHeight;

        submitProjectBtn.style.display = "block";

    } catch (err) {

        typing.style.display = "none";

        const botDiv = document.createElement("div");

        botDiv.className = "bot-message";

        botDiv.innerHTML = "❌ Failed to contact Abed AI.";

        chatMessages.appendChild(botDiv);

    }

}
// ==========================
// Events
// ==========================

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        sendMessage();

    }

});

// ==========================
// Project Modal
// ==========================

const projectModal = document.getElementById("projectModal");
const closeProjectBtn = document.getElementById("closeProject");
const sendProjectBtn = document.getElementById("sendProject");

submitProjectBtn.addEventListener("click", () => {

    projectModal.style.display = "flex";

});

closeProjectBtn.addEventListener("click", () => {

    projectModal.style.display = "none";

});

sendProjectBtn.addEventListener("click", async () => {

    const templateParams = {

        name: document.getElementById("projectName").value,
        company: document.getElementById("projectCompany").value,
        email: document.getElementById("projectEmail").value,
        phone: document.getElementById("projectPhone").value,
        service: document.getElementById("projectService").value,
        budget: document.getElementById("projectBudget").value,
        timeline: document.getElementById("projectTimeline").value,
        details: document.getElementById("projectDetails").value

    };

    try {

        await emailjs.send(
            "service_nh06qrt",
            "template_f78mftq",
            templateParams
        );

        alert("✅ Project request sent successfully!");

        projectModal.style.display = "none";

        document.getElementById("projectName").value = "";
        document.getElementById("projectCompany").value = "";
        document.getElementById("projectEmail").value = "";
        document.getElementById("projectPhone").value = "";
        document.getElementById("projectService").value = "";
        document.getElementById("projectBudget").value = "";
        document.getElementById("projectTimeline").value = "";
        document.getElementById("projectDetails").value = "";

    } catch (error) {

        console.error(error);

        alert("❌ Failed to send project request.");

    }

});