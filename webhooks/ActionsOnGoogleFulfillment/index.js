const { conversation } = require('@assistant/conversation');
const functions = require('firebase-functions');
const axios = require('axios').default;

const app = conversation({debug: true});

app.handle('unavailable_actions', conv => {
  // Implement your code here
  //const option= conv.intent.params.chosenUnavailableOption.original; 
  console.log(conv.intent.params);
  const optionKey= conv.intent.params.chosenUnavailableActions.resolved;
  
  const apiUrl = 'https://itreverie-family-api.herokuapp.com/requestWater/3';
  axios.get(apiUrl)
      .then((response) => response.json())
      .then((data) => console.log('This is your data', data));

  conv.add(data);
});

exports.ActionsOnGoogleFulfillment = functions.https.onRequest(app);
