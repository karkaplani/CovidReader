const EditMenu = ({editMenuIsOpen,setEditMenuIsOpen, deleteRecord, getData, recordToEdit}) => {
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
                <td id='pruid'> { recordToEdit.pruid } </td>
                <td class='prname'> {recordToEdit.prname } </td>
                <td class='prnamefr'> { recordToEdit.prnameFR } </td>
                <td class='date'> { recordToEdit.date } </td>
                <td class='numconf' contentEditable='true'> { recordToEdit.numconf } </td>
                <td class='numprob' contentEditable='true'> { recordToEdit.numprob } </td>
                <td class='numdeaths' contentEditable='true'> { recordToEdit.numdeaths } </td>
                <td class='numtotal' contentEditable='true'> { recordToEdit.numtotal } </td>
                <td class='numtoday' contentEditable='true'> { recordToEdit.numtoday } </td>
              </tr>
            </table>
            <button class="delete-button" onClick={() => deleteRecord(recordToEdit._id)}>Delete</button>
            <button class="update-button"  onClick={() => getData(recordToEdit._id)}>Update</button>
            </div>
          </div>
        </>
    )
}
export default EditMenu
