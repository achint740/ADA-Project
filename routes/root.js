const route = require('express').Router();
const customers = require('../db').customer;
const passport = require('../passport');

// ------------------------------------------Root Authentication Starts------------------------------------------ //

route.use(passport.initialize());
route.use(passport.session());

route.get('/login',(req,res)=>{
    res.render("login")
})

route.post('/login/user',passport.authenticate('local-user-login',{
        failureRedirect : '/root/login'
    })
    ,function(req,res){
        console.log("Logging In User: ")
        // console.log(req.user)
        return res.redirect('/')
    }
);

route.post('/login/employee',passport.authenticate('local-employee-login',{
        failureRedirect : '/root/login'
    })
    ,function(req,res){
        if(req.user.jobTitle === 'Admin') return res.redirect('/admin')
        else return res.redirect('/employee')
});

route.get('/signUp',(req,res)=>{
    res.render("signup")
})

route.post('/signUp',(req,res)=>{
    customers.create({
        username:req.body.username,
        password:req.body.password,
        name:req.body.name,
        email:req.body.email,
        currentCartItems:{}
    }).then(()=>{
        res.redirect('/root/login')
    }).catch((err)=>{
        res.send(err)
    })
})

// //----------------------------------------------------Logout Handler-------------------------------------------//

route.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

// //---------------------------------------------------Check login status---------------------------------------//
route.get('/username',(req,res)=>{
    
    let obj ={}
    if(req.user)
        obj.username=req.user.username 
    res.send(obj);
})

// //--------------------------------------------------Error Page----------------------------------------------//
route.get("/*",(req,res)=>{
    res.render('errorPage')
})

module.exports = {
    route
}