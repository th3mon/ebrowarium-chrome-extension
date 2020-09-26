let button = document.getElementById('count-beers');

chrome.storage.sync.get('color', function (data) {
  button.style.backgroundColor = data.color;
  button.setAttribute('value', data.color);
});

const port = chrome.runtime.connect({ name: 'popup' });

button.onclick = function (element) {
  console.log('hello');
  port.postMessage('GIVE_ME_BEERS_COUNT');
  // let color = element.target.value;

  // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //   chrome.tabs.executeScript(tabs[0].id, {
  //     code: 'document.body.style.backgroundColor = "' + color + '";',
  //   });
  // });
};

chrome.runtime.onConnect.addListener(function (port) {
  // changeColor.addEventListener('click', () => {
  //   port.postMessage({ question: "Who's there?" });
  // });
  // port.onMessage.addListener(function (msg) {
  //   if (msg.joke == 'Knock knock')
  //     port.postMessage({ question: "Who's there?" });
  //   else if (msg.answer == 'Madame')
  //     port.postMessage({ question: 'Madame who?' });
  //   else if (msg.answer == 'Madame... Bovary')
  //     port.postMessage({ question: "I don't get it." });
  // });
  console.log(port.name);
});
