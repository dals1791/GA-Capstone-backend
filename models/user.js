const mongoose = require('../db/connection')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema


const userSchema = new Schema(
    {
        username: {type: String, unique: true, lowercase: true},
        password: String,
        name: String,
        handle: {type: String, unique: true},
        personalContact: {
          
                street: String, 
                aptNum: String,
                city: String,
                state: String,
                zipcode: String,
                phone:  String,
                email:  String,
                   
            
        },
        connections: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
        groups: [{
            type: Schema.Types.ObjectId,
            ref: "Groups"
        }]
    }
)
// mongoose pre-middleware: Pre middleware functions are executed one after another, when each middleware calls next.
userSchema.pre('save', async function(next) {
    // bcryptjs function. 
    if (this.isModified('password')){ //if password field is modified encrypt it using bcrypt. 
        //https://www.npmjs.com/package/bcryptjs
        this.password = await bcrypt.hash(this.password, 12)
    }
  });

const User = mongoose.model('User', userSchema)

module.exports = User