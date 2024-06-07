const router =  require("express").Router();
const db = require("../DB");


//GET: all the airbnb users information. 
router.get("/users/all", async(request,response) => { //needs to be asyc fn or else results will be none. 
    try {
        const results = await db.query(`SELECT * FROM users`);
        response.json(results.rows);
    } catch(err) {
        console.error(err);
    };   
})

//GET: finding user base on city from airbnb users through params. acces thorugh db?
router.get("/users/:rentalcity", async(request, response) => {
        const rentalcity = request.params.rentalcity;
        const results = await db.query(`SELECT * FROM users WHERE rentalcity = $1`, [rentalcity] ); //$1 takes the first argument in the array. 
        response.json(results.rows);
    
})

//POST: create a new user in the DB
router.post("/users/new", async(req,res) => {
    try {
        const { name, rentalcity, date } = req.body; //destructured a new object from the req.body

        const results = await db.query('INSERT INTO users (name, rentalCity, date) VALUES ($1, $2, $3 ) RETURNING *', [name, rentalcity, date]); //the RETURNING allows the data to be placed back into the results.rows object key so when we update the DB it will show up in output. if we don't do that the output woudl return [].

        return res.status(201).json({ Added: results.rows[0] }); //setting it to array 0 lets us clean up the code so it would have array brackets on one item only inside the array. status code 201 is for creating an object. 

    } catch(e) {
        console.error(e);
    }
});

//PATCHING: updating a users information
router.patch("/users/update/:id", async (request,response) => {

        const {id} = request.params;
        const { name, rentalcity, date } = request.body;
        const results = await db.query('UPDATE users SET name=$1, rentalcity=$2, date=$3 WHERE id=$4 RETURNING *', [name, rentalcity, date, id])
        return response.json(results.rows[0]);
    
});

//DELETE: delete a user based on id.
router.delete("/users/:id/delete", async(request, response) => {
    const {id} = request.params;
    const results = await db.query('DELETE from users WHERE id=$1 RETURNING *', [id]); //[request.params.id] can be used instead but better like this to check if the id is valid first. 
    return response.json({ deleted: results.rows[0] }); //changed the json to a deleted key with value of rows. more user friendly in understanding. 
});




module.exports = router;