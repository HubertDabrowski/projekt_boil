import React from "react";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      name: "",
      cost: "",
      dependencies: "",
    };

    this.handleChange=async(event)=> {
      console.log(event.target.name)
      if(event.target.name === "dependencies"){
        await this.setState({
          dependencies: [event.target.value]
        })
      }else{
         await this.setState({
        [event.target.name]: event.target.value,
      });
      }
     
      const newState =await this.props.data.map((one) => {
        if (one.id === this.props.id) {
          return this.state;
        }
        return one;
      });
      await this.props.setData(newState);
    }
  }

  render() {
    return (
      <div className="h-42">
        {/* {id} */}
        <input
          value={this.state.name}
          name="name"
          onChange={this.handleChange}
          className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          type="text"
          placeholder="Czynność"
        />
        <input
          value={this.state.dependencies}
          name="dependencies"
          onChange={this.handleChange}
          className="mb-1 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          type="text"
          placeholder="Czynność bezpośrednio poprzedzająca"
        />
        <input
          value={this.state.cost}
          name="cost"
          onChange={this.handleChange}
          className="mb-4 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          type="text"
          placeholder="Czas trwania"
        />
      </div>
    );
  }
}

export default Form;
