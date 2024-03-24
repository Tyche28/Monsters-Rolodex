import { useState, useEffect } from "react";

import  CardList  from "./components/card-list/card-list.component";
import  SearchBox  from "./components/search-box/search-box.component";
import './App.css';

const App = () => {

  const [searchField, setSearchField] = useState(''); //[value, setValue]
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
     .then((response) => response.json())
     .then((users) => setMonsters(users));
  },[]);

  useEffect(() => {
    const NewFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    setFilteredMonsters(NewFilteredMonsters);
   }, [monsters, searchField]);
  


  const onSearchChange = (event) => {
        const searchFieldString = event.target.value.toLocaleLowerCase();
        setSearchField(searchFieldString);
        }
  
  
  return(
    <div className = 'App'>
        <h1 className="app-title">Monsters-Rolodexx</h1>

        <SearchBox 
        className='monsters-search-box'
        onChangeHandler={onSearchChange} 
        placeholder='search monsters' 
        />
        <CardList monsters= {filteredMonsters}  />
      </div>
  );
  }

export default App;