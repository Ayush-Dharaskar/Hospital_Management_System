// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

// Create an instance of Express
const app = express();
const port = 5005; // Choose a port for your server

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
    const text = req.body.id; // Extract inputText from the request body
    const patientQuery = 'SELECT * FROM patient WHERE patient_id = $1';
    const bmiQuery = 'SELECT get_bmi($1) AS bmi'; // No need for DO block
    const dobQuery = 'SELECT TO_CHAR(dob, \'DD/MM/YYYY\') AS formatted_dob FROM patient where patient_id = $1';

    const patientResult = await pool.query(patientQuery, [text]);
    const bmiResult = await pool.query(bmiQuery, [text]);
    const dobResult = await pool.query(dobQuery,[text])
    patientResult.rows[0].dob=dobResult.rows[0].formatted_dob;
    res.json({ patient: patientResult.rows[0], bmi: bmiResult.rows[0].bmi });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to retrieve patient data from PostgreSQL' });
  }
});

app.post('/deptextract', async (req, res) => {
  try {
    // Extract inputText from the request body
    const deptquery = 'SELECT * from department';
    const depts=await pool.query(deptquery);
    res.json({ department: depts.rows });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to retrieve patient data from PostgreSQL' });
  }
});



app.post('/loginp', async (req, res) => {
  try {
    const text = req.body.username; // Extract inputText from the request body
    console.log(text);
    const patientQuery = 'SELECT TO_CHAR(dob, \'DD/MM/YYYY\') AS formatted_dob FROM patient where patient_id=($1)';

    const patientResult = await pool.query(patientQuery, [text]);
    console.log(patientResult.rows[0].formatted_dob);
    console.log(patientResult.rows[0]);
    res.json({ patient: patientResult.rows[0]});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to retrieve patient data from PostgreSQL' });
  }
});
app.post('/logind', async (req, res) => {
  try {
    const text = req.body.username; // Extract inputText from the request body
    console.log(text);
    const docq = 'SELECT pass FROM doctor where doctor_id=($1)';

    const docres = await pool.query(docq, [text]);
    console.log(docres.rows[0].pass);
    console.log(docres.rows[0]);
    res.json({ doctor: docres.rows[0]});
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

app.post('/newpatient', async (req, res) => {
  try {
    const text = req.body.formData; // Extract inputText from the request body
    pid=req.body.randd;
    pname = text.firstName+' '+text.lastName;
    mob = text.mobileNumber;
    gender = text.gender;
    add ='manipal'
    age =17
    height =160
    weight = 69
    blood = text.bloodGroup;
    dob = text.dob
    console.log(text);
    console.log(pid);
    console.log(pname);
    const patientQuery = 'insert into patient values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)';

    const patientResult = await pool.query(patientQuery, [pid,pname,mob,add,gender,age,height,weight,blood,dob]);

    res.status(200);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to retrieve patient data from PostgreSQL' });
  }
});

app.post('/doctor_from_department', async (req, res) => {
  try {
    var  text  = req.body.dept;
    console.log(text);
    const queryText = 'select * from doctor where dept_id = $1';
    const result = await pool.query(queryText,[text]);
    console.log(result);
    res.json({name: result.rows});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to add text to PostgreSQL' });
  }
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post('/reqappointment', async (req, res) => {
  try {
    var pid = req.body.pid;
    var  dept  = req.body.dept;
    var doc = req.body.doc;
    var date = req.body.date;
    var concern =req.body.concern;
    var status = 'Pending';
    

    const aid = 'select count(*) from appointment'; 
    aid = aid+1;
    
    console.log(req.body);
    console.log(aid);
    const queryText = 'insert into appointment(appointment_id,patient_id,doctor_id,appoint_date,status,reason) values($1,$1,$1,$1,$1)';
    const result = await pool.query(queryText,[aid,pid,doc,date,status,concern]);

    res.status(200);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to add text to PostgreSQL' });
  }
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
