/*
Copyright 2016 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
var app = (function() {
  'use strict';

  function logResult(result) {
    console.log(result);
  }

  function logError(error) {
    console.log('Looks like there was a problem: \n', error);
  }

  // TODO 2.1a
  if (!('fetch' in window)) {
    console.log('The browser does not support fetch API');
  }

  function fetchJSON() {
    // TODO 2.1b
/*
*/
    fetch('examples/animals.json')
    .then(validateResponse)
    .then(readResponseAsJSON)
    .then(logResult)
    .catch(logError);

  }

  function validateResponse(response) {
    // TODO 2.3
    if (!response.ok) {
      throw Error('Response is not ok');
    }
    return response;
  }

  function readResponseAsJSON(response) {
    // TODO 2.4
    return response.json();
  }

  function showImage(responseAsBlob) {
    //  TODO 3a
    var container = document.getElementById('container');
    var imgElem = document.createElement('img');
    container.appendChild(imgElem);
    var imgUrl = URL.createObjectURL(responseAsBlob);
    imgElem.src = imgUrl;
  }

  function readResponseAsBlob(response) {
    // TODO 3b
    return response.blob(); 
  }

  function fetchImage() {
    // TODO 3c
    fetch('examples/kitten.jpg')
    .then(validateResponse)
    .then(readResponseAsBlob)
    .then(showImage)
    .then(logResult)
    .catch(logError);
  }

  function showText(responseAsText) {
    //  TODO 4a
    var message = document.getElementById('message');
    message.textContent = responseAsText;
  }

  function readResponseAsText(response) {
    // TODO 4b
    return response.text();
  }

  function fetchText() {
    // TODO 4c
    fetch('examples/words.txt')
    .then(validateResponse)
    .then(readResponseAsText)
    .then(showText)
    .then(logResult)
    .catch(logError);
  }

  function headRequest() {
    // TODO 5.1
    fetch('examples/words.txt', { method : 'HEAD' })
    .then(validateResponse)
    .then(logSize)
    .then(showText)
    .then(logResult)
    .catch(logError);
  }

  function logSize(response) {
    // TODO 5.2
    return response.headers.get('content-length');
  }

  /* NOTE: Never send unencrypted user credentials in production! */
  function postRequest() {
    var formData = new FormData(document.getElementById('myForm'));
    // TODO 6.2 
    fetch('http://localhost:5000', {
      method : 'POST',
      //body : 'name=david&msesage=hallo',
      body : formData,
      //mode : 'no-cors',
    })
    .then(validateResponse)
    .then(readResponseAsText)
    .then(showText)
    .catch(logError);
  }

  // Don't worry if you don't understand this, it's not part of the Fetch API.
  // We are using the JavaScript Module Pattern to enable unit testing of
  // our functions.
  return {
    readResponseAsJSON: (readResponseAsJSON),
    readResponseAsBlob: (readResponseAsBlob),
    readResponseAsText: (readResponseAsText),
    validateResponse: (validateResponse),
    fetchJSON: (fetchJSON),
    fetchImage: (fetchImage),
    fetchText: (fetchText),
    headRequest: (headRequest),
    postRequest: (postRequest)
  };

})();
