require("dotenv").config()
const transporter=require("../configs/mail")


const sandMail = async ({from,to,subject,text,html,attachments,alternatives})  => {
    await transporter.sendMail({
        from,
        to,
        subject,
        text,
        html,
        attachments,
        alternatives
    });
    
}




const verificationMail = async ({
    from,
    to,
    user,
    attachments
  }) => {
    await sandMail({
      from,
      to,
      subject: `Send Verification Email to ${user.firstName} ${user.lastName}`,
      text: `${user.firstName} ${user.lastName} please verify your email`,
      html: `<h1>${user.firstName} ${user.lastName} please verify your email</h1>
        <img src="https://i.ibb.co/dKBxRtV/welcome-page.png" alt="">`,
      attachments
    });
  };


  const welcomeMail = async ({ from, to, user,alternatives,html }) => {
    await sandMail({
      from,
      to,
      subject: `Verification email to ${user.firstName} ${user.lastName}`,
      text: `${user.firstName} ${user.lastName} welcome to masai`,
      html,
     alternatives
    
    });
  };


  const orderPlaced=async ({from,to,alternatives,html})=>{

    await sandMail({
      from,
      to,
      subject:`Order Confirmation for wp_ecom_application `,
      text:`Order Confirmation for wp_ecom_application`,
      html,
      alternatives,
    })
  }

 const sendPasswordResetVerificationEmail = async({from, to, email, token})=>{
        await sandMail({
           from , 
           to,
           subject:`Forget password request`,
           text:`Hii ${email} , The token is valid for only 10 minutes`,
           html:`
            <h2>Hii ${email} , The token is valid for only 10 minutes</h2>
            <h3>Please click the  link below to reset your password</h3>
            <a href='${process.env.CLIENT_URL}/user/forgotPassword/update/${token}'>Reset password here </a>
           `
        })
 }

module.exports = {sandMail,verificationMail,welcomeMail,orderPlaced,sendPasswordResetVerificationEmail}