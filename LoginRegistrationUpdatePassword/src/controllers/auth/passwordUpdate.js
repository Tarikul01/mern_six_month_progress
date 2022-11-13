const bcrypt = require('bcryptjs');
const User = require('../../models/user');

const passwordUpdate = async (req, res) => {
	try {
		const { userId } = req.params;
		const hashPassword = await bcrypt.hash(req.body.password, 10);
		const userPassword = await User.findByIdAndUpdate(
			{ _id: userId },
			{ password: hashPassword },
			{ new: true }
		);

		return res.status(200).json({ status: 'Success', data: userPassword });
	} catch (error) {
		return res
			.status(404)
			.json({ status: false, error: 'Error occoured !' });
	}
};

module.exports = passwordUpdate;
