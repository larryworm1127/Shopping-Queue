# Shopping Queue

## Description
As a response to current Covid-19 pandemic, we decided to create a web app
that helps control the flow of shoppers going to shopping at various store,
in response to social distancing policies. 

## Software Setup

To run the web app locally, start by cloning the repo:
```bash
$ git clone https://github.com/csc309-summer-2020/team21.git
```
Use terminal and navigate into the folder of the cloned repo, then run
```bash
$ npm install
```
which will install required npm packages for the web app.

To start the react local server, run
```bash
$ npm start
```
and the website should be running on http://localhost:3000/.

## Website Features

### Basic User Authentication

For our website, we implemented a basic user authentication system for 3 different types of users.
This includes the shoppers, the store owners, and the website admins.
For phase 1 of the project, we use the following credentials for authentication:

| User Type   | Username | Password |
|:-----------:|:--------:|:--------:|
| shopper     | user1    | user1    |
| shopper     | user2    | user2    |
| store owner | store1   | store1   |
| store owner | store2   | store2   |
| store owner | store3   | store3   |
| store owner | store4   | store4   |
| admin       | admin    | admin    |

User can select the type of user they are login as using the *LOGIN AS* input field shown in screenshot below.
If user don't have an account, then they can redirect themselves to register page either user the navigation bar on top,
or the sign up link under the *SIGN IN* button.

![login](/assets/login_screenshot.PNG)
 