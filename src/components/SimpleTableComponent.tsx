import React, { useState } from 'react'
import { TABLE_HEADING } from '../utils/TableHeading'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Container } from '@mui/material';

interface INPUT_DATA_TYPE {
  id: string,
  f_name: string ,
  l_name: string,
  email: string,
  phone: string ,
  address: string
}

type tableprops = 
{data : INPUT_DATA_TYPE[] | undefined,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  setFilledData: React.Dispatch<React.SetStateAction<INPUT_DATA_TYPE | null>>,
  deleteTableData: (id: string) => void
}



const SimpleTableComponent = ({data, setEmail, setFilledData, deleteTableData} : tableprops) => {

    const handleEditClick = (email: string, data: INPUT_DATA_TYPE) => {
      setEmail(email);
      setFilledData(data)
    }
    
  return (
    <Container sx={{overflow: "auto", padding: "0", display: "flex", }}>
    <table className='border-2 border-black min-w-5/6 overflow-auto'>
        <thead className='border-2 border-black'>
            <tr className='bg-blue-300 w-full'>

        {TABLE_HEADING.map((th, i)=> (
            
            <th key={i} className='border-2 border-black px-3' >{th}</th>
            
            ))}
            </tr>
        </thead>
        <tbody className='border-2 border-black'>
            
                {data?.map((i: INPUT_DATA_TYPE) => (
                    <tr key={i.id} className='border-2 border-black '>
                <td className=' border-2 border-black text-center p-2'>{i.f_name}</td>
                <td className=' border-2 border-black text-center p-2'>{i.l_name}</td>
                <td className=' border-2 border-black text-center p-2'>{i.email}</td>
                <td className=' border-2 border-black text-center p-2'>{i.phone}</td>
                <td className=' border-2 border-black text-center p-2'>{i.address}</td>
                <td className=' border-2 border-black text-center p-2'>

                <td className='px-3 border-2 border-black text-center p-2'><EditIcon color='info' onClick={()=> handleEditClick(i.email, i)}/></td>
                <td className='px-3 border-2 border-black text-center p-2'><DeleteIcon color='error' onClick={()=> deleteTableData(i.id)}/></td>
                </td>
                </tr>
                ))}
            
        </tbody>
    </table>
    </Container>
  )
}

export default SimpleTableComponent