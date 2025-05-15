const express = require('express');
const mysql = require('mysql')
const cors = require('cors')

const app = express();
const  PORT = 3308;
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "",
database:"msc", 
port: 3308
})

// const db = mysql.createConnection({
//     host: "axa5980.uta.cloud",
//     user: "axa5980_WDM",
//     password: "Abhinaywdm@123",
//     database:"axa5980_msc", 
//     port: 3306
//     })

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

//user.php
app.post("/sigin", (req,res)=>{
    console.log(req.body)
    db.query("INSERT INTO users (email,username, password, role) VALUES(?,?,?,?)", [req.body.email,req.body.username,req.body.password,req.body.role],(err,result)=>{
        console.log(result)
        if(result) 
        {
            res.send(result)
        } 
        else{           
            res.send({message:"Wrong Details Provided"})
        }
    });   
});

//login.php
app.post("/login", (req,res)=>{
    db.query("SELECT * FROM users WHERE username = ? AND password = ?", [req.body.username,req.body.password],(err,result)=>{
        if(err) {
        console.log("ERRORS: ",err)
        } 
        else
        {
            console.log("RESULTS: ",result)
            if(result.length>0)
            {
                return res.send(result[0].role)
            }
            else{  
                // console.log(req.body.role)
                // if(req.body.role==''){
                //     return res.json("Select a valid role")
                // }
                db.query("SELECT * FROM users WHERE username = ?", [req.body.username],(err,result)=>{     
                    if(err) {
                        // console.log("ERRORS: ",err)
                    } 
                    else{
                        if(result.length>0)
                        {
                            db.query("SELECT * FROM users WHERE password = ?", [req.body.password],(err,result1)=>{  
                                if(err) {
                                    // console.log("ERRORS: ",err)
                                } 
                                // if(result1.length>0)
                                // {
                                //     return res.json("User does not match with the role")
                                // }
                                else{
                                    return res.json({message:"Wrong Password"})
                                }
                            });
                        }
                        else{
                            return res.json({message:"No User Found with that Name"})
                        }
                    }    
                }); 
            }
        }
    });   
});

//course.php
//get course of students of particular instructor
app.post("/course", (req,res)=>{
    // console.log("body:",req.body)
    db.query("SELECT Uid FROM users WHERE username = ?", [req.body.username],(err,result)=>{ 
        // console.log("res:",result)      
        if(result.length>0) 
        { 
            // console.log("UID:",result[0].Uid)
            db.query("SELECT Uid FROM users WHERE username = ?", [req.body.instructor],(err,result1)=>{ 
                // console.log("res1:",result1)      
                if(result1.length>0) 
                { 
                    db.query("SELECT Cid FROM course WHERE instructorID = ?", [result1[0].Uid],(err,result2)=>{  
                        // console.log("res2:",result2)      
                        if(result2) 
                        {
                            let CIDs=[]
                            result2.map((res2,i)=>(CIDs.push(res2.Cid)))
                            // console.log("CIDS:",CIDs) 
                            db.query("SELECT Cid FROM userscourse WHERE Uid = ? AND Cid in (?)", [result[0].Uid,CIDs],(err,result)=>{ 
                                // console.log("res3:",result)         
                                if(result) 
                                {
                                    let courseNames=[]
                                    for (let i = 0; i < result.length; i++) {                       
                                        db.query("SELECT courseName FROM course WHERE Cid = ?", [result[i].Cid],(err,res1)=>{ 
                                            if(res1) 
                                            {
                                                courseNames.push(res1[0].courseName)
                                                // console.log("COURSE:- ",courseNames)
                                            }
                                            if(i==result.length-1)
                                            {
                                                res.send(courseNames)
                                            }
                                        })                        
                                    }
                                }
                                else{          
                                    res.send({message:"No Courses Found"})
                                }
                            });
                        }
                        else{          
                            res.send({message:"No Courses Found"})
                        }
                    });
                }
            });
        } 
        else{           
            res.send({message:"No User Found"})
        }
    });   
});


//studentCourse.php
//get course of students
app.post("/studentCourse", (req,res)=>{
    // console.log("body:",req.body)
    db.query("SELECT Uid FROM users WHERE username = ?", [req.body.username],(err,result)=>{ 
        // console.log("res:",result)      
        if(result.length>0) 
        { 
            // console.log("UID:",result[0].Uid)
            db.query("SELECT Cid FROM userscourse WHERE Uid = ?", [result[0].Uid],(err,result1)=>{ 
                // console.log("res3:",result1)         
                if(result1) 
                {
                    let courseNames=[]
                    for (let i = 0; i < result1.length; i++) {                       
                        db.query("SELECT courseName FROM course WHERE Cid = ?", [result1[i].Cid],(err,res1)=>{ 
                            if(res1) 
                            {
                                courseNames.push(res1[0].courseName)
                                // console.log("COURSE:- ",courseNames)
                            }
                            if(i==result1.length-1)
                            {
                                res.send(courseNames)
                            }
                        })                        
                    }
                }
                else{          
                    res.send({message:"No Courses Found"})
                }
            });
        } 
        else{           
            res.send({message:"No User Found"})
        }
    });   
});

//instructorCourse.php
//get course of instructor
app.post("/instructorCourse", (req,res)=>{
    // console.log("body:",req.body)
    db.query("SELECT Uid FROM users WHERE username = ?", [req.body.username],(err,result)=>{ 
        // console.log("res1:",result)      
        if(result[0].Uid) 
        { 
            // console.log("UID:",result[0].Uid)
            db.query("SELECT courseName FROM course WHERE instructorID = ?", [result[0].Uid],(err,result1)=>{  
                // console.log("res2:",result1)      
                if(result1) 
                {
                    let courseNames=[]
                    for (let i = 0; i < result1.length; i++) {   
                        courseNames.push(result1[i].courseName)
                        // console.log("COURSE:- ",courseNames)
                        if(i==result1.length-1)
                        {
                            res.send(courseNames)
                        }
                    }
                }
                else{          
                    res.send({message:"No Courses Found"})
                }
            });
        } 
        else{           
            res.send({message:"No User Found"})
        }
    });   
});


