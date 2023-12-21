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
import {v4} from 'uuid'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { database, databaseStorage } from '../firebase/config.js'
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'

const ChartTwo: React.FC = () => {
  const [partners, setPartners] = useState(null)
  const [partnerName, setPartnerName] = useState('')
  const [partnerNameEdit, setPartnerNameEdit] = useState('')
  const [partnerId, setPartnerId] = useState(null)
  const [image, setImage] = useState('');
  const [imgUrl, setImgUrl] = useState('')

  const value = collection(database, "partners")

  useEffect(()=>{
      const getData = async() => {
        const dbVal = await getDocs(value)
        setPartners(dbVal.docs.map((doc: { 
          data: () => any; id: any; 
        }) => ({
          id: doc.id,
          data: doc.data(),
        })
        ))
      }
      getData()
  }, [partnerName || partnerNameEdit || partners])

  useEffect(()=>{
      listAll(ref(databaseStorage,"files")).then(imgs=>{
          imgs.items.forEach(val=>{
              getDownloadURL(val).then(url=>{
                  setImgUrl(data=>[...data,url])
              })
          })
      })
  },[])

  // Create Partner

  const handleUpload = async() => {
    if(image !== null){
       const imgRef =  ref(databaseStorage,`files/${v4()}`)
       await uploadBytes(imgRef, image).then(value=>{
           getDownloadURL(value.ref).then(url=>{
              handleCreate(url)
           })
       })
    }
  }

  const handleCreate = async(url: string) => {
    await addDoc(value, {
        nama: partnerName,
        foto: `${url}`,
    })
          
    toast.success('Partner berhasil ditambahkan!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    setPartnerName('')
    setImage('')
    handleOpen()
  }

  const handleDelete = async(id) => {
    const deleteVal =  doc(database, "partners", id)
    await deleteDoc(deleteVal)
          
    toast.success('Partner berhasil dihapus!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
  }
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const handleCancel = () => {
    handleOpen()
  }

  // Edit Partner

  const handleUploadEdit = async() => {
    if(image !== null){
       const imgRef =  ref(databaseStorage,`files/${v4()}`)
       await uploadBytes(imgRef, image).then(value=>{
          getDownloadURL(value.ref).then(url=>{
            handleCreateEdit(url)
          })
       })
    }
  }

  const handleCreateEdit = async(url: string) => {
    const updateData = doc(database, "partners", partnerId)
    await updateDoc(updateData, {
        nama: partnerNameEdit,
        foto: `${url}`,
    })
          
    toast.success('Perubahan partner sukses!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    setPartnerNameEdit('')
    setImage('')
    handleOpenEdit()
  }
  
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = (id: any, nama: any) => {
    setPartnerId(id)
    setPartnerNameEdit(nama)
    setOpenEdit(!openEdit);
  }

  const handleCancelEdit = () => {
    handleOpenEdit()
  }

  return (
    <>
      {
        partners !== null &&
          <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="mb-4 justify-between gap-4 sm:flex">
              <div>
                <h4 className="text-2xl font-black dark:text-white">
                  Partners
                </h4>
              </div>
              <Link
                onClick={handleOpen}
                to="#"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-black py-2 px-6 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                <FiEdit />
                Add Partner
              </Link>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 pb-8'>
              {
                partners.map((partner, value) => {
                  return (
                    <div key={value} className='shadow p-4 rounded-3xl flex flex-col justify-center items-center'>
                      <div className='flex gap-2'>
                        <div className='px-4 py-1 border border-green-500 hover:bg-green-300 duration-300 hover:text-white mb-4 rounded-xl' onClick={()=> handleOpenEdit(partner.id, partner.data.nama)}>
                          Edit
                        </div>
                        <div className='px-4 py-1 border border-red-300 hover:bg-red-300 duration-300 hover:text-white mb-4 rounded-xl' onClick={()=> handleDelete(partner.id)}>
                          Delete
                        </div>
                      </div>
                      <div className='w-[100px]'>
                        <img
                          src={`${partner.data.foto}`}
                          className=''
                        />
                      </div>
                      <div className='mt-2'>
                        {
                          partner.data.nama
                        }
                      </div>
                    </div>
                  )
                })
              }
            </div>

            <Dialog open={open} handler={handleOpen} className='flex flex-col'>
              <DialogHeader>Add Partner</DialogHeader>
              <div className='w-full px-4'>
                <div>
                  <div>
                    Nama Partner
                  </div>
                  <input
                    type="text"
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    className="form-control w-full py-2 px-4 shadow rounded-xl"
                    id="title"
                    placeholder="Nama Partner"
                    required
                  />
                </div>
                <div>
                  <div className='mt-4'>
                    Foto
                  </div>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    // onChange={handleImage}
                    onChange={(e) => setImage(e.target.files[0])}
                    placeholder="Foto"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={handleCancel}
                  className="mr-2"
                >
                  <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="green" onClick={handleUpload}>
                {/* <Button variant="gradient" color="green" onClick={handleCreate}> */}
                  <span>Save</span>
                </Button>
              </DialogFooter>
            </Dialog>

            <Dialog open={openEdit} handler={handleOpenEdit} className='flex flex-col'>
              <DialogHeader>Edit Partner</DialogHeader>
              <div className='w-full px-4'>
                <div>
                  <div>
                    Nama Partner
                  </div>
                  <input
                    type="text"
                    value={partnerNameEdit}
                    onChange={(e) => setPartnerNameEdit(e.target.value)}
                    className="form-control w-full py-2 px-4 shadow rounded-xl"
                    id="title"
                    placeholder="Nama Partner"
                    required
                  />
                </div>
                <div>
                  <div className='mt-4'>
                    Foto
                  </div>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    // onChange={handleImage}
                    onChange={(e) => setImage(e.target.files[0])}
                    placeholder="Foto"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={handleCancelEdit}
                  className="mr-2"
                >
                  <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="green" onClick={handleUploadEdit}>
                {/* <Button variant="gradient" color="green" onClick={handleCreate}> */}
                  <span>Save</span>
                </Button>
              </DialogFooter>
            </Dialog>
          </div>
      }
    </>
  );
};

export default ChartTwo;
