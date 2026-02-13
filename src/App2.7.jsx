import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')
    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.find((person) => newName == person.name)) {
            window.alert(`${newName} is already in the phonebook`)
            return
        }
        const nameObject = {
            name: newName,
            id: String(persons.length + 1),
        }

        setPersons(persons.concat(nameObject))
        setNewName('')
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input
                        value={newName}
                        onChange={handleNameChange}

                    />
                </div>
                <button type="submit">add</button>
            </form>
            <h2>Number</h2>
            <div>
                {persons.map((person, index) => (
                    <li key={person.id ?? index}>
                        {person.name}
                    </li>
                ))}
            </div>

        </div>
    )

}

export default App