import Box from './components/Box'
import { useState, useEffect } from 'react'
import AddForm from './components/AddForm'
import EditMenu from './components/EditMenu'

const App = () => {
  const [editMenuIsOpen, setEditMenuIsOpen] = useState(false)
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [rowIndex, setRowIndex] = useState(0)
  const [records, setRecords] = useState([])

  useEffect(() => { 
    fetch('/api/records').then(res => {
      if(res.ok) {
        return res.json()
      }
    }).then(jsonResponse => {
      setRecords(jsonResponse)
    })
  }, [])

  const deleteRecord = (id) => { 

    setEditMenuIsOpen(!editMenuIsOpen)

    fetch(`/api/records/${id}`, {
      method: 'DELETE',
      //headers: { 'Content-Type': 'application/json' },
      //body: records
    }).then(res => {
      return res.json()

    }).then(jsonResponse => {
      console.log(jsonResponse)
      setRecords(jsonResponse)
    })
  }

  const addRow = (data) => {  

    setMenuIsOpen(!menuIsOpen)

    fetch('/api/records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res=> {
      return res.json()

    }).then(jsonResponse => {
      setRecords(jsonResponse)
    })
  }

  const updateRow = (id, data) => {
    
    setEditMenuIsOpen(!editMenuIsOpen)

    fetch(`/api/records/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res=> {
      return res.json()

    }).then(jsonResponse=> {
      setRecords(jsonResponse)
    })
  }

  const getData = (rowIndex) => {
    var table = document.getElementById('table')
    var objCells = table.rows.item(1).cells
    const data = {
      id: rowIndex,
      pruid: objCells.item(0).innerHTML,
      prname: objCells.item(1).innerHTML,
      prnamefr: objCells.item(2).innerHTML,
      date: objCells.item(3).innerHTML,
      numconf: objCells.item(4).innerHTML,
      numprob: objCells.item(5).innerHTML,
      numdeaths: objCells.item(6).innerHTML,
      numtotal: objCells.item(7).innerHTML,
      numtoday: objCells.item(8).innerHTML,
    }
    updateRow(rowIndex, data)
  }

  const openEditMenu = (number) => {
    setRowIndex(number)
    setEditMenuIsOpen(!editMenuIsOpen)
    console.log(rowIndex)
  }
 
  return (
    <div className='container'>
      <h1>Covid Records</h1>
      <button onClick = {() => setMenuIsOpen(!menuIsOpen)}>Add</button>
        <Box records={records} onEdit={openEditMenu}/>
        
        <AddForm menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} addRow={addRow} />

        {editMenuIsOpen && 
        <EditMenu 
          editMenuIsOpen={editMenuIsOpen}
          records={records}
          rowIndex={rowIndex}
          deleteRecord={deleteRecord} 
          getData={getData} />}
    </div>
    
  )
}

export default App