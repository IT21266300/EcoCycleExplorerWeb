import React, { useEffect, useRef, useState } from 'react'
import { addDoc,collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';


export default function Test() {

    const [newName, setNewName] = useState("");
    const [newDescription, setNewDescription] = useState("");

    const [destinations, setDestinations] = useState([]);
    const desCollection = collection(db, "destinations");

    const AddDestination = async () => {
        await addDoc(desCollection, {name: newName, description: newDescription})
    }

    const updateName = async (id, name) => {
        const desDoc = doc(db, "destinations", id)
        const newData = {name: "Colombo"}
        await updateDoc(desDoc,newData);
    }

    const deleteDestination = async (id) => {
        const desDoc = doc(db, "destinations", id)
        await deleteDoc(desDoc);
    }

    useEffect(() => {
        const getDestinations = async () => {
            const data = await getDocs(desCollection);
            setDestinations(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }

        getDestinations();

    })

  return (
    <div>
            <input type='text' placeholder='name' onChange={(e) => {setNewName(e.target.value)}}/>
            <input type='text' placeholder='description' onChange={(e) => {setNewDescription(e.target.value)}}/>
            <button onClick={AddDestination}>create</button>
        {destinations.map((dest) => {
            return (
                <div key={dest.id}>
                    <h1>{dest.name}</h1>
                    <h1>{dest.description}</h1>
                    <button onClick={() => {updateName(dest.id, dest.description)}}>Update Name</button>
                    <button onClick={() => {deleteDestination(dest.id)}}>Delete</button>
                </div>
            )
        })}
    </div>
  )
}
