const fs = require("fs");

const blogFile = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/blog.json`)
);

exports.checkID = (req, res, next, val) => {
    const blog = blogFile.find(el => el.id === req.params.id * 1);
    if(blog === undefined){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }
    /*if(req.params.id * 1 > blogFile.length){ // you can use this if you have a proper id value sorting
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }*/
    next();
}

exports.checkBody = (req, res, next) => {
    if(!req.body.name || !req.body.price || !req.body.description || !req.body.date){
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name or price or description or date'
        });
    }
    next();
}

exports.getAllBlogs = (req,res)=>{
    res.status(200).json({
        status : 'success',
        results: blogFile.length,
        data: {
            blogs:blogFile
        }
    });
}

exports.getOneBlog = (req,res)=>{
    const id = req.params.id * 1; // it will convert the string to number automatically
    const blog = blogFile.find(el => el.id === id); // it will create an array and comparison & return true or false   
    res.status(200).json({
        status : 'success',
        data: {
            blog
        }
    });
}

exports.createBlog = (req,res)=>{
    const newId = blogFile[blogFile.length - 1].id + 1;
    const newBlog = Object.assign({id : newId}, req.body); // it will assign the new object

    blogFile.push(newBlog);
     //JSON.stringify(blogFile, null,2) => will beautify json output
    fs.writeFile(`${__dirname}/../data/blog.json`, JSON.stringify(blogFile, null,2), err => {
        res.status(201).json({
            status:"sucess",
            data:{
                blog:newBlog
            }
        });
    });
}

exports.updateBlog = (req,res)=>{
    id = req.params.id * 1;
    upVals = req.body;
    for (var i = 0; i < blogFile.length; i++) {
        if(blogFile[i].id === id){
            blogFile[i].name = upVals.name;             
            blogFile[i].price = upVals.price;
            blogFile[i].description = upVals.description;
            blogFile[i].date = upVals.date;
             break; 
        }
     }
     //JSON.stringify(blogFile, null,2) => will beautify json output
     fs.writeFile(`${__dirname}/../data/blog.json`, JSON.stringify(blogFile, null,2), err => {
        res.status(201).json({
            status:"sucess",
            data:{
                blog:blogFile
            }
        });
    });
}

exports.deleteBlog = (req,res)=>{
    id = req.params.id * 1;
     const blogRemoved = blogFile.filter((el) => {
        return el.id !== id;
    });
    //JSON.stringify(blogRemoved, null,2) => will beautify json output
    fs.writeFile(`${__dirname}/../data/blog.json`, JSON.stringify(blogRemoved, null,2), err => {
        res.status(201).json({
            status:"sucess",
            data:null
        });
    });
}