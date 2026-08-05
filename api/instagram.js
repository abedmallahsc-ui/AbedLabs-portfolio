export default async function handler(req, res) {

    // Verification (Meta checks this once)
    if (req.method === "GET") {

        const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

        const mode = req.query["hub.mode"];
        const token = req.query["hub.verify_token"];
        const challenge = req.query["hub.challenge"];

        if (mode === "subscribe" && token === VERIFY_TOKEN) {
            return res.status(200).send(challenge);
        }

        return res.status(403).send("Verification failed");
    }

    // Receive Instagram events
    if (req.method === "POST") {

        console.log("Instagram Event:");
        console.log(JSON.stringify(req.body, null, 2));

        return res.status(200).send("EVENT_RECEIVED");
    }

    return res.status(405).send("Method not allowed");

}