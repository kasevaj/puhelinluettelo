import { useState } from 'react'

const App = () => {

    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-1231244' }
    ])


    const [newName, setNewName] = useState('type here')
    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const [newNumber, setNewNumber] = useState(0)
    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }
    const addPerson = (event) => {
        event.preventDefault()
        console.log('yritetään lisätä uusi ihminen')

        event.preventDefault()
        console.log('Yritetään lisätä nimi')
        if (persons.find((person) => newName == person.name)) {
            window.alert(`${newName} is already in the phonebook`)
            return
        }

        const personObject = {
            name: newName,
            number: newNumber,
            id: String(persons.length + 1),
        }

        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
        console.log('ihminen lisätty onnistuneesti')



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
                <div>
                    number: <input
                        value={newNumber}
                        onChange={handleNumberChange}
                    />
                </div>
                <button type="submit">add</button>
            </form>
            <h2>Number</h2>
            <div>
                {persons.map((person, index) => (
                    <li key={person.id ?? index}>
                        {person.name} {person.number}
                    </li>
                ))}

            </div>


        </div>
    )

}

export default App