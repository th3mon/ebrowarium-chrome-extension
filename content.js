const element = document.querySelector('body');
console.log('content script is running');
console.log({ element });
const numberOfBeers = [
  ...document.querySelectorAll(
    '.productListing-even .zmienIlosc input,.productListing-odd .zmienIlosc input'
  ),
]
  .map(input => Number(input.value))
  .reduce((accumulator, quantity) => accumulator + quantity, 0);

console.log(numberOfBeers);

let port = chrome.runtime.connect({ name: 'content' });
// port.postMessage({numberOfBeers});
// port.disconnect();

// port.onMessage.addEventListener(message => {
//   console.log({ message });
//   port.postMessage({ numberOfBeers });
// });
port.postMessage({ numberOfBeers });
port.onMessage.addListener(function (message) {
  console.log('content received message:', message);

  if (message === 'GIVE_ME_BEERS_COUNT') {
    port.postMessage({ numberOfBeers });
  }
});

chrome.runtime.onConnect.addListener(port => {
  console.log(port.name)
});

port.onDisconnect.addListener(function () {
  console.log(`${port.name} is disconnected`)
  port = chrome.runtime.connect({ name: 'content' });
})
