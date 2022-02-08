# Thinkific Embedded App NodeJS Example

This is an example of a NodeJS application to set up an embedded app for Thinkific.

## Prerequisites

You will need the credentials for your app created in Thinkific Platform.

- client_id: App's client id;
- redirect_uri: App's registered callback uri. For example, this app uses `{app_url}/install/callback`.

Additionally, you will need a MongoDB database.

## Description

This project takes you through Thinkific's OAuth app install flow then renders a SSR app inside Thinkific's app details page i.e. _/manage/apps/{slug}_. The app is built to be compatible for the embedded app experience i.e. to be iframed into Thinkific app details page. 

It consumes a couple of Thinkific's packages, namely Toga (UI library) and App Frames (client-side library). The use of former is optional, but the latter must be used in order to interact with the host environment for certain behaviours e.g. dispatch a toast message.


## Project setup

Create `.env` file

```
cp .env-example .env
```

and populate the `CLIENT_ID` with your app's client_id 

```
CLIENT_ID=
```

You must also populate the rest of the environment variables according to your app's needs:

```
PORT=
MONGODB_URI=
APP_URL=
```

Install dependencies:
```
npm install
```

Run the app:
```
npm run dev
```
