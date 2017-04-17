import { createElement, Component } from 'didact';
import { pluralize } from './util';

export default class TodoFooter extends Component {
	render() {
		let { nowShowing, count, completedCount, onClearCompleted } = this.props;
		return (
			<footer className="footer">
				<span className="todo-count">
					<strong>{count}</strong> {pluralize(count, 'item')} left
				</span>
				<ul className="filters">
					<li>
						<a href="#/" className={nowShowing=='all' && 'selected'}>All</a>
					</li>
					{' '}
					<li>
						<a href="#/active" className={nowShowing=='active' && 'selected'}>Active</a>
					</li>
					{' '}
					<li>
						<a href="#/completed" className={nowShowing=='completed' && 'selected'}>Completed</a>
					</li>
				</ul>
				{ completedCount > 0 && (
					<button className="clear-completed" onClick={onClearCompleted}>
						Clear completed
					</button>
				) }
			</footer>
		);
	}
}
