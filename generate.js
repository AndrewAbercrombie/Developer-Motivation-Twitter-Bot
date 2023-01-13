const { Configuration, OpenAIApi } =  require("openai");
const dotenv = require("dotenv");
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generate = async (input) => {
  if (!configuration.apiKey) {
    console.error("Please set the OPENAI_API_KEY environment variable.");
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: input,
      max_tokens: 100,
    });
    return completion.data.choices[0].text;
  } catch(error) {
    console.error(`Error with OpenAI API request: ${error.message}`);
    return false;
  }
};

  module.exports = { generate }