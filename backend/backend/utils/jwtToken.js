//  Create Token and Saving in cookie

const sendToken = (user,statusCode,res)=>{
    const token = user.getJWTToken();

    // Options for cookie

    const options = {
        expires:new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly:true,
        // sameSite: false
        // maxAge: 900000, httpOnly: true
        // secure: process.env.NODE_ENV === 'production' // Set to true in production
    }

    res.status(statusCode)
    res.cookie("token",token,options)
    res.json({
        success:"true",
        user,
        token,
    })

};

module.exports = sendToken;