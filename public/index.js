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
    id('categories').addEventListener('click', function() {
        alert('event on click working');
    });

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

  function getAll(){
    console.log('fetching all items...');
    fetch(URL+"item")
      .then(statusCheck)
      .then(res => res.json())
      .then(separate)
      .then(processAllItems) //not defined yet
      .catch(err);
    console.log('done');
  }

  /** ------------------------------ Helper Functions  ------------------------------ */
  function processAllItems(data){
    console.log('Data received: '+ data[0]);
    clear();
    for (let i=0; i < data.length; i++){
        let image = gen('img');
        image.src = data["photo_url"];
        image.alt = 'gear image';
        id("result").appendChild(image);
    }
  }

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
    //not defined yet
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