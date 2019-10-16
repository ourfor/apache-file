// 默认导入 React, React.Component as Component, ReactDOM, JQuery as $, loadsh as _
import './sass/main.scss';

class Index extends Component {

	constructor(props){
		super(props);
		this.state = {
			now: new Date()
		};
	}

	componentDidMount(){
		setInterval(() => {
			this.setState({
				now: new Date()
			})
		},1000)
	}
	
	render(){
		return (
		<>
			<h1>Hello React, (๑′ᴗ‵๑)Ｉ Lᵒᵛᵉᵧₒᵤ❤</h1>
			<div>{this.state.now.toLocaleTimeString()}</div>
		</>
		)
	}
}

ReactDOM.render(<Index />,$('#main')[0]);
