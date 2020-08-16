# Shopping Queue
 
## Description
As a response to current Covid-19 pandemic, we decided to create a web app
that helps control the flow of shoppers going to shopping at various store,
in response to social distancing policies.

Click the following link to see deployed web app: https://shopping-queue.herokuapp.com/ 
 

## Software Setup
 
To run the web app locally, start by cloning the repo:
```bash
$ git clone https://github.com/csc309-summer-2020/team21.git
```
Use terminal and navigate into the folder of the cloned repo, then run
```bash
$ npm run setup
```
which will install required npm packages for the web app.

MongoDB is also required to run the web app, which can be ran locally using:
```bash
$ mkdir mongo-data
$ mongod --dbpath mongo-data
```
 
To run the express server locally, run
```bash
$ npm run build-run
```
and the website should be running on http://localhost:5000/.


## Website Features and Instruction
 
### Basic User Authentication
 
For our website, we implemented a basic user authentication system for 3 different types of users.
This includes the shoppers, the store owners, and the website admins.
For purpose of demoing the project, we will use the following credentials for authentication:
 
| User Type   | Username | Password |
|:-----------:|:--------:|:--------:|
| shopper     | user     | user     |
| shopper     | user2    | user2    |
| store owner | store1   | store1   |
| store owner | store2   | store2   |
| store owner | store3   | store3   |
| store owner | store4   | store4   |
| admin       | admin    | admin    |
 
User can select the type of user they want to login as using the LOGIN AS input field shown in screenshot below.
If user don't have an account, then they can redirect themselves to register page either user the navigation bar on top,
or the sign up link under the SIGN IN button.
 
![login](/assets/login_screenshot.PNG)
 
As for register part of user authentication, user would first need to fill in basic account information
such as username and password as seen in screenshot below.
 
![register_home](/assets/register_screenshot.PNG)
 
Then, User will have to choose the type of user they will be registering for.
Admin/superuser will not be open for register for obvious security reasons,
but instead their credentials will have to be requested from website owners.
As for shoppers and store owners, once the user entered and verified basic account information,
they will need to fill out basic user profile information listed in project proposal
as seen in the screenshot below.
 
![register_profile](/assets/register_profile_screenshot.PNG)
 
Once a user fills out profile information, they can begin using the website.
Store owners will need to fill out location using the autocomplete system to allow
their store to show up on the map feature which will be explained later.


### Home
 
#### Before Login
![Home](/assets/UpdatedScreenshots/homepage_default.PNG)
This is the landing page of the website, it shows a signup button for easy access to the new users. It also lists various value added services provided by the website.
 
#### After Login
Home page is the first page shown after the login.
Shoppers will see their view history (the stores they have browsed) and Queue history.
![Home](/assets/UpdatedScreenshots/homepage_shopper.PNG)
While for the admin and shop owner; depending on the role of the user different stats are displayed.
![Home](/assets/UpdatedScreenshots/homepage_admin.PNG)
![Home](/assets/UpdatedScreenshots/homepage_store.PNG)
 
All users will have access to contact admin form to easily send help requests to admins,
and a profile button for easy access to user profiles.


### Map
 
A map feature is implemented for the website. The right side of the page is a 
view-only map where user can see the stores they want to queue in on the map, as 
shown in the screenshot below.
 
![map](/assets/UpdatedScreenshots/map.PNG)
 
The left side of the page is a list of all the shops registered on the website.
The "highlight on map" button will place a marker on the map and re-center the map 
to show user where the store is, while the "queue here"
button will take the user to the store queue page where the user can queue up that store.
Detailed information about each store is also listed on the cards to help
shoppers decide which store to queue at. A search bar is implemented on top to help
filter the store cards by store name.
 
 
### Store Queue
 
The hidden page of the website where user can't access from the navigation panel is the store
queue page, as shown in screenshot below.
 
![store_queue](/assets/store_queue_screenshot.PNG)
 
