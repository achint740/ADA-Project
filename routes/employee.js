const route = require('express').Router()
const fs = require('fs')
// // ------------------------------------------- For sending employee images ----------------------------// //

route.get('/give/:name',(req,res)=>{
    let fileName = req.params.name
    let dir = './employee'
    let f
    fs.readdirSync(dir).forEach(file => {
        if((fileName+'.jpg' == file)) {
            f = file
        }
        else if(fileName+'.jpeg' == file) {
            f = file
        }
        else if(fileName + '.png' == file) {
            f = file
        }
    })
    if(f) res.sendFile(process.cwd() + '/employee/' + f)
    else res.sendFile(process.cwd() + '/employee/' + 'default.PNG')
})

module.exports = {
    route
}












// const Storage = multer.diskStorage({
//     destination: './food',
//     filename: async function(req, file, cb) {
//         console.log(req.body)
//         const foodItemAdded = await menu.create(req.body)
//         console.log("Id of recently added Food Item: "+  foodItemAdded.id)
//         console.log(path.extname(file.originalname))
//         cb(null, foodItemAdded.id + path.extname(file.originalname))
//     }
// })

// const upload = multer({
//     storage: Storage,
//     fileFilter: function(req, file, cb){
//         const fileTypes = ['.jpeg', '.jpg', '.png']
//         const extname = path.extname(file.originalname).toLowerCase()
//         let valid = fileTypes.includes(extname)

//         //Check mime
//         const mimetype = file.mimetype
//         console.log(valid)
//         console.log(mimetype)
//         if(mimetype && valid == true) {
//             return cb(null, true)
//         }
//         else {
//             console.log('error hai image.js')
//             cb('Error: Images Only!')
//         }
//     }
// }).single('itemImage')

// route.post('/upload',(req,res)=>{
//     upload(req, res, (err)=>{
//         if(err) {
//             res.send('Images only')
//         }
//         else {
//             console.log(req.file)
//             res.redirect('/')
//         }
//     })
// })

