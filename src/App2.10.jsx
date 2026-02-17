import { useState, useEffect } from 'react'
import Form from './components/Form'
import PersonList from './components/PersonList'
import axios from 'axios'


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

    useEffect(() => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }, [])

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
            <Form
                onSubmit={addPerson}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />


            <h2>Number</h2>
            <div>
                <PersonList
                    persons={persons}
                />

            </div>


        </div>
    )

}

export default App