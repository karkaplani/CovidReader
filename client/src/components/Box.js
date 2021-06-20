import React from 'react'
import Table from './Table'

const Box = ({records, onEdit}) => {
    return (
        <div>
            <Table records={records} onEdit={onEdit}/>
        </div>
    )
}

export default Box
