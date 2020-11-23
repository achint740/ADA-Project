function loginCheck(){
    return new Promise(function(resolve,reject){
        
        $.get('/root/username',(data)=>{
            console.log(data.username);
            if(data.username){
                // console.log("Here");
                $('#login').hide()
                $('#signUp').hide()
                $('#user').html("Welcome, " + data.username.toUpperCase())
                $('#user').show();
                $('#logout').show();
                resolve(data)
            }
            else{
                reject(err)
            }
        });
    });
}


// $(()=>{
//     $("#logout").hide();
//     $.get('/profile',(data)=>{
//         if(data.username!=undefined){
//             console.log("Welcome " + data.username);
//             $('#login123')
//                 .text(data.username)
//                 .attr("href","#")
//             $("#logout").show();
//         }
//         else{
//             console.log("Please Login");
//         }
//     });
// });
$(()=>{

    refresh()

    $('#logout').hide()
    $('#user').hide()

    $.get('/root/username',(data)=>{
        // console.log(data.username);
        if(data.username){
            // console.log("Here");
            $('#login').hide()
            $('#signUp').hide()
            $('#user').html("Welcome, " + data.username.toUpperCase())
            $('#user').show();
            $('#logout').show();
        }
       
    });
})

$('.cnt').hide();

$('.add').on('click',function(){

    let obj = {
        name : ($(this).parent()).siblings(".name").children().text(),
        price : +(($(this).parent()).siblings(".price").children().text()),
        times : +(($(this).parent()).siblings(".cnt").children('.update').text())
    };
    let res = false;
    loginCheck().then(function(user){
        // console.log("Adding  "+ obj.name + " to " + user.username);
        res = true;
        $.post('/cart/addcart',obj,(data)=>{
            if(data == 'Success'){
                // console.log('Yass!!');
            }
            else{
                // console.log('Msg was Failure');
                let obj_new = {
                    name : obj.name,
                    price : obj.price,
                    work : 'inc'
                }
                $.post('/cart/updatecart',obj_new,(data)=>{
                    // if(data == 'Success')
                    //     console.log('Update Successfull');
                })
            }
        });
    })
    .catch(function(){
        document.location.href='/root/login';
    });
    $(this).parent().siblings('.cnt').show();
});

$('.dec').on('click',function(){
    let v = $(this).parent().children('.update').text();
    v--;
    // console.log(v);
    $(this).parent().children('.update').text(v);
    let obj = {
        name : ($(this).parent()).siblings('.name').children().text(),
        price : +(($(this).parent()).siblings(".price").children().text()),
        work : 'dec'
    };
    $.post('/cart/updatecart',obj,(data)=>{});
    if(v == '0'){
        $(this).parent().children('.update').text("1");
        $(this).parent('.cnt').hide();
    }

});

$('.inc').on('click',function(){
    let v = $(this).parent().children('.update').text();
    v++;
    // console.log(v);
    $(this).parent().children('.update').text(v);
    let obj = {
        name : ($(this).parent()).siblings('.name').children().text(),
        price : +(($(this).parent()).siblings(".price").children().text()),
        work : 'inc'
    };
    $.post('/cart/updatecart',obj,(data)=>{
        // if(data == 'Success')
        //     console.log('Update Successfull');
    });
});

$("#logout").on('click',function(){
    $.get("/root/logout",(data)=>{
        // console.log(data);
    });
});


function refresh(){
    // $.get('/food/fetch',(data)=>{
    //     console.log(data)
    // })
}