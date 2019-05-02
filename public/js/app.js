const weatherForm = document.querySelector('form')              // document == HTML document in the current browser window
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')         // to find an element using className, search '.className'. And for id, search '#idName'.
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()          // prevent default behavior(refresh the browser allowing the server to render a new page) and instead, do nothing and let the function run.

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    fetch('/weather?address=' + location ).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
})