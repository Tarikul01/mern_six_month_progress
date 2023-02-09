const mongoose=require("mongoose");
const PostMessage=require('../models/postMessage.js');


exports.getPost=async (req,res)=>{
    const {id}=req.params;
    try {
        const post=await PostMessage.findById(id);
        res.status(200).json(post);
        
    } catch (err) {
        res.status(404).json({message:err.message});
        
    }

}
exports.getPosts=async (req,res)=>{
    const {page}=req.query;
    try {
        const LIMIT=8;
        const startIndex=(Number(page)-1)*LIMIT;//get the starting index of every  page
        const total=await PostMessage.countDocuments({});
        const posts=await PostMessage.find().sort({_id:-1}).limit(LIMIT).skip(startIndex);

        // const postMessage=await PostMessage.find();
        // res.status(200).json(postMessage);
        res.status(200).json({data:posts,currentPage:Number(page),numberOfPage:Math.ceil(total/LIMIT)});
        
    } catch (err) {
        res.status(404).json({message:err.message});
        
    }
   
}

// QUERY->/posts?page=1 ->page=1
// PARAMS->/posts/:id  /posts/123 ->123 
exports.getPostBySearch=async (req,res)=>{
    
    const {searchQuery,tags}=req.query;
 

    
    try {
         const title= new RegExp(searchQuery,'i');  
         const posts=await PostMessage.find(({$or:[{title},{tags:{$in:tags.split(',')}}]}));
         res.json({data:posts})
    } catch (error) {
     res.status(404).json({message:error.message});
    // res.status(200).json({searchQuery})

        
    }
}
exports.createPosts=async(req,res)=>{
    const post=req.body;
    const  newPost= new PostMessage({...post,creator:req.userId,createAt:new Date().toISOString()});
    try {
        await newPost.save();

        res.status(201).json(newPost)
        
    } catch (err) {
        res.status(409).json({message:err.message});
        
    }
    
}
exports.updatePost=async (req,res)=>{
    const {id:_id}=req.params;
    const post=req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatePost= await PostMessage.findByIdAndUpdate(_id,{...post,_id},{new:true});
    res.json(updatePost);
}

exports.deletePost=async (req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const deletePost= await PostMessage.findByIdAndRemove(id);
    if(deletePost){
        res.json({message:"Post deleted successfully !"});
    }else{
        res.json({message:"Post not deleted!"})

    }
}

exports.likePost=async(req,res)=>{
    const {id}=req.params;
    if(!req.userId) return res.json(({message:'Unauthenticated !'}));
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');


    const post=await PostMessage.findById(id);

    const index=post.likes.findIndex((id)=> id===String(req.userId));
    if(index===-1){
        // Like the post 
        post.likes.push(req.userId);
    }else{
        // dislike the post 
        post.likes=post.likes.filter((id)=>id !==String(req.userId))
    }
    // const updatePost= await PostMessage.findByIdAndUpdate(id,{likeCount: post.likeCount+1},{new:true});
    const updatePost= await PostMessage.findByIdAndUpdate(id, post,{new:true});
    res.json(updatePost);

}
exports.commentPost=async(req,res)=>{
    const {id}=req.params;
    const {value}=req.body;
    const post=await PostMessage.findById(id);
    post.comments.push(value);
    const updatedPost=await PostMessage.findByIdAndUpdate(id,post,{new:true});
    res.json(updatedPost)
}