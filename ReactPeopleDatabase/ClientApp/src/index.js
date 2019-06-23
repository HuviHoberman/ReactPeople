import React from 'react';
import { render } from 'react-dom';
import InputRow from './InputRow';
import PeopleTable from './PeopleTable';
import axios from 'axios';
import { produce } from 'immer';

class App extends React.Component {
    state = {
        person: {
            firstName: '',
            lastName: '',
            age: '',
        },
        people: []
    }

    componentDidMount = () => {
        axios.get('api/people/getPeople').then(({ data }) => {
            data.forEach(p => p.markedForDeletion = false);
            this.setState({ people: data });
        })
    }

    onInputChange = e => {
        const newState = produce(this.state, draftState => {
            const { person } = draftState;
            person[e.target.name] = e.target.value;
        });
        this.setState(newState);
    }

    onAddClick = () => {
        axios.post('/api/people/add', this.state.person).then(({ data }) => {
            const nextState = produce(this.state, draftState => {
                draftState.people.push(data);
                draftState.person = {
                    firstName: '',
                    lastName: '',
                    age: ''
                }
            });
            this.setState(nextState);
        })
    }

    onDeleteCheckChanged = person => {
        const nextState = produce(this.state, draftState => {
            const personThatChanged = draftState.people.find(p => p.id === person.id)
            personThatChanged.markedForDeletion = !personThatChanged.markedForDeletion;
        });
    }

    onDeleteClicked = () => {
        axios.post('/api/people/delete',
            { personIds: this.state.people.filter(p => p.markedForDeletion).map(p => p.id) })
            .then(() => {
                axios.get('/api/people/getall').then(({ data }) => {
                    data.forEach(p => p.markedForDeletion = false);
                    this.setState({ people: data });
                });
            });
    }

    onCheckAllClicked = () => {
        const nextState = produce(this.state, draftState => {
            draftState.people.forEach(p => p.markedForDeletion = true);
        });
        this.setState(nextState);
    }

    onClearAllClicked = () => {
        const nextState = produce(this.state, draftState => {
            draftState.people.forEach(p => p.markedForDeletion = false);
        });
        this.setState(nextState);
    }

    render() {
        const { person, people } = this.state;
        return (
            <div className="container" style={{ marginTop: 60 }}>
                <InputRow onInputChange={this.onInputChange} onAddClick={this.onAddClick} person={person} />
                <PeopleTable
                    people={people}
                    onDeleteCheckChanged={this.onDeleteCheckChanged}
                    onDeleteClicked={this.onDeleteClicked}
                    onCheckAllClicked={this.onCheckAllClicked}
                    onClearAllClicked={this.onClearAllClicked}
                />
            </div>
        );
    }
}

render(<App />, document.getElementById('root'));
