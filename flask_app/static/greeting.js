function setGreeting() { // Set User Greeting
    var myDate = new Date(); 
    var hours = myDate.getHours()
    
    var greeting;
    
    if (hours < 12) {
        greeting = "Good Morning";
    } 
    else if (hours >= 12 && hours <= 17) {
        greeting = "Good Afternoon";
    }
    else if (hours >= 17 && hours <= 24) {
        greeting = "Good Evening";
    }
    
    let greetingH1 = document.getElementById('greeting').innerHTML;
    greeting = greeting + greetingH1;
    document.getElementById('greeting').innerHTML = greeting;
}

setGreeting();