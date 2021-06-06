import Row from './Row'

const Table = ({records, onEdit}) => {
    return (
        <table className='record-table'>
            <tr>
                <th>PruId</th>
                <th>PrName</th>
                <th>PrNameFr</th>
                <th>Date</th>
                <th>NumConf</th>
                <th>NumProb</th>
                <th>NumDeaths</th>
                <th>NumTotal</th>
                <th>NumToday</th>
              </tr>
            
            {records.map((record) => (<Row key={record.id} record={record} onEdit={onEdit} />))}
        </table>
    )
}

export default Table
