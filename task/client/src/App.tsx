import React from 'react';
import './App.css';
import { FormGroup, Input, Label, Message } from './components/styled/Form';

function App() {
  return (
    <div className="App">
       <FormGroup>
      <Label htmlFor="label">Label</Label>
      <Input id="label" />
      <Message>This is the validation message</Message>
    </FormGroup>
    <FormGroup>
      <Label>Label 2</Label>
      <Input />
      <Message>This is the validation message</Message>
    </FormGroup>
    </div>
  );
}

export default App;
