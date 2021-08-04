import { useState, useEffect } from 'react'

import AddForm from './components/AddForm/AddForm' 
import EditMenu from './components/EditMenu/EditMenu'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Table from './components/Table/Table'
import './components/ButtonStyles/add-button.css'
import Chart from './components/Chart/Chart';

const App = () => {
  const [editMenuIsOpen, setEditMenuIsOpen] = useState(false)
  const [menuIsOpen, setMenuIsOpen] = useState(false) //For the form component
  const [records, setRecords] = useState([])
  const [recordToEdit, setRecordToEdit] = useState([]) //For the edit menus

  //Fetching all the records from the API at the beginning
  useEffect(() => { 
    fetch('/api/records').then(res => {
      if(res.ok) {
        return res.json()
      }
    }).then(jsonResponse => {
      setRecords(jsonResponse)
    }).catch(() => {
      console.log('Records could not get!')
    })
  }, [])

  const deleteRecord = (id) => { 
    setEditMenuIsOpen(!editMenuIsOpen)
    
    fetch(`/api/records/${id}`, {
      method: 'DELETE',
    }).then(res => {
      return res.json()
    }).then(jsonResponse => {
      setRecords(jsonResponse) //Setting the records again with the filtered array
    })
  }

  //Since there are certain pruid and French name for each province, 
  //they are set here in order to eliminate the redundant data that
  //should be entered by the user.
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
      return data
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
      case 'Manitoba':
        data.pruid = '46'
        data.prnameFR = 'Manitoba'
      return data
      default:
        data.pruid = '1'
        data.prnameFR = 'Canada'
      return data
    }
  }

  const setDefaultValuesForData = (data) => {
    for(const property in data) {
      if(data[property] === '') {
        data[property] = 0 
      }
    }
    return data
  }

  const addRow = (data) => {  
    data = setPruIDAndprnameFR(data)
    data = setDefaultValuesForData(data)

    //First the menu should be closed to prevent the error due to the removed data
    setMenuIsOpen(!menuIsOpen) 
    
    fetch('/api/records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res=> {
      return res.json()
    }).then(jsonResponse => {
      console.log(jsonResponse)
      setRecords(jsonResponse)
    })
  }

  const updateRow = (id, data) => {
    setEditMenuIsOpen(!editMenuIsOpen)

    fetch(`/api/records/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res=> {
      return res.json()
    }).then(jsonResponse=> {
      setRecords(jsonResponse)
    })
  }

  //Getting the newly put data from the edit menu and sending it to 
  //the updateRow function for the PUT request to update the table.
  const getData = (rowIndex) => {
    var table = document.getElementById('table')
    var objCells = table.rows.item(1).cells //First cell is the headers
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

  const openEditMenu = (id) => {
    fetch('/api/records/' + id).then(res => {
      if(res.ok) {
        return res.json()
      }
    }).then(jsonResponse => {
      setRecordToEdit(jsonResponse)
      setEditMenuIsOpen(!editMenuIsOpen)
    })
  }

  const items = [
    <div className='container'>
      
      <h1>Covid Records</h1>
      <button className='plus' onClick = {() => setMenuIsOpen(!menuIsOpen)}/>

      <Table records={records} onEdit={openEditMenu}/>
        
        <AddForm menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} addRow={addRow} />

        {editMenuIsOpen && 
        <EditMenu 
          editMenuIsOpen={editMenuIsOpen}
          setEditMenuIsOpen={setEditMenuIsOpen}
          records={records}
          deleteRecord={deleteRecord} 
          getData={getData} 
          recordToEdit={recordToEdit}/>}
    </div> ,
  <Chart />,
  <div className='container'>
      <h1>About</h1>
  </div>
];
 
  return (
    <AliceCarousel mouseTracking items={items} />
  )
}
export default App