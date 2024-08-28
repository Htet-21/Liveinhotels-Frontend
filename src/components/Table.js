import React from 'react';
import './Table.css';

function Table({ columns, data }) {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item, index) => (
            <tr key={index}>
              {columns.map((col, i) => (
                <td key={i}>{item[col.accessor]}</td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length}>No data available</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default Table;