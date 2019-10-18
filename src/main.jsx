// 默认导入 React, React.Component as Component, ReactDOM, JQuery as $, loadsh as _
import './sass/main.scss';
import fileMap from './data/fileMap.json';
import folderMap from './data/folderMap.json';
import langMap from './data/langMap.json';

import {createStore} from 'redux';

function filePath(
	state = {
				path: '/Desktop',
				newPath: '/Desktop',
				uplevel: [] 
			},action){
    let uplevel;
	switch(action.type){
		case 'update':
			uplevel = state.uplevel;
			uplevel.push(state.path);
			return {path: state.path,newPath: `${state.path}/${action.path}`,uplevel};
		case 'uplevel':
			uplevel = state.uplevel;
			let newPath = uplevel.pop();
			return {path: state.path,newPath ,uplevel};
		case 'stop': 
			uplevel = state.uplevel;
			return {path: state.newPath,newPath: state.newPath,uplevel};
		default:
			return state;
	}
}

let store = createStore(filePath);

class Index extends Component {

	constructor(props){
		super(props);
		this.state = {
			now: new Date(),
			isLoaded: false,
			ul: React.createRef(),
		};
	}

	componentWillMount(){
		let path = store.getState().path;
		$.post('/dir',{path},data => {
			this.setState({
				isLoaded: true,
				files: data.children,
			});
		},'json')
	}

	componentWillUpdate(){
		let state = store.getState();
		if(state.path !== state.newPath){
			let path = state.newPath;
			store.dispatch({type: 'stop'})
			$.post('/dir',{path},data => {
				this.setState({
					files: data.children,
					isLoaded: true,
				});
				
			},'json')
		}
				
	}

	componentDidMount(){
	}

	click = e => {
		let $dom = $(e.target);
		let path = $dom.data('path');
		if(path===undefined){
			path = $dom.parent().data('path');
			if(path===undefined) {
				path = $dom.parent().parent().data('path');
			}
		}
		if(path==='..') {
			store.dispatch({type: 'uplevel'});
		}
		else {
			store.dispatch({type: 'update',path,})
		}
		

		this.setState({
			isLoaded: false
		})

		e.cancelBubble = true;
		e.stopPropagation();
		
	}
	
	render(){
		let list;
		if(this.state.isLoaded){
			list = this.state.files.map((v,i) => {
				let name = v.name;
				let type = v.type===1?fileMap[name.substring(name.lastIndexOf('.')+1)]:folderMap[name];
				if(!type){
					type = v.type===1?'file':'folder';
				}
				return (
					<li key={`file-${i}`} data-path={name} onClick={this.click}>
						<span><img className="icon" src={`https://file.ourfor.top/source/blog/icons/${type}.svg`} /></span>
						<span className="name">{name}</span>
					</li>
				);
			});
			if(store.getState().uplevel.length !== 0){
				list.unshift((
					<li key={`file-uplevel`} data-path='..' onClick={this.click}>
						<span><img className="icon" src={`https://file.ourfor.top/source/blog/icons/folder-shared-open.svg`} /></span>
						<span className="name">uplevel</span>
					</li>
				));
			}
			
		}
		return (
		<>
			<h1>Hello React, (๑′ᴗ‵๑)Ｉ Lᵒᵛᵉᵧₒᵤ❤</h1>
			<div className="file-list">
				<ul className="file-list">
					{list}
				</ul>
			</div>
		</>
		)
	}
}

ReactDOM.render(<Index />,$('#main')[0]);