//instructorCourseContent.php
//get content of instructor
app.post("/instructorCourseContent", (req,res)=>{
    // console.log("body:",req.body)
    db.query("SELECT Uid FROM users WHERE username = ?", [req.body.username],(err,result)=>{ 
        // console.log("res1:",result)      
        if(result[0].Uid) 
        { 
            // console.log("UID:",result[0].Uid)
            db.query("SELECT courseName,courseContent FROM course WHERE instructorID = ?", [result[0].Uid],(err,result1)=>{  
                // console.log("res2:",result1)      
                if(result1) 
                {
                    let courseNames=[]
                    for (let i = 0; i < result1.length; i++) {   
                        courseNames.push(result1[i].courseName+"&&&"+result1[i].courseContent)
                        // console.log("COURSE:- ",courseNames)
                        if(i==result1.length-1)
                        {
                            res.send(courseNames)
                        }
                    }
                }
                else{          
                    res.send({message:"No Courses Found"})
                }
            });
        } 
        else{           
            res.send({message:"No User Found"})
        }
    });   
});


//updateCourseContent.php
//updating course content into db
app.post("/updateCourseContent", (req,res)=>{
    // console.log("BODYY:",req.body)
    db.query("SELECT Uid FROM users WHERE username = ?", [req.body.username],(err,result)=>{     
        if(result[0].Uid) 
        { 
            db.query("UPDATE course SET courseContent = ? WHERE courseName = ?", [req.body.courseContent,req.body.courseName],(err,result)=>{
                // console.log("res:",result)  
                if(result.affectedRows) 
                {
                    console.log("Entering if")
                    res.send(result)
                } 
                else{   
                    console.log("Entering else")        
                    res.send({message:"Course Name not found"})
                }
            }); 
        }
        else{           
            res.send({message:"No User Found"})
        }
    });   
});

//scores.php
//updating scores into db
app.post("/scores", (req,res)=>{
    // console.log("BODYY:",req.body)
    db.query("SELECT Uid FROM users WHERE username = ?", [req.body.username],(err,result)=>{     
        if(result[0].Uid) 
        { 
            db.query("UPDATE userscourse SET Score = ? WHERE Uid = ? AND Cid = ?", [req.body.scores,result[0].Uid,req.body.CID],(err,result)=>{
                // console.log("res:",result)  
                if(result) 
                {
                    res.send(result)
                } 
                else{           
                    res.send({message:"No Scores"})
                }
            }); 
        }
    });   
});

//getScores.php
//api to get the scores of student
app.post("/getScores", (req,res)=>{
    // console.log("body:",req.body)
    db.query("SELECT Uid FROM users WHERE username = ?", [req.body.username],(err,result)=>{ 
        // console.log("res:",result)      
        if(result[0].Uid) 
        { 
            // console.log("UID:",result[0].Uid)
            db.query("SELECT Score,Grades,Feedback FROM userscourse WHERE Uid = ?", [result[0].Uid],(err,result)=>{  
                // console.log("MAINRES",result)    
                if(result) 
                {
                    let scores=[]
                    for (let i = 0; i < result.length; i++) { 
                        // scores.push(result[i].Score+"        ("+result[i].Grades+")") //+result[i].Feedback
                        scores.push(result[i].Score)
                        if(i==result.length-1)
                        {
                            res.send(scores)
                        }                       
                    } 
                }
                else{          
                    res.send({message:"No Scores Found"})
                }
            });
        } 
        else{           
            res.send({message:"No User Found"})
        }
    });   
});

//sendMessage.php
//API for students to send messages to their instructors
app.post("/sendMessage", (req,res)=>{
    // console.log("BODYY:",req.body)
    db.query("SELECT Uid FROM users WHERE username = ?", [req.body.username],(err,result)=>{     
        if(result[0].Uid) 
        { 
            db.query("SELECT Uid FROM users WHERE username = ?", [req.body.instructor],(err,result1)=>{
                // console.log("res1:",result1)  
                if(result1[0].Uid) 
                {
                    db.query("INSERT INTO studentinstructormessage (studentID,instructorID,message,unread,senderID) VALUES(?,?,?,?,?)", [result[0].Uid,result1[0].Uid,req.body.message,"true",result[0].Uid],(err,result2)=>{
                        // console.log("res2:",result2)  
                        if(result2) 
                        {
                            res.send(result2)
                        } 
                        else{           
                            res.send({message:"No Message"})
                        }
                    }); 
                }
            }); 
        }
        else{
            res.send({message:"No User Found"})
        }
    });   
});

//studentSendMessage.php
//API for students to send messages to their coordinators
app.post("/studentSendMessage", (req,res)=>{
    console.log("BODYY:",req.body)
    db.query("SELECT Uid FROM users WHERE username = ?", [req.body.username],(err,result)=>{     
        if(result[0].Uid) 
        { 
            db.query("SELECT Uid FROM users WHERE username = ?", [req.body.coordinator],(err,result1)=>{
                console.log("res1:",result1)  
                if(result1[0].Uid) 
                {
                    db.query("INSERT INTO studentcoordinatormessage (studentID,coordinatorID,message,unread,senderID) VALUES(?,?,?,?,?)", [result[0].Uid,result1[0].Uid,req.body.message,"true",result[0].Uid],(err,result2)=>{
                        console.log("res2:",result2)  
                        if(result2) 
                        {
                            res.send(result2)
                        } 
                        else{           
                            res.send({message:"No Scores"})
                        }
                    }); 
                }
            }); 
        }
        else{
            res.send({message:"No User Found"})
        }
    });   
});

