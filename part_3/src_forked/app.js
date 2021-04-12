 
/*  
SPDX-FileCopyrightText: 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0 
*/

 
 const axios = require('axios');
 const slackEndpoint = process.env.slackEndpoint;
exports.handler = (event) => {
  const body = JSON.parse(event.body)
  const { repository, sender, forkee } = body;
  const repo = repository.name;
  const forks = repository.forks_count;
  const username = forkee.owner.login;
  const url = sender.html_url;
  const avatar_url = forkee.owner.avatar_url;
  const fork_url = forkee.html_url;


 const message ={ "attachments": [
      {
          "pretext": `One of your Github Repos has been forked _${repo}_ !`,
          "text": [
                    `_${repo}_* now has *${forks}* forks!`,
                    `Your new :fork_and_knife: was made by <${url}|${username}>.`,
                    `The location of the forked repository is ${fork_url}`
                  ].join('\n'),
          "thumb_url":`${avatar_url}`,
          "footer": "Serverless App",
          "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
      }
    ]
  }

  const data = JSON.stringify(message);

  const config = {
    method: 'post',
    url: slackEndpoint,
    data : data
    };

    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
    console.log(error);
    });

    return { 
        statusCode: 200, 
        body: JSON.stringify({ message: "done" })
        }
}