import { useState, useEffect } from 'react'
import Form from './components/Form'
import PersonList from './components/PersonList'
import personService from './services/persons'



const App = () => {

    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-1231244' }
    ])


    const [newName, setNewName] = useState('')
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
        personService
            .getAll()
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
        // poistettu id kokonaan, backend hoitaa
        const personObject = {
            name: newName,
            number: newNumber,
        }



        personService
            .create(personObject)
            .then(response => {
                setPersons(persons.concat(response.data))
                setNewName('')
                setNewNumber('')
                console.log('ihminen lisätty onnistuneesti')
            })

    }
    const handleDeletion = (id) => {
        const person = persons.find(p => p.id === id)
        if (window.confirm(`Delete ${person.name}?`)) {
            console.log('Poistetaan henkilö')
            personService
                .del(id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== id))
                })
        }
        else {
            console.log('Ei poistetakaan :)');

        }
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
                    handleDeletion={handleDeletion}
                />

            </div>


        </div>
    )

}

export default App


