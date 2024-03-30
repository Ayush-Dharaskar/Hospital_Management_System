// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

// Create an instance of Express
const app = express();
const port = 5000; // Choose a port for your server

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// PostgreSQL configuration
const pool = new Pool({
  user: 'jrejopgd',
  host: 'bubble.db.elephantsql.com',
  database: 'jrejopgd',
  password: 'AC9ZVG5FNdUDF4mOQhqH2O-oS4d6_BHI',
  port: 5432, // Default PostgreSQL port
});

pool.connect();
// Test the database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database', err);
  } else {
    console.log('Connected to the database');
  }
});

// Define your API endpoints
app.post('/add_text_to_postgresql', async (req, res) => {
  try {
    var  text  = req.body;
    console.log(text.inputText);
    text=text.inputText;
    const queryText = 'DELETE from item where item_name =($1)';
    await pool.query(queryText, [text]);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to add text to PostgreSQL' });
  }
});

app.post('/patientextract', async (req, res) => {
  try {
    const text = req.body.inputText; // Extract inputText from the request body
    const patientQuery = 'SELECT * FROM patient WHERE patient_id = $1';
    const bmiQuery = 'SELECT get_bmi($1) AS bmi'; // No need for DO block

    const patientResult = await pool.query(patientQuery, [text]);
    const bmiResult = await pool.query(bmiQuery, [text]);

    res.json({ patient: patientResult.rows, bmi: bmiResult.rows[0].bmi });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to retrieve patient data from PostgreSQL' });
  }
});


app.post('/add_text_to_postgresql', async (req, res) => {
  try {
    var  text  = req.body;
    console.log(text.inputText);
    text=text.inputText;
    const queryText = 'DELETE from item where item_name =($1)';
    await pool.query(queryText, [text]);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to add text to PostgreSQL' });
  }
});

app.post('/fetch', async (req, res) => {
  try {
    var  text  = req.body;
    console.log(text.inputText);
    text=text.inputText;
    const queryText = 'select * from item';
    const result = await pool.query(queryText);
    res.json({item: result.rows});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to add text to PostgreSQL' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
