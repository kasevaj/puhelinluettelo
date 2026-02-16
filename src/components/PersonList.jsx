import Person from "./Person"

const PersonList = ({ persons }) => {
    return (
        <div>
            {persons.map((person, index) => (
                <Person key={person.name ?? index}
                    person={person}

                />
            ))}

        </div>
    )
}
export default PersonList