import {postTweet, replyTweet} from './twitter-api';
import async from 'async';

const MAX_LENGTH = 138; //Twitter max length without the '$INDEX/'
const SEPARATORS = ['.', '!', ';', ':', '?', '"', '“', '”']; //Characters to search for when breaking the text
const QUOTES = ['"', '“', '”']; //Used to try to keep quoted parts on the same tweet

/**
 * Gets the length of the substring that is going to be used as a tweet.
 * It looks for the last symbol separator defined on the array above;
 * If it's a quote, it will break the text before it, trying to keep the whole quote on the same tweet;
 * If it cannot find any separators, it will look for the last comma;
 * If it cannot find any commas, it will look for the last space;
 * If it cannot find any space, it will break the text when it reaches the maximum length defined above.
 * 
 * @param {String} tweet The whole tweet to be split
 * @param {Char} lastSeparatorIndex Ahe last separator symbol found
 * @param {Boolean} isQuote A boolean indicating if it's a quote
 * @param {Boolean} quoteOpened A boolean indicating if it's an opening or closing quote
 */
const getSubstringLength = (tweet, lastSeparatorIndex, isQuote, quoteOpened) => {
  let substringLength = 0;

  //look if there is a saparator
  if (lastSeparatorIndex > -1) {
    //if it's a quote the behavior is to break the text before it if it's an opening one
    //or include it on the text, if it's a closing one
    if (isQuote) {
      substringLength = quoteOpened ? lastSeparatorIndex : lastSeparatorIndex + 1;
    } else {
      substringLength = lastSeparatorIndex + 1;
    }
  } else {
    //If there's no separator, checks for the last comma
    let lastCommaIndex = tweet.lastIndexOf(',');

    if (lastCommaIndex > -1) {
      substringLength = lastCommaIndex + 1;
    } else {
      //if there isn't a comma, checks for the last space or breaks on the maximum length
      let lastSpaceIndex = tweet.lastIndexOf(' ');

      if (lastSpaceIndex > -1) {
        substringLength = lastSpaceIndex + 1;
      } else {
        substringLength = MAX_LENGTH;
      }
    }
  }

  return substringLength;
}

/**
 * Splits a whole tweeter into an array of smaller ones
 * @param {String} tweet The whole tweet to be posted
 */
const splitTweet = tweet => {
  let tweets = [],
      character = '',
      lastSeparatorIndex = -1,
      tweetCount = 0,
      tweetPart = "",
      isQuote = false,
      quoteOpened = false;

  //iterates char by char over the whole tweet
  for (let i = 0; i < tweet.length; i++) {
    character = tweet.charAt(i);
    tweetPart += character; //Adds the char to the partial tweet

    //Checks if it's a separator
    if (SEPARATORS.includes(character)) {
      lastSeparatorIndex = tweetPart.length - 1;
    }

    //Checks if it's a quote
    if (QUOTES.includes(character)) {
      isQuote = true;
      quoteOpened = !quoteOpened; //flags or unflags depending if it's an opening or closing quote
    }

    //Checks if the partial tweet has reached its maximum length or if it has reached a quote
    if (tweetPart.length == MAX_LENGTH || isQuote) {
      //Call function to retrieve the length of the substring to be taken from the partial tweet
      let substringLength = getSubstringLength(tweetPart, lastSeparatorIndex, isQuote, quoteOpened);
      let tweetSubstring = tweetPart.substr(0, substringLength);

      //Removes white space from the first character if there is one
      if (tweetSubstring != "" && tweetSubstring.charAt(0) == ' ') {
        tweetSubstring = tweetSubstring.substr(1);
      }

      //Adds the tweet to an array of sub-tweets
      tweets.push(`${++tweetCount}/${tweetSubstring}`);

      //Removes the part that has already been added to the array from the partial tweet
      tweetPart = tweetPart.substr(substringLength);

      lastSeparatorIndex = -1;

      if (isQuote) {
        isQuote = false;
      }
    }
  }

  //Checks if there's still text after the end of the loop
  if (tweetPart.length > 0) {
    tweetCount++;

    //Removes white spacec on the first character if there is
    if (tweetPart.charAt(0) == ' ') {
      tweetPart = tweetPart.substr(1);
    }

    //Adds the last sub-tweet
    tweets.push(`${tweetCount}/${tweetPart}`);
  }

  return tweets;
}

/**
 * Gets a whole tweet, breaks it into smaller pieces and posts it on Twitter
 * @param {String} tweet The whole tweet to be processed
 */
export const generateTweetStorm = tweet => {
  let tweetStorm = splitTweet(tweet); //Splits the whole tweet into an array of smaller ones
  let firstElement = tweetStorm.slice(0, 1); //Gets the first tweet to be posted

  tweetStorm.shift(); //Removes the first tweet from the array

  //Call a function to post the tweet
  postTweet(firstElement.pop())
    .then(data => {
      console.log(`Tweet posted: ${data.text}`);

      //After posting, checks if there are other tweets to reply the first one
      if (tweetStorm.length > 0) {
        let count = 0;

        //Uses the async library to reply all tweets in order, one after the other
        async.each(tweetStorm, (tweetReply, callback) => {
          //Calls a function to reply the first tweet
          replyTweet(data.id_str, tweetReply)
            .then(response => {
              count++; //Counts all processed replies

              console.log(`Tweet replied: ${response.text}`);

              //If it has processed all replies, call the callback to end the iteration
              if (count == tweetStorm.length) {
                callback();
              }
            })
            .catch(error => {
              callback(error); //Calls the callback if an error occurred
            })
        }, (error => {
          //If there's an error, throws it to the bigger catch
          if (error) {
            throw error;
          }
        }))
      }
    })
    .catch(error => {
      console.log(`Error: ${JSON.stringify(error)}`);
    })
} 