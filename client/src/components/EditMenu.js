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
                <td id='pruid'> { recordToEdit[0].pruid } </td>
                <td class='prname'> {recordToEdit[0].prname } </td>
                <td class='prnamefr'> { recordToEdit[0].prnameFR } </td>
                <td class='date'> { recordToEdit[0].date } </td>
                <td class='numconf' contentEditable='true'> { recordToEdit[0].numconf } </td>
                <td class='numprob' contentEditable='true'> { recordToEdit[0].numprob } </td>
                <td class='numdeaths' contentEditable='true'> { recordToEdit[0].numdeaths } </td>
                <td class='numtotal' contentEditable='true'> { recordToEdit[0].numtotal } </td>
                <td class='numtoday' contentEditable='true'> { recordToEdit[0].numtoday } </td>
              </tr>
            </table>
            <button class="delete-button" onClick={() => deleteRecord(recordToEdit[0].id)}>Delete</button>
            <button class="update-button"  onClick={() => getData(recordToEdit[0].id)}>Update</button>
            </div>
          </div>
        </>
    )
}
export default EditMenu
