const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken');
const User=require('../models/user.js');

exports.signin = async (req, res) => {
	const { email, password } = req.body;

	

	try {
		const existingUser = await User.findOne({ email });
		if (!existingUser)
			return res.status(404).json({ message: "User doesn't exist." });
		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		);

		if (!isPasswordCorrect)
			return res.status(400).json({ message: 'Invalid credentials!' });
		const token = jwt.sign(
			{ email: existingUser.email, id: existingUser._id },
			'jwtscreat',
			{ expiresIn: '360000000000' }
		);
		res.status(200).json({ result: existingUser, token });
	
	} catch (err) {
		res.status(500).json({ message: 'Something went wrong !' });
	}
};

exports.signup = async (req, res) => {
	const { email, password, confirmPassword, firstName, lastName } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser)
			return res.status(404).json({ message: 'User already exists !' });

		if (password !== confirmPassword)
			return res
				.status(404)
				.json({ message: "Password doesn't exits !" });
		const hashedPassword = await bcrypt.hash(password, 12);
		const result = await User.create({
			email,
			password: hashedPassword,
			name: `${firstName} ${lastName}`,
		});

		const token = jwt.sign(
			{ email: result.email, id: result._id },
			'jwtscreat',
			{ expiresIn: '360000000000' }
		);
		res.status(200).json({ result, token });
	} catch (err) {
		res.status(500).json({ message: 'Something went wrong !' });
	}
};

exports.UpdateProfile=async (req,res)=>{
    const UserId=req.headers.userId;
	const {email,firstName,lastName}=req.body;
	const hashedPassword = await bcrypt.hash(req.body.password, 12);
	const result = await User.create({
		email,
		password: hashedPassword,
		name: `${firstName} ${lastName}`,
	});
    

    const data= await User.updateOne({"_id":UserId},{$set:result},{upsert:true});
        if(!data){
            res.status(404).json({"status":"Fail","data":"Not a valid Username! "});
        }else{
            res.status(200).json({"status":"success","data":data})
        }


}