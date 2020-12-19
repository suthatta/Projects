// Bring in the express server and creat application
let express = require('express');
let app = express();
let pieRepo = require('./repos/pieRepo');
let errorHelpers = require('./helpers/errorHelpers');

let cors = require('cors');
// Use the express Router object
let router = express.Router();

//Configure middleware to support JSON data parsing in request object
app.use(express.json());
//Configure CORS
app.use(cors());

/*
let pies = [
    {"id": 1, "name": "apple"},
    {"id": 2, "name": "cherry"},
    {"id": 3, "name": "peach"},
] */
//bring pieRepo from repos/pieRepo

//let pies = pieRepo.get();

//Create GET to return a list of all pies
router.get('/', (req, res, next) => {
//res.send(pies);
//res.status(200).send(pies);
pieRepo.get( (data) => {
    res.status(200).json({
        "status": 200,
        "statusText": "OK",
        "message": "All pies retrieved",
        "data": data
    });
}, (err) => {
    next(err); 
});

});

//Create GET/Search?id=n&name=str to search for pies by id and/or name
//http://localhost:5000/api/search/?id=2&name=b
//http://localhost:5000/api/search/?name=b
router.get('/search', function (req, res, next) {
    let searchObject =  {
        "id": req.query.id,
        "name": req.query.name
    };
    pieRepo.search(searchObject, function (data){
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "Pie retrieved",
            "data": data
        });
    }, function (err) {
        next(err);
    });

})
//Create GET/id to return a single pie
router.get('/:id', function (req, res, next) { 
    pieRepo.getById( req.params.id, (data) => {
        if (data) {
            res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "All pies retrieved",
            "data": data
        });
    } 
    else {
        res.status(404).json({
            "status": 404,
            "statusText": "NOt Found",
            "message": "The pie '" + req.params.id + "' could not be found.",
            "error": {
                "code": "Not Found",
                "message": "The pie '" + req.params.id + "' could not be found."
            }
        });
    }
        
    }, (err) => {
        next(err); 
    });
    
    });

// Post data
router.post('/', function (req, res, next) {
    pieRepo.insert(req.body, function(data) {
        res.status(201).json( {
            "status": 201,
            "statusText": "Created",
            "message": " New Pie Added",
            "data": data
        });
    }, function (err){
        next(err);
    });
}) 

router.put('/:id', function (req, res, next) {
    pieRepo.getById(req.params.id, function(data) {
    if (data){
        //Attempt to update the data
        pieRepo.update(req.body, req.params.id, function (data) {
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": "Pie '" + req.params.id +"' updated",
                "data": data
            });
        });
    }
    else {
        res.status(404).json({
            "status": 404,
            "statusText": "NOt Found",
            "message": "The pie '" + req.params.id + "' could not be found.",
            "error": {
                "code": "Not Found",
                "message": "The pie '" + req.params.id + "' could not be found."
            }
        });
    }
}, function (err){
    next(err);
});

})

router.delete('/:id', function(req, res, next) {

    pieRepo.getById(req.params.id, function(data) {
        if(data){

            //Attempt to delete the data
            pieRepo.delete(req.params.id, function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": "Pie '" + req.params.id +"' is deleted",
                    "data": "Pie '" + req.params.id + "' deleted"
                });
            })
        }
        else {
            res.status(404).json({
                "status": 404,
                "statusText": "NOt Found",
                "message": "The pie '" + req.params.id + "' could not be found.",
                "error": {
                    "code": "Not Found",
                    "message": "The pie '" + req.params.id + "' could not be found."
                }
            });
        }
    }, function (err){
        next(err);
    });
})

router.patch('/:id', function (req, res, next) {
    pieRepo.getById(req.params.id, function(data) {
    if (data){
        //Attempt to update the data
        pieRepo.update(req.body, req.params.id, function (data) {
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": "Pie '" + req.params.id +"' updated",
                "data": data
            });
        });
    }
    else {
        res.status(404).json({
            "status": 404,
            "statusText": "NOt Found",
            "message": "The pie '" + req.params.id + "' could not be found.",
            "error": {
                "code": "Not Found",
                "message": "The pie '" + req.params.id + "' could not be found."
            }
        });
    }
}, function (err){
    next(err);
});

})
// Configure router so all routes are prefixed with /api/v1
app.use('/api/', router);

app.use(errorHelpers.logErrorsToConsole);
app.use(errorHelpers.logErrorsToFile);
app.use(errorHelpers.clientErrorHandler);
app.use(errorHelpers.errorHandler);
/*
function errorBuilder(err) {
    return {
        "status": 500,
        "statusText": "Internal Server Error",
        "message": err.message,
        "error": {
            "errono": err.errno,
            "call": err.syscall,
            "code": "Internal_server_error",
            "message": err.message

        }
    };
}

//configure exception logger
app.use(function(err, req, res, next){
    console.log(errorBuilder(err));
    next(err);
});
//configure exeption middleware last
app.use(function(err, req, res, next){
    res.status(500).json(errorBuilder(err));
});
*/
//Create server to listen o prot 5000
const server = app.listen(5000, () => {
    console.log('Node server is running on http://localhost:5000.');
});