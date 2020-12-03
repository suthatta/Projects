//Bring in the express server and create application 
let express = require('express');
let app = express();
let pieArray = require('./repos/pieArray')//get data 
let pieRepo = require('./repos/pieRepos');  //get  all data from file repos
let sPieRepo = require('./repos/singelPieRepos'); ////get  singel data from file repos
let searchPieRepo = require('./repos/sPieRepos'); ////get  singel data from file repos
//use the express Router object
let router = express.Router();
const port = process.env.PORT || 5000;

/*

let pies = [
    {"id": 1, "name": "Apple"},
    {"id": 2, "name": "Cherry"},
    {"id": 3, "name": "Peach"},
    {"id": 4, "name": "Stawberry"}
]
*/
//replace pieRepo 
let pies = pieArray.get();// for get data 


//Create GET to return a list of all pies
router.get('/array', function (req, res, next){
    res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "All pies retrieved",
        "data": pies
    });
   // res.send("Cherry pie");
    //res.send(pies);
});

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

// get singel id
router.get('/api/:id', function (req, res, next){
    sPieRepo.getById(req.params.id, function (data) {
        if(data) {
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": "Single pie retrieved",
                "data": data
            });
        }
        else {
            res.status(404).json( {
                "status": 404,
                "statusText": "Not Found",
                "message": "The pie '" + req.params.id + "' counld not be found.",
                "error": {
                    "code": "Not found",
                    "message": "The pie '" + req.params.id + "' cound not be found."
                }   
            });
        }        
    }, function(err) {
        next(err);
    });   
});

router.get('/search', function (req, res, next){
    let searchObject = {
        "id": req.query.id,
        "name": req.query.name
    };

    searchPieRepo.search(searchObject, function (data){
        res.status(200).json({
            "status": 200,
                "statusText": "OK",
                "message": "Found data",
                "data": data
        });
    }, function (err){
        next(err);
    });
});
//http://localhost:5000/search?id=1&name=apple
/*
router.get('/api', function (req, res, next){
    //res.send("Cherry pie");
    res.send(pies);
});
*/
/*
//send status 
router.get('/api/status', function(req, res, next){
    res.status(206).send(pies)
}) */
// Configure router so all routes are prefixed with /api/v1


app.use('/', router)
//app.use('/api/', router)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});