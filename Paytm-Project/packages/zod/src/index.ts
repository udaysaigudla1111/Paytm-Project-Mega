import {z} from 'zod'

 const requiredPaymentInfo = z.object({
    token:z.string(),
    userId:z.string(),
    amount:z.number()
 })


 export {requiredPaymentInfo}
 

