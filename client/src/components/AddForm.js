//import Modal from 'react-modal'
//import Modal from 'reactstrap' 
import {useForm} from 'react-hook-form'

//Modal.setAppElement('#root')

const AddForm = ({menuIsOpen, setMenuIsOpen, addRow}) => {

    const {register, handleSubmit, formState: { errors} } = useForm()

    return (
        <>
          <div id="myModal" class="modal" style={{display: menuIsOpen && 'block'}} >
            <div class="modal-content">
              <h2>Add Record</h2>
              <span class="close" onClick = {() => setMenuIsOpen(!menuIsOpen)}>&times;</span>

              <form onSubmit={handleSubmit((data) => {addRow(data)})}>

                <label htmlFor="prname">Select province</label>
                <select name='prname' {...register('prname')}> 
                  <option value="Canada">Unknown</option>
                  <option value="Ontario">Ontario</option>
                  <option value="British Columbia">British Columbia</option>
                  <option value="Quebec">Quebec</option>
                  <option value="Alberta">Alberta</option>
                  <option value="Manitoba">Manitoba</option>
                  <option value="Saskatchewan">Saskatchewan</option>
                  <option value="New Brunswick">New Brunswick</option>
                  <option value="Nova Scotia">Nova Scotia</option>
                  <option value="Prince Edward Island">Prince Edward Island</option>
                  <option value="Northwest Territories">Northwest Territories</option>
                  <option value="Nunavut">Nunavut</option>
                  <option value="Yukon">Yukon</option>
                  <option value="Repatriated travellers">Repatriated travellers</option>
                </select> <br />

                <label htmlFor="date">Date</label>
                <input type="date" name='date' {...register('date', {required: true})}/> <br />
                {errors.date && <p>This field is required</p>}

                <label htmlFor="numconf">NumConf</label>
                <input type="text" name='numconf' {...register('numconf')}/> <br />
                
                <label htmlFor="numprob">NumProb</label>
                <input type="text" name='numprob' {...register('numprob')}/> <br />

                <label htmlFor="numdeaths">NumDeaths</label>
                <input type="text" name='numdeaths' {...register('numdeaths')}/> <br />

                <label htmlFor="numtotal">NumTotal</label>
                <input type="text" name='numtotal' {...register('numtotal')}/> <br />
                
                <label htmlFor="numtoday">NumToday</label>
                <input type="text" name='numtoday' {...register('numtoday')}/> <br />

                <input type="submit" name='submit' value='Submit'/>
              </form>
              <button onClick = {() => setMenuIsOpen(!menuIsOpen)}>Close</button> 
            </div>
          </div>
        </>
    )
}

export default AddForm