/* 
    Team Teal: Andrew Cook, Cheryl Moser, Petar Spasic
    Date:
    AD320 Final Project
*/
"use strict";

(function() {

  const URL = 'http://localhost:8081/api/'; //base URL

  window.addEventListener("load", init);

  //event listeners for clicks
  function init() {

    //toggle
    id('toggle').addEventListener('click', toggle);

    //search bar  
    id('search').addEventListener('keydown', function(event){
        const key = event.key;
        if (key === 'Enter'){
          const term = event.target.value.toLowerCase();
          console.log('searching for '+ term);
          searchBar(term);
        }
    });

    //view all items
    id('view_all').addEventListener('click', getAll);

    //view all categories
    id('categories').addEventListener('click', getCategories);

    //log in
    id('user_login').addEventListener('submit', function(event) {
      event.preventDefault();
      userLogin();
    });

    //create user
    id('create_user').addEventListener('submit', function(event) {
      event.preventDefault();
      createUser();
    });

    //user review
    id('user_review').addEventListener('submit', function(event) {
      event.preventDefault();
      userReview();
    });

    //reservation
    id('reservation').addEventListener('submit', function(event) {
      event.preventDefault();
      reserveItem()
    });
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
  /** ------------------------------ View Item Functions  ------------------------------ */

  /**work in-progress */
  function searchBar(term){
    console.log('filtering ' + term);
    const filter = getAll().filter(item => { //can't use getAll
      return item.brand_name.includes(search)
    });
    id('result').appendChild(filter);
  }

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

  /**Used in conjunction with the getAll function. Populates the 
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

      //view item detail - GET
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

    let image = gen('img');
    image.src = item.photo_url;
    image.alt = item.photo_url;
    image.width = 200;

    let details = gen('p');
    details.innerHTML = 
      'Category: '+item.category+'<br>'+
      'Brand: '+item.brand_name+'<br>'+
      'Type: '+item.name+'<br>'+
      'Price per day: '+item.price+'<br>'+
      'Average rating: '+item.rating_review+
      "<br><br><button id='reserve'>Reserve Me!</button><br>";
    
    //id('reserve').addEventListener('click', ) //placeholder

    id('result').appendChild(image);
    id('result').appendChild(details);
  }

  /** ------------------------------ Category Functions  ------------------------------ */

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

      //view item detail - GET
      cat.addEventListener('click', function() {
        getCatItems(category_name);
      });
    })
  }

  /** ------------------------------ POST Functions  ------------------------------ */

  function userLogin(){}
  function createUser(){}
  function userReview(){}
  function reserveItem(){}

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