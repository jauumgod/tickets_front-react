import React from "react";
import Table from 'react-bootstrap/Table';

function TicketsViewAPI() {
  return (
    <table className="table bg-dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Sequencia</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
      </tbody>
    </table>
  );
}

export default TicketsViewAPI;