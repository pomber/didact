import { createElement, Component } from 'didact';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

export default class TodoItem extends Component {
	handleSubmit = () => {
		let { onSave, onDestroy, todo } = this.props,
			val = this.state.editText.trim();
		if (val) {
			onSave(todo, val);
			this.setState({ editText: val });
		}
		else {
			onDestroy(todo);
		}
	};

	handleEdit = () => {
		let { onEdit, todo } = this.props;
		onEdit(todo);
		this.setState({ editText: todo.title });
	};

	toggle = e => {
		let { onToggle, todo } = this.props;
		onToggle(todo);
		e.preventDefault();
	};

	handleKeyDown = e => {
		if (e.which===ESCAPE_KEY) {
			let { todo } = this.props;
			this.setState({ editText: todo.title });
			this.props.onCancel(todo);
		}
		else if (e.which===ENTER_KEY) {
			this.handleSubmit();
		}
	};
	
	handleDestroy = () => {
		this.props.onDestroy(this.props.todo);
	};
	
	updateEditText = e => {
		this.setState({ editText: e.target.value });
	};

	// shouldComponentUpdate({ todo, editing, editText }) {
	// 	return (
	// 		todo !== this.props.todo ||
	// 		editing !== this.props.editing ||
	// 		editText !== this.state.editText
	// 	);
	// }

	componentDidUpdate() {
		let node = this.base && this.base.querySelector('.edit');
		if (node) node.focus();
	}

	render() {
		let { todo:{ title, completed }, onToggle, onDestroy, editing } = this.props;
		let { editText } = this.state;
		let className = completed ? "completed" : "";
		className += editing ? " editing" : "";

		return (
			<li className={className}>
				<div className="view">
					<input
						className="toggle"
						type="checkbox"
						checked={completed}
						onChange={this.toggle}
					/>
					<label onDblClick={this.handleEdit}>{title}</label>
					<button className="destroy" onClick={this.handleDestroy} />
				</div>
				{ editing && (
					<input
						className="edit"
						value={editText}
						onBlur={this.handleSubmit}
						onInput={this.updateEditText}
						onKeyDown={this.handleKeyDown}
					/>
				) }
			</li>
		);
	}
}
