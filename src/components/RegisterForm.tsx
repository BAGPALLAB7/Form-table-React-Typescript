import { Box, Button, TextField, Typography, createTheme, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {INPUT_DATA_TYPE} from "../utils/Types"


type Props = {
    updateTable: (newTableData: INPUT_DATA_TYPE , isEdit: boolean) => void,
    filledData: INPUT_DATA_TYPE | null,
    setFilledData: React.Dispatch<React.SetStateAction<INPUT_DATA_TYPE | null>>

}



const RegisterForm = ({ updateTable, filledData, setFilledData }: Props) => {
    //console.log("filledData: ",filledData);

    //console.log("initial_state : ",initial_state);


    const [input, setInput] = useState<INPUT_DATA_TYPE>({} as INPUT_DATA_TYPE)

    useEffect(() => {
        if (filledData)
            setInput(filledData)
    }, [filledData])

    //console.log("input value", input);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput((input) => {
            if (e.target.name == 'email') {
                //console.log("im inside email edit");

                return {
                    ...input, ['id']: e.target.value, [e.target.name]: e.target.value
                }
            }
            else
                return {
                    ...input, [e.target.name]: e.target.value
                }
        })
    }



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(filledData){
            updateTable(input, true);
        setFilledData(null)
        setInput({} as INPUT_DATA_TYPE);
        }
        else{
            updateTable(input, false)

            setInput({} as INPUT_DATA_TYPE);
        }
        


    }
    const theme = createTheme({
        breakpoints: {
          values: {
             // small phone
            xs: 300, // phone
            sm: 600,
            md: 900, // small laptop
            lg: 1200, // desktop
            xl: 1536 // large screens
          }
        }
      });
    


    return (
        <div className='text-center items-center flex  flex-col w-screen overflow-auto mx-auto '>
            <Typography variant={'h1'} sx={{ fontSize: {xs:"35px", md: "40px", lg: "60px"}}} color={'secondary'} className='text-3xl py-5 '>Registration Form</Typography>
            <Box id='form'  component="form" autoComplete='off' sx={{ display: "flex", flexDirection: "column", gap: "15px", padding: "20px 10px" , alignItems: "center", width: {xs:"80%", md: "50%", lg: "40%"}}} onSubmit={(e) => handleSubmit(e)}>
                <TextField fullWidth name="f_name" label="First Name" variant="outlined" value={input?.f_name } onChange={handleChange} />
                <TextField fullWidth name="l_name" label="Last Name" variant="outlined" onChange={handleChange} value={input.l_name} />
                <TextField fullWidth name="email" label="Email" variant="outlined" onChange={handleChange} value={input.email} disabled={filledData ? true : false} />
                <TextField fullWidth name="phone" type="phone" label="Phone" variant="outlined" onChange={handleChange} value={input.phone} />
                <TextField fullWidth name="address" label="Address" variant="outlined" onChange={handleChange} value={input.address} />
                {filledData ? <Button variant='contained' type='submit' sx={{ marginTop: "30px" }}>Save</Button> :
                    <Button variant='contained' type='submit' sx={{ marginTop: "30px" }}>Submit</Button>}
            </Box>
        </div>
    )
}

export default RegisterForm