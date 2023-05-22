import React from 'react'

export default function OptimalTransportTab({props}) {
  return (
    <div className="w-50 p-3">
        <table className="table table-bordered bg-orange-200">
            <thead>
            <tr>
                <th scope="col" className='text-red-600'>Optymalny transport</th>
                <th scope="col">Odbiorca 1</th>
                <th scope="col">Odbiorca 2</th>
                <th scope="col">Odbiorca 3</th>
                <th scope="col">Odbiorca f</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">Dostawca 1</th>
                <td><text className="optimalTransport border-0" type="text" />{props[0][0]}</td>
                <td><text className="optimalTransport border-0" type="text" />{props[0][1]}</td>
                <td><text className="optimalTransport border-0" type="text" />{props[0][2]}</td>
                <td><text className="optimalTransport border-0" type="text" />{props[0][3]}</td>
            </tr>
            <tr>
                <th scope="row">Dostawca 2</th>
                <td><text className="optimalTransport border-0" type="text" />{props[1][0]}</td>
                <td><text className="optimalTransport border-0" type="text" />{props[1][1]}</td>
                <td><text className="optimalTransport border-0" type="text" />{props[1][2]}</td>
                <td><text className="optimalTransport border-0" type="text" />{props[1][3]}</td>
            </tr>
            <tr>
                <th scope="row">Dostawca 3</th>
                <td><text className="optimalTransport border-0" type="text" />{props[2][0]}</td>
                <td><text className="optimalTransport border-0" type="text" />{props[2][1]}</td>
                <td><text className="optimalTransport border-0" type="text" />{props[2][2]}</td>
                <td><text className="optimalTransport border-0" type="text" />{props[2][3]}</td>
            </tr>
            <tr>
                <th scope="row">Dostawca f</th>
                <td><text className="optimalTransport border-0" type="text" />{props[3][0]}</td>
                <td><text className="optimalTransport border-0" type="text" />{props[3][1]}</td>
                <td><text className="optimalTransport border-0" type="text" />{props[3][2]}</td>
                <td><text className="optimalTransport border-0" type="text" />{props[3][3]}</td>
            </tr>
            </tbody>
            
        </table>
        </div>
  )
}
