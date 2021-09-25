import React, { useState, useEffect } from "react";
const url = "https://assets.breatheco.de/apis/fake/todos/user/kiddopro";
//create your first component
const Home = () => {
	const [task, setTask] = useState("");
	const [tasksList, setTasksList] = useState([]);

	function addTask() {
		if (task != "") {
			let taskFormat = {
				label: task,
				done: false
			};
			setTasksList([...tasksList, taskFormat]);
			postTask();
		}
	}

	function deleteTask(indice) {
		let result = [];
		result = tasksList.filter((tarea, index) => index !== indice);
		setTasksList(result);
	}

	function keyHandler(key) {
		if (key == "Enter") {
			addTask();
			setTask("");
		}
	}

	// fetch

	function postTask() {
		fetch(url, {
			method: "PUT",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(tasksList)
		})
			.then(res => res.json())
			.then(data => {})
			.catch(err => console.log(err));
	}

	function getAllTasks() {
		fetch(url)
			.then(res => res.json())
			.then(response => {
				setTasksList(response);
			})
			.catch(err => console.log(err));
	}

	useEffect(() => {
		getAllTasks();
	}, []);

	return (
		<>
			<div className="text-left mt-5 mx-auto w-50 bg-light p-1 border">
				<div className="taskContainer">
					<h1 className="text-center">todos</h1>
					<input
						type="text"
						className="form-control border-0"
						value={task.label}
						onChange={e => setTask(e.target.value)}
						onKeyPress={a => keyHandler(a.key)}
						placeholder="What do you need to be done?"
					/>
					<ul>
						{tasksList.map((item, index) => {
							return (
								<li key={index} className="form-control items">
									{item.label}
									<span onClick={() => deleteTask(index)}>
										✖️
									</span>
								</li>
							);
						})}
					</ul>
				</div>
				<div>
					<small>{tasksList.length} remaining </small>
				</div>
			</div>
			<div
				className="bg-light mx-auto border border-top-0"
				style={{ width: "49%", height: "5px" }}></div>
			<div
				className="bg-light mx-auto border border-top-0"
				style={{ width: "48%", height: "5px" }}></div>
		</>
	);
};

export default Home;
