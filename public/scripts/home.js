$(()=>{

    $('#logout').hide()
    $('#user').hide()

    $.get('/root/username',(data)=>{
        console.log(data.username);
        if(data.username){
            console.log("Here");
            $('#login').hide()
            $('#signUp').hide()
            $('#user').html("Welcome, " + data.username.toUpperCase())
            $('#user').show();
            $('#logout').show();
        }
       
    });
})
