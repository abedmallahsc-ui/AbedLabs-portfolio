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
// Scroll Reveal Animation
// ==========================

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: 0.2

});

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
// Navbar Shadow
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
/* ========================= */
/* Floating Chatbot */
/* ========================= */

const chatToggle = document.getElementById("chatToggle");
const chatContainer = document.getElementById("chatContainer");
const closeChat = document.getElementById("closeChat");
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatMessages = document.getElementById("chatMessages");
const typing = document.getElementById("typing");
let conversationHistory = [];

/* Open Chat */

chatToggle.addEventListener("click", () => {

    chatContainer.style.display = "flex";

    chatToggle.style.display = "none";

});

/* Close Chat */

closeChat.addEventListener("click", () => {

    chatContainer.style.display = "none";

    chatToggle.style.display = "flex";

});

/* Send Message */

async function sendMessage() {

    const message = userInput.value.trim();
    conversationHistory.push({ role: "user", content: message });

    if (message === "") return;

    const userDiv = document.createElement("div");
    userDiv.className = "user-message";
    userDiv.innerHTML = message;

    chatMessages.appendChild(userDiv);

    userInput.value = "";

    chatMessages.scrollTop = chatMessages.scrollHeight;

    typing.style.display = "block";

    try {

        const response = await fetch("/api/chat", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                message,
                history: conversationHistory

            })

        });

        const data = await response.json();

        typing.style.display = "none";

        const botDiv = document.createElement("div");

        botDiv.className = "bot-message";

        const ready = data.reply.includes("[PROJECT_READY]");

        const cleanReply = data.reply.replace("[PROJECT_READY]", "").trim();

        botDiv.innerHTML = cleanReply;

        const submitBtn = document.getElementById("submitProject");

        if (ready) {
        submitBtn.style.display = "block";
}
        conversationHistory.push({ role: "assistant", content: data.reply });

        chatMessages.appendChild(botDiv);

        chatMessages.scrollTop = chatMessages.scrollHeight;

    } catch (error) {

        typing.style.display = "none";

        const botDiv = document.createElement("div");

        botDiv.className = "bot-message";

        botDiv.innerHTML = "❌ Sorry, I couldn't connect to Abed AI.";

        chatMessages.appendChild(botDiv);

    }

}

sendBtn.addEventListener("click",sendMessage);

userInput.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){

        sendMessage();

    }

});

        const submitBtn = document.getElementById("submitProject");

submitBtn.addEventListener("click", async () => {

    alert("🚀 Project submission is coming in the next step!");

});
        const projectModal = document.getElementById("projectModal");
const submitProjectBtn = document.getElementById("submitProject");
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

    } catch (error) {

        console.error(error);

        alert("❌ Failed to send project request.");

    }

});

/* ========================= */
/* AI Responses */
/* ========================= */

