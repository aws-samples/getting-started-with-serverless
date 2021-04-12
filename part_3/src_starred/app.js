  
/*  
SPDX-FileCopyrightText: 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: MIT-0 
*/

 
 const axios = require('axios');
 const slackEndpoint = process.env.slackEndpoint;
exports.handler = (event) => {
  const body = JSON.parse(event.body)
  const { repository, sender } = body;
  const repo = repository.name;
  const stars = repository.stargazers_count;
  const username = sender.login;
  const url = sender.html_url;
  const avatar_url = sender.avatar_url;


 const message ={ "attachments": [
      {
          "pretext": `There is a new Github star for _${repo}_ !`,
          "text": [
                    `_${repo}_* now has *${stars}* stars!`,
                    `Your new :star: was made by <${url}|${username}>.`
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