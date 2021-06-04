# Part 4 - local developer workflow

## Generating a test event payload
When you invoke your Lambda function code locally, The invocation must contain an event object with a JSON representation of the HTTP request. The file `/eventstestEvent.json` has a template API Gateway event. The body of the event is currently empty. 

### Paste the GitHub webhook payload into the event body:

1. Go to the respository you configured the webhook on and choose **Settings** > **Webhooks** > **Chose the Webhook**.
![img](/resources/finding-webhook-payload1.png)

2. In the *Recent Deliveries* Choose a delivery and then choose **Request**. This shows the payload of a recent Webhook.

![img](/resources/finding-webhook-payload2.png)

Before this payload is pasted into the body of the `testEvent.json` file, it must be converted to a string. Use an online toool such as [https://tools.knowledgewalls.com/jsontostring](https://tools.knowledgewalls.com/jsontostring) to do this. Copy and paste the JSON payload into the tool and choose **Convert**.

3. Paste the "stringified" JSON payload into the body field of `testEvent.json`. 
The final result will look somthing like this:

![img](/resources/finding-webhook-payload3.png)


## Lambda function environment variables
The `testharness.js` requires 2 important environment variables to run your Lambda function code. These should be added to the `part_4/env.json` file:

The S3 bucket name value can be found in the outpus when your applicaiton is deployed:
```json
{
"slackEndpoint": "Insert_Slack_Endpoint",
"bucket" : "Insert_S3_Bucket_Name"
}
```


## Dev dependencies

Both Lambda functions in this example application use the AWS SDK to write objects to Amazon S3. To test this from your Local IDE, the AWS SDK for Node.js must be installed as a dev dependancy. 

Each function's relative package.json has the following configuration:

```javascript
 "devDependencies": {
    "aws-sdk": "^2.906.0"
  }
  ```
This  means that the AWS SDK for Node.js will be installed into the relative `node_modules` directory when `npm install` is ran.

The dependancy is NOT copied into an AWS Lambda function when the applicaiton is deployed. This is because the AWS SDK is available to Lambda by default.
