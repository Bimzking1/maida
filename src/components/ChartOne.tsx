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

import { database } from '../firebase/config.js'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'

const ChartOne: React.FC = () => {
  const [val, setVal] = useState(null)
  const [about, setAbout] = useState('')

  const value = collection(database, "database")

  useEffect(()=>{
      const getData = async() => {
        const dbVal = await getDocs(value)
        setVal(dbVal.docs.map((doc: { 
          data: () => any; id: any; 
        }) => ({
          id: doc.id,
          data: doc.data(),
        })
        ))
      }
      getData()
  }, [about])

  const handleUpdate = async () => {
    const taskDocRef = doc(database, 'database', val[0].id)
    try{
      await updateDoc(taskDocRef, {
        text: about,
      })
          
      toast.success('Perubahan sukses!', {
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
    setAbout(val[0].data.text)
  }
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <>
      {
        val !== null &&
          <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
            <div className="flex flex-col flex-wrap items-start justify-between gap-3 sm:flex-nowrap">

              <div className='font-black flex justify-between w-full items-center'>
                <div className='text-2xl dark:text-white'>
                  About Us
                </div>
                <Link
                  onClick={handleOpen}
                  to="#"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-black py-2 px-6 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  <FiEdit />
                  Edit
                </Link>
              </div>
              <div>
                {val[0].data.text}
              </div>

            </div>
            <Dialog open={open} handler={handleOpen} className='flex flex-col'>
              <DialogHeader>About Us</DialogHeader>
              <textarea
                className='mx-4 h-[500px] lg:h-[200px] border p-4'
                value={about === '' ? val[0].data.text : about}
                onChange={(e) => setAbout(e.target.value)}
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

export default ChartOne;
