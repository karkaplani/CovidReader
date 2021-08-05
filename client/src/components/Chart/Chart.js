import React from 'react'
import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import alberta from '../../img/alberta.png'
import bc from '../../img/bc.png'
import canada from '../../img/canada.png'
import manitoba from '../../img/manitoba.png'
import new_brunswick from '../../img/new_brunswick.png'
import northwest from '../../img/northwest.png'
import nova_scotia from '../../img/nova_scotia.png'
import nunavut from '../../img/nunavut.png'
import ontario from '../../img/ontario.jpg'
import prince_edward_island from '../../img/prince_edward_island.png'
import quebec from '../../img/quebec.png'
import saskatchewan from '../../img/saskatchewan.png'
import yukon from '../../img/yukon.png'
import newfoundland from '../../img/newfoundland.png'
import travellers from '../../img/travellers.jpg'
import ReactTooltip from 'react-tooltip';

const Chart = () => {
    const [chartData, setChartData] = useState({})

    const chart = (province) => {

        let numtotals = []
        let numdeaths = []

        fetch(`/api/records?pruid=${province}`).then(res => {
            if(res.ok) {
              return res.json()
            }
          }).then(jsonResponse => {

              jsonResponse.sort((a,b) => {
                return a.month - b.month
              })

              console.log(jsonResponse)

              jsonResponse.forEach(record => {
                numtotals.push(record.numtotal)
                numdeaths.push(record.numdeaths)
              })
              setChartData(
                {
                    labels: ['January', 'February', 'March',
                             'April', 'May', 'Jun', 'July', 'August', 'September', 'October', 'November', 'December'],
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
          })
    }

    useEffect((province) => {
        chart(1)
    }, [])

    const setProvinceDataToDisplay = (pruid) => {
        chart(pruid)
    }

    return (
        <div className='container'>
            <h1>Charts</h1>
            <ReactTooltip className='flag-tooltip'/>
            <Line
                data={chartData}
                height={60}
                width={200}
                options={{}}
            />
            <button class="flag" data-tip="Canada" style={{backgroundImage: `url(${canada})`}} onClick={() => setProvinceDataToDisplay(1)}></button>
            <button class="flag" data-tip="Ontario" style={{backgroundImage: `url(${ontario})`}} onClick={() => setProvinceDataToDisplay(35)}></button>
            <button class="flag" data-tip="Alberta" style={{backgroundImage: `url(${alberta})`}} onClick={() => setProvinceDataToDisplay(48)}></button>
            <button class="flag" data-tip="British Columbia" style={{backgroundImage: `url(${bc})`}} onClick={() => setProvinceDataToDisplay(59)}></button>
            <button class="flag" data-tip="Manitoba" style={{backgroundImage: `url(${manitoba})`}} onClick={() => setProvinceDataToDisplay(46)}></button>
            <button class="flag" data-tip="New Brunswick" style={{backgroundImage: `url(${new_brunswick})`}} onClick={() => setProvinceDataToDisplay(13)}></button>
            <button class="flag" data-tip="Northwest Territories" style={{backgroundImage: `url(${northwest})`}} onClick={() => setProvinceDataToDisplay(61)}></button>
            <button class="flag" data-tip="Nova Scotia" style={{backgroundImage: `url(${nova_scotia})`}} onClick={() => setProvinceDataToDisplay(12)}></button>
            <button class="flag" data-tip="Nunavut" style={{backgroundImage: `url(${nunavut})`}} onClick={() => setProvinceDataToDisplay(62)}></button>
            <button class="flag" data-tip="Prince Edward Island" style={{backgroundImage: `url(${prince_edward_island})`}} onClick={() => setProvinceDataToDisplay(11)}></button>
            <button class="flag" data-tip="Quebec" style={{backgroundImage: `url(${quebec})`}} onClick={() => setProvinceDataToDisplay(24)}></button>
            <button class="flag" data-tip="Saskatchewan" style={{backgroundImage: `url(${saskatchewan})`}} onClick={() => setProvinceDataToDisplay(47)}></button>
            <button class="flag" data-tip="Yukon" style={{backgroundImage: `url(${yukon})`}} onClick={() => setProvinceDataToDisplay(60)}></button>
            <button class="flag" data-tip="Newfoundland" style={{backgroundImage: `url(${newfoundland})`}} onClick={() => setProvinceDataToDisplay(10)}></button>
            <button class="flag" data-tip="Repatriated Travellers" style={{backgroundImage: `url(${travellers})`}} onClick={() => setProvinceDataToDisplay(99)}></button>

        </div>
    )
}

export default Chart
