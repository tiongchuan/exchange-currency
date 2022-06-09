import React, { useState, useEffect } from "react";
import API from "../API";

const CurrencyConverter = () => {

    const date = new Date();
    const showDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`

    const [amount, setAmount] = useState(1);
    const [input, setInput] = useState("SGD");
    const [output, setOutput] = useState("USD");
    const [currencies, setCurrencies] = useState([]);

    const handleAmount = (e) => {
        setAmount(e.target.value)
    }

    const handleInput = (e) => {
        setInput(e.target.value)
    }

    const handleOutput = (e) => {
        setOutput(e.target.value)
    }

    const GetCurrencies = async () => {
        const { request, data } = await API.get("/latest")

        if (request.status === 200) {
            console.log(data);
            const changeCurrencyArray = Object.keys(data.rates)
            console.log(changeCurrencyArray);
            setCurrencies(changeCurrencyArray)
            console.log(currencies);
        }
    }

    useEffect(() => {
        GetCurrencies()
    }, [])

    return (
        <>
            <div className="container">

                <div className="header">
                    <h2>Go Currency</h2>
                    <p>{showDate}</p>
                </div>

                <div className="form">
                    <input type="nunber" value={amount} onChange={handleAmount}></input>
                    <select value={input} onChange={handleInput}>
                        {currencies.map((o) =>
                            <option key={o}>{o}</option>
                        )}
                    </select>
                    <select value={output} onChange={handleOutput}>
                        {currencies.map((o) =>
                            <option key={o}>{o}</option>
                        )}
                    </select>
                </div>


            </div>
        </>
    )

}

export default CurrencyConverter;