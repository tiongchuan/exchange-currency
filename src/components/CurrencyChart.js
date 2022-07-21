import React, { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import API from "../API.js";
import './CurrencyChart.css'

const CurrencyChart = (props) => {

    const {input, output} = props

    const [rate, setRate] = useState([])
    const [chartData, setChartData] =
        useState({
            labels: '',
            datasets: [{
                label: 'currency rates',
                data: ''
            }]
        })

    const date1 = new Date();
    //console.log(date1);
    const todayDate = date1.toISOString().slice(0,10);
    //console.log(todayDate);
    const time1 = date1.getTime();
    //console.log(time1);
    const time2 = time1 - (4 * 24 * 60 * 60 * 1000);
    //console.log(time2);
    const date2 = new Date(time2)
    const startDate = date2.toISOString().slice(0, 10);
    //console.log(startDate);

    const getCurrencyData = async () => {
        const { data } = await API.get(`/timeseries?start_date=${startDate}&end_date=${todayDate}&base=${input}`)
        console.log(data);
        setRate(data.rates)
        console.log(rate);
    }

    useEffect(() => {
        getCurrencyData()
    }, [input, output])

    const getResult = () => {

        const label5Days = (Object.keys(rate));
        console.log(label5Days);

        let array5Days = [];
        const array = [rate];
        const result = array.flatMap(Object.values);
        console.log(result);

        for (let i = 0; i < result.length; i++) {

            const finalResult = Object.entries(result[i])
            console.log(finalResult);

            for (let k = 0; k < finalResult.length; k++) {
                if (finalResult[k][0] === output) {
                    array5Days.push(finalResult[k][1]);
                }
            }
        }

        console.log(array5Days);

        setChartData({
            labels: label5Days,
            datasets: [{
                label: 'currency rates',
                data: array5Days,
                tension:0.4,
                fill: true,
                backgroundColor:'#ffffff29',
                pointBackgroundColor:'#ffffffdb',
                borderColor: '#ffffff45',
                segment: {
                    borderWidth: '2px',
                    borderColor: '#ffffff',
                }
            }]  
        })
        console.log(chartData);

    }

    useEffect(() => {
        getResult()
    }, [rate])

    
    return (
        <>
            <div className="chart">
                <p2>{input} vs {output}</p2>
                <Line  
                    style={{display: output? true:'none'}}
                    data={chartData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: 'Currency rate for past 5 days',
                                fontSize:2,
                                color: '#ffffff99'
                            },
                            legend: {
                                labels: {
                                    label: {
                                        font: {
                                        size:10,
                                        color:'white' 
                                        }
                                    }
                                }
                            }
                        }
                    }} 
                    height = '200px'
                    width= '300px'
                />
            </div>
        </>
    )

}

export default CurrencyChart;