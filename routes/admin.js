const {Router} = require("express");
const adminRouter = Router();
const {adminModel} = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD} =require("../config")


const adminMiddleware = (req, res, next) => {
    console.log("Admin middleware executed");
    next(); // Call the next middleware or route handler
};

adminRouter.use(adminMiddleware);

adminRouter.post("/signup",async function(req,res){
    const { email, password, firstName, lastName } = req.body;

    try {
        // Create user in the database
        await adminModel.create({
            email,
            password,
            firstName,
            lastName
        });
        res.json({
            message: "Signup successful"
        });
    } catch(e) {
        res.json({
            message: "Something failed"
        });
        console.log(e)
    }
});

adminRouter.post("/signin",async function(req,res){
    const{email,password}=req.body;
    const user = await adminModel.findOne({
        email:email,
        password:password
    });

    if(user){
       const token = jwt.sign({
            id: user._id,
        },JWT_ADMIN_PASSWORD);

        res.json({
            token : token
        })
    }else{
        res.status(403).json({
            message:"incorrect credentials"
        })
    }
        
    
});


adminRouter.put("/course", async function(req,res){
    const adminId = req.userId;

    const { title, description, imageUrl, price, courseId } = req.body;

    // creating a web3 saas in 6 hours
    const course = await courseModel.updateOne({
        _id: courseId, 
        creatorId: adminId 
    }, {
        title: title, 
        description: description, 
        imageUrl: imageUrl, 
        price: price
    })

    res.json({
        message: "Course updated",
        courseId: course._id
    })


});






adminRouter.get("/course/bulk" ,async function(req, res) {
    const adminId = req.userId;

    const courses = await courseModel.find({
        creatorId: adminId 
    });

    res.json({
        message: "Course updated",
        courses
    })
})

module.exports={
    adminRouter:adminRouter
}