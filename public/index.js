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

    //search bar  
    id('search').addEventListener('keydown', function(event){
        const key = event.key;
        if (key === 'Enter'){
            alert("event on 'enter' working");
        }
    });

    //view all items - GET
    id('view_all').addEventListener('click', getAll);

    //view all categories - GET
    id('categories').addEventListener('click', getCategories);

    //toggle view
    id('toggle_view').addEventListener('click', function() {
        alert('event on click working');
    });


    /*
    troubleshoot: form submit events are not 
    responding the way I want them to yet
    */
    //log in
    id('user_login').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('form submit working');
    });

    //create user
    id('create_user').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('form submit working');
    });

    //user review
    id('user_review').addEventListener('click', function(event) {
        event.preventDefault();
        alert('form submit working');
    });
  }

  /** ------------------------------ View Item Functions  ------------------------------ */

  function getAll(data){
    console.log('fetching all items...');
    fetch(URL+"item")
      .then(statusCheck)
      .then(res => res.json())
      .then(processAllItems)
      .catch(err);
    console.log('done');
  }

  function processAllItems(data){
    console.log('Data received: ' + data);
    clear();
    data.forEach(item => {
      
      let container = gen('figure');

      let link = gen('a');
      link.href = 'detail.html'; //TODO change this to item detail

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
    })
  }

  function itemDetail()

  /** ------------------------------ Category Functions  ------------------------------ */

  function getCategories(){
    console.log('fetching all categories...');
    fetch(URL+"/item/categories")
      .then(statusCheck)
      .then(res => res.json())
      .then(processCategory)
      .catch(err);
    console.log('done');
  }

  /* function processCategory(data){
    console.log('Data received: ' + data);
    clear();
    data.forEach(item => {
      
      let container = gen('figure');

      let link = gen('a');
      link.href = 'index.html'; //TODO change this to item detail

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
    }) 
  }*/

  /** ------------------------------ Helper Functions  ------------------------------ */
  

  function separate(data){
    console.log('Data received: '+ data);
    data.split('\n');
  }

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