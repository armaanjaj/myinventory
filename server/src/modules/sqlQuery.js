const pool = require("./pool");

const query = (query, data, callback) => {
    
    pool.getConnection( (err, con) =>{
        
        if (err) {
            con.release();
            callback({
                status: 408,
                message: "Connection timed out. Please try again.",
            }, null);
        }
        
        con.query(query, data, (error, result, fields) => {

            con.release();
            
            if (error) {
                console.log(error)
				callback({
                    status: 500,
                    message: "Internal Server Error. Please try again.",
                }, null);
			} else {
                callback(null, result);
            }
        });
    });
}

module.exports = query;