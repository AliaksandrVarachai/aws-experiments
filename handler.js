const AWS = require('aws-sdk');

module.exports = {
  usersSubmit: (event, context, callback) => {
    const sqs = new AWS.SQS();
    console.log('*************', event)
    const { users } = JSON.parse(event.body);
    users.forEach(user => {
      sqs.sendMessage({
        QueueUrl: process.env.SQS_URL,
        MessageBody: user,
      }, () => {
        console.log(`Send message for: ${user}`);
      });
      callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
    })
  },
  usersInvite: (event) => {
    const users = event.Records.map(({ body }) => body);
    const sns = new AWS.SNS({ region: 'us-east-1' });

    // Create user account
    // Add user to the project
    // Send invitation
    console.log(users);
  }
};