//instructorSendMessage.php
//API for instructors to send messages to their students
app.post("/instructorSendMessage", (req,res)=>{
    // console.log("BODYY:",req.body)
    db.query("SELECT Uid FROM users WHERE username = ?", [req.body.instructorUsername],(err,result)=>{     
        if(result[0].Uid) 
        { 
            db.query("SELECT Uid FROM users WHERE username = ?", [req.body.student],(err,result1)=>{
                // console.log("res1:",result1)  
                if(result1[0].Uid) 
                {
                    db.query("INSERT INTO studentinstructormessage (studentID,instructorID,message,unread,senderID) VALUES(?,?,?,?,?)", [result1[0].Uid,result[0].Uid,req.body.message,"true",result[0].Uid],(err,result2)=>{
                        // console.log("res2:",result2)  
                        if(result2) 
                        {
                            res.send(result2)
                        } 
                        else{           
                            res.send({message:"No MSG"})
                        }
                    }); 
                }
            }); 
        }
        else{
            res.send({message:"No User Found"})
        }
    });   
});

//coordinatorSendMessage.php
//API for coordinators to send messages to their students
app.post("/coordinatorSendMessage", (req,res)=>{
    // console.log("BODYY:",req.body)
    db.query("SELECT Uid FROM users WHERE username = ?", [req.body.instructorUsername],(err,result)=>{     
        if(result[0].Uid) 
        { 
            db.query("SELECT Uid FROM users WHERE username = ?", [req.body.student],(err,result1)=>{
                // console.log("res1:",result1)  
                if(result1[0].Uid) 
                {
                    db.query("INSERT INTO studentcoordinatormessage (studentID,coordinatorID,message,unread,senderID) VALUES(?,?,?,?,?)", [result1[0].Uid,result[0].Uid,req.body.message,"true",result[0].Uid],(err,result2)=>{
                        // console.log("res2:",result2)  
                        if(result2) 
                        {
                            res.send(result2)
                        } 
                        else{           
                            res.send({message:"No MSG"})
                        }
                    }); 
                }
            }); 
        }
        else{
            res.send({message:"No User Found"})
        }
    });   
});

//getStudentMessage.php
//api to get messages of student
app.post("/getStudentMessage", (req,res)=>{
    // console.log("BODYY:",req.body)
    db.query("SELECT Uid FROM users WHERE username = ?", [req.body.username],(err,result)=>{  
        // console.log("res0:",result[0].Uid)    
        if(result[0].Uid) 
        { 
            db.query("SELECT message,senderID FROM studentinstructormessage WHERE unread = ? and studentID = ?", ["true",result[0].Uid],(err,result1)=>{ // AND senderID != ?  ,result[0].Uid
                // console.log("res1:",result1)    
                if(result1.length>0) 
                {
                    let messages=[]
                    for (let i = 0; i < result1.length; i++) {
                        db.query("SELECT username FROM users WHERE Uid = ?", [result1[i].senderID],(err,result2)=>{
                            // console.log("res2:",result2)    
                            if(result2) 
                            { 
                                messages.push(result1[i].message+','+result2[0].username)
                                if(i==result1.length-1)
                                {
                                    res.send(messages)
                                }  
                            }
                        });                      
                    } 
                } 
                else{ 
                    console.log("res1:",result1)           
                    res.send({message:"No Messages"})
                }
            }); 
        }
        else{
            res.send({message:"No User Found"})
        }
    });   
});


//getInstructorMessage.php
//api to get messages of instructor
app.post("/getInstructorMessage", (req,res)=>{
    console.log("BODYY:",req.body)
    db.query("SELECT Uid FROM users WHERE username = ?", [req.body.username],(err,result)=>{  
        console.log("res0:",result[0].Uid)    
        if(result[0].Uid) 
        { 
            db.query("SELECT message,senderID FROM studentinstructormessage WHERE unread = ? and instructorID = ?", ["true",result[0].Uid],(err,result1)=>{ // AND senderID != ?  ,result[0].Uid
                console.log("res1:",result1)    
                if(result1.length>0) 
                {
                    let messages=[]
                    for (let i = 0; i < result1.length; i++) {
                        db.query("SELECT username FROM users WHERE Uid = ?", [result1[i].senderID],(err,result2)=>{
                            console.log("res2:",result2)    
                            if(result2) 
                            { 
                                messages.push(result1[i].message+','+result2[0].username)
                                if(i==result1.length-1)
                                {
                                    res.send(messages)
                                }  
                            }
                        });                      
                    } 
                } 
                else{ 
                    console.log("res1:",result1)           
                    res.send({message:"No Messages"})
                }
            }); 
        }
        else{
            res.send({message:"No User Found"})
        }
    });   
});


//getStudentFeedback.php
//api to get messages of student
app.post("/getStudentFeedback", (req,res)=>{
    // console.log("BODYYY:",req.body)
    db.query("SELECT Uid FROM users WHERE username = ?", [req.body.username],(err,result)=>{  
        // console.log("res0:",result[0].Uid)    
        if(result[0].Uid) 
        { 
            db.query("SELECT message,senderID FROM studentcoordinatormessage WHERE unread = ? and studentID = ?", ["true",result[0].Uid],(err,result1)=>{ // AND senderID != ?,result[0].Uid
                // console.log("res1:",result1)    
                if(result1) 
                {
                    let messages=[]
                    for (let i = 0; i < result1.length; i++) {
                        db.query("SELECT username FROM users WHERE Uid = ?", [result1[i].senderID],(err,result2)=>{
                            // console.log("res2:",result2)    
                            if(result2) 
                            { 
                                messages.push(result1[i].message+','+result2[0].username)
                                if(i==result1.length-1)
                                {
                                    res.send(messages)
                                }  
                            }
                        });                      
                    } 
                } 
                else{           
                    res.send({message:"No Messages"})
                }
            }); 
        }
        else{
            res.send({message:"No User Found"})
        }
    });   
});

//getPCFeedback.php
//api to get messages of coordinator
app.post("/getPCFeedback", (req,res)=>{
    // console.log("BODYYY:",req.body)
    db.query("SELECT Uid FROM users WHERE username = ?", [req.body.username],(err,result)=>{  
        // console.log("res0:",result[0].Uid)    
        if(result[0].Uid) 
        { 
            db.query("SELECT message,senderID FROM studentcoordinatormessage WHERE unread = ? and coordinatorID = ?", ["true",result[0].Uid],(err,result1)=>{ // AND senderID != ?,result[0].Uid
                // console.log("res1:",result1)    
                if(result1) 
                {
                    let messages=[]
                    for (let i = 0; i < result1.length; i++) {
                        db.query("SELECT username FROM users WHERE Uid = ?", [result1[i].senderID],(err,result2)=>{
                            // console.log("res2:",result2)    
                            if(result2) 
                            { 
                                messages.push(result1[i].message+','+result2[0].username)
                                if(i==result1.length-1)
                                {
                                    res.send(messages)
                                }  
                            }
                        });                      
                    } 
                } 
                else{           
                    res.send({message:"No Messages"})
                }
            }); 
        }
        else{
            res.send({message:"No User Found"})
        }
    });   
});

//change unread of messages of student and instructor
app.post("/changeUnread", (req,res)=>{
    // console.log("BODYY:",req.body)
    db.query("SELECT Uid FROM users WHERE username = ?", [req.body.username],(err,result)=>{  
        // console.log("res0:",result[0].Uid)    
        if(result[0].Uid) 
        { 
            db.query("UPDATE studentinstructormessage SET unread = ? WHERE senderID != ?", ["false",result[0].Uid],(err,result1)=>{
                // console.log("res1:",result1)    
                if(result1) 
                {
                    res.send(result1)
                } 
                else{           
                    res.send({message:"No Messages"})
                }
            }); 
        }
        else{
            res.send({message:"No User Found"})
        }
    });   
});

//change unread of messages of student and coordinator
app.post("/changeFeedbackUnread", (req,res)=>{
    // console.log("BODYY:",req.body)
    db.query("SELECT Uid FROM users WHERE username = ?", [req.body.username],(err,result)=>{  
        // console.log("res0:",result[0].Uid)    
        if(result[0].Uid) 
        { 
            db.query("UPDATE studentcoordinatormessage SET unread = ? WHERE senderID != ?", ["false",result[0].Uid],(err,result1)=>{
                // console.log("res1:",result1)    
                if(result1) 
                {
                    res.send(result1)
                } 
                else{           
                    res.send({message:"No Messages"})
                }
            }); 
        }
        else{
            res.send({message:"No User Found"})
        }
    });   
});

//addCourse.php
//add new course
app.post("/addCourse", (req,res)=>{
    // console.log("BODYY:",req.body)
    db.query("SELECT Uid FROM users WHERE username = ?", [req.body.username],(err,result)=>{  
        // console.log("res0:",result[0].Uid)    
        if(result[0].Uid) 
        { 
            db.query("INSERT INTO course (courseCode,courseName,instructorID) VALUES(?,?,?)", [req.body.courseCode,req.body.courseName,result[0].Uid],(err,result1)=>{
                // console.log("res1:",result1)    
                if(result1) 
                {
                    res.send(result1)
                } 
                else{           
                    res.send({message:"No Messages"})
                }
            }); 
        }
        else{
            res.send({message:"No User Found"})
        }
    });   
});

//deleteCourse.php
//delete a course
app.post("/deleteCourse", (req,res)=>{
    // console.log("BODYY:",req.body)
    db.query("DELETE FROM course WHERE courseName = ?", [req.body.course],(err,result)=>{  
        // console.log("res0:",result)    
        if(result) 
        { 
           res.send(result) 
        }
        else{
            res.send({message:"No Course Found"})
        }
    });   
});

//createExam.php
//creating a exam
app.post("/createExam", (req,res)=>{
    // console.log("BODYY:",req.body)
    db.query("SELECT Uid FROM users WHERE username = ?", [req.body.username],(err,result)=>{  
        // console.log("res0:",result[0].Uid)    
        if(result[0].Uid) 
        { 
            db.query("SELECT Cid FROM exams WHERE Cid = ?", [req.body.CID],(err,result1)=>{  
                // console.log("res0:",result1[0].Cid)    
                if(result1.length>0) 
                { 
                    //Exam for this course is found. So we Update. 
                    db.query("UPDATE exams SET instructorID = ?,question1 = ?,question2 = ?,question3 = ?,question4 = ?,choices1 = ?,choices2 = ?,choices3 = ?,choices4 = ?,answer1 = ?,answer2 = ?,answer3 = ?,answer4 = ? WHERE Cid = ?", [result[0].Uid,req.body.question1,req.body.question2,req.body.question3,req.body.question4,req.body.options1,req.body.options2,req.body.options3,req.body.options4,req.body.answer1,req.body.answer2,req.body.answer3,req.body.answer4,req.body.CID],(err,result)=>{  
                        // console.log("res1:",result)    
                        if(result) 
                        { 
                            res.send(result) 
                        }
                        else{
                            res.send({message:"Could not create exam"})
                        }
                    }); 
                }
                else{
                    //Exam for this course not found. So we Insert.                     
                    db.query("INSERT INTO exams (Cid,instructorID,question1,question2,question3,question4,choices1,choices2,choices3,choices4,answer1,answer2,answer3,answer4) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [req.body.CID,result[0].Uid,req.body.question1,req.body.question2,req.body.question3,req.body.question4,req.body.options1,req.body.options2,req.body.options3,req.body.options4,req.body.answer1,req.body.answer2,req.body.answer3,req.body.answer4],(err,result)=>{  
                        // console.log("res2:",result)    
                        if(result) 
                        { 
                            res.send(result) 
                        }
                        else{
                            res.send({message:"Could not create exam"})
                        }
                    });
                }
            });   
        }
        else{
            res.send({message:"No User Found"})
        } 
    }); 
});


//createAssessment.php
//creating assessment
app.post("/createAssessment", (req,res)=>{
    // console.log("BODYY:",req.body)
    db.query("SELECT Uid FROM users WHERE username = ?", [req.body.username],(err,result)=>{  
        // console.log("res0:",result[0].Uid)    
        if(result[0].Uid) 
        { 
            db.query("SELECT Cid FROM assessments WHERE Cid = ?", [req.body.CID],(err,result1)=>{      
                if(result1.length>0) 
                { 
                    // console.log("res1:",result1[0].Cid)
                    //assessment for this course is found. So we Update. 
                    db.query("UPDATE assessments SET instructorID = ?,description = ?,totalPoints = ? WHERE Cid = ?", [result[0].Uid,req.body.description,req.body.points,req.body.CID],(err,result)=>{  
                        // console.log("res2:",result)    
                        if(result) 
                        { 
                            res.send(result) 
                        }
                        else{
                            res.send({message:"Could not create assessment"})
                        }
                    }); 
                }
                else{
                    //assessment for this course not found. So we Insert.                     
                    db.query("INSERT INTO assessments (Cid,instructorID,description,totalPoints) VALUES(?,?,?,?)", [req.body.CID,result[0].Uid,req.body.description,req.body.points],(err,result)=>{  
                        // console.log("res3:",result)    
                        if(result) 
                        { 
                            res.send(result) 
                        }
                        else{
                            res.send({message:"Could not create assessment"})
                        }
                    });
                }
            });   
        }
        else{
            res.send({message:"No User Found"})
        } 
    }); 
});

//getExam.php
//getting a exam
app.post("/getExam", (req,res)=>{
    // console.log("BODYY:",req.body)
    db.query("SELECT question1,question2,question3,question4,choices1,choices2,choices3,choices4,answer1,answer2,answer3,answer4 FROM exams WHERE Cid = ?", [req.body.CID],(err,result)=>{  
        // console.log("res0:",result)    
        if(result.length>0) 
        { 
            res.send(result) 
        }
        else{
            res.send({message:"No Exam Found"})
        } 
    }); 
});

//getStudent.php
//getting a student of instructor
app.post("/getStudent", (req,res)=>{
    // console.log("BODYY:",req.body)
    db.query("SELECT Uid FROM users WHERE username = ?", [req.body.username],(err,result)=>{  
        // console.log("res0:",result[0].Uid)    
        if(result[0].Uid) 
        { 
            db.query("SELECT Cid FROM course WHERE instructorID = ?", [result[0].Uid],(err,result1)=>{
                // console.log("res1:",result1)   
                if(result1) 
                {
                    let CIDs=[]
                    result1.map((res2,i)=>(CIDs.push(res2.Cid)))
                    // console.log("CIDS:",CIDs) 
                    let students=[]
                    // for (let i = 0; i < result1.length; i++) {
                        db.query("SELECT username,Cid,Score FROM userscourse AS UC,users AS U WHERE UC.Cid in (?) AND U.Uid=UC.Uid", [CIDs],(err,result2)=>{
                            // console.log("res2:",result2,result2.length)    
                            if(result2) 
                            { 
                                for (let j = 0; j < result2.length; j++) {   
                                    students.push(result2[j])
                                    if(j==result2.length-1)
                                    { 
                                        console.log("ENTERING IF")
                                        res.send(students)
                                    } 
                                }
                            }
                            else{  
                                console.log("ENTERING ELSE")         
                                res.send({message:"No students found for instructor"})
                            }
                        });                      
                    // }  
                } 
                else{           
                    res.send({message:"No Courses found for instructor"})
                }
            }); 
        }
        else{
            res.send({message:"No User Found"})
        }
    });  
});

//getPCStudent.php
//getting a student of PC
app.post("/getPCStudent", (req,res)=>{
    console.log("BODYY:",req.body)
    db.query("SELECT Uid FROM users WHERE username = ?", [req.body.username],(err,result)=>{  
        console.log("res0:",result[0].Uid)    
        if(result[0].Uid) 
        { 
            db.query("SELECT Pid FROM programs WHERE ProgramCoordinator = ?", [result[0].Uid],(err,result1)=>{
                console.log("res1:",result1)   
                if(result1) 
                {
                    db.query("SELECT Cid FROM course WHERE ProgramID = ?", [result1[0].Pid],(err,result2)=>{
                        console.log("res2:",result2)   
                        if(result2) 
                        {
                            let CIDs=[]
                            result2.map((res2,i)=>(CIDs.push(res2.Cid)))
                            console.log("CIDS:",CIDs) 
                            let students=[]
                            db.query("SELECT DISTINCT(username) FROM userscourse AS UC,users AS U WHERE UC.Cid in (?) AND U.Uid=UC.Uid", [CIDs],(err,result3)=>{
                                console.log("res2:",result3,result3.length)    
                                if(result3) 
                                { 
                                    for (let j = 0; j < result3.length; j++) {   
                                        students.push(result3[j])
                                        if(j==result3.length-1)
                                        { 
                                            console.log("ENTERING IF")
                                            res.send(students)
                                        } 
                                    }
                                }
                                else{  
                                    console.log("ENTERING ELSE")         
                                    res.send({message:"No Courses found for instructor"})
                                }
                            });   
                        } 
                        else{           
                            res.send({message:"No Courses found for instructor"})
                        }
                    }); 
                } 
                else{           
                    res.send({message:"No Courses found for instructor"})
                }
            }); 
        }
        else{
            res.send({message:"No User Found"})
        }
    });  
});

