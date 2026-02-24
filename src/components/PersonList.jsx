import Person from "./Person"

const PersonList = ({ persons, handleDeletion }) => {
    return (
        <div>
            {persons.map((person, index) => (
                <Person key={person.name ?? index}
                    person={person}
                    handleDeletion={() => handleDeletion(person.id)}

                />
            ))}

        </div>

    )
}
export default PersonList