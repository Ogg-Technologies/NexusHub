//vars for testing purposes
//hastagged code --> ugly code based on former .py code - update not working
//other code --> prettier code - untested by now

var Username = "febboy"
var REQ_TO = "WTB"
var datetime = datetime.datetime.now().isoformat()
var REQ_Type = "Prime"
var REQ_Main = "Frost"
var REQ_Comp = "null"
var REQ_Price = 300

//check if same item older than 1 week if yes update


//check if user already exists (1=yes)
//user_exists=db.users.count({"user":Username});


// Check if prime component (true/ false)
if (REQ_Type == "Prime" && REQ_Comp != "null") {
    var prime_comp = "true"
} else {
    prime_comp = "false"
};



// Insert request
if (prime_comp = "false"){
    users.findOrCreate({username:Username, requests:[{to:REQ_TO, title:REQ_Main, type:REQ_Type, data:REQ_Price}]}, {username:Username, requests:[{to:REQ_TO, title:REQ_Main, type:REQ_Type, data:REQ_Price, updatedAt:datetime}]}).exec(function createFindCB(error, createdOrFoundRecords){
  console.log("Created or updated Item records for"+createdOrFoundRecords.username+".");
});
} else {
    users.findOrCreate({username:Username, requests:[{to:REQ_TO, title:REQ_Main, type:REQ_Type, components:[{name:REQ_Comp, data:REQ_Price}]}]}, {username: Username, requests:[{to:REQ_TO, title:REQ_Main, type:REQ_Type, components:[{name:REQ_Comp, data:REQ_Price}], updatedAt:datetime}]}).exec(function createFindCB(error, createdOrFoundRecords){
  console.log("Created or updated Prime Component records for"+createdOrFoundRecords.username+".");
});
}




//if (user_exists == 0 && prime_comp == "false"){
//    users.insert([first], function (err, result) {
//        if (err) {
//            console.log(err);
//        } else {
//            console.log('Inserted %d Item into the "users" collection. The documents inserted with "_id" are:', result.length, result);
//        }
//        //Close connection
//        db.close();
//    });
//};

//if (user_exists == 0 && prime_comp == "true"){
//    users.insert([first_prime], function (err, result) {
//        if (err) {
//            console.log(err);
//        } else {
//            console.log('Inserted %d Prime Component into the "users" collection. The documents inserted with "_id" are:', result.length, result);
//        }
//        //Close connection
//        db.close();
//    });
//};

//if (user_exists == 1 && prime_comp == "false"){
//    users.update([another], function (err, result) {
//        if (err) {
//            console.log(err);
//        } else {
//            console.log('Updated %d Item into the "users" collection. The documents inserted with "_id" are:', result.length, result);
//        }
//        //Close connection
//        db.close();
//    });
//};

//if (user_exists == 1 && prime_comp == "true"){
//    users.update([another_prime], function (err, result) {
//        if (err) {
//            console.log(err);
//        } else {
//            console.log('Updated %d Prime Component into the "users" collection. The documents inserted with "_id" are:', result.length, result);
//        }
//        //Close connection
//        db.close();
//    });
//};
