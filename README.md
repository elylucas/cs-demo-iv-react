# Ionic Customer Success Demo - Identity Vault / React

This reference application shows the use of Ionic's Identity Vault within an Ionic React mobile application. We assume that you have access to Ioinic's Identity Vault product. If this is not the case, please contact our sales department.

## Building

- Clone this repository
- Follow the [Ionic Native Enterprise Edition Setup instructions](https://ionicframework.com/docs/enterprise#setup) if you have not already done so
- Follow the [Ionic Native Enterprise Edition Register instructions](https://ionicframework.com/docs/enterprise#setup) from this application's root directory. If you have multiple keys, be sure to choose one that has access to Identity Vault.
- `npm i`
- `npm start` - if you want to run in the browser, but you will not get Identity Vault functionality
- `npm run build`
- `npx cap sync`
- `npx cap open ios`
- `npx cap open android`

The application can be run in the browser via `npm start`.

A test user exists with the following credentials:

- **email**: test@test.com
- **password**: test

## Application Tour

This is a simple application that allows users to view and edit information pertaining to various types of tea. The application doesn't do much, but it is meant to model the typical operations performed by a data centric application. That is:

- It provides a login
- It allows users to view and modify data
- It allows users to perform some basic configuration setting (in this case centered around the Identity Vault itself)

### Login

The login page is a simple form that takes an e-mail address and password from the user. If the user has a stored session they will also be presented with the means to unlock the session.

### Home

The home page contains a list of tea categories. Tapping on a tea category allows the user to edit the category. If the user tries to save an edit a tea category after their token as been invalidated, they will be redirected to the login page.

### About

The about page displays some based information about the application as well as the current state of the vault.  This may be different than the settings for the vault as the user could (for example) set the vault to use biometrics even if the current device does not support it. In this case, the settings could specify Biometrics and Passcode, but the mode here would be specified as Passcode Only.

### Settings

This page allows the user to specify exactly how the vault should be set up. There are three options:

- Biometrics
- Passcode (choosing this will ask for a passcode to use)
- Secure Storage (selecting this will disable the other two)

If none of these options are checked, the session will not be stored, and the user will need to log in each time.

## Significant Architecture

### Components

It is turtles, all the way down. In a React app, those turtles are components. In this app, I have classified three main categories of components: Pages, Standard Components, and Container Components.

#### Pages

The page components are the main components that are routed to. Outside of some simple interaction (such as dispatching a `logout` action), the page components are only involved in being routed to and leave the user interaction bits to more qualified components in the tree.

#### Standard Components

The standard components are generally in charge of displaying data to the user and allowing the user to interact with the data on the pages. There is one notable exception. The `AuthMonitor` component, as the name implies, monitors the `auth` state and redicts the user either to the login page or the application's main page when that state changes in a significant manner.

#### Container Components

The container components wrap the standard components, and connect them to the store. Generally this means getting data from the store to pass to the components and dispatching actions to the store as a result of various events.

### Store

This store is the source of all truth for the application, and should be the only place that the components in the application get information about the state. The store contains three main sections:

- `auth`: all state pertaining the authentication and the current state of the vault, with the exception of the token, which must _always_ be obtain from the vault
- `settings`: information pertaining to the user's desired vault configuration, primarily the _desired_ `authMode` (the _actual_ `authMode` is part of the `auth` state)
- `teaCategories`: the current tea category data

The store is really the "brains" of the whole operation, and manages the application. When the components require data, they get that data from the store. When the user does something, an action is dispatched to the store and the store handles the tasks required to fulfill that action. 

#### Application Startup

Upon startup, the store has an `auth.status` of `Unitializied`. At this time, an action is dispatched to the store to load the auth data. This will either get the data from the vault and the `auth.status` will go to `LoggedIn` or it will not get any data from the vault and the `auth.status` will go to `LoggedOut`. Either way, the `AuthMonitor` component will detect the change in state and navigate the application to the correct page.

If the state goes to `LoggedIn`, the tea category and settings data is loaded.

#### Auth State Changes

Once the application has been started, there are a few different ways that the auth state can change:

- the user can log in
- the user can log out
- the token can go invalid and the user tries to do something that uses the token (generally a change to a tea category)
- the vault can lock

If any of these events occur, the `AuthMonitor` component detects the chage and redirects the application accordingly.

### Services

The services are called by the store to do some sort of work. As such, they know nothing about the rest of the system. They just do as they are told by the store. The notable exception is the `IdentityService`, which needs to be able to respond to events from the vault and thus dispatch actions.

Since the store needs to use the `IdentityService` in its async actions, and the `IdentityService` needs to dispatch action, the asynchronous actions have been seperated from the synchonous actions. This avoids circular references.

#### Authentication

The authentication service handles the mechanics of logging in and out of the backend API. The authentication is handled via obtaining a simple JWT and then passing it back to the API with each transaction. The `authentication` service needs to communicate with the `identity` service in order to get the current token when performing a `logout` operation.

#### Browser Auth

The `browser-auth` family of services are used by the `identity` service in order to allow the application to be run in a browser environment. These are used when the application is run via the development server (`ionic serve`) or when the application is installed in a web-based context, such as when running as a PWA.

For details on how the `browser-auth` services are used, refer to the `identity` service `getPlugin()` method implementation.

#### Identity

This service is the interface into the vault. In this case, the service is using the vault in order to manage the current user's session. That is, to store information about the current user including their JWT.

This service also exposes some observables that the store can subscribe to in order to determine when the vault is locked and when a PIN must be requested from the user. Note that the store access the service, not the other way around. Attempting to do this the other way around seems very natural (dispatch an action to the store when the events occur), but this causes circular references.

#### Data

The `settings` and `teaCategories` services deal with the getting and setting of data, one from the application's local storage mechanisms, the other from a backend API. Since the `teaCategories` service deals with the backend API, it needs to communicate with the `identity` service in order to get the current token.