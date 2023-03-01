import React, { useEffect, useState } from 'react';
import './App.css';
import { People } from './components/people';
import { PeopleContainer } from './components/peopleContainer';

function App() {

  const [people, setPeople] = useState<People>();
  const [ errorMessage, setErrorMessage ] = useState<string | undefined>();
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchPerson = async (pageNumber : number) => {
      try{
        const apiResponse = await fetch(`https://swapi.dev/api/people?page=${pageNumber}`);
        switch (apiResponse.status)
        {
          case 200: {
            const json = await apiResponse.json() as { results: People[] };
            setPeople(json.results[0]);
            break;
          }
          case 418:{
            setErrorMessage("418 I'm a tea pot 🫖, silly");
            break;
          }
          case 500:{
            setErrorMessage("Oops... something went wrong, try again 🤕");
            break;
          }
          default:{
            setErrorMessage ("Error: "+ apiResponse.status);
            break;
          }
        }
  
      }catch(e){
        setErrorMessage (`Error - Execution without return code: ${e}`);
      }
    }
    fetchPerson(currentPage);
  }, [currentPage]);


  return (
    <div className="App">
     <h1>The Star Wars API</h1>
     {people && <PeopleContainer people={people}/>}
    </div>
  );
}

export default App;
