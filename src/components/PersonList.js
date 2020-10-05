import React, { useState } from 'react'

const PersonList = (props) => {
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')

    const name = props.person.name
    const number = props.person.number
    const id = props.person.id

        return (
          <div>
            <p>{name} {number} <button onClick={() => props.deletePerson(id)}>delete</button></p>
            
        </div>
              )
  }

  export default PersonList