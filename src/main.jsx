// 默认导入 React, React.Component as Component, ReactDOM, JQuery as $, loadsh as _
import './sass/main.scss';
import fileMap from './data/fileMap.json';
import folderMap from './data/folderMap.json';
import langMap from './data/langMap.json';

import {createStore} from 'redux';

function filePath(state = {path: '/Desktop',newPath: '/Desktop'},action){
	console.log(state);
	switch(action.type){
		case 'update':
			return state.path + action.path;
		case 'uplevel':
			return state.path + "/..";
		default:
			return state.path
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
			path: '/Desktop',
			pathNew: '/Desktop'
		};
	}

	updatePath(path){
		this.setState(state => {
			return {pathNew: path};
		});
	}

	stop(path){
		this.setState(state => {
			return {path}
		});
	}

	componentWillMount(){
		let path = this.state.path;
		console.log(path);
		console.log("will");
		$.post('/dir',{path},data => {
			this.setState({
				isLoaded: true,
				files: data.children,
			});
		},'json')
	}

	componentWillUpdate(){
		let path = store.getState();
		if(path!==undefined&&path!==this.state.path){
			$.post('/dir',{path},data => {
				this.setState({
					files: data.children,
				});
				this.stop(data.base)
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
		store.dispatch({type: 'update',path: `/${path}`,})
		console.log(store.getState());

		// this.setState({
		// 	isLoaded: false
		// })

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
