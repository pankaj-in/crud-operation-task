import React, { useState, useEffect } from 'react';
import './App.css';
import { EmployeeData } from './EmployeeData';

function App() {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [id, setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setData(EmployeeData);
  }, []);

  const handEdit = (id) => {
    const dt = data.filter((item) => item.id === id);
    if (dt !== undefined) {
      setIsUpdate(true);
      setId(id);
      setFirstName(dt[0].firstName);
      setLastName(dt[0].lastName);
      setAge(dt[0].age);
    }
  };

  const handDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const dt = data.filter((item) => item.id !== id);
      setData(dt);
    }
  };

  const handSave = (e) => {
    e.preventDefault();
    const newObject = {
      id: EmployeeData.length + 1,
      firstName: firstName,
      lastName: lastName,
      age: age
    };
    const dt = [...data];
    setData([...dt, newObject]);
  };

  const handUpdate = () => {
    const index = data.findIndex((item) => item.id === id);
    const dt = [...data];
    dt[index].firstName = firstName;
    dt[index].lastName = lastName;
    dt[index].age = age;
    setData(dt);
    handClear();
  };

  const handClear = () => {
    setId(0);
    setFirstName('');
    setLastName('');
    setAge('');
    setIsUpdate(false);
  };

  return (
    <div className='App'>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: "10px", marginBottom: "10px" }}>
        <div>
          <label>First Name :
            <input type='text' placeholder='Enter First Name' onChange={(e) => setFirstName(e.target.value)} value={firstName} />
          </label>
        </div>
        <div>
          <label>Last Name :
            <input type='text' placeholder='Enter Last Name' onChange={(e) => setLastName(e.target.value)} value={lastName} />
          </label>
        </div>
        <div>
          <label>Age :
            <input type='text' placeholder='Enter Age' onChange={(e) => setAge(e.target.value)} value={age} />
          </label>
        </div>
        <div>
          {
            !isUpdate ?
              <button className='btn btn-primary' onClick={handSave}>Save</button>
              :
              <button className='btn btn-primary' onClick={handUpdate}>Update</button>
          }
        </div>
        <button className='btn btn-danger' onClick={handClear}>Clear</button>
      </div>
      <table className='table table-hover'>
        <thead>
          <tr>
            <td>S.No.</td>
            <td>Id</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Age</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.age}</td>
                <td>
                  <button className='btn btn-primary' onClick={() => handEdit(item.id)}>Edit</button>
                  <button className='btn btn-danger' onClick={() => handDelete(item.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