Shoppers can pick the date and time in which they would come into the store, as well
as their estimated shopping time, and number of shoppers. After filling 
out the queue information, shopper must press "add to queue" in order to 
queue up at the store. The website will then verify the entered queue info
to make sure there are no conflicts with other shoppers or store restrictions.


### My Queues
 
This page is where the user can view and manage all the queues that they 
are currently in.
 
![store_queue](/assets/UpdatedScreenshots/queues_shopper.PNG)
 
The user can view details about the store they are queued for. The user 
can also choose to edit the day, time, and number of shoppers for their queue. 
If the user no longer wants to go to a store, they can simply leave the queue.

![store_queue](/assets/UpdatedScreenshots/queue_details.PNG)

 
### Shopper, Store Owner, and Admin Profiles
 
#### Shopper
Once logging in with the correct credentials for a shopper, you can now 
visit your own profile page! In this profile page, you will be greeted 
initially with your own information!
 
This will give you your name, email, and location, as well as your 
favourite stores that you use, and what your notification settings 
are for the app to remind you of your bookings.
 
![user_profile](/assets/UpdatedScreenshots/profile_shopper.PNG)
 
On the favourite stores section, you will also be able to directly queue 
up for your favourite stores. This will allow for some quick accessing 
of your favourite store and enable faster workflow.
 
Another interaction you can do on this page is edit your information! 
Once clicking any edit button on the page, you will be able to edit 
your information and click to save that information for your profile. 
 
![user_profile](/assets/UpdatedScreenshots/profile_shopper_details.PNG)
 
The shopper profile page is also accompanied by the view and queue 
history pages. These pages provide you with the stores that you have 
queued and viewed for. The items in these tables can also be removed 
from your history on click of the ‘REMOVED’ button.
 
![user_profile](/assets/UpdatedScreenshots/view_history_shopper.PNG)
![user_profile](/assets/UpdatedScreenshots/queue_history_shopper.PNG)
 
#### Store Owner
 
Once logging in with the correct credentials for a store owner, you 
can now visit your store profile page. In this profile page, you will 
be greeted initially with the information of the store!
 
This will give you your name, email, and location, as well as the type 
of store you are.
 
![user_profile](/assets/UpdatedScreenshots/profile_store.PNG)
 
The store profile page is also accompanied by the store settings page 
that allows you to edit your queue size, store capacity, and the time 
limit a customer can stay in the store for.
 
![store_profile](/assets/store_settings_screenshot.PNG)

#### Admin
 
Once logging in with the correct credentials for an admin, you can now 
visit your own profile page. This page gives you basic information about 
yourself.
 
![user_profile](/assets/UpdatedScreenshots/profile_admin.PNG)
 
The admin profile is also accompanied by the User Profiles and Show Owner 
Profiles page. These will allow you to view other user and store pages 
and edit them to your will.
 
![user_profile](/assets/UpdatedScreenshots/admin_shoppers.PNG)
![user_profile](/assets/UpdatedScreenshots/admin_stores.PNG)

# Express Routes

## Admin

| Route   |      Type      |  Description | Body |
|:----------|:-------------|:------|:-------------|
| /api/admin/profile/:username | GET | Gets admin profile |
| /api/admin/profile/:username | PATCH |Update admin profile| "username": username, <br> "email": email, <br> "firstName": firstName, <br> "lastName": lastName, <br> "address": address |
| /api/admin/profile | DELETE | Delete an admin | "id": id |
| /api/admin/messages | GET | Get all help messages | 
| /api/admin/messages | DELETE | Resolve/delete a message | "id": id
| /api/admin/messages | POST | Post a message | "username": username, <br> "userType": userType, <br> "title": title, <br> "description": description, <br> "date": date |

## Authorization 

| Route   |      Type      |  Description | Body |
|:----------|:-------------|:------|:-------------|
| /api/login | POST | Login and create a session |  "username" username, <br> "password": password, <br> "userType": userType  |
| /api/logout | GET | Logout by destroying session |  |
| /api/check-session | GET | Get which user is logged in | |
| /api/verifyRegister | POST | Verify that password is viable and username is not taken |  "username": username, <br> "password": password, <br> "confirmPassword":confirmPassword, <br> "userType": userType  |
| /api/register/admin | POST | Register a new admin | "username": username, <br> "password": password, <br> "userType": userType, <br> "firstName": firstName, <br> "lastName": lastName, <br> "email": email, <br> "address": address |
| /api/register | POST | Register a new shopper or store (body is different for each) | Store: <br>"username": username, <br> "password": password, <br> "registerAs": registerAs, <br> "storeName": storeName, <br> "email": email, <br> "location": location, <br> "coordinate": coordinate, <br> "storeType": storeType, <br> "openTime": openTime, <br> "closeTime": closeTime, <br> "customerLimit": customerLimit, <br> "shoppingTimeLimit": shoppingTimeLimit  <br> <br> Shopper: <br>"username": username, <br> "firstName": firstName, <br> "lastName": lastName, <br> "email": email, <br> "address": address, <br> "remindTime": remindTime |

## Queue

| Route   |      Type      |  Description | Body |
|:----------|:-------------|:------|:-------------|
| /api/queue | POST | Add new queue for shopper | "username": username, <br> "store": store, <br> "datetime": datetime, <br> "shopTime": shopTime, <br> "numCustomers": numCustomers, <br> "datetimeQueued": datetimeQueued |
| /api/queue/shopper/:username | GET |Get current queues for a shopper| |
| /api/queue | DELETE | Remove a queue |  "id": id|
| /api/queue/store/:username | GET | Get current queues for a store | 
| /api/queue/:id | PATCH | Update a queue | "numCustomers": numCustomers, <br> "shopTime": shopTime, <br> "datetime": datetime |

## Shopper

| Route   |      Type      |  Description | Body |
|:----------|:-------------|:------|:-------------|
| /api/shopper/profile/:username | GET | Get profile for a shopper | |
| /api/shopper/profile/:username | PATCH |Update profile for a shopper|"firstName": firstName, <br> "lastName": lastName, <br> "email": email, <br> "address": address, <br> "remindTime": remindTime  |
| /api/shopper/favorites/:shopperUsername/:storeUsername | PATCH | Add a store to shopper's favorites | |
| /api/shopper/viewHistory/:username | GET | Get favorite stores for a shopper | 
| /api/shopper/viewHistory/:username| POST | Add to view history | "store": store|
| /api/shopper/viewHistory/:username| GET | Get view history | |
| /api/shopper/viewHistory/:username| DELETE | Delete from view history | "id": id|
| /api/shopper/queueHistory/:username| GET | Get queue history | |
| /api/shopper/queueHistory/:username| DELETE | Delete from queue history | "id": id|
| /api/shopper/favorites/:shopperUsername/:storeUsername| DELETE | Delete store from shopper's favorites | |
| /api/shopper/:username| DELETE | Delete a shopper's account | |
| /api/shoppers| GET | Get all shoppers | |

## Store

| Route   |      Type      |  Description | Body |
|:----------|:-------------|:------|:-------------|
| /api/store/profile/:username | GET | Get profile for a store | |
| /api/store/profile/:username | PATCH |Update profile info for store| "storeName": storeName, <br> "email": email, <br> "address": address, <br> "coordinate": coordinate, <br> "storeType": storeType, <br> "openTime": openTime, <br> "closeTime": closeTime}, <br> "customerLimit": customerLimit, <br> "customerShopTime": customerShopTime |
| /api/store/:username | DELETE | Delete a store's account | |
| /api/stores | GET | Get all stores |
| /api/store/queues/:username | GET | Get all queues for a store | "storeName": storeName |
| /api/store/todayqueues/:username | GET | Get all queues for a store for today | "storeName": storeName |
