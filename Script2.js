const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const  cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:false
}))



/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
const projectId = 'trini-lgxr';


// Imports the Dialogflow library
const dialogflow = require('@google-cloud/dialogflow');
const { response } = require('express');

// Instantiates clients
const intentsClient = new dialogflow.IntentsClient({
    keyFilename: "trini-lgxr-63a18e53a92f.json"
});

async function listIntents() {
  // Construct request

  // The path to identify the agent that owns the intents.
  const projectAgentPath = intentsClient.agentPath(projectId);

  console.log(projectAgentPath);

  const request = {
    parent: projectAgentPath,
  };
  
  // Send the request for listing intents.
  const [response] = await intentsClient.listIntents(request);
  const a = [];

  response.forEach(intent => {
    console.log('====================');
    console.log(`Intent name: ${intent.name}`);
    console.log(`Intent display name: ${intent.displayName}`);
    a.push ( {
      name:intent.displayName,
      action:intent.action,
      rootFollowupIntentName:intent.rootFollowupIntentName,
      parentFollowupIntentName:intent.parentFollowupIntentName});
    
    console.log(`Action: ${intent.action}`);
    console.log(`Root folowup intent: ${intent.rootFollowupIntentName}`);
    console.log(`Parent followup intent: ${intent.parentFollowupIntentName}`);


    console.log('Input contexts:');
    intent.inputContextNames.forEach(inputContextName => {
      console.log(`\tName: ${inputContextName}`);
    });

    console.log('Output contexts:');
    intent.outputContexts.forEach(outputContext => {
      console.log(`\tName: ${outputContext.name}`);
    });
  }); 
  app.get('/',(req,res)=>{
    res.send(a);})

  app.post('/',(req,res)=>{
    const a = req.body;
    res.json(a);
  });
    
}

listIntents()


app.listen(5000);