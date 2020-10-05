import React, { useState } from 'react'

const AddPersonForm = (props) => {
  
return (
    
   
    <form onSubmit={props.addPerson}>
    <div>
      name: <input
      value={props.newName}
      onChange={props.handleNameChange}
      />
      number: <input
      value={props.newNumber}
      onChange={props.handleNumberChange}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)
}
  export default AddPersonForm