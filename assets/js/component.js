var React = require('react')

export default class Component extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            logged_in: false,
            loading: false,
            offset: 0,
            todo_list: this.props.todo_list
        }

        this.load = this.load.bind(this)
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

    load(){
        fetch('/load?offset=' + (this.state.offset + 1))
        .then(response => response.json())
        .then(response => {
            if(response.ok){
                let list = this.state.todo_list
                const size = response.list.length
                for(let i = 0 ; i < size ; i++){
                    list.push(response.list[i]);
                }
                this.setState({todo_list: list, offset: this.state.offset + 1})
            } else {
                this.setState({loading: false})
            }
        })
    }

    render(){
        const items = this.state.todo_list.map((item, index) => {
            return (
                <div key={index} className="shadow-2xl bg-white max-w-sm p-10">{item.description}</div>
            )
        });
        return(
            <>
                {this.state.loading ? (
                    <div className="lds-hourglass"></div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-20 p-10">{items}</div>
                        { this.state.logged_in ? (
                            <>
                                <div onClick={this.load}>Load more</div>
                                <a href="/logout">logout</a>
                            </>
                        ) : (
                            <a href="/login">Log in to load tasks</a>
                        )}
                    </>
                )}
            </>
        )
    }
}
