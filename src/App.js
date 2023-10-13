import logo from './logo.svg';
import './App.css';
import { db } from './firebase';
import { useEffect, useState } from 'react';
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const tbl = collection(db, "user");
  const [data, setData] = useState("");
  const [record, setRecord] = useState([]);
  const [editId, setEditId] = useState("");
  const userCollectionRef = collection(db, "user");


  const getUser = async () => {
    const data = await getDocs(tbl);
    setRecord(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  const handleSubmit = async () => {
    let insert = await addDoc(tbl, { data: data });
    console.log(insert.id);
    if (insert) {
    } else {
      alert("not succesfully inserted!");
    }
    setData("");
    getUser();
  }

  const handleDelete = async (id) => {
    const userDoc = doc(db, "user", id);
    let res = await deleteDoc(userDoc);
    getUser();
  }

  const handleEdit = async (id, data) => {
    setData(data);
    setEditId(id);
    getUser();
  }

  const handleUpdate = async () => {
    const userDoc = doc(db, "user", editId);
    const newField = { data: data };
    await updateDoc(userDoc, newField);
    setData("");
    getUser();
  }

  useEffect(() => {
    getUser();
  },[])

  return (
    <center>
      <h1 className="m-5">To-do list</h1>
      <table style={{ backgroundColor: 'rgb(211, 211, 211)', width: '25%', display: 'flex', justifyContent: 'center', borderRadius: '10px' }}>
        <tr>
          {
            record.map((v) => {
              return (
                <tr key={v.id} >
                  <td className='h5'><input type='checkbox' className='mx-2' style={{width: '18px', height: "18px"}} />{v.data}</td>
                  <td>
                    <button className='btn btn-danger m-3' onClick={() => handleDelete(v.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg></button>
                    <button className='btn btn-success' onClick={() => handleEdit(v.id, v.data)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                    </svg></button>
                  </td>
                </tr>
              )
            })
          }
        </tr>
      </table>
      <br></br>
      <table>
        <tr>
          <td><input type='text' className='mx-3' style={{padding: '6px', borderRadius: "14px",backgroundColor:' rgb(211, 211, 211)'}} name='data' onChange={(e) => setData(e.target.value)} value={data} placeholder='Enter your task' /></td>
          <td>
            {
              editId ? (<button className='btn btn-success' onClick={() => handleUpdate()}>Edit</button>) : (<button className='btn btn-primary' onClick={() => handleSubmit()}>Submit</button>)
            }
          </td>
        </tr>
      </table>
    </center>
  );
}

export default App;
