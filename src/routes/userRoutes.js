const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const router = express.Router();

router.get("/admin", verifyToken,authorizeRoles("admin"), (req,res)=>{
res.json({message:"Welcome to Admin Page"});
});

router.get("/manager",verifyToken,authorizeRoles("admin","manager"), (req,res)=>{
    res.json({message:"Welcome to Manager Page"});
});

router.get("/user",verifyToken,authorizeRoles("admin","manager","user"),(req,res)=>{
    res.json({message:"Welcome to User page"});
});

module.exports = router;