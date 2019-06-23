import React from 'react';

function PersonRow({ person, onDeleteCheckChanged }) {
    return (
        <tr className={person.markedForDeletion ? 'danger' : ''}>
            <td>
                <input type="checkbox" className="form-control" checked={person.markedForDeletion} onChange={() => onDeleteCheckChanged(person)} />
            </td>
            <td>{person.firstName}</td>
            <td>{person.lastName}</td>
            <td>{person.age}</td>
        </tr>
    );
}

export default PersonRow;