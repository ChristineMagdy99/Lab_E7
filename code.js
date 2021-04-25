const express = require('express');
const app = express();
const crypto = require('crypto');
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
const Joi = require('joi');

const students = [

];
const courses = [
];


app.get('/api/courses',(req,res)=>{res.send(courses);});          //read courses
app.get('/api/courses/:id',(req,res)=>{
    //search for course
   const course = courses.find(c=>c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The requested course is not present');
    else res.send(course);
});

app.get('/web/courses/create',(req,res)=>{
    res.sendFile(path.join(__dirname + '/course.html'));
});

app.post('/web/courses/create',(req,res)=>{
    id = courses.length + 1,
    name_in = req.body.name,
    code_in = req.body.code,
    description_in = req.body.description
    var course = {};
    course.name = name_in;
    course.id = id;
    course.code = code_in;
    course.description = description_in;
    courses.push(course);
    res.send(course);
});


app.post('/api/courses',(req,res)=>{                //create courses
    //entry validation
    const schema = Joi.object().keys({
        name: Joi.string().min(5).required(),
        code: Joi.string().regex(/^[a-zA-Z]{3}[0-9]{3}$/).required(),
        description: Joi.string().max(200)
    });
    const result = schema.validate(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name,
        code: req.body.code,
        description: req.body.description
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id',(req,res)=>{       //update courses
    //search for course
    const course = courses.find(c=>c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The requested course is not present');

    const schema = Joi.object().keys({
        name: Joi.string().min(5).required(),
        code: Joi.string().regex(/^[a-zA-Z]{3}[0-9]{3}$/).required(),
        description: Joi.string().max(200)
    });
    const result = schema.validate(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    //update course entry
    course.code = req.body.code;
    course.name = req.body.name;
    course.description = req.body.description;
    res.send(course);
});
app.delete('/api/courses/:id',(req,res)=>{               //delete courses
    //search for course
    const course = courses.find(c=>c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The requested course is not present');

    //if course was found, delete course entry
    const index = courses.indexOf(course);
    courses.splice(index,1)

    //return the deleted course entry
    res.send(course);
});

///////////////////////////student apis

app.get('/api/students',(req,res)=>{res.send(students);});          //read student
app.get('/api/students/:id',(req,res)=>{
    //search for student
   const student = students.find(c=>c.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('The requested student is not present');
    else res.send(student);
});

app.get('/web/students/create',(req,res)=>{
    res.sendFile(path.join(__dirname + '/student.html'));
});

app.post('/api/students',(req,res)=>{                //create student
    //entry validation
    const schema = Joi.object().keys({
        name: Joi.string().regex(/^[a-zA-Z_,]*$/).required(),
        code: Joi.string().regex(/^[a-zA-Z0-9]{7}$/).required()
    });
    const result = schema.validate(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const student = {
        id: students.length + 1,
        name: req.body.name,
        code: req.body.code,
    };
    students.push(student);
    res.send(student);
});

app.post('/web/students/create',(req,res)=>{
    id = courses.length + 1,
    name_in = req.body.name,
    code_in = req.body.code
    var student = new(Object);
    student.name = name_in;
    student.id = id;
    student.code = code_in;  
    students.push(student);  
    res.send(student);
});


app.put('/api/students/:id',(req,res)=>{       //update student
    //search for course
    const student = students.find(c=>c.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('The requested student is not present');

    const schema = Joi.object().keys({
        name: Joi.string().regex(/^[a-zA-Z_,]*$/).required(),
        code: Joi.string().regex(/^[a-zA-Z0-9]{7}$/).required()

    });
    const result = schema.validate(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    //update student entry
    student.code = req.body.code;
    student.name = req.body.name;
    student.description = req.body.description;
    res.send(student);
});
app.delete('/api/students/:id',(req,res)=>{               //delete students
    //search for student
    const student = students.find(c=>c.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('The requested student is not present');

    //if student was found, delete entry
    const index = students.indexOf(student);
    students.splice(index,1)

    //return the deleted student entry
    res.send(student);
});


//const port = process.env.PORT;
app.listen(3000,console.log('Listening on port 3000'));