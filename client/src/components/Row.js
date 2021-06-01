import React from 'react'

const Row = ({record, onEdit}) => {
    return (
        <tr onClick={() => {onEdit(record.id)}}>
            <td>{record.pruid}</td>
            <td>{record.prname}</td>
            <td>{record.prnameFR}</td>
            <td>{record.date}</td>
            <td>{record.numconf}</td>
            <td>{record.numprob}</td>
            <td>{record.numdeaths}</td>
            <td>{record.numtotal}</td>
            <td>{record.numtoday}</td>
        </tr>
    )
}

export default Row
