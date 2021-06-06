import Modal from 'react-modal'

Modal.setAppElement('#root')

const EditMenu = ({editMenuIsOpen, records, rowIndex, deleteRecord, getData}) => {

    return (
        <>
          <Modal 
          closeTimeoutMS={2000}
          isOpen={editMenuIsOpen && true} 
          style={
            {
              overlay: {
                transition: 'opacity 2000ms ease-in-out',
                width: '500px',
                height: '200px',
                margin: 'auto'
              }
            }
          }
          >
            <table className='record-table' id='table'>
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
              <tr>
                <td id='pruid' contentEditable='true'> { records.find(record => record.id === rowIndex).pruid } </td>
                <td class='prname' contentEditable='true'> { records.find(record => record.id === rowIndex).prname } </td>
                <td class='prnamefr'  contentEditable='true'> { records.find(record => record.id === rowIndex).prnameFR } </td>
                <td class='date' contentEditable='true'> { records.find(record => record.id === rowIndex).date } </td>
                <td class='numconf' contentEditable='true'> { records.find(record => record.id === rowIndex).numconf } </td>
                <td class='numprob' contentEditable='true'> { records.find(record => record.id === rowIndex).numprob } </td>
                <td class='numdeaths' contentEditable='true'> { records.find(record => record.id === rowIndex).numdeaths } </td>
                <td class='numtotal' contentEditable='true'> { records.find(record => record.id === rowIndex).numtotal } </td>
                <td class='numtoday' contentEditable='true'> { records.find(record => record.id === rowIndex).numtoday } </td>
              </tr>
            </table>

            <button onClick={() => deleteRecord(rowIndex)}>Delete</button>
            <button onClick={() => getData(rowIndex)}>Update</button>
        </Modal>
        </>
    )
}

export default EditMenu
