import React from 'react'

export default function recipientTab() {
  return (
    <div className="w-50 p-3">
      <table className="table table-bordered bg-orange-200">
        <thead>
          <tr>
            <th scope="col" className='text-red-600'>Odbiorcy</th>
            <th scope="col">Odbiorcy 1</th>
            <th scope="col">Odbiorcy 2</th>
            <th scope="col">Odbiorcy 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
                <th scope="row">Popyt</th>
                <td><input className="demand border-0 " type="number" placeholder="0"/></td>
                <td><input className="demand border-0" type="number" placeholder="0"/></td>
                <td><input className="demand border-0" type="number" placeholder="0"/></td>
            </tr>
            <tr>
                <th scope="row">Cena sprzedaży</th>
                <td><input className="sellingPrice border-0" type="number" placeholder="0"/></td>
                <td><input className="sellingPrice border-0" type="number" placeholder="0"/></td>
                <td><input className="sellingPrice border-0" type="number" placeholder="0"/></td>
          </tr>
        </tbody>
          
      </table>
    </div>
    
  )
}