// updateGrades.php
//Updating Grades
app.post("/updateGrades", (req,res)=>{
    // console.log("BODYY:",req.body)
    db.query("SELECT Uid FROM users WHERE username = ?", [req.body.student],(err,result)=>{  
        // console.log("res0:",result[0].Uid)    
        if(result[0].Uid) 
        { 
            db.query("UPDATE userscourse SET Grades = ?, Feedback = ? WHERE Uid = ? AND Cid = ?", [req.body.grade,req.body.feedback,result[0].Uid,req.body.Cid],(err,result1)=>{  
                // console.log("res1:",result1.length)    
                if(result1) 
                { 
                    res.send(result1) 
                }
                else{
                    res.send({message:"Error"})
                } 
            }); 
        }
    });
});


//allCourse.php
//get all courses
app.post("/allCourse", (req,res)=>{
    db.query("SELECT courseName FROM course", (err,result1)=>{  
        // console.log("res2:",result1)      
        if(result1) 
        {
            let courseNames=[]
            for (let i = 0; i < result1.length; i++) {   
                courseNames.push(result1[i].courseName)
                // console.log("COURSE:- ",courseNames)
                if(i==result1.length-1)
                {
                    res.send(courseNames)
                }
            }
        }
        else{          
            res.send({message:"No Courses Found"})
        }
    });
});

//allStudents
//getting all students,QA Officer, Coordinator
app.post("/allStudents", (req,res)=>{
    // console.log("BODYY:",req.body)
    db.query("SELECT username FROM users WHERE role = ?", [req.body.role],(err,result)=>{
        // console.log("res:",result)    
        if(result) 
        {
            let students=[]
            for(let i=0;i<result.length;i++)
            {
                students.push(result[i].username)
                if(i==result.length-1)
                {
                    res.send(students)
                }
            }
        } 
        else{           
            res.send({message:"No Students found"})
        }
    });  
});

//addStudent.php
//enrolling a new student,QA Officer, Coordinator
app.post("/addStudent", (req,res)=>{
    // console.log("BODYY:",req.body)
    db.query("INSERT INTO users (email,username,password,role) VALUES(?,?,?,?)", [req.body.studentEmail,req.body.studentName,req.body.studentPassword,req.body.role],(err,result1)=>{
        // console.log("res1:",result1)    
        if(result1) 
        {
            res.send(result1)
        } 
        else{           
            res.send({message:"No Messages"})
        }
    });   
});

//deleteStudent.php
//dropping a student,QA Officer, Coordinator
app.post("/deleteStudent", (req,res)=>{
    // console.log("BODYY:",req.body)
    db.query("DELETE FROM users WHERE username = ? and role = ?", [req.body.student,req.body.role],(err,result)=>{  
        // console.log("res0:",result)    
        if(result) 
        { 
           res.send(result) 
        }
        else{
            res.send({message:"No user Found"})
        }
    });   
});

//getPrograms.php   
//get all programs
app.post("/getPrograms", (req,res)=>{
    db.query("SELECT * FROM programs", (err,result1)=>{  
        // console.log("res2:",result1)      
        if(result1) 
        {
            let programs=[]
            for (let i = 0; i < result1.length; i++) {   
                programs.push(result1[i])
                // console.log("COURSE:- ",courseNames)
                if(i==result1.length-1)
                {
                    res.send(programs)
                }
            }
        }
        else{          
            res.send({message:"No Programs Found"})
        }
    });
});

//getCoordinatorProgram.php
//get only coordinator's program
app.post("/getCoordinatorProgram", (req,res)=>{
    db.query("SELECT Uid FROM users WHERE username = ?", [req.body.username],(err,result)=>{  
        // console.log("res0:",result[0].Uid)    
        if(result[0].Uid) 
        {
            db.query("SELECT * FROM programs WHERE ProgramCoordinator = ?",[result[0].Uid], (err,result1)=>{  
                // console.log("res2:",result1)      
                if(result1) 
                {
                    let programs=[]
                    for (let i = 0; i < result1.length; i++) {   
                        programs.push(result1[i])
                        // console.log("COURSE:- ",courseNames)
                        if(i==result1.length-1)
                        {
                            res.send(programs)
                        }
                    }
                }
                else{          
                    res.send({message:"No Programs Found"})
                }
            });
        }
        else{
            res.send({message:"No User Found"})
        }
    });
});


//addProgram.php
//add new program
app.post("/addProgram", (req,res)=>{
    // console.log("BODYY:",req.body)
    db.query("SELECT Uid FROM users WHERE username = ?", [req.body.username],(err,result)=>{  
        // console.log("res0:",result[0].Uid)    
        if(result[0].Uid) 
        { 
            db.query("INSERT INTO programs (ProgramCode,ProgramName,College) VALUES(?,?,?)", [req.body.ProgramCode,req.body.ProgramName,req.body.College],(err,result1)=>{
                // console.log("res1:",result1)    
                if(result1) 
                {
                    res.send(result1)
                } 
                else{           
                    res.send({message:"No Messages"})
                }
            }); 
        }
        else{
            res.send({message:"No User Found"})
        }
    });   
});


//deleteProgram.php
//delete a program
app.post("/deleteProgram", (req,res)=>{
    // console.log("BODYY:",req.body)
    db.query("DELETE FROM programs WHERE ProgramName = ?", [req.body.ProgramName],(err,result)=>{  
        // console.log("res0:",result)    
        if(result) 
        { 
           res.send(result) 
        }
        else{
            res.send({message:"No Program Found"})
        }
    });   
});


//getProgramObjectives.php
//get all program objectives
app.post("/getProgramObjectives", (req,res)=>{
    db.query("SELECT * FROM programobjectives WHERE Pid = ?",[req.body.PID] ,(err,result1)=>{  
        // console.log("res2:",result1)      
        if(result1) 
        {
            let programObjectives=[]
            for (let i = 0; i < result1.length; i++) {   
                programObjectives.push(result1[i])
                // console.log("programObjectives:- ",programObjectives)
                if(i==result1.length-1)
                {
                    res.send(programObjectives)
                }
            }
        }
        else{          
            res.send({message:"No Programs Found"})
        }
    });
});

//getCoordinatorProgramObjectives
//get coordinator's program objectives
app.post("/getCoordinatorProgramObjectives", (req,res)=>{
    db.query("SELECT Uid FROM users WHERE username = ?", [req.body.username],(err,result)=>{  
        // console.log("res0:",result[0].Uid)    
        if(result[0].Uid) 
        { 
            db.query("SELECT Pid FROM programs WHERE ProgramCoordinator = ?",[result[0].Uid], (err,result1)=>{  
                // console.log("res2:",result1)      
                if(result1) 
                {
                    db.query("SELECT * FROM programobjectives WHERE Pid = ?",[result1[0].Pid] ,(err,result2)=>{  
                        // console.log("res2:",result2)      
                        if(result2) 
                        {
                            let programObjectives=[]
                            for (let i = 0; i < result2.length; i++) {   
                                programObjectives.push(result2[i])
                                // console.log("programObjectives:- ",programObjectives)
                                if(i==result2.length-1)
                                {
                                    res.send(programObjectives)
                                }
                            }
                        }
                        else{          
                            res.send({message:"No Programs Found"})
                        }
                    });
                }
                else{          
                    res.send({message:"No Programs Found"})
                }
            });
        }
        else{
            res.send({message:"No User Found"})
        }
    }); 
});

//addProgramObjective.php
//add new program objective
app.post("/addProgramObjective", (req,res)=>{
    // console.log("BODYY:",req.body)
    db.query("SELECT Uid FROM users WHERE username = ?", [req.body.username],(err,result)=>{  
        // console.log("res0:",result[0].Uid)    
        if(result[0].Uid) 
        { 
            db.query("INSERT INTO programobjectives (Pid,Objective) VALUES(?,?)", [req.body.PID,req.body.Objective],(err,result1)=>{
                // console.log("res1:",result1)    
                if(result1) 
                {
                    res.send(result1)
                } 
                else{           
                    res.send({message:"No Messages"})
                }
            }); 
        }
        else{
            res.send({message:"No User Found"})
        }
    });   
});


//deleteProgramObjective.php
//delete a program objective
app.post("/deleteProgramObjective", (req,res)=>{
    // console.log("BODYY:",req.body)
    db.query("DELETE FROM programobjectives WHERE Objective = ?", [req.body.Objective],(err,result)=>{  
        // console.log("res0:",result)    
        if(result) 
        { 
           res.send(result) 
        }
        else{
            res.send({message:"No Program Found"})
        }
    });   
});

//getAllProgramObjectives
//get all Program Objectives
app.post("/getAllProgramObjectives", (req,res)=>{
    db.query("SELECT Objective FROM programobjectives", (err,result1)=>{  
        // console.log("res2:",result1)      
        if(result1) 
        {
            let objectives=[]
            for (let i = 0; i < result1.length; i++) {   
                objectives.push(result1[i].Objective)
                // console.log("objectives:- ",objectives)
                if(i==result1.length-1)
                {
                    res.send(objectives)
                }
            }
        }
        else{          
            res.send({message:"No Program Objectives Found"})
        }
    });
});

//mapPO.php
//mapping course with PO
app.post("/mapPO", (req,res)=>{
    // console.log("BODYY:",req.body)
    db.query("SELECT Uid FROM users WHERE username = ?", [req.body.username],(err,result)=>{  
        // console.log("res0:",result[0].Uid)    
        if(result[0].Uid) 
        { 
            db.query("UPDATE course SET programObjective = ? WHERE courseName = ?", [req.body.PO,req.body.courseName],(err,result1)=>{
                // console.log("res1:",result1)    
                if(result1) 
                {
                    res.send(result1)
                } 
                else{           
                    res.send({message:"No programObjectives"})
                }
            }); 
        }
        else{
            res.send({message:"No User Found"})
        }
    });   
});

//getAllCourseScores.php
//api to get all the scores of all the course
app.post("/getAllCourseScores", (req,res)=>{
    // console.log("body:",req.body)
    db.query("SELECT Uid FROM users WHERE username = ?", [req.body.username],(err,result)=>{ 
        // console.log("res:",result)      
        if(result[0].Uid) 
        { 
            // console.log("UID:",result[0].Uid)
            db.query("SELECT Cid,Score FROM userscourse", (err,result)=>{  
                // console.log("MAINRES",result)    
                if(result) 
                {
                    let scores=[]
                    for (let i = 0; i < result.length; i++) { 
                        scores.push(result[i].Cid+'&&&'+result[i].Score)
                        if(i==result.length-1)
                        {
                            res.send(scores)
                        }                       
                    } 
                }
                else{          
                    res.send({message:"No Scores Found"})
                }
            });
        } 
        else{           
            res.send({message:"No User Found"})
        }
    });   
});

