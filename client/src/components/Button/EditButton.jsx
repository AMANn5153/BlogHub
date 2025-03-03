import React from 'react'
import { Link } from 'react-router-dom' 

const EditButton = () => {
  return (
    <Link to={`/settings/`}>
        <button className="btn bg-blue-900 hover:bg-blue-950 text-white btn-sm">Edit</button>
    </Link>
  )
}

export default EditButton