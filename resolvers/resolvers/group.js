const User = require('../../models/user')
const Group = require('../../models/group')

module.exports ={
    Mutation: {
        createGroup: async (parent, args, context, info)=>{
            const {userId, title, connectionIds} = args
            console.log(args)
            try{
               const group =  await Group.create({title: title, connections: connectionIds})
               
                await User.findByIdAndUpdate({_id: userId}, {$push: {groups: group}})
                return group

            }catch(error){throw error}
        },
        destroyGroup: async (parent, args, context, info)=>{
            
            const user= await User.findOne({_id: args.userId})
        
            const groupIndex= user.groups.findIndex((ele)=>ele ==args.groupId) 
          
            await user.groups.splice(groupIndex, 1)
            user.save()
        }
    }
}
