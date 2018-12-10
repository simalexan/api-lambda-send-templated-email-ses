
# Api Gateway -> Lambda (Send Templated Email) -> SES (Simple Email Service)

## Description

This is a serverless component consisting of:

- an Api Gateway with a POST `/send` endpoint, that requires two parameters: `toEmails`, and `templateData`. It also accepts two optional ones: `ccEmails` and `replyToEmails`.
- a Lambda that sends a Templated email to one or more specified email addresses. It takes the Template Name from the initial CloudFormation deployment, which must be a valid and existing SES Template. It also needs the From Email parameter from the initial CloudFormation deployment, the verified email used to specify the source from which the emails are sent.

It's a Nuts & Bolts application component for AWS Serverless Application Repository.

## Deployment Parameters

This component has three CloudFormation deployment parameters:

- `FromEmail`, a required parameter, representing an email from which you want to send an email.
- `TemplateName`, a required parameter, representing the name of an existing and valid Email Template you want to use.
- `CorsOrigin`, an optional parameter, where you can restrict access to only specified domains.

## Latest Release - 1.0.0

Initial release.

## Roadmap - Upcoming changes

Here are the upcoming changes that I'll add to this serverless component:

- ESLint
- Tests