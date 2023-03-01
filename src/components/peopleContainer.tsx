import { People } from "./people";

interface PeopleContainerProps{
	people: People
}

export const PeopleContainer : React.FC<PeopleContainerProps> = ({people}) =>{
	return (
		<>
        <div className="character-container">
			<p>Name of Person: {people.name}</p>
			<p>Height: {people.height}</p>
			<p>Mass: {people.mass}</p>
			<p>Gender: {people.gender}</p>
			<p>Home Word: {people.homeworld}</p>
        </div>
		</>
    )
}