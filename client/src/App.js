import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AuctionResult from "./Containers/AuctionResult/AuctionResult";
import Cover from "./Containers/Cover/Cover";
import obj from './obj';
import Particles from 'react-particles-js';
import {connect} from 'react-redux';

import {changeSearchField} from "./actions";

const mapStateToProps = (state) => ({
    searchField: state.searchField,
})

const mapDispatchToProps = (dispatch) => ({
    onSearchChange: (event) => dispatch(changeSearchField(event.target.value)),
})

const param = obj;

class App extends Component {

    constructor(props) {
        super(props);
        this.state={
            isLoaded: false,
            npa:[],
            contracts: []
        }
    }

    componentDidMount = async () => {
        try {
            this.fetchAddress().then(res=>this.feed())
            this.setState({isLoaded: true});
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load`,
            );
            console.error(error);
        }
    };

    feed =  () => {
        this.state.contracts.forEach(async element=>{
            const array = this.state.npa;
            await this.feedDataToState(element.address).then(res=>{
                if(res.flag){
                    array.push(res.Data);
                }else{
                    alert(res.Data)
                }
            })
            this.setState({npa:array});
        })
    }

    feedDataToState = async (_address) => {
        const response = await fetch("http://localhost:3001/fetchData",{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                address: _address
            })
        });
        return await response.json()
    }

    fetchAddress = async () =>{
        const response = await fetch('http://localhost:3001/getAddress');
        const data = await response.json();
        this.setState({
            contracts: data
        });
    }

    filterNpa = (npa,searchField) =>{
        let filter = npa;
        if(npa.length!==0){
            filter = npa.filter(each=>{
                return Object.values(each).toString().toLowerCase().includes(searchField.toLowerCase());
            })
        }
        return filter;
    }

  render() {
        const filter = this.filterNpa(this.state.npa,this.props.searchField);
    if(this.state.isLoaded){
        return (
          <div className="App ">
              <Particles params={param} className={"particlesBg "}/>
              <Cover handleChange={this.props.onSearchChange}/>
              <AuctionResult npa={filter}/>
          </div>
      )}else{
          return <div>Loading </div>;
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);