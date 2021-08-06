import {useForm} from 'react-hook-form'
import Tooltip from '../../components/Tooltip/Tooltip'

const AddForm = ({menuIsOpen, setMenuIsOpen, addRow}) => {

    const {register, handleSubmit, formState: { errors} } = useForm()

    return (
        <>
          <div id="myModal" class="modal" style={{display: menuIsOpen && 'block'}} >
            <div class="modal-content">
            <span class="close" onClick = {() => setMenuIsOpen(!menuIsOpen)}>&times;</span>
              <h2>Add Record</h2>
              <form className="add-form" onSubmit={handleSubmit((data) => {addRow(data)})}>

                <select name='prname' {...register('prname', {required: true})}> 
                  <option disabled selected value="Canada">Select Province</option>
                  <option value="Canada">Canada</option>
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
                  <option value="Newfoundland and Labrador">Newfoundland</option>
                  <option value="Repatriated travellers">Repatriated travellers</option>
                </select> <br />

                <input class="date" type="date" name='date' {...register('date', {required: true})}/> <br />
                {errors.date && <Tooltip/>}

                <input type="number" name='numconf' placeholder='Num Confirmed'{...register('numconf')}/> <br />
                <input type="number" name='numprob' placeholder='Num Prob' {...register('numprob')}/> <br />
                <input type="number" name='numdeaths' placeholder='Num Deaths' {...register('numdeaths')}/> <br />
                <input type="number" name='numtotal' placeholder='Num Total' {...register('numtotal')}/> <br />
                <input type="number" name='numtoday' placeholder='Num Today' {...register('numtoday')}/> <br />
                <input className="add" type="submit" name='submit' value='Add'/>
              </form> 
            </div>
          </div>
        </>
    )
}
export default AddForm