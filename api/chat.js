export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {

        const { history = [] } = req.body;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {

            method: "POST",

            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://abed-labs-portfolio.vercel.app",
                "X-Title": "Abed Labs"
            },

            body: JSON.stringify({

                model: "openai/gpt-oss-20b:free",

                messages: [

                    {
                        role: "system",
                        content: `You are Abed AI, the official AI assistant for Abed Labs.

Abed Labs specializes in:
- AI Agents
- AI Automation
- Websites
- Mobile Applications
- Custom Software
- Business Automation

Be professional and friendly.

If the user asks about our services, answer normally.

If they are interested in working with Abed Labs, encourage them to click the "Create Project Request" button to send their project details.

If they ask about pricing, explain that pricing depends on the project's requirements.`
                    },

                    ...history

                ]

            })

        });

        const data = await response.json();

        if (!response.ok) {

            console.error(data);

            return res.status(response.status).json({
                reply: data.error?.message || "Provider returned error."
            });

        }

        const reply =
            data.choices?.[0]?.message?.content ||
            "Sorry, I couldn't generate a response.";

        return res.status(200).json({ reply });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({
            reply: "Internal server error."
        });

    }

}