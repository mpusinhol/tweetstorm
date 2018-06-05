import {generateTweetStorm} from './src/twitter';

//Gets the argument passed as tweet to the application
const TWEET = process.argv.pop();

//Verifies if the user has passed an argument as tweet,
//if the application's name is retrieved, it means that the user hasn't passed any tweets
if (TWEET == "twitter-storm") {
  console.log("You must pass an argument as a tweet");
} else {
  //Calls a method to break the tweet into smaller ones and post it on twitter
  generateTweetStorm(TWEET);
}