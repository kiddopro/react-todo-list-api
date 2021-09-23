import React, { useState } from "react";

//create your first component
const Home = () => {
	const [task, setTask] = useState("");
	const [tasksList, setTasksList] = useState([]);

	function addTask() {
		if (task != "") {
			setTasksList([...tasksList, task]);
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

	return (
		<div className="text-left mt-5 mx-auto w-50 bg-light p-1">
			<div className="taskContainer">
				<h1 className="text-center">todos</h1>
				<input
					type="text"
					className="form-control border-0"
					value={task}
					onChange={e => setTask(e.target.value)}
					onKeyPress={a => keyHandler(a.key)}
					placeholder="What do you need to be done?"
				/>
				<ul>
					{tasksList.map((item, index) => {
						return (
							<li key={index} className="form-control items">
								{item}
								<span onClick={() => deleteTask(index)}>
									❌
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
	);
};

export default Home;
