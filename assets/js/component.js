var React = require('react')

export default class Component extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            logged_in: false,
            loading: false
        }
    }

    componentDidMount(){
        fetch('/test')
        .then(response => response.json())
        .then(response => {
            if(response.ok){
                this.setState({logged_in: true, loading: false})
            } else {
                this.setState({loading: false})
            }
        })
    }

    render(){
        const items = this.props.todo_list.map((item, index) =>
            <li key={index}>{item.description}</li>
        );
        return(
            <>
                {this.state.loading ? (
                    <div className="lds-hourglass"></div>
                ) : (
                    <ul>{items}</ul>
                )}
            </>
        )
    }
}
