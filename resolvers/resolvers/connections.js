const User = require('../../models/user')
const Connections = require('../../models/connection')
const connections = {
    Mutation: {
        addConnection: async (parent, args, context, info)=>{
            try{
                const userA = await User.findOne({_id: args.userId})
                if (args.input==args.userId){
                    throw new Error('You cannot add yourself')
                }
                if (userA.connections.some(connection=>connection._id ==args.input)){
                    throw new Error("You're already connected")
                }
                
                 return User.findByIdAndUpdate(
                    {_id: args.userId}, 
                    {$push: {connections: args.input}},
                    {new: true}
                ).populate('User')
                
        
                
        
            }catch (error){ throw error}
        }
    }
}
module.exports = connections
