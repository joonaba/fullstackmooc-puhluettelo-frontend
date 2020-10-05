import React, { useState } from 'react'

const Filter = (props) => {

    return (
    <div>
      Search: <input
          value={props.newFilter}
          onChange={props.handleFilterChange}
          />
        <button onClick={() => props.setShowAll(!props.showAll)}>
          search
        </button>
      </div>
    )
}

export default Filter