var React = require('react')

export default class Component extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            logged_in: false,
            loading: true
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
        return(
            <div>
                {this.state.loading ? (
                    <p>loading...</p>
                ) : (
                    <p>{this.state.logged_in ? "logged in" : "not logged in"}</p>
                )}
            </div>
        )
    }
}
