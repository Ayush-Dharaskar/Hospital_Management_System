import React, { useState } from 'react';
import './App.css';

function App() {
  // State to hold the input text
  const [inputText, setInputText] = useState('');
  const [nj, setnj] = useState([]);
  const [nj1, setnj1] = useState([]);

  // Function to handle button click and send text to delete item
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/add_text_to_postgresql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputText }),
      });
      if (response.ok) {
        alert('Text added to PostgreSQL successfully!');
        setInputText('');
        
        console.log(inputText);
      } else {
        alert('Failed to add text to PostgreSQL. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/fetch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputText }),
      });
      const data = await response.json();
      setnj(data.item);
      if (response.ok) {
        alert('Text added to PostgreSQL successfully!');
        setInputText('');
        
        console.log(inputText);
      } else {
        alert('Failed to add text to PostgreSQL. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/patientextract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputText }),
      });
      const data = await response.json();
      setnj(data.patient);
      setnj1(data.bmi);
      if (response.ok) {
        alert('PAtient details fetched successfully!');
        setInputText('');
        
        console.log(inputText);
      } else {
        alert('Failed to add text to PostgreSQL. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  

  // Function to handle input change
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    console.log(typeof inputValue);
    setInputText(inputValue);
  };

  return (
    <div className="App"> 
      <header className="App-header">
        <input 
          id='inopp'
          type="text"
          onChange={handleInputChange}
          placeholder="Enter item name"
          className="App-input"
        />
        <button className="App-button" onClick={handleSubmit}>
          Deete Item
        </button>
        <ul>
          {nj.map((item, index) => (
            <div>
              <li>{'Pid:'+item.patient_id}</li>
              <li>{'height:'+item.height}</li>
              <li>{'weight:'+item.weight}</li>

              
              <li>{nj1}</li>
            </div>
          ))}
        </ul>
        <button className="App-button" onClick={handleSubmit1}>
          Fetch
        </button>
         <button className="App-button" onClick={handleSubmit2}>
          Fetch P
        </button>
      </header>
    </div>
  );
}

export default App;