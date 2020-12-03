let express = require('express');
let app = express();
let pieRepo = require('./repos/pieRepos');  //get  all data from file repos
let addPieRepos = require('./repos/addPieRepos');
//Use the express Router object
let router = express.Router();

// Configure middleware to support JSON data parsing in request object
app.use(express.json());

const port = process.env.PORT || 5000;


router.get('/', function (req, res, next){
    pieRepo.get(function (data) {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "All pies retrieved",
            "data": data
        });
    }, function(err) {
        next(err);
    });
   
});


router.post('/api', function(req, res, next){
    addPieRepos.insert(req.body, function(data) {
        res.status(201).json({
            "status": 201,
            "statusText": "Created",
            "message": "New Pie Created",
            "data": data
        });
    }, function(err) {
        next(err);
    });
})




app.use('/', router)
//app.use('/api/', router)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});