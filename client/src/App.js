import React from 'react'
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
    }).then(jsonResponse => setRecords(jsonResponse))
  }, [])

  const deleteRecord = (id) => {
    setEditMenuIsOpen(!editMenuIsOpen)
    setRecords(records.filter((record) => record.id !== id)) //Only shows the records that ain't selected
    console.log(id)
  }

  const openEditMenu = (number) => {
    setRowIndex(number)
    setEditMenuIsOpen(!editMenuIsOpen)
    console.log(rowIndex)
  }

  const addRow = (data) => {
    records.push(data)
    setRecords(records)
    setMenuIsOpen(!menuIsOpen)
  }

  const getData = (rowIndex) => {
    var table = document.getElementById('table')
    var objCells = table.rows.item(1).cells
    records[rowIndex] = {
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
    setRecords(records)
    setEditMenuIsOpen(!editMenuIsOpen)
    console.log(objCells)
  }
 
  return (
    <div className='container'>
      <h1>Covid Records</h1>
      <button onClick = {() => setMenuIsOpen(!menuIsOpen)}>Add</button>
        <Box records={records} onEdit={openEditMenu}/>
        
        <AddForm menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} addRow={addRow} />
       { editMenuIsOpen && <EditMenu 
          
          editMenuIsOpen={editMenuIsOpen}
          records={records}
          rowIndex={rowIndex}
          deleteRecord={deleteRecord} 
          getData={getData} />}
    </div>
    
  )
}

export default App