# Memo

[Memo](https://pwa-memo.com) is a minimalistic, Google Keep -like [progressive web application](https://web.dev/what-are-pwas) where you can keep notes. Currently notes can contain only text but preview of any given url is fetched. Application integrates with [AWS](https://aws.amazon.com) infrastructure and services.

**Try it out @ http://pwa-memo.com** <- expired :(

![login-view](/readme-images/login-view.png) ![memo-view](/readme-images/memo-view.png)
<br>
<br>

## Ok, what's that progressive supposed to mean?

Even if you identify as conservative, don't worry! You can still use [Memo](https://pwa-memo.com) as progressive web applications have no liberal agenda. It just means that [Memo](https://pwa-memo.com) is, among other things, **responsive**, **installable** and **offline capable**.

- Responsive
  - Can be used on any device with any (modern) browser, layout adapts to screen size
- Installable
  - Application can be used via web browser but it can also be installed as application on your computer or added to your phone's Home screen
- Offline capable
  - Application can be used even without internet connection

![add-to-home-screen](/readme-images/add-to-home-screen.png)

When logged in and there's no connectivity, you can continue using the application as usual. When connection is detected, all changes you have made are synchronized with the backend. In this case you'll see a small "badge" pop up to indicate number of changes pending on the local device.

![offline-queue](/readme-images/offline-queue.png)
<br>
<br>

## Architecture

Here, I drew a picture and all.

![architecture](/readme-images/architecture.png?raw=true)

In short, application is stored and hosted in a S3 bucket. Application is cached on multiple AWS edge locations as Cloudfront distribution. Route 53 routes requests to pwa-memo.com domain to these distros. Once web page is loaded, user is authenticated against Cognito user/indentity pools and client receives token that allows access to AWS services (namely, the GraphQL API). Serverless backend, the AppSync, handles GraphQL mutations and connection between application and the DynamoDB database.

<hr>
<br>

### But why?

Just because I wanted to get my hands dirty with various AWS services and tools they provide.

### Development

`npm install`<br>
`amplify config`<br>
`amplify push`<br>
`ng serve`

Navigate to `http://localhost:4200/`<br>
Note that you need to have AWS account and additional tasks may be required on the AWS console side.

### Build

`ng build` or `ng build --prod` for a production build.<br>
`http-server dist/pwa-memo -o` to run locally.

### Unit tests

`ng test` runs unit tests via [Karma](https://karma-runner.github.io).

### End-to-end tests

`ng e2e` runs end-to-end tests via [Protractor](http://www.protractortest.org/).

