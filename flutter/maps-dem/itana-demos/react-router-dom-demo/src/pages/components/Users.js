import * as React from 'react';

const Users = () => {
    return (
        <div >
            <h1>Lista de usuarios</h1>
            <table>
                <tr>
                    <th>Id</th>
                    <th>Nombres</th>
                    <th>Pais</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Pedro Fernandez</td>
                    <td>Martinez</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Lorenzo Gomez</td>
                    <td>Mexico</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Luisa Paredes</td>
                    <td>Peru</td>
                </tr>
            </table>
        </div>
    )
}

export default Users;
