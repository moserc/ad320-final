/* 
    Team Teal: Andrew Cook, Cheryl Moser, Petar Spasic
    Date:
    AD320 Final Project
*/
"use strict";

(function() {

  const URL = 'http://localhost:8081/api/';

  window.addEventListener("load", init);
  function init() {//event listeners
  
    id('toggle').addEventListener('click', toggle);//toggle view
    /* id('search').addEventListener('keydown', function(event){
        const key = event.key;
        if (key === 'Enter'){
          const term = event.target.value.toLowerCase();
          console.log('searching for '+ term);
          searchBar(term);
        }
    }); */ //search bar
    id('view_all').addEventListener('click', getAll);//view all items
    id('categories').addEventListener('click', getCategories);//view all categories
    setLoginLogoutLink();
  }

  /** ------------------------------- GET requests  -------------------------------- */
  /**
   * Fetches all rental items from the API.
   */
    function getAll(){
      console.log('fetching all items...');
      fetch(URL+"item")
        .then(statusCheck)
        .then(res => res.json())
        .then(processAllItems)
        .catch(err);
      console.log('done');
    }

  /**
   * Fetches a json list of all available categories from the API.
   */
  function getCategories(){
    console.log('fetching categories...');
    fetch(URL+"item/category")
      .then(statusCheck)
      .then(res => res.json())
      .then(processCats)
      .catch(err);
    console.log('done');
  }

  /**
   * Fetches all items from a given category name.
   * @param {*} category_name a specific category.
   */
  function getCatItems(category_name){
    console.log('fetching categories...');
    fetch(URL+"item/category/"+category_name)
      .then(statusCheck)
      .then(res => res.json())
      .then(processAllItems)
      .catch(err);
    console.log('done');
  }

  /**
   * Retrieves transactions.
   */
  function getTransactions(){
    console.log("fetching user's transactions...");
    fetch("http://localhost:8081/transaction/user")
      .then(statusCheck)
      .then(res => res.json())
      .then(showTransactions)
      .catch(err);
    console.log('done');
  }
  /** ------------------------------- POST requests  ------------------------------- */
  /**
   * Deletes the user's session cookie, logs out of session.
   */
  function logoutUser(){
    console.log('logging out');
    fetch(URL+'user/logout', {
      method: 'POST',
      credentials: 'same-origin'
    })
      .then(res => {
        if (res.ok){
          console.log('log out successful');
          document.cookie = 'session';
          setLoginLogoutLink();
          id('transactions').innerHTML = '';
        }else{
          console.log('log out failed');
        }
      })
      .catch(err);
  }
  /** ------------------------------ Toggle Function  ------------------------------ */
  /**
   * Switches between a grid layout and a list layout when 
   * the 'grid view || list view' is clicked.
   */
  let gridView = true;
  function toggle(){
    if (gridView){
      id('result').classList.add('list');
      gridView = false;
    }else{
      id('result').classList.remove('list');
      gridView = true;
    }
  }
  /** ------------------------------ View Functions  ------------------------------ */
  //search bar
  /* 
  function searchBar(term){
    console.log('filtering ' + term);
    const filter = getAll().filter(item => { //can't use getAll
      return item.brand_name.includes(search)
    });
    id('result').appendChild(filter);
  }
 */

  /**
   * Used in conjunction with the getAll function. Populates the 
   * viewing window with each item's image, along with a caption 
   * containing its category and type.
   * @param {*} data the list of json objects obtained from getAll.
   */
  function processAllItems(data){
    console.log('Data received: ', data);
    clear();
    data.forEach(item => {
      
      let container = gen('figure');

      let link = gen('a');
      link.href = 'javascript:void(0)';

      let image = gen('img');
      image.src = item.photo_url;
      image.alt = item.photo_url;
      image.width = 200;

      let caption = gen('figcaption');
      caption.textContent = item.category + ": " + item.name;

      link.appendChild(image);
      container.appendChild(link);
      container.appendChild(caption);
      id("result").appendChild(container);

      link.addEventListener('click', function() {
        getDetail(item);
      });
    })
  }

  /**
   * Used in conjunction with the getAll function. Populates the 
   * viewing container with an item's image and details.
   * @param {*} item a specific item from a list of rental items.
   */
  function getDetail(item){
    console.log('Fetching item detail...');
    clear();
    let result = id('result');

    let image = gen('img');
    image.src = item.photo_url;
    image.alt = item.photo_url;
    image.width = 200;

    let link = gen('a');
    link.href = 'login.html';
    link.innerHTML = 'Log in to reserve';

    let form = reserveItem();
    
    let details = gen('p');
    details.innerHTML = 
      'Category: '+item.category+'<br>'+
      'Brand: '+item.brand_name+'<br>'+
      'Type: '+item.name+'<br>'+
      'Price per day: '+item.price+'<br>'+
      'Average rating: '+item.rating_review+
      '<br><br>';

    result.appendChild(image);
    result.appendChild(details);

    if (isLoggedIn()){
      details.appendChild(form);
      form.addEventListener('submit', function(event){
        let dateIn = id('in').value;
        let dateOut = id('out').value;
        
        const confirmation = confirm('Please confirm reservation for:\n\n'
          +'Item: '+item.brand_name
          +' '+item.name
          +' '+item.category
          +'\nFrom: '+dateOut
          +'\nTo: '+dateIn
          );

        if (!confirmation) {
          event.preventDefault();
        }else{
          form.submit();
        }
      });
    }else{
      details.appendChild(link);
    } 
  }

  /**
   * Generates a form element for reserving a specific item.
   * User must be logged in to access.
   * @returns a form element.
   */
  function reserveItem(){
    let form = gen('form');
    form.id = 'reservation_form';
    form.action = "/api/user/reserve";
    form.method = "post";

    let body = gen('div');
    body.innerHTML = 
      '<label for="checkout">Desired check out: </label>'+
      '<input type="date" name="checkout" id="out" required /><br><br>'+
      '<label for="checkin">Desired check in: </label>'+
      '<input type="date" name="checkin" id="in" required /><br><br>'+
      '<input type="submit" value="submit">'

    form.appendChild(body);
    return form;
  } 

  /**
   * Shows all past transactions a user has made.
   * @param {*} data list of json objects representing 
   *  past transactions by user.
   */
  function showTransactions(data){
    console.log('Listing transactions...');
    clear();
    let unorderedList = gen('ul');
    if (data!=''){
      data.forEach(rental => {
        let listItem = gen('li');
        listItem.textContent = 
          rental.item+
          '\n'+rental.confirmation_number+
          '\n'+rental.checkout+
          '\n'+rental.checkin;
        unorderedList.appendChild(listItem);
        })
        id("result").appendChild(unorderedList);
    }else{
      id("result").innerHTML = 'No transactions yet'
    }
  }
  /** ------------------------------ Category Functions  ------------------------------ */
  /**
   * Used in conjunction with getCategories and getCatItems to 
   * populate the menu with the category titles. Each title is 
   * clickable to retrieve all items within a category.
   * @param {*} data the list of json objects containing the title
   * of each category.
   */
  function processCats(data){
    console.log('Data received: ', data);
    clear();
    data.forEach(category_name => {
      
      let cat = gen('li');
      cat.textContent = category_name;

      id("category").appendChild(cat);

      cat.addEventListener('click', function() {
        getCatItems(category_name);
      });
    })
  }
  /** ------------------------------ Login/out Functions  ------------------------------ */
  
  /**
   * Determines if a user is logged in by looking for a cookie's sessionId.
   * @returns true if the cookie's sessionId exists and is not empty.
   */
  function isLoggedIn(){
    console.log('checking if user is logged in...')
    const cookies = document.cookie.split(';');
   
    for(const cookie of cookies){
      const[name, value] = cookie.trim().split('=');
      if (value && value.length !== 0){
        console.log('user is logged in');
        return true;
      }
    }
    console.log('user is not logged in');
    return false;
  }
  
  /**
   * Toggles the log in / log out actions of the navigation bar,
   * based on the user's login status.
   */
  function setLoginLogoutLink(){
    const loginLogoutLink = id('user_status');
    
    try{
      const loggedIn = isLoggedIn();
      if (loggedIn){
        loginLogoutLink.textContent = 'log out';
        loginLogoutLink.href = 'javascript:void(0)';
        loginLogoutLink.addEventListener('click', logoutUser);
        let purchases = id('transactions');
        purchases.innerHTML = 'view past transactions';
        purchases.addEventListener('click', getTransactions);
      }else{
        loginLogoutLink.textContent = 'log in';
        loginLogoutLink.href = 'login.html';
        loginLogoutLink.removeEventListener('click', logoutUser);
      }
    }catch (error){
      console.error('error setting login/logout link', error);
    }
  }
  /** ------------------------------ Helper Functions  ------------------------------ */
  /**
   * Checks the status of the HTML site that is being called. True if status is 200.
   * @param {*} res - response from the website being called.
   * @returns - a response, or an error message if status is not ok.
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text() || await res.json());
    }
    return res;
  }

  /**
   * Generic error message if something has not worked
   */
  function err(){
    id('result').innerHTML = "Error: something went wrong...";
  }

  /**
   * Clears/resets the contents of the 'results' container.
   */
  function clear(){
    id("result").innerHTML = "";
  }

  /**
   * Returns a new element with the given tag name.
   * @param {string} tagName - HTML tag name for new DOM element.
   * @returns {object} New DOM object for given HTML tag.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
      return document.getElementById(idName);
  }
})();