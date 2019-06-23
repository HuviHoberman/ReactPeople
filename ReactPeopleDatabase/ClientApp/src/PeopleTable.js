import React from 'react';
import PersonRow from './PersonRow';

class PeopleTable extends React.Component {
    render() {
        return (
            <div>
                <button className="btn btn-danger" onClick={this.props.onDeleteClicked} >Delete All</button>
                <button className="btn btn-warning" onClick={this.props.oCheckAllClicked}>Check All</button>
                <button className="btn btn-warning" onClick={this.props.onClearAllClicked}>Clear All</button>

                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.people.map((person) => <PersonRow onDeleteCheckChanged={this.props.onDeleteCheckChanged} person={person} key={person.id}/>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default PeopleTable;