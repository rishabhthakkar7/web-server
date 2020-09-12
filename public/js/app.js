const weatherForm = document.querySelector('form')
const search =  document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const address = search.value

    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''
    messageThree.textContent =''

    fetch('/weather?address='+address).then((response)=>{
        response.json().then((data)=>{
            messageOne.textContent = ''
            if(data.error){
                messageTwo.textContent = data.error
            }else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                messageThree.textContent = 'wind speed is '+data.wind_speed+' km/hour'
            }
        })
    })
})
