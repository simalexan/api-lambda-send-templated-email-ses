const AWS = require('aws-sdk'),
  SES = new AWS.SES(),
  processResponse = require('./process-response.js'),
  FROM_EMAIL = process.env.FROM_EMAIL,
  TEMPLATE_NAME = process.env.TEMPLATE_NAME;

exports.handler = (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return Promise.resolve(processResponse(true));
  }

  if (!event.body) {
    return Promise.resolve(processResponse(true, 'Please specify the required parameters: toEmails, and templateData', 400));
  }
  const emailData = JSON.parse(event.body);

  if (!emailData.toEmails || !Array.isArray(emailData.toEmails) || !emailData.templateData) {
    return Promise.resolve(processResponse(true, 'Please specify the required parameters: toEmails, and templateData', 400));
  }

  const destination = {
    ToAddresses: emailData.toEmails
  }

  if (emailData.ccEmails && Array.isArray(emailData.ccEmails)) {
    destination.CcAddresses = emailData.ccEmails;
  }

  const emailParams = {
    Destination: destination,
    Template: TEMPLATE_NAME,
    TemplateData: emailData.templateData,
    Source: FROM_EMAIL
  };

  if (emailData.replyToEmails && Array.isArray(emailData.replyToEmails)) {
    emailParams.ReplyToAddresses = emailData.replyToEmails;
  }

  return SES.sendTemplatedEmail(emailParams).promise()
    .then(() => (processResponse(true)))
    .catch(err => {
      console.error(err, err.stack);
      const errorResponse = `Error: Execution update, caused an SES error, please look at your logs.`;
      return processResponse(true, errorResponse, 500);
    });
};