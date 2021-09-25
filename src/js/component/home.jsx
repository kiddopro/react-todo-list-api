import React, { useState, useEffect } from "react";
const url = "https://assets.breatheco.de/apis/fake/todos/user/kiddopro";
//create your first component
const Home = () => {
	// state
	// const [task, setTask] = useState("");
	const [task, setTask] = useState({ label: "", done: null });
	const [tasksList, setTasksList] = useState([]);

	function addTask() {
		if (task.label != "") {
			setTasksList([...tasksList, task]);
			postTaskAPI();
		}
	}

	function deleteTask(indice) {
		let result = [];
		result = tasksList.filter((tarea, index) => index !== indice);
		setTasksList(result);
		deleteTaskAPI();
	}

	function keyHandler(key) {
		if (key == "Enter") {
			addTask();
			// setTask("");
		}
	}

	// fetch

	async function postTaskAPI() {
		const resp = await fetch(url, {
			method: "PUT",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(tasksList)
		});

		console.log(resp.status);
		if (resp.status == 200) {
			setTask({ label: "" });
		}
	}

	async function deleteTaskAPI() {
		const resp = await fetch(url, {
			method: "PUT",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(tasksList)
		});

		console.log(resp.status);
	}

	function getAllTasksAPI() {
		fetch(url)
			.then(res => res.json())
			.then(response => {
				setTasksList(response);
			})
			.catch(err => console.log(err));
	}

	useEffect(() => {
		getAllTasksAPI();
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
						onChange={e =>
							setTask({ label: e.target.value, done: false })
						}
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