//courseInstructor.php
//get instructor of a course
app.post("/courseInstructor", (req,res)=>{
    db.query("SELECT instructorID FROM course WHERE Cid = ?",[req.body.CID], (err,result)=>{  
        // console.log("res2:",result)       
            if(result[0].instructorID) 
            {                  
                db.query("SELECT username FROM users WHERE Uid = ?", [result[0].instructorID],(err,result1)=>{ 
                    // console.log("res:",result1)    
                    if(result1) 
                    {
                        res.send(result1)
                    }
                    else{          
                        res.send({message:"No Instructor Found"})
                    }
                });
            }
            else{
                res.send({message:"No User Found"})
            }
    });
});

//allAssessments.php
//get all assessments
app.post("/allAssessments", (req,res)=>{
    db.query("SELECT * FROM assessments", (err,result1)=>{  
        // console.log("res1:",result1)      
        if(result1) 
        {
            let CIDs=[]
            result1.map((res1,i)=>(CIDs.push(res1.Cid)))
            // console.log("CIDS:",CIDs) 
            db.query("SELECT courseName FROM course WHERE Cid in (?)", [CIDs],(err,result2)=>{ 
                // console.log("res2:",result2)   
                if(result2) 
                {
                    let assessments=[]
                    for (let i = 0; i < result1.length; i++) {   
                        assessments.push(result1[i],result2[i])
                        if(i==result1.length-1)
                        {
                            res.send(assessments)
                        }
                    }
                    // console.log("COURSE:- ",assessments)
                }
                else{          
                    res.send({message:"No Courses Found"})
                }
            }); 
        }
        else{          
            res.send({message:"No Courses Found"})
        }
    });
});

//studentInstructor
//get instructor of a student
app.post("/studentInstructor", (req,res)=>{
     db.query("SELECT Uid FROM users WHERE username = ?", [req.body.username],(err,result)=>{ 
        // console.log("res:",result)      
        if(result[0].Uid) 
        { 
            db.query("SELECT Cid FROM userscourse WHERE Uid = ?",[result[0].Uid], (err,result1)=>{  
                // console.log("res1:",result1)       
                    if(result1) 
                    {
                        let CIDs=[]
                        result1.map((res1,i)=>(CIDs.push(res1.Cid)))
                        // console.log("CIDS:",CIDs) 
                        db.query("SELECT DISTINCT(instructorID) FROM course WHERE Cid in (?)", [CIDs],(err,result2)=>{ 
                            // console.log("res2:",result2)    
                            if(result2) 
                            {
                                let instructorIDs=[]
                                result2.map((res1,i)=>(instructorIDs.push(res1.instructorID)))
                                // console.log("CIDS:",instructorIDs) 
                                db.query("SELECT username FROM users WHERE Uid in (?)", [instructorIDs],(err,result3)=>{ 
                                    // console.log("res3:",result3)    
                                    if(result3) 
                                    {
                                        let usernames=[]
                                        result3.map((res1,i)=>(usernames.push(res1.username)))
                                        res.send(usernames)
                                    }
                                    else{          
                                        res.send({message:"No Instructor Found"})
                                    }
                                });
                            }
                            else{          
                                res.send({message:"No Instructor Found"})
                            }
                        });
                    }
                    else{
                        res.send({message:"No User Found"})
                    }
            }); 
        }
        else{           
            res.send({message:"No User Found"})
        }
    });
});

//START
//studentCoordinator.php
//get coordinator of a student
app.post("/studentCoordinator", (req,res)=>{
    db.query("SELECT Uid FROM users WHERE username = ?", [req.body.username],(err,result)=>{ 
       console.log("res:",result)      
       if(result[0].Uid) 
       { 
           db.query("SELECT Cid FROM userscourse WHERE Uid = ?",[result[0].Uid], (err,result1)=>{  
               console.log("res1:",result1)       
                   if(result1.length>0) 
                   {
                       let CIDs=[]
                       result1.map((res1,i)=>(CIDs.push(res1.Cid)))
                       console.log("CIDS:",CIDs) 
                       db.query("SELECT DISTINCT(ProgramID) FROM course WHERE Cid in (?)", [CIDs],(err,result2)=>{ 
                           console.log("res2:",result2)    
                           if(result2.length>0) 
                           {
                            db.query("SELECT ProgramCoordinator FROM programs WHERE Pid = ?", [result2[0].ProgramID],(err,result3)=>{ 
                                console.log("res3:",result3)    
                                if(result3.length>0) 
                                { 
                                    db.query("SELECT username FROM users WHERE Uid in (?)", [result3[0].ProgramCoordinator],(err,result4)=>{ 
                                        console.log("res4:",result4)    
                                        if(result4.length>0) 
                                        {
                                            let usernames=[]
                                            result4.map((res1,i)=>(usernames.push(res1.username)))
                                            res.send(usernames)
                                        }
                                        else{          
                                            res.send({message:"No Coordinator Found"})
                                        }
                                    });
                                }
                                else{          
                                    res.send({message:"No Coordinator Found"})
                                }
                            });
                        }
                        else{          
                            res.send({message:"No Coordinator Found"})
                        }
                    });
                }
                else{
                    res.send({message:"No User Found"})
                }
           }); 
       }
       else{           
           res.send({message:"No User Found"})
       }
   });
});

app.listen(3001,()=>{
    console.log("LISTENINGG")
})