import React from 'react'
import { Line } from 'react-chartjs-2'

const Chart = ({graphData}) => {

    const logStuff = () => {
        console.log("Canada")
    }

    return (
        <div className='container'>
            <h1>Charts</h1>
            <Line
                data={graphData}
                height={60}
                width={200}
                options={{}}
            />
            <input type="image" class="flag" src='https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg' onClick={logStuff}/>
            <input type="image" class="flag" src='https://cdn.britannica.com/25/3225-004-EB60D413/Flag-Ontario.jpg'/>
            <input type="image" class="flag" src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Flag_of_British_Columbia.svg/1200px-Flag_of_British_Columbia.svg.png'/>
            <input type="image" class="flag" src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Flag_of_Quebec.svg/1200px-Flag_of_Quebec.svg.png'/>
            <input type="image" class="flag" src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Flag_of_Alberta.svg/1200px-Flag_of_Alberta.svg.png'/>
            <input type="image" class="flag" src='https://upload.wikimedia.org/wikipedia/commons/c/c4/Flag_of_Manitoba.svg'/>
            <input type="image" class="flag" src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Flag_of_Saskatchewan.svg/1200px-Flag_of_Saskatchewan.svg.png'/>
            <input type="image" class="flag" src='https://upload.wikimedia.org/wikipedia/commons/f/fb/Flag_of_New_Brunswick.svg'/>
            <input type="image" class="flag" src='https://upload.wikimedia.org/wikipedia/commons/c/c0/Flag_of_Nova_Scotia.svg'/>
            <input type="image" class="flag" src='https://upload.wikimedia.org/wikipedia/commons/d/d7/Flag_of_Prince_Edward_Island.svg'/>
            <input type="image" class="flag" src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Flag_of_the_Northwest_Territories.svg/1200px-Flag_of_the_Northwest_Territories.svg.png'/>
            <input type="image" class="flag" src='https://upload.wikimedia.org/wikipedia/commons/9/90/Flag_of_Nunavut.svg'/>
            <input type="image" class="flag" src='https://upload.wikimedia.org/wikipedia/commons/6/69/Flag_of_Yukon.svg'/>
            <input type="image" class="flag" src='https://cdn.britannica.com/25/3225-004-EB60D413/Flag-Ontario.jpg'/>

        </div>
    )
}

export default Chart
