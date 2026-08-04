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

function sendMessage() {

    const message = userInput.value.trim();

    if(message === "") return;

    // User Message

    const userDiv = document.createElement("div");

    userDiv.className = "user-message";

    userDiv.innerHTML = message;

    chatMessages.appendChild(userDiv);

    chatMessages.scrollTop = chatMessages.scrollHeight;

    userInput.value = "";

    // Typing

    typing.style.display = "block";

    setTimeout(() => {

        typing.style.display = "none";

        const botDiv = document.createElement("div");

        botDiv.className = "bot-message";

        botDiv.innerHTML = getBotResponse(message);

        chatMessages.appendChild(botDiv);

        chatMessages.scrollTop = chatMessages.scrollHeight;

    },1200);

}

sendBtn.addEventListener("click",sendMessage);

userInput.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){

        sendMessage();

    }

});

/* ========================= */
/* AI Responses */
/* ========================= */

function getBotResponse(message){

message = message.toLowerCase();

if(message.includes("price") || message.includes("cost")){

return "💰 Every project is customized. Contact Abed Labs for a free quote based on your requirements.";

}

if(message.includes("website")){

return "🌐 We build modern websites, portfolios, business websites, landing pages and AI-powered web applications.";

}

if(message.includes("ai")){

return "🤖 We develop AI agents, chatbots, automation systems, AI integrations and custom AI software.";

}

if(message.includes("mobile")){

return "📱 We create Android and iOS applications with beautiful UI and powerful backend systems.";

}

if(message.includes("software")){

return "💻 We develop custom software, dashboards, management systems and enterprise solutions.";

}

if(message.includes("project")){

return "🚀 Our featured projects include a School Management Platform, AI Business Automation, AI Content Generator and Portfolio Websites.";

}

if(message.includes("hello") || message.includes("hi")){

return "👋 Hello! Welcome to Abed Labs. How can I help you today?";

}

return "✨ That's a great question! Soon I'll be connected to a real AI model that can answer anything about Abed Labs and our services.";

}