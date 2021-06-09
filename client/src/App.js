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

  const setPruIDAndprnameFR = (data) => {

    switch(data.prname) {
      case 'Ontario': 
        data.pruid = '35' 
        data.prnameFR = 'Ontario'
      return data
      case 'British Columbia':
        data.pruid = '59'
        data.prnameFR = 'Colombie-Britannique'
      return data
      case 'Canada':
        data.pruid = '1'
        data.prnameFR = 'Canada'
      case 'Quebec': 
        data.pruid = '24'
        data.prnameFR = 'Quebéc'
      return data
      case 'Alberta':
        data.pruid = '48'
        data.prnameFR = 'Alberta'
      return data
      case 'Saskatchewan':
        data.pruid = '47'
        data.prnameFR = 'Saskatchewan'
      return data
      case 'New Brunswick':
        data.pruid = '13'
        data.prnameFR = 'Nouveau-Brunswick'
      return data
      case 'Newfoundland and Labrador':
        data.pruid = '10'
        data.prnameFR = 'Terre-Neuve-et-Labrador'
      return data
      case 'Nova Scotia':
        data.pruid = '12'
        data.prnameFR = 'Nouvelle-Écosse'
      return data
      case 'Prince Edward Island':
        data.pruid = '11'
        data.prnameFR = 'Île-du-Prince-Édouard'
      return data
      case 'Northwest Territories':
        data.pruid = '61'
        data.prnameFR = 'Territoires du Nord-Ouest'
      return data
      case 'Nunavut':
        data.pruid = '62'
        data.prnameFR = 'Nunavut'
      return data
      case 'Yukon':
        data.pruid = '60'
        data.prnameFR = 'Yukon'
      return data
      case 'Repatriated travellers':
        data.pruid = '99'
        data.prnameFR = 'Voyageurs rapatriés'
      return data
      case 'Repatriated travellers':
        data.pruid = '99'
        data.prnameFR = 'Voyageurs rapatriés'
      return data
      case 'Manitoba':
        data.pruid = '46'
        data.prnameFR = 'Manitoba'
      return data
    }
  }

  const addRow = (data) => {  

    data.id = Date.now() //Simple trick to generate a unique id
    data = setPruIDAndprnameFR(data)

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
      prnameFR: objCells.item(2).innerHTML,
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
          setEditMenuIsOpen={setEditMenuIsOpen}
          records={records}
          rowIndex={rowIndex}
          deleteRecord={deleteRecord} 
          getData={getData} />}
    </div>
    
  )
}

export default App