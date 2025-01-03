import bcrypt from 'bcrypt';
import CredentialsProvider from "next-auth/providers/credentials";
import {z} from 'zod'
import {prisma} from '@repo/db/prisma'

const requiredBody = z.object({
    name:z.string().optional(),
    email:z.string().optional(),
    password:z.string(),
    phone:z.string().min(2).max(11),
})

// interface Isession{
//     session:{
//         user:{
//             name:string,
//             email:string,
//             password:string,
//             number:string
//         },
//     },
//     user:{
//         name:string,
//         email:string,
//         password:string,
//         number:string
//     },
//     token:{

//     }

// }

export const authOptions = {
    providers:[
        CredentialsProvider({
            name:'Credentials',
            credentials:{
                name:{ label:'Name', type:'text',placeholder:'Enter name'},
                email:{label:'Email',type:'text',placeholder:'Enter Email'},
                phone:{ label:'Phone number',type:'text',placeholder:'9110583579'  },
                password:{ label:"Password",type:'text',placeholder:'password' }
            },
            async authorize(credentials:any)
            {
                const parsedBody = requiredBody.safeParse(credentials)
                    
                if(!parsedBody.success)
                {
                    return null
                }
                try 
                {
            
                const hashedPassword = await bcrypt.hash(parsedBody.data.password,5);

                const existingUser = await prisma.user.findUnique({
                    where:{
                        number:parsedBody.data.phone
                    }
                })

                if(existingUser)
                {
                    const isPasswordMatched = await bcrypt.compare(parsedBody.data.password,existingUser.password)
                    if(isPasswordMatched){
                         return {
                        id:existingUser.id,
                        name:existingUser.name,
                        email:existingUser.email,
                        phone:existingUser.number
                        }
                    }
                    return null;
                }

                const user = await prisma.user.create({
                    data:{
                        name:parsedBody.data.name,
                        email:parsedBody.data.email,
                        password:hashedPassword,
                        number:parsedBody.data.phone
                    }
                })
                   
                    return {
                        id:user.id,
                        name:user.name,
                        email:user.email,
                        phone:user.number
                    }

                } catch (error) {
                    console.log(JSON.stringify(error));
                }
               return null;
                
            }
        })
    ],
    secret:process.env.NEXTAUTH_SECRET||"",
    callbacks:{
        async session({session,user,token}:any)
        {
            console.log(session);
            console.log(user);
            console.log(token);
            return session
        }
    }
}