let fs = require('fs');
const FILE_NAME = './assets/pies.json';

let searchPieRepo = {
    getById: function(id, resolve, reject) {

        fs.readFile(FILE_NAME, function(err, data) {
            if (err) {
                reject(err);
            }
            else {
                let pie = JSON.parse(data).find(p => p.id == id);
                resolve(pie);
            }
        });
    }, 
    search: function(searchObject, resolve, reject){
        fs.readFile(FILE_NAME, function(err, data) {
            if (err) { reject(err); }
            else {
                let pies = JSON.parse(data);
                //Perform search
                if(searchObject){
                    //Example search object
                    //let searchObject = {
                        //"id": 1,
                        //"name": "A"
                    //};
                    pies= pies.filter(
                        p => (searchObject.id ? p.id == searchObject.id : true) &&
                            (searchObject.name ? p.name.toLowerCase().indexOf(searchObject.name.toLowerCase()) >= 0 : true));
                }
                resolve(pies);
            }
        });
        }
    };
    

module.exports = searchPieRepo;

//Create module from Data