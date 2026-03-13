import { useState, useEffect } from 'react'
import Form from './components/Form'
import PersonList from './components/PersonList'
import personService from './services/persons'
import Notification from './components/Notification'



const App = () => {

    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-1231244' }
    ])


    const [newName, setNewName] = useState('')
    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const [newNumber, setNewNumber] = useState('')
    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }
    const [confMessage, setconfMessage] = useState(null)

    useEffect(() => {
        console.log("Fetching data from backend...")
        console.log("Before fetching, persons:", persons)
        personService
            .getAll()
            .then(response => {
                console.log('promise fulfilled')
                console.log("After fetching, persons:", response.data)
                setPersons(response.data)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        const existingPerson = (persons.find(
            (person) => person.name === newName))

        console.log('yritetään lisätä uusi ihminen')

        if (existingPerson) {
            console.log('Ihminen on jo listalla')
            const confirmUpdate = window.confirm(
                `${existingPerson.name} is already added to the phonebook, 
                replace the old number with a new one?`
            )
            if (confirmUpdate) {
                console.log('yritetään päivittää numero')
                const numberUpdate = {
                    ...existingPerson,
                    number: newNumber
                }

                personService
                    .update(existingPerson.id, numberUpdate)
                    .then(response => {
                        setPersons(persons.map(p => p.id !== existingPerson.id ? p : response.data))

                        setconfMessage(
                            `Phone number for ${existingPerson.name} successfully updated to: ${newNumber}`
                        )
                        setTimeout(() => {
                            setconfMessage(null)
                        }, 5000)
                    })
            } else {
                console.log('Ei päivitetä numeroa')
            }
        }
        else {

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
                    setconfMessage(
                        `${personObject.name} successfully added.`
                    )
                    setTimeout(() => {
                        setconfMessage(null)
                    }, 5000)
                    console.log('ihminen lisätty onnistuneesti')
                })
        }
    }
    const handleDeletion = (id) => {
        const person = persons.find(p => p.id === id)
        if (window.confirm(`Delete ${person.name}?`)) {
            console.log('Poistetaan henkilö')
            personService
                .del(id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== id))
                    console.log('onnistuneen poiston notification onnistui!')
                    setconfMessage(
                        `${person.name} successfully deleted.`
                    )
                    setTimeout(() => {
                        setconfMessage(null)
                    }, 5000)
                })
        }
        else {
            console.log('Ei poistetakaan :)');

        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={confMessage} />
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


