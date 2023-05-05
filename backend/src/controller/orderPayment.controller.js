require("dotenv").config()
const express = require("express");
const router = express.Router();
const Order = require("../model/order.model");
const OrderDetail = require("../model/orderDetail.model");
const OrderPayment = require("../model/orderPayment.model");
const Address = require("../model/address.model");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const path = require("path");
const EventEmmiter = require("events");
const eventEmmiter = new EventEmmiter();
const { emit } = require('process');
const { orderPlaced } = require("../utils/utils");
const Cart = require("../model/cart.model");
//! one to one relationship between Order and payment start
OrderPayment.belongsTo(Order, { foreignKey: "orderId" });
Order.hasOne(OrderPayment, { foreignKey: "orderId" });

//! one to one relationship between Order and payment end


//! function to convert cart products into stripe line_items format 
const convertToStripeLineItems = (items) => {
  let result = [];
  if (items.length) {
    for (let i = 0; i < items.length; i++) {
      let price_data = {};
      let product_data = {};
      product_data.name = items[i].productName;
      // product_data.images = [`${process.env.IMAGE_BASE_URL}${items[i].productImage}`];
      price_data.currency = 'inr'
      price_data.product_data = product_data;
      price_data.unit_amount = items[i].productDiscountPrice * 100
      result.push({ price_data, quantity: items[i].productQuantity })
    }
  }
  return result;
}
// get all ordered payments
router.get("", async (req, res) => {
  try {
    const allpayments = await OrderPayment.findAll({
       include:[{model:Order}]
    });
    return res.status(200).send(allpayments);
  } catch (error) {
    return res.status(500).send(error);
  }
});
//! single order payment information by order id 
router.get("/:id", async (req, res) => {
  try {
    const allpayments = await OrderPayment.findAll({
        where:{orderId:req.params.id},
       include:[{model:Order}]
    });
    return res.status(200).send(allpayments);
  } catch (error) {
    return res.status(500).send(error);
  }
});
// create new order payment

router.post("/create-payment-intent", async (req, res) => {
  try {
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2000,
      currency: "inr",
      automatic_payment_methods: { enabled: true },
    });

    return res.status(201).json({ client_secret: paymentIntent.client_secret })
  } catch (error) {
    console.log('error', error)
    return res.status(500).json(error);
  }
})

//  prebuild checkout router code block 
router.post('/create-checkout-session', async (req, res) => {

  try {
    // session creation 
    const line_items = convertToStripeLineItems(req.body.cart);
    //  console.log('line items ',line_items.price_data)
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      invoice_creation: {enabled: true},
      success_url: `${process.env.CLIENT_URL}/payment/success/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,

    })
    //  console.log('session created' , session)

    return res.status(201).json({ url: session.url })
  } catch (error) {
    console.log('error while creating session', error)
    return res.status(500).json({ message: error })
  }
})

router.post('/order/success/:id', async (req, res) => {
  try {
    //! finding order with user id which status was false while payment was processing 
    const orderConfirmStatus= await Order.findOne({where:{
       userId:req.body.userId,
       orderStatus:0
    }});
    // console.log('orderConfirmStatus', orderConfirmStatus)

    if(orderConfirmStatus){
       const updateOrderStatus= await Order.update({
        orderStatus:1
       } , {where:{orderId:orderConfirmStatus.dataValues?.orderId}});
      //  console.log('order confirmation code ',updateOrderStatus)
       //****if orderConfirmStatus success 
       if(updateOrderStatus[0]===1){
        // //!! deleting all the items after the order confirmation 
        // const  cartResult= await Cart.destroy({where:{userId:req.body.userId}})
         //! extracting stripe payment information 
         const session = await stripe.checkout.sessions.retrieve(req.params.id);
        //!! creating new payment history 
        const newPayment= await OrderPayment.create({orderId:orderConfirmStatus.dataValues?.orderId,stripePayment:session});
        //!! creating order details history 
        const newOrderDetails= await OrderDetail.create({orderId:orderConfirmStatus.dataValues?.orderId})
       
        //!seding order confirmation email       
       eventEmmiter.on("orderplaced", orderPlaced)
       eventEmmiter.emit('orderplaced', {
         from: 'wp.ecom.application@gmail.com',
         to: session.customer_details?.email,
         // alternatives: [{
         //   contentType: "text/html",
         //   path: path.join(__dirname, "../utils/orderPlaced.html")
         // },],
         html:`
         <body style="background-color:grey">
         <table align="center" border="0" cellpadding="0" cellspacing="0" width="550" bgcolor="white" <tbody>
             <tr>
                 <td align="center">
                     <table align="center" border="0" cellpadding="0" cellspacing="0" class="col-550" width="550">
                         <tbody>
                             <tr>
                                 <td align="center" style="background-color: hsl(45, 50%, 91%)">
     
                                     <a href="#" style="text-decoration: none;">
                                         <div style="width: 40%;">
                                             <img src="https://i.ibb.co/8r7FCM1/7cac6b9e60404132a5a99a36d6aaf474-removebg-preview.png" height="100%"
                                             width="100%" alt="">
                                         </div>
                                     </a>
                                 </td>
                             </tr>
                         </tbody>
                     </table>
                 </td>
             </tr>
             <tr style="height: 300px;">
                 <td align="center" style="border: none;
                 
                 padding-right: 20px;padding-left:20px">
     
                     <p style="font-weight: bolder;font-size: 32px;
                   letter-spacing: 0.025em;
                                 font-family: cursive;
                   color:black;">
                         <br> Order Confirmation.
                     </p>
                     <h2>Hey ${session.customer_details.name} ,</h2>
                     </br>
     
                     <p>  We've got your order! Your world is about to look a whole lot better.
     
                         We'll drop you another email when your order ships.</p>
                         <h3 style="font-family: Arial, Helvetica, sans-serif; color: rgb(0, 0, 0);" >Order Id: ${session.payment_intent}
                         <h3 style="font-family: Arial, Helvetica, sans-serif; color: rgb(0, 119, 255);" >Payment Status:${session.payment_status}
                         </h3>
                    
                 </td>
     
                
             </tr>
     
     
             <tr style="display: inline-block;">
                 <td style="height: 150px;
                 padding: 20px;
                 border: none;
       
                 background-color: white;">
                     <p>
                         <a href="http://192.46.209.205:3003/" style="text-decoration: none;
                     color:black;
                     border: 2px solid hsl(46, 72%, 60%);
                     padding: 10px 30px;
                     font-weight: bold;">
                             Shop More !
                         </a>
                     </p>
                 </td>
             </tr>
             <tr style="border: none;
           background-color: hsl(46, 72%, 60%);
           height: 40px;
           color:white;
           padding-bottom: 20px;
           text-align: center;">
     
                 <td height="40px" align="center">
                     <p style="color:white;
       line-height: 1.5em;">
                         wp_ecom_application
                     </p>
                     <a href="#" style="border:none;
         text-decoration: none;
         padding: 5px;">
     
                         <img height="30"
                             src="https://extraaedgeresources.blob.core.windows.net/demo/salesdemo/EmailAttachments/icon-twitter_20190610074030.png"
                             width="30" />
                     </a>
     
                     <a href="#" style="border:none;
       text-decoration: none;
       padding: 5px;">
     
                         <img height="30"
                             src="https://extraaedgeresources.blob.core.windows.net/demo/salesdemo/EmailAttachments/icon-linkedin_20190610074015.png"
                             width="30" />
                     </a>
     
                     <a href="#" style="border:none;
       text-decoration: none;
       padding: 5px;">
                         <img height="20"
                             src="https://extraaedgeresources.blob.core.windows.net/demo/salesdemo/EmailAttachments/facebook-letter-logo_20190610100050.png"
                             width="24" style="position: relative;
           padding-bottom: 5px;" />
                     </a>
                 </td>
             </tr>
             <tr>
                 <td style="font-family:'Open Sans', Arial, sans-serif;
         font-size:11px; line-height:18px;
         color:#999999;" valign="top" align="center">
                     <a href="#" target="_blank" style="color:#999999;
         text-decoration:underline;">PRIVACY STATEMENT</a>
                     | <a href="#" target="_blank" style="color:#999999; text-decoration:underline;">TERMS OF SERVICE</a>
                     | <a href="#" target="_blank" style="color:#999999; text-decoration:underline;">RETURNS</a><br>
                     © 2022 wp_ecom_application. All Rights Reserved.<br>
                     If you do not wish to receive any further
                     emails from us, please
                     <a href="#" target="_blank" style="text-decoration:none;
                 color:#999999;">unsubscribe</a>
                 </td>
             </tr>
             </tbody>
         </table>
         </td>
         </tr>
         <tr>
             <td class="em_hide" style="line-height:1px;
             min-width:700px;
             background-color:#ffffff;">
                 <img alt="" src="images/spacer.gif" style="max-height:1px;
           min-height:1px;
           display:block;
           width:700px;
           min-width:700px;" width="700" border="0" height="1">
             </td>
         </tr>
         </tbody>
         </table>
     </body>
         `
       })
       eventEmmiter.off('orderplaced', orderPlaced);
       const letestOrder= await Order.findByPk(orderConfirmStatus.dataValues?.orderId)
       return res.status(200).json({session,orders:letestOrder})
       }
       return res.status(500).send({message:"Something went wrong?"});
      
    }
  
    return res.status(500).send({message:"Something went wrong?"});
   
   
  } catch (error) {
    res.status(500).json({ message: error })
  }


});
module.exports = router;



