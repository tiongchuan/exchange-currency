import React, { useState, useEffect } from "react";
import API from "../API";

const CurrencyConverter = () => {

    const date = new Date();
    const showDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`

    return (
        <>
            <div className="container">

                <div className="header">
                    <h2>Go Currency</h2>
                    <p>{showDate}</p>
                </div>

                


            </div>
        </>
    )

}

export default CurrencyConverter;