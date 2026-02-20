import {mutation} from "./_generated/server"
import{v} from "convex/values"

export const CreateNewUser=mutation({
    args:{
        name:v.string(),
        email:v.string(),
        imageUrl:v.string()
    },
    handler:async(ctx,args)=>{
        //if user already exist?
        const user=await ctx.db.query('UserTable')
        .filter((q)=>q.eq(q.field('email'),args.email))
        .collect();

        if(user?.length==0){
            const userData={
                name:args.name,
                email:args.email,
                imageUrl:args.imageUrl
            }
            //if not then create new user
            const reuslt=await ctx.db.insert('UserTable',userData);
            return userData
        }
        //if user already exist
        return user[0]
    }
})