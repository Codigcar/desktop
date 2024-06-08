import * as React from 'react';

const Orders = () => {
    return (
        <div >
            <h1>Lista de ordenes</h1>
            <table >
                <tr>
                    <th>Id</th>
                    <th>Productos</th>
                    <th>Total</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>4</td>
                    <td>S/. 70</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>5</td>
                    <td>S/. 32</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>8</td>
                    <td>$ 90</td>
                </tr>
            </table>
        </div>
    )
}

export default Orders;
