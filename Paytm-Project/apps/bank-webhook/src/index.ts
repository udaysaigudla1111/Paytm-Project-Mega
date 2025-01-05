import express from 'express'
import {prisma} from '@repo/db/prisma'
import {requiredPaymentInfo} from '@repo/zod/paymentInfo'

const app = express();
app.use(express.json())

interface IpaymentInformation{
    token:string,
    userId:string,
    amount:number
}

app.post("/hdfcWebhook",async (req,res)=>{

    const parsedPaymentInfo = requiredPaymentInfo.safeParse(req.body);

    if(!parsedPaymentInfo.success)
    {
        res.status(400).json({
            message:"The HDFC Bank server did not sent data correctly"
        })
        return;
    }

    const paymentInformation:IpaymentInformation = {
        token:parsedPaymentInfo.data.token,
        userId:parsedPaymentInfo.data.userId,
        amount:parsedPaymentInfo.data.amount
    }

    try {

        await prisma.$transaction([
            prisma.balance.update({
                where:{
                    userId:parsedPaymentInfo.data.userId
                },
                data:{
                    amount:{
                        increment:parsedPaymentInfo.data.amount 
                    }
                }
            }),
            prisma.onRampTransaction.update({
                where:{
                    userId:parsedPaymentInfo.data.userId
                },
                data:{
                    
                }
            })
        ])

    } catch (error) {
        
    }    

})


app.listen(3003,()=>{
    console.log(`The server is listening on port ${3003}`);
    
})
