const express=require("express");
const {
	createPosts,
	deletePost,
	getPost,
	getPostBySearch,
	getPosts,
	likePost,
	updatePost,
	commentPost,
} =require('../controlllers/posts.js')
const auth=require('../middleware/auth.js');
const {signin,signup,UpdateProfile} =require('../controlllers/users.js');

const router = express.Router();


router.post('/signin',signin);
router.post('/signup',signup);
router.post("/updateProfile",auth,UpdateProfile)

router.get('/search', getPostBySearch);
router.get('/:id', getPost);
router.get('/', getPosts);
router.post('/', auth, createPosts);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likeCount', auth, likePost);
router.post('/:id/commentPost', auth, commentPost);

module.exports=router;
