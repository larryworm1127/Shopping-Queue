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

## Website Features and Instruction

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

User can select the type of user they are login as using the LOGIN AS input field shown in screenshot below.
If user don't have an account, then they can redirect themselves to register page either user the navigation bar on top,
or the sign up link under the SIGN IN button.

![login](/assets/login_screenshot.PNG)

As for register part of user authentication, user would first need to fill in basic account information
such as username and password as seen in screenshot below.

![register_home](/assets/register_screenshot.PNG)

User would then have to choose the type of user they will be registering for.
Admin/superuser will not be open for register for obvious security reasons,
but instead their credentials will have to be requested from website owners.
As for shoppers and store owners, once the user entered and verified basic account information,
they will need to fill out basic user profile information listed in project proposal
as seen in screenshot below.

![register_profile](/assets/register_profile_screenshot.PNG)

Once user filled out profile information, they can begin using the website by logging 
into their account they just registered.

Note that for phase 1, the registered account would only last as long as the server
running for the website. Restarting the server would result in lose of all registration
data.


### User Profile


### Map

A map feature is implemented for the website. The map itself is currently
centered at a fixed coordinate for phase 1 and will be made more dynamic for phase 2
uses shopper given address.

The left side of the page is a view-only map where user can see the stores
they want to queue in on the map, as shown in screenshot below. 

![map](/assets/map_screenshot.PNG)

The right side of the page is a list of all the shops registered on the website.
The "highlight on map" button will place a marker (coordinate randomized 
for phase 1) on the map to show user where the store is, while the "queue here"
button will take user to store queue page where user can queue up that store.
Detailed information about each store is also listed on the cards to help
shoppers decide which store to queue at.


### Store Queue

The hidden page of the website where user can't access from the navigation panel is the store
queue page, as shown in screenshot below.

![store_queue](/assets/store_queue_screenshot.PNG)

Shoppers can pick the date where they would come into the store, as well
as their estimated shopping time (default to store limit, used to help speed
up the queue algorithm which will be implemented in phase 2), and number of
shoppers. After filling out the queue information, shopper must press
"add to queue" in order to queue up at the store.

Note: currently "add to queue" does not update the queue itself as that will
be implemented in phase 2.
