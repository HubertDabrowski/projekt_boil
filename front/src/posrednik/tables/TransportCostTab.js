import React, { Component } from 'react'

export default function TransportCostTab(){
    return (
        <div className="w-50 p-3">
        <table className="table table-bordered bg-orange-200">
            <thead>
            <tr>
                <th scope="col" className='text-red-600'>Koszty transportu</th>
                <th scope="col">Odbiorca 1</th>
                <th scope="col">Odbiorca 2</th>
                <th scope="col">Odbiorca 3</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">Dostawca 1</th>
                <td><input className="transportCost border-0 " type="number" placeholder="0"/></td>
                <td><input className="transportCost border-0" type="number" placeholder="0"/></td>
                <td><input className="transportCost border-0" type="number" placeholder="0"/></td>
            </tr>
            <tr>
                <th scope="row">Dostawca 2</th>
                <td><input className="transportCost border-0" type="number" placeholder="0"/></td>
                <td><input className="transportCost border-0" type="number" placeholder="0"/></td>
                <td><input className="transportCost border-0" type="number" placeholder="0"/></td>
            </tr>
            <tr>
                <th scope="row">Dostawca 3</th>
                <td><input className="transportCost border-0" type="number" placeholder="0"/></td>
                <td><input className="transportCost border-0" type="number" placeholder="0"/></td>
                <td><input className="transportCost border-0" type="number" placeholder="0"/></td>
            </tr>
            </tbody>
            
        </table>
        </div>
    )
}
