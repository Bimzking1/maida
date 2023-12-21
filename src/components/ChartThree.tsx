import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from "react-icons/fi";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { database, databaseStorage } from '../firebase/config.js'
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'

const ChartThree: React.FC = () => {
  const [contacts, setContacts] = useState(null)
  const [email, setEmail] = useState('')
  const [telepon, setTelepon] = useState('')
  const [alamat, setAlamat] = useState('')

  const value = collection(database, "contacts")

  useEffect(()=>{
      const getData = async() => {
        const dbVal = await getDocs(value)
        setContacts(dbVal.docs.map((doc: { 
          data: () => any; id: any; 
        }) => ({
          id: doc.id,
          data: doc.data(),
        })
        ))
      }
      getData()
  }, [contacts])

  const handleUpdate = async () => {
    const taskDocRef = doc(database, 'contacts', contacts[0].id)
    try{
      await updateDoc(taskDocRef, {
        email: email,
        telepon: telepon,
        alamat: alamat,
      })
          
      toast.success('Perubahan contact sukses!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
      });
      handleOpen()
    } catch (err) {
      alert(err)
    }
  }

  const handleCancel = () => {
    handleOpen()
    setEmail(contacts[0].data.email)
    setTelepon(contacts[0].data.telepon)
    setAlamat(contacts[0].data.alamat)
  }
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <>
      {
        contacts !== null &&
          <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="mb-4 justify-between gap-4 sm:flex">
              <div>
                <h4 className="text-2xl font-black dark:text-white">
                  Contacts
                </h4>
              </div>
              <Link
                onClick={handleOpen}
                to="#"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-black py-2 px-6 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                <FiEdit />
                Edit Contacts
              </Link>
            </div>
            <div>
              <div className='font-semibold'>
                Email
              </div>
              <div className='mb-4'>
                {contacts[0].data.email}
              </div>
              <div className='font-semibold'>
                Phone
              </div>
              <div className='mb-4'>
                {contacts[0].data.telepon}
              </div>
              <div className='font-semibold'>
                Alamat
              </div>
              <div>
                {contacts[0].data.alamat}
              </div>
            </div>
            <Dialog open={open} handler={handleOpen} className='flex flex-col'>
              <DialogHeader>Edit Contacts</DialogHeader>
              <div className='text-xl text-black mb-2 font-semibold mx-4'>
                Email
              </div>
              <input
                className='mx-4 border p-4'
                value={email === '' ? contacts[0].data.email : email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className='text-xl text-black my-2 font-semibold mx-4'>
                Telepon
              </div>
              <input
                className='mx-4 border p-4'
                value={telepon === '' ? contacts[0].data.telepon : telepon}
                onChange={(e) => setTelepon(e.target.value)}
              />
              <div className='text-xl text-black my-2 font-semibold mx-4'>
                Alamat
              </div>
              <input
                className='mx-4 border p-4'
                value={alamat === '' ? contacts[0].data.alamat : alamat}
                onChange={(e) => setAlamat(e.target.value)}
              />
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={handleCancel}
                  className="mr-2"
                >
                  <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="green" onClick={() => handleUpdate()}>
                  <span>Save</span>
                </Button>
              </DialogFooter>
            </Dialog>
          </div>
      }
    </>
  );
};

export default ChartThree;
