import React from 'react'
import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import ReactTooltip from 'react-tooltip';
import provinces from './Provinces'

/**
 * @author Apo Ilgun
 * The chart component as the second page of the application.
 * Gets rendered at the App component, and returns a container
 * with a dynamic chart and several buttons to manipulate the
 * chart data. Uses chartjs and tooltip libraries as well as
 * the helper module for the province data.
 */
const Chart = () => {
    const [chartData, setChartData] = useState({}) //The data to be displayed on the chart
    const [buttons, setButtons] = useState([]) //Buttons to change the chart data. Render once at the beginning.

    /**
     * @author Apo Ilgun
     * The chart function sets the chart data dynamically when 
     * called on click of the flag buttons. Uses province id 
     * as the parameter to make a fetch request to get the 
     * appropriate data from the backend.
     */
    const chart = (province) => {

        //Actual data used in the graph
        let numtotals = [] 
        let numdeaths = []

        //Fetch request gets the last record from each month of the province.
        fetch(`/api/records?pruid=${province}`).then(res => {
            if(res.ok) {
              return res.json()
            }
          }).then(jsonResponse => {
              //If not sorted in ascending order, month data are displayed randomly
              jsonResponse.sort((a,b) => {
                return a.month - b.month
              })
              jsonResponse.forEach(record => {
                numtotals.push(record.numtotal)
                numdeaths.push(record.numdeaths)
              })
              setChartData(
                {
                    labels: ['January', 'February', 'March', 'April', 'May', 'Jun', 
                             'July', 'August', 'September', 'October', 'November', 'December'],
                    datasets: [
                      {
                        label: 'Cases',
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 2,
                        data: numtotals
                      },
                      {
                        label: 'Deaths',
                        fill: false,
                        lineTension: 0.5,
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: 'rgba(0,0,255,1)',
                        borderWidth: 2,
                        data: numdeaths
                      }
                    ],
                }
            )
          }).catch(err => console.err('Last records could not get: ' + err))
    }
    //This hook is called once at the beginning to set the default data for the states.
    useEffect(() => {
      chart(1) //Default chart to display is Canada
      //By using the provinces data, 15 buttons are displayed with 
      //same properties. Also a tooltip for each button is rendered here.
      setButtons(provinces.map((province) => {
        return <> 
        <ReactTooltip className='flag-tooltip'/>
        <button class='flag' 
                data-tip={province.name}
                style={{backgroundImage: `url(${province.backgroundImage})`}} 
                onClick={() => chart(province.id)}></button> </>
      }))
    }, [])
    return (
        <div className='container'>
            <h1>Charts</h1>
            <Line
                data={chartData}
                height={60}
                width={200}
                options={{}}
            />
            {buttons}
        </div>
    )
}

export default Chart
