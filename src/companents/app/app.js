import { Component } from "react";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployersList from "../employers-list/employers-list";
import EmployersAddForm from "../employers-add-form/employers-add-form";

import "./app.css";

class App extends Component{
   constructor(props){
      super(props);
      this.state = {
         data: [
            {name: "Ivan Ivanov", salary: 80000, premium: false, rise: false, id: 1},
            {name: "Pety Petrov", salary: 900, premium: false, rise: false, id: 2},
            {name: "Vasy Vasechkin", salary: 5000, premium: false, rise: false, id: 3}
         ],
         term: "",
         filter: "all"
      }
      this.maxId = 4;
   }

   deleteItem = (id) => {
      this.setState(({data}) => {
         return {
            data: data.filter(item => item.id !== id)
         }
      })
   }

   addItem = (name, salary) => {
      const newItem = {
         name,
         salary,
         premium: false,
         rise: false,
         id: this.maxId++
      }
      this.setState(({data}) => {
         const newArr = [...data, newItem];
         return {
            data: newArr
         }
      });
   }

   onToggleProp = (id, prop) => {
      this.setState(({data})=> ({
         data: data.map(item => {
            if(item.id === id){
               return {...item, [prop]: !item[prop]}
            }
            return item;
         })
      }))
   }

   searchEmp = (items, term) => {
      if(term.length === 0){
         return items
      }
      return items.filter(item => {
         return item.name.indexOf(term) > -1
      })
   }

   onUpdateSearch = (term) => {
      this.setState({term});
   }

   filterPost = (items, filter) => {
      switch (filter) {
         case "rise":
            return items.filter(items => items.rise);
         case "moreThen1000":
            return items.filter(items => items.salary > 1000)
         default:
            return items
      }
   }

   onFilterSelect = (filter) => {
      this.setState({filter});
   }

   render(){
      const {data, term, filter} = this.state
      const employers = data.length;
      const premiumd = data.filter(item => item.premium).length
      const visibleData = this.filterPost(this.searchEmp(data, term), filter);
      return(
      <div className="app">
         <AppInfo employers={employers} premiumd={premiumd}/>

         <div className="search-panel">
            <SearchPanel
               onUpdateSearch={this.onUpdateSearch}/>
            <AppFilter
               filter={filter}
               onFilterSelect={this.onFilterSelect}/>
         </div>

         <EmployersList 
            data={visibleData}
            onDelete={this.deleteItem}
            onToggleProp={this.onToggleProp}/>
         <EmployersAddForm onAdd = {this.addItem}/>
      </div>
   )
   }
}

export default App;