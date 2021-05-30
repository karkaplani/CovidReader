import React from 'react'
import Table from './Table'

const Box = ({records, onDelete, onEdit}) => {
    return (
        <div>
            <Table records={records} onDelete={onDelete} onEdit={onEdit}/>
        </div>
    )
}

export default Box
