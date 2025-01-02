import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, //.env needs to be put in the same folder
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello from LumSovTech AI Consulting',
    })
});

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `\"\"\"${prompt}\"\"\"`,
            temperature: 0.5,
            max_tokens: 2800,
            top_p: 0.9,
            frequency_penalty: 0.5,
            presence_penalty: 0.2,
            stop: ["The end"],
        });

        res.status(200).send({
            bot: response.data.choices[0].text
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error })
    }
})

const port = 3425;
app.listen(port, () => { console.log(`Server running on port ${port}`) });