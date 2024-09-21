one = document.getElementById('first')
second = document.getElementById('second')
third = document.getElementById('third')

one.addEventListener('click', function(){
    fetch('/page2')
    .then(response=>response.json())
    .catch(error=>console.log('ERROR:', error))
})

second.addEventListener('click', function(){
    fetch('/page2')
    .then(response=>response.json())
    .catch(error=>console.log('ERROR:', error))
})

third.addEventListener('click', function(){
    fetch('/page2')
    .then(response=>response.json())
    .catch(error=>console.log('ERROR:', error))
})