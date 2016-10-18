var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
 var async = require("async");
 var stopWatch = new Date().getTime();
var url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);

  console.log("Connected successfully to server");
  ///*** INSERT NEW DOCUMENT
     // insertDocuments(db);
  ///***  DeleteAllDocuments
     //  DeleteAllDocuments(db);
  //*** UpdateDocuments
      UpdateDocument(db);
  


});

// INSERT DOCMENT MOTHOD
var insertDocuments = function(db) {
var bulk = db.collection('documents').initializeOrderedBulkOp(),
    i = 0;

async.whilst(
  function() { return i < 1000000; },
  function(callback) {
    var doc = {  
   "id":"37",
   "CREATED":"2015-08-11 14:03:47",
   "PROVIDER":"APPLE",
   "ISREMOVED":"1",
   "TOKEN":"5e9f94ccd5cd4890a98b7b73783d5b6462cc96e803f2450fdbb1dc112f55738a",
   "UPDATED":"2015-12-23 18:20:37",
   "APPLICATIONSID":"1",
   "USERID":"1",
   "MSGCREATED":"2016-08-02 21:02:22",
   "ERRORCODE":"E:V_PROVIDER_ERROR",
   "ERRORMSG":"IO error: Connection timed out",
   "MSG":"WW91IGhhdmUgUmVjZWl2ZWQg4Li/MywyMTQuMDAgZnJvbSDguJnguLLguKIg4Lie4Li14LmI4Lij4Li04LiXIOC5hOC4p+C5gOC4m+C4reC4o+C5iOC4sg=="+i,
   "PARENTMSGID":"fc9bc6cbe71647b68ce9de64a66861d3",
   "PROVIDERMSGID":"0:1470189727959591%bb32eb31f9fd7ecd",
   "PUSHMSGID":"6eb8f282014444188ff027679493d85c",
   "PUSHPARAM":"unreadMsg:6",
   "STATUS":"SENT",
   "MSGUPDATED":"2016-08-03 09:02:07",
   "WORKERID":"gsbmymodevapp01.cloud",
   "INBOXMESSAGEID":"154889"
};

      bulk.insert(doc);
      
      i++;

      // Drain every 1000 Maximum
      if ( i % 1000 == 0 ) {
        bulk.execute(function(err,response){
          bulk = db.collection('documents').initializeOrderedBulkOp();
          callback(err);
        });
      } else {
          callback();
      }

    },
    function(err) {
      if (err) throw err;
      console.log("DONE:"+(new Date().getTime()-stopWatch)+" sec");
       db.close();
    }
  );
  }

var DeleteAllDocuments = function(db) {

  db.collection('documents').deleteMany( {}, function(err, results) {
      console.log("DONE:"+(new Date().getTime()-stopWatch+" sec"));
       db.close();
   });

}

var UpdateDocument = function(db) {

var bulk = db.collection('documents').initializeOrderedBulkOp();
bulk.find( {MSG: 'WW91IGhhdmUgUmVjZWl2ZWQg4Li/MywyMTQuMDAgZnJvbSDguJnguLLguKIg4Lie4Li14LmI4Lij4Li04LiXIOC5hOC4p+C5gOC4m+C4reC4o+C5iOC4sg==991234' } ).update( { $set: { APPLICATIONSID: '500',PROVIDER:'APPLEPEN' } } )
 bulk.execute(function(err,response){
        
          console.log("DONE:"+(new Date().getTime()-stopWatch+" sec"));
          db.close();
        });


 //** Individual update**//
// db.collection('documents').findAndModify(
//   {TOKEN: '5e9f94ccd5cd4890a98b7b73783d5b6462cc96e803f2450fdbb1dc112f55738a'}, // query
//   {},  // sort order
//   {$set: {APPLICATIONSID: '2'}}, // replacement, replaces only the field "hi"
//   {}, // options
//   function(err, object) {
//       if (err){
//           console.warn(err.message);  // returns error if no matching object found
//       }else{
//           console.dir(object);
//       }
//        console.log("DONE:"+(new Date().getTime()-stopWatch)+" sec");
//              db.close();
//   });       
}