const route=require('express').Router()
const reservationInfo=require('../db2.js').reservationInfo
const tableInfo=require('../db2.js').tableInfo
const passport = require('../passport');


route.use(passport.initialize());
route.use(passport.session());


route.get('/',function(req,res){
    res.render('reserveTable')
})


function computeEndTime(time)
{ 
    hour=time.split(':')[0]
    hour=+(hour)+1
    hr = "" + hour;
    if(hr.length==1){
        hr = "0" + hr;
    }
    t = time.split(':')
    t[0] = hr;
    endTime  = t.join(':')
    return endTime
}

function clash(rtable,startTime, endTime)
{   
    let res_ka_start = rtable.dataValues.startTime
    let res_ka_end = rtable.dataValues.endTime

    console.log("Comparing : " + startTime + " " + endTime + " with  " + res_ka_start + " " + res_ka_end);

    return !((endTime<res_ka_start) || (startTime>res_ka_end))

}

function findTable(store)
{
    let ans = -1
    for  (let keys in store) 
    {
        if(store[keys]==1)
        {
            ans = +(keys);
            break
        }
    }

    return ans;
}

function getCurrDate(){
    return new Promise((resolve,reject)=>{
      var today = new Date();
      console.log(typeof(today));
      var dd = today.getDate();
      var mm = today.getMonth()+1; 
      var yyyy = today.getFullYear();
      if(dd<10){
        dd='0'+dd;
      } 
      if(mm<10){
        mm='0'+mm;
      } 
      today = yyyy +'-'+ mm +'-'+ dd;
      console.log(today);
      resolve(today);
    })
}

function getCurrTime(){
    let today = new Date();
    let curr_hh = today.getHours();
    let curr_min = today.getMinutes();
    let arr=[]
    arr.push(curr_hh)
    arr.push(curr_min)
    let time=arr.join(':')
    return time

}




route.post('/bookTable',function(req,res){
    if(req.user == undefined){
        let obj = {
            status : 0
        }
        res.send(obj);
    }
    else{
        console.log( 'Type of date : ' + typeof(req.body.date))
        date=req.body.date
        members = req.body.members.split('-')[0]
        startTime=req.body.time
        endTime = computeEndTime(req.body.time);
        
        let store= {}
        tableInfo.findAll({
            where:{
                members: +(members)
            }
        }).then((tableList)=>{
            tableList.forEach((table)=>{
                store[table.dataValues.tableId]=1
            })

            reservationInfo.findAll({
                where: {
                    members: +(members),
                    entryDate: date
                }
            }).then((reservedList)=>{
                reservedList.forEach((rtable)=>{
                    if(clash(rtable,startTime,endTime)){
                        if(store[rtable.dataValues.tableId])
                            store[rtable.dataValues.tableId]=0
                    }
                })
                console.log("List of Available Table ID's : ");
                console.log(store)
                let ans = findTable(store);
                let obj={}
                if(ans!=-1)
                {
                    let msg = "Table " + ans + " available "
                    obj.username=req.user.username
                    obj.status=1
                    obj.tableId=+(ans)
                    obj.entryDate=date
                    obj.startTime=startTime
                    obj.endTime=endTime
                    obj.members=+(members)
                    console.log(msg)
                    tableInfo.findOne({
                        where:{
                            tableId: obj.tableId
                        }
                    }).then((data)=>{
                        obj.cost=data.dataValues.cost
                        console.log(obj)
                        return res.send(obj);
                    })
                    
                }
                else{
                    obj.status=0
                    return res.send(obj)
                }
            })
        });
    }
})

route.post('/confirmBooking',function(req,res){
    console.log(req.body)
    let ans={}
    reservationInfo.create({
        tableId:   +(req.body.tableId),
        username:  req.user.username,
        entryDate: req.body.entryDate,
        startTime: req.body.startTime,
        endTime:   req.body.endTime,
        members:   +(req.body.members)
    }).then(()=>{
        ans.status=1
        res.send(ans)
    }).catch((err)=>{
        console.log("Printing the error here" ,err)
        ans.status=0
        res.send(ans)
    })
})

route.get('/status',function(req,res){
    date=getCurrDate()
    startTime=getCurrTime()
    endTime=computeEndTime(startTime)
    let store= {}
    tableInfo.findAll().then((tableList)=>{
        tableList.forEach((table)=>{
            store[table.dataValues.tableId]=1
        })

        reservationInfo.findAll({
            where: {
                entryDate: date
            }
        }).then((reservedList)=>{
            reservedList.forEach((rtable)=>{
                if(clash(rtable,startTime,endTime)){
                    if(store[rtable.dataValues.tableId])
                        store[rtable.dataValues.tableId]=0
                }
            })
            console.log("List of Available Table ID's : ");
            console.log(store)
            let msg="Failure"
            for  (let keys in store) 
            {
                if(store[keys]==1)
                {
                    console.log(keys)
                    msg="Success"
                }
            }
            res.send(msg)
        })
    });
    
})


route.get('/history',(req,res)=>{
    reservationInfo.findAll({
        where : {
            username : req.user.username
        }
    }).
    then((prevReservations)=>{
        res.send(prevReservations)
    })
    .catch((err)=>{
        console.log("Error Occured" + err)
        res.send([])
    })
})


module.exports={route}

module.exports={route}
