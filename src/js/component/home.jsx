import React, { useState } from "react";

//create your first component
const Home = () => {


	const url = "https://assets.breatheco.de/apis/fake/todos/user";
	const PUT = {
		method: 'PUT',
		body: JSON.stringify(todos),
		headers: {
			"Content-type": "application/json"
		}
	}
	const GET = {
		method: 'GET',
		body: JSON.stringify(todos),
		headers: {
			"Content-type": "application/json"
		}
	}

	const POST = {
		method: 'POST',
		body: JSON.stringify(todos),
		headers: {
			"Content-type": "application/json"
		}
	}

	const DELETE = {
		method: 'DELETE',
		body: JSON.stringify(todos),
		headers: {
			"Content-type": "application/json"
		}
	}


	const [task, setTask] = useState("");
	const [tasksList, setTasksList] = useState([]);

	function addTask() {
		setTasksList([...tasksList, task]);
	}


	const getTodoList = async () => {
		return await (await fetch(url)).json;
	}

	function deleteTask(index) {
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
		<div className="text-left mt-5 mx-auto w-50">
			<div className="taskContainer">
				<h1 className="text-center">todos</h1>
				<input
					type="text"
					className="form-control"
					value={task}
					onChange={e => setTask(e.target.value)}
					onKeyPress={a => keyHandler(a.key)}
					placeholder="What do you need to be done?"
				/>
				<ul>
					{tasksList.map((item, index) => {
						return (
							<li key={index}>
								{item}
								<span onClick={()=>deleteTask(index)}>❌</span>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default Home;
