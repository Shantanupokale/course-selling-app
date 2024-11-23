const {Router} = require("express");
const userRouter = Router();
const {userModel,purchaseModel,courseModel}= require("../db")
const jwt = require("jsonwebtoken");
const {JWT_USER_PASSWORD} =require("../config")
const { userMiddleware } = require("../middleware/user");

userRouter.post("/signup", async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    try {
        // Create user in the database
        await userModel.create({
            email,
            password,
            firstName,
            lastName
        });
        res.json({
            message: "Signup successful"
        });
    } catch (e) {
        res.json({
            message: "Something failed"
        });
        console.log(e)
    }
});

userRouter.post("/signin",async function(req,res){


    const{email,password}=req.body;
    const user = await userModel.findOne({
        email:email,
        password:password
    });

    if(user){
       const token = await jwt.sign({
            id: user._id,
        },JWT_USER_PASSWORD);

        res.json({
            token : token
        })
    }else(
        res.status(403).json({
            message:"incorrect credentials"
        })
    )
    
   
});

userRouter.get("/purchases", userMiddleware, async function(req, res) {
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId,
    });

    let purchasedCourseIds = [];

    for (let i = 0; i<purchases.length;i++){ 
        purchasedCourseIds.push(purchases[i].courseId)
    }

    const coursesData = await courseModel.find({
        _id: { $in: purchasedCourseIds }
    })

    res.json({
        purchases,
        coursesData
    })
})

module.exports={
userRouter:userRouter
}