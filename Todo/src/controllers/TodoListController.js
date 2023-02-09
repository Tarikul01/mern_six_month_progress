const TodoListModel = require('../models/ToDoListModel');

exports.CreateTodo = async (req, res) => {
	const username = req.headers.username;
	const body = req.body;
	const data = {
		UserName: username,
		TodoSubject: body.TodoSubject,
		TodoDescription: body.TodoDescription,
		TodoStatus: 'new',
		TodoCreateDate: Date.now(),
		TodoUpdateDate: Date.now(),
	};

	TodoListModel.create(data, (err, data) => {
		if (err) {
			res.status(404).json({
				status: 'Fail',
				data: 'Registerd Failed !',
			});
		} else {
			res.status(200).json({ status: 'success', data: data });
		}
	});
};

exports.SelectTodo = async (req, res) => {
	const UserName = req.headers.username;

	const data = await TodoListModel.findOne({ UserName: UserName });
	if (!data) {
		res.status(404).json({
			status: 'Fail',
			data: 'Not a valid Username! ',
		});
	} else {
		res.status(200).json({ status: 'success', data: data });
	}
};

exports.UpdateTodo = async (req, res) => {
	const body = req.body;
	const TodoData = {
		TodoSubject: body.TodoSubject,
		TodoDescription: body.TodoDescription,
		TodoUpdateDate: Date.now(),
	};

	const data = await TodoListModel.updateOne(
		{ _id: body._id },
		{ $set: TodoData },
		{ upsert: true }
	);
	if (!data) {
		res.status(404).json({
			status: 'Fail',
			data: 'Not a valid Username! ',
		});
	} else {
		res.status(200).json({ status: 'success', data: data });
	}
};

exports.UpdateStatus = async (req, res) => {
	const body = req.body;
	const TodoData = {
		TodoStatus: body.TodoStatus,
		TodoUpdateDate: Date.now(),
	};

	const data = await TodoListModel.updateOne(
		{ _id: body._id },
		{ $set: TodoData },
		{ upsert: true }
	);
	if (!data) {
		res.status(404).json({
			status: 'Fail',
			data: 'Not a valid Username! ',
		});
	} else {
		res.status(200).json({ status: 'success', data: data });
	}
};
exports.DeleteTodo = async (req, res) => {
	const body = req.body;

	const data = await TodoListModel.remove({ _id: body._id });
	if (!data) {
		res.status(404).json({
			status: 'Fail',
			data: 'Not a valid Username! ',
		});
	} else {
		res.status(200).json({ status: 'success', data: data });
	}
};
exports.SelectToDoByStatus = async (req, res) => {
	const body = req.body;

	const data = await TodoListModel.find({
		UserName: req.headers.username,
		TodoStatus: body.TodoStatus,
	});
	if (!data) {
		res.status(404).json({
			status: 'Fail',
			data: 'Not a valid Username! ',
		});
	} else {
		res.status(200).json({ status: 'success', data: data });
	}
};
exports.SelectToDoByDate = async (req, res) => {
	const body = req.body;

	const data = await TodoListModel.find({
		UserName: req.headers.username,
		TodoCreateDate: {
			$gte: new Date(body.FormDate),
			$lte: new Date(body.ToDate),
		},
	});
	if (!data) {
		res.status(404).json({
			status: 'Fail',
			data: 'Not a valid Username! ',
		});
	} else {
		res.status(200).json({ status: 'success', data: data });
	}
};
