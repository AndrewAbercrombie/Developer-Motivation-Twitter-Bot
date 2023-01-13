//import generate
const { generate } = require("./generate.js");
//Do twitter setup here

const { TwitterApi } =  require('twitter-api-v2');

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

let first;
process.argv.forEach(function (val, index, array) {
  if (index == 2) {
    if (val == "first") {
      first = true;
    }
  }
});


(async () => {
  let prompt = "Generate a short quote to keep developers motivated, do not include the author of the quote."

  if (first) {
    let tweet;

    do {
      tweet = await generate(prompt)
    } while (!tweet || tweet == false);

    await client.v1.tweet(tweet);
  }
  let tweetIndex = 0;
  
  setInterval(async function () {
    tweetIndex++;
    console.log("Posting Tweet: " + tweetIndex);
    let tweet;
    do {
      tweet = await generate(prompt)
    } while (!tweet || tweet == false);
    

    await client.v1.tweet(tweet);
}, 3600000);
})(); 



