import Modal from 'react-modal'
import {useForm} from 'react-hook-form'

Modal.setAppElement('#root')

const AddForm = ({menuIsOpen, setMenuIsOpen, addRow}) => {

    const {register, handleSubmit, formState: { errors} } = useForm()

    const onSubmit = (data) => {
        console.log(data)
        addRow(data)
    }

    return (
        <>
          <Modal 
          closeTimeoutMS={2000}
          isOpen={menuIsOpen && true}
          style={
            {
              overlay: {
                transition: 'opacity 2000ms ease-in-out',
                width: '500px',
                height: '500px',
                margin: 'auto'
              }
            }
          }>
          <h2>Add Record</h2>
        
          <form onSubmit={handleSubmit((data) => {addRow(data)})}>

            <label htmlFor="id">Id</label>
            <input type="text" name='id' {...register('id', {required: true})} /> <br />
            {errors.id && <p>This is required</p>}

            <label htmlFor="pruid">PruId</label>
            <input type="text" name='pruid' {...register('pruid')}/> <br />

            <label htmlFor="prname">PrName</label>
            <input type="text" name='prname' {...register('prname')}/> <br />
            
            <label htmlFor="prnamefr">PrNameFr</label>
            <input type="text" name='prnamefr'{...register('prnamefr')}/> <br />

            <label htmlFor="date">Date</label>
            <input type="text" name='date' {...register('date')}/> <br />

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
        </Modal>  
        </>
    )
}

export default AddForm