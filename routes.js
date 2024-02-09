import Express from "express";
import { promptAI } from './generativeAI.js';

const router = Express.Router();

router.get("/test", (req, res) => {
    res.send("I am reachable!");
});

router.post("/chat", async (req, res) => {
    const prompt = req.body.prompt;

    try {
        const response = await promptAI(prompt);
        return res.json({response});
    } catch(err) {
        return res.status(500).json({error: "Internal Server Error"})
    }
});

export default router;
