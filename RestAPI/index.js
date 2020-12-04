let express = require('express');
let app = express();
let pieRepo = require('./repos/pieRepos');  //get  all data from file repos
let addPieRepos = require('./repos/addPieRepos');
let searchPieRepo = require('./repos/sPieRepos');
let sPieRepo = require('./repos/singelPieRepos');
//Use the express Router object
let router = express.Router();

// Configure middleware to support JSON data parsing in request object
app.use(express.json());

const port = process.env.PORT || 5000;


router.get('/api', function (req, res, next){
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
//get a single id
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


router.put('/:id', function(req, res, next){
    addPieRepos.getById(req.params.id, function(data) {
        if(data){
                //Attempt to update the data
                addPieRepos.update(req.body, req.params.id, function(data){
                    res.status(200).json({
                        "status": 200,
                        "statusText": "Updated Ok",
                        "message": "New updated Pie",
                        "data": data  
                    });
                });
        }
      else {
          res.status(404).json({
            "status": 404,
            "statusText": "Not Found",
            "message": "The pid '" + req.params.id + "' cound not be found.",
            "error": {
                "code": "Not_Found",
                "message": "The pie '" + req.params.id + "' cound not be found."
            }
          });
      }}, function(err) {
        next(err);
      });
})


router.delete('/:id', function(req, res, next){
    addPieRepos.getById(req.params.id, function (data) {
        if (data) {
            addPieRepos.delete(req.params.id, function (data){
                res.status(200).json( {
                    "status": 200,
                    "statusText": "Ok",
                    "message": "The pie '" + req.params.id + "' is deleted.",
                    "data": "Pie '" + req.params.id + "' deleted."  
                });
            })
        } else {
            res.status(404).json({
                "status": 404,
                "statusText": "Not Found",
                "message": "The pid '" + req.params.id + "' cound not be found.",
                "error": {
                    "code": "Not_Found",
                    "message": "The pie '" + req.params.id + "' cound not be found."
                }
              });
          }
        }, function(err) {
            next(err);
          });    
})

router.patch('/:id', function(req, res, next) {
    addPieRepos.getById(req.params.id, function (data) {
        if(data) {
            //Attempt to update the data
            addPieRepos.update(req.body, req.params.id, function(data) {
                res.status(200).json ({
                    "status": 200,
                        "statusText": "Updated Ok",
                        "message": "New updated Pie",
                        "data": data  
                });
            })
        }
    })
})



app.use('/', router)
//app.use('/api/', router)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});