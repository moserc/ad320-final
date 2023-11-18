| File          	| Description |
|-----------------------|------------------------------|
|`public/index.html`	|This file should be your “homepage” or the starting place for the entire front end of your website.|
|`public/styles.css`	|This file should contain the CSS styles for your front end.|
|`public/index.js`	|This file should contain your client-side JavaScript, which will call the API you build in your `app.js` and provide other front end behavior for the features you implement.|
|`app.js`		|This file should contain the Node.js service that is your back end API.|
|`<insert-file-name>.db`|This file should contain the database for your website. You are required to create a database and use SQL to access it. You **cannot** use file I/O! Your database must include at least 3 tables and use at least 1 foreign key. Each table must have at least 2 columns (for more information see [Database Requirements](#database-requirements)).|
|`package.json`		|This file should contain your project dependencies (e.g. `express`) which you initialize using `npm init`.|
|`APIDOC.md`		|This file is used to document your `app.js` web service.|
|`tables.sql`		|This file should include any CREATE statements you used in your database. This file does not need to include header documentation (this is the only exception - all other files must include documentation).|

# External Requirements

## Stuctural and Appearance Requirements

The following is a list of the _minimum_ appearance requirements that must be included in your CSS file(s):
* You must have at least 10 CSS rulesets and 10 unique CSS properties
* You must change at least 2 box model properties (border, padding, margin, height, width)
* You must use at least 2 flex properties (`display: flex` does not count towards this count)
* You must import at least one [Google font](https://fonts.google.com/) (Remember to import Google fonts in the head of your HTML file using a link tag! The Google font link must be the one that's generated for you while selecting fonts on the Google Font site.)

## Behavior Requirements
The behavior requirements are split into 2 categories: required features and additional features.

### Required Features
For the required features section, the word _item_ will be used to describe a product (on an ecommerce site), a class (in a course enrollment site), or a service (on a reservation site). The word _transaction_ will be used to describe buying a product, enrolling in a class, or reserving a service.

#### Database Requirements:
  * You are required to create a database to store data for your website
  * Your database must include at least 3 tables
  * You must include at least 1 foreign key to connect your tables
  * Each table must include a primary key
  * Each table must have at least 2 columns, although your tables will most likely have more
  * You must have at least 25 items in your database
  * A notion of capacity must exist for all items.

#### Front End External

Feature 1: display the items on a “main view” page
  * A way for the user to be able to browse through all items
  * A way for the user to toggle between at least 2 layouts (e.g. list vs. grid, cozy vs. compact, etc.)

Feature 2: allow the user to login to their account
  * A way for the user to provide a valid username and password to gain access to account-required actions
  * A way for the user to allow the browser to save their username across browser sessions (i.e. the next time they try to login)

Feature 3: clicking on any individual item should bring the user to a view which provides more detailed information about said item
  * This can be implemented by using JS/DOM manipulation
  * This view must include at least 4 pieces of information about the item (i.e. name, image, description, price, dates, availability, tags, color, address, phone number, seller, professor, department, etc.)

Feature 4: users must be able to buy a product, enroll in a class, or reserve a service
  * Users must be logged in
  * The user can buy one product, enroll in one class, or reserve one service at a time
  * A way for the user to confirm and submit the transaction (these are two separate actions)
  * Based on user input, there must be a possibility for the transaction to succeed or fail (it is up to you to determine what constitutes a success or failure)
  * After a successful transaction, the user must be given a confirmation number (hint: this could be useful in feature 6)
  * **Note**: If you choose to implement a cart feature, you should first allow items to be added to the cart and then users can buy everything in the cart at once or enroll in all classes at once

Feature 5: users must be able to search and filter the available items
  * Must implement a search bar
    * Must be able to search multiple types of information
    * Must be able to type in the search bar
  * Must implement a way to filter items (e.g. displaying only pants, only classes that start with CSE, only reservations in the Bahamas, etc.)
    * Must be able to toggle filters on and off
      * This differs from the search bar because the filters should be preset and not user-generated. The users can select the filter they need from all possible filters.
    * This can be done by implementing categories/tags (i.e. furniture, clothing, food, department, prerequisite, travel location)

Feature 6: users must be able to access previous transactions
  * Users must be logged in
  * Users must be able to view information about their transaction including but not limited to the name of the item and the confirmation number for each transaction

#### Back End External

Feature 1: display the items on a “main view” page
  * An endpoint to retrieve all items

Feature 2: allow the user to login to their account
  * Endpoint to check if the username and password match an entry in the database

Feature 3: clicking on any individual item should bring the user to a view which provides more detailed information about said item
  * Endpoint to retrieve detailed item information

Feature 4: users must be able to buy a product, enroll in a class, or reserve a service
  * Endpoint to check if transaction is successful or not
  * You should make sure the user is logged in
  * If the transaction is successful, update the database, and return a generated confirmation code
  * Users should not be able to buy products that are out of stock, enroll in full classes, or make reservations for services that are unavailable

Feature 5: users must be able to search and filter the available items
  * Endpoint to search database and return results
  * Must search at least 3 different columns in the database

Feature 6: users must be able to access previous transactions
  * Endpoint to retrieve transaction history for any given user
  * You should make sure the user is logged in

### Additional Features (Choose Two)
You must implement at least two additional features. Below are lists of options for each project type. Your 2 additional features must come from the options listed under your specific project type. (You are welcome to implement more features from these lists or otherwise, especially if your goal is to use this assignment in your portfolio, but they will not be graded.)  **All** additional features must have both front and back end implementations and sufficient error handling.

##### Additional Feature 1: Feedback on a Service*
  * Logged-in users should be able to give feedback on any given service
  * This should use a numerical rating scheme.
  * There should be an “average rating” visibly shown for any given service.
  * It may be useful to allow for users to explain their numerical ratings. As such, you should additionally allow for users to have the option to submit text reviews (e.g. comments) for any given product to accompany the numerical rating it received.

##### Additional Feature 2: Create a New User*
  * Users are presented with a method in which to create an account for your reservation site.
  * The user provides at minimum a username, password, and e-mail.
  * The user information should be added to the database.
    * Feel free to use security methods such as hashing to make your website more “secure”.
  * This information should be encapsulated within a Form HTML element

##### Additional Feature 3: Booking with Time
  * Your website now has additional metadata for each service that includes the dates/times available.
  * When booking, an additional option and constraint is available. Users may choose a period of time to book a service for. The users are not able to book a service in a time period in which the service is unavailable (already booked).
  * Your website should keep track of the users and their reservation times. As a consequence of this, users should not be able to double-book themselves. For example, a user should not be able to reserve a service for Tuesday from 3pm-7pm when they already have a service reserved for Tuesday 4pm-5pm.

##### Additional Feature 4: Things to do
  * Your website now has additional metadata for each service that includes the location of the service.
  * Your website will give recommendations of things to do in these locations!
    * This can be shown while booking, after a transaction is completed, etc.
  * Feel free to use the Google Maps API to display the exact locations of these destinations!

# Internal Requirements

All patterns and practices defined as internal requirements in past assignments continue to apply here (e.g. using the module pattern in front end JavaScript, proper use of `async`/`await` and promises, all errors handled appropriately, `statusCheck` used appropriately in fetch chains, etc.).

## Front End Internal

* POST requests must send data using the `FormData` object/datatype through the body.

## Back End Internal

  * All POST endpoints must support all three data formats we've talked about (JSON, FormData, URL-Encoded)
  * The Node app must use the `express`, `multer`, and `sqlite` modules that we've shown in class.
  * All Node endpoints must return either JSON or text type (and not default HTML).
  * Your Node app should handle all possible errors.
  * `package.json` has the correct and complete list of dependencies for the project, and correctly points to `app.js` as the entry point.
  * Use sql joins to relate data between tables in your database
    * Keep in mind that your database must have at least 3 tables and at least 1 foreign key connecting them. Additionally, each table must have at least 2 columns.
  * Keep in mind that your database must have at least 3 tables and at least 1 foreign key connecting them. Additionally, each table must have at least 2 columns.
  * Similar to your client-side JS, decompose your Node.js/Express API by writing smaller, more generic functions that complete one task rather than a few larger "do-everything" functions - no function should be more than 30 lines of code, and your Node.js should have **at least three** helper function defined and used. Consider factoring out important behavior for your different GET/POST requests into functions.

## Error Handling
You must handle errors appropriately throughout the project as outlined in our style guides and reinforced throughout lecture and section.
  * All possible errors need to be appropriately handled, returning the correct error codes and reasonable, descriptive messages.
  * All errors must be displayed to the client in a user-readable way.
    * You may not use `console.log`, `console.error`, or `alert` to display errors.
    * It must be displayed cleanly: no JSON objects appearing in the DOM.
    * It does not have to be the message returned from the server, but does have to indicate that an error occurred.
    * It must be visible on the webpage.
  * **IMPORTANT**: Not all server errors that you are expected to handle have been explicitly called out in this specification. Since this is a final project you will need to make choices about when and what errors your API should anticipate in order to have a well designed app. Note that your API should be able to handle errors even if those errors can not be reached through your implementation of the front end of this assignment. You should test your endpoints independently of your front end code. Try to think of as many edge cases as you can. At this point of the quarter, we expect you to be able to develop thorough error handling.

## Documentation

Your HTML, CSS, and JavaScript must continue to include file header comments, JSDoc comments on functions, endpoint comments, and comments on any non-trivial code. Your `tables.sql` file does not need to include header documentation (this is the only exception - all other files must include documentation).

As outlined in the "Final Deliverables" section above, You must provide an `APIDOC.md` documenting in detail your API. This must include:
  * The name of the endpoint
  * A non-trivial description of its purpose
  * Does not include implementation details.
  * Does include any side-effect it might have (e.g., creating and storing a Game ID for a GET endpoint)
  * What method it uses (GET vs. POST)
  * What parameters it takes (and their names and expected formats)
  * What its return type is
  * An Example Request
  * An Example Response
  * What errors can be returned.

The `APIDOC.md` should be structurally similar to the `APIDOC.md` that you submitted for CP4. Refer back to the example provided for CP4 if you need assistance in the creation of your `APIDOC.md`.
