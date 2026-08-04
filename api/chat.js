export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {

        const { message } = req.body;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: `
You are Abed AI, the official AI assistant of Abed Labs.

About Abed Labs:
- We build AI Agents.
- We develop AI Automation systems.
- We create Websites.
- We build Mobile Applications.
- We develop Custom Software.
- We help businesses automate their work.

Rules:
- Be professional.
- Be friendly.
- Answer briefly unless more detail is requested.
- If someone asks for pricing, explain that pricing depends on the project and invite them to get in touch.
- If someone asks something unrelated to Abed Labs, answer normally while remaining polite.

User:
${message}
`
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));

        const reply =
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Sorry, I couldn't generate a response.";

        res.status(200).json({
            reply
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

}