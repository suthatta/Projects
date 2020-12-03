let fs = require('fs');
const FILE_NAME = './assets/pies.json';

let sPieRepo = {
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
    }
    };
    

module.exports = sPieRepo;

//Create module from Data