import React, { useState, useEffect } from 'react'
import PersonList from './components/PersonList.js'
import AddPersonForm from './components/AddPersonForm.js'
import Filter from './components/Filter.js'
import axios from 'axios'
import Countries from './components/CountryList.js'
import personService from './services/person.js'
import countryService from './services/country.js'
import Notification from './components/ErrorMessage.js'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ countries, setCountries] = useState([
    
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])

  const getAllCountries = () => {
    countryService
      .getAll()
      .then(allCountries => {
        setCountries(allCountries)
      })
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const allnames = persons.map(person => person.name)
    const alreadyused = allnames.includes(newName)
    
    if (alreadyused === true){
      alert(`${newName} is already added to phonebook`)
  } else {
    personService
      .add(personObject)
      .then(addedPerson => {
        setPersons(persons.concat(addedPerson)) 
        setNewName('')
        setErrorMessage(
          `Added:'${newName}' to the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      
  }
  }

  const deletePerson = (id) => {
    console.log('tässä id' + id)
    personService
    
      .deletePerson(id)
      
      personService
        .getAll()
        .then(initialPersons => {
          console.log('promise fulfilled')
          setPersons(initialPersons)
          setErrorMessage(
            `Person with id:'${id}' is deleted`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
       
      })
  }

  const personSearch = showAll
  ? persons
  : persons.filter(person => person.name === newFilter)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />

      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} setShowAll={setShowAll} showAll={showAll} />

      <h2>Add person</h2>

      <AddPersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      
      <h2>Numbers</h2>
      <div>
      <ul>
     {personSearch.map(person => 
      <li key={person.name}>
         <PersonList person={person} deletePerson={deletePerson} />
         
      </li>)}
    </ul>
      </div>
      <h2>Countries</h2>
      
        <Countries  getAllCountries={getAllCountries}/>
        <ul>
     {countries.map(country => 
      <li key={country.name}>
         {country.name}
      </li>)}
    </ul>
        
    </div>
  )

}

export default App