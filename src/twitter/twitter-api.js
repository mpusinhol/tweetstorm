import Twitter from 'twitter';

//Client to manager the posts on Twitter
const CLIENT = new Twitter({
  consumer_key: "",
  consumer_secret: "",
  access_token_key: "",
  access_token_secret: ""
});

/**
 * Receives a tweet and posts it on Twitter
 * @param {String} tweet The tweet to be posted
 */
export const postTweet = tweet => {
  return new Promise((resolve, reject) => {
    CLIENT.post('statuses/update', {status: tweet})
    .then(tweet => {
      resolve(tweet);
    })
    .catch(error => {
      reject(error);
    });
  });
}

/**
 * Receives an id of a tweet and the text to reply it
 * @param {String} id The id of the tweet to be replied
 * @param {String} tweet The actual tweet to be written as reply
 */
export const replyTweet = (id, tweet) => {
  return new Promise((resolve, reject) => {
    CLIENT.post('statuses/update', {in_reply_to_status_id: id, status: tweet})
    .then(tweet => {
      resolve(tweet);
    })
    .catch(error => {
      reject(error);
    });
  });
}