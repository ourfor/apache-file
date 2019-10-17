// 默认导入 React, React.Component as Component, ReactDOM, JQuery as $, loadsh as _
import './sass/main.scss';
import fileMap from './data/fileMap.json';
import folderMap from './data/folderMap.json';
import langMap from './data/langMap.json';

let data = {
	path: '/Desktop',
	pathNew: '/Desktop'
}

class Index extends Component {

	constructor(props){
		super(props);
		this.state = {
			now: new Date(),
			isLoaded: false,
			ul: React.createRef(),
			path: '',
		};
	}

	componentWillMount(){
		console.log("will");
		let path = data.path;
		$.post('/dir',{path},data => {
			this.setState({
				isLoaded: true,
				files: data.children,
			});
		},'json')
	}

	componentWillUpdate(){
		let path = data.pathNew;
		console.log(path);
		if(path!==undefined&&path!==data.path){
			$.post('/dir',{path},data => {
				this.setState({
					files: data.children,
				});
				data.path = this.data.base;
				console.log(data);
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
		
		console.log(this.data);
		let pathNew = `${data.path}/${path}`;
		data.pathNew = pathNew;
		this.setState({
			pathNew
		});

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
