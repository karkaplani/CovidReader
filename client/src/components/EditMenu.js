const EditMenu = ({editMenuIsOpen,setEditMenuIsOpen ,records, rowIndex, deleteRecord, getData}) => {

    return (
        <>
          <div id="myModal" class="modal" style={{display: editMenuIsOpen && 'block'}} >
            <div id="edit-modal"  class="modal-content">
              <span class="close" onClick = {() => setEditMenuIsOpen(!editMenuIsOpen)}>&times;</span>
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
                <td id='pruid'> { records.find(record => record.id === rowIndex).pruid } </td>
                <td class='prname'> { records.find(record => record.id === rowIndex).prname } </td>
                <td class='prnamefr'> { records.find(record => record.id === rowIndex).prnameFR } </td>
                <td class='date'> { records.find(record => record.id === rowIndex).date } </td>
                <td class='numconf' contentEditable='true'> { records.find(record => record.id === rowIndex).numconf } </td>
                <td class='numprob' contentEditable='true'> { records.find(record => record.id === rowIndex).numprob } </td>
                <td class='numdeaths' contentEditable='true'> { records.find(record => record.id === rowIndex).numdeaths } </td>
                <td class='numtotal' contentEditable='true'> { records.find(record => record.id === rowIndex).numtotal } </td>
                <td class='numtoday' contentEditable='true'> { records.find(record => record.id === rowIndex).numtoday } </td>
              </tr>
            </table>

            <button class="delete-button" onClick={() => deleteRecord(rowIndex)}>Delete</button>
            <button class="update-button"  onClick={() => getData(rowIndex)}>Update</button>
            </div>

          </div>
        </>
    )
}

export default EditMenu
