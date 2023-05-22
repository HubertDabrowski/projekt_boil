import React from 'react'

export default function ParametersTab({props}) {
  return (
    <div className="w-50 p-3">
        <table className="table table-bordered bg-orange-200">
            <thead>
            <tr>
                <th scope="col" className='text-red-600'>Wartości parametrów</th>
                <th scope="col">Koszt zakupu</th>
                <th scope="col">Koszt transportu</th>
                <th scope="col">Całkowity koszt</th>
                <th scope="col">Dochód</th>
                <th scope="col">Zysk</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">Wartość</th>
                <td><text className="Purchase_cost border-0" type="text" />{props[0]}</td>
                <td><text className="Transport_cost border-0" type="text" />{props[1]}</td>
                <td><text className="Total_cost border-0" type="text" />{props[2]}</td>
                <td><text className="Income border-0" type="text" />{props[3]}</td>
                <td><text className="Profit border-0" type="text" />{props[4]}</td>
            </tr>
            </tbody>    
        </table>
    </div>
  )
}
