import React, { useState } from 'react'
import SimpleTableComponent from './components/SimpleTableComponent'
import RegisterForm from './components/RegisterForm'


interface INPUT_DATA_TYPE {
  id: string,
  f_name: string,
  l_name: string,
  email: string,
  phone: string,
  address: string
}


const App = () => {
  const [tableData, setTableData] = useState<INPUT_DATA_TYPE[]>();
  const [email, setEmail] = useState('')
  const [filledData, setFilledData] = useState<INPUT_DATA_TYPE | null>(null);

  const updateTable = (newTableData: INPUT_DATA_TYPE, isEdit: boolean) => {
    console.log(isEdit);

    if (isEdit) {
      setTableData(prev => {
        console.log("previous length :", prev?.length);
        
        if (prev && prev?.length == 1) {
          console.log("inside if => if settable");

          return [newTableData];
        }
        else if (prev && prev?.length > 1) {
          console.log(prev);
          console.log("inside if => else settable");
          let editableData = tableData?.map((p)=> {
            if (p.email == email) return newTableData;
            else return p 
          })
          return editableData

          
        }
        //return [...prev, newTableData];
      })
    }
    else if (!isEdit) {
      setTableData(prev => {
        if (prev && prev?.length > 0) {
          console.log("inside else => if settable");

          return [...prev, newTableData];
        }
        else {
          console.log("inside else => else settable");
          return [newTableData];
        }

      })
    }

  }


  // console.log(`email: ${email} `);
  // console.log(filledData?.phone);


  // console.log("tableData ", tableData);

  return (
    <div>
      <RegisterForm updateTable={updateTable} filledData={filledData} setFilledData={setFilledData} />
      <SimpleTableComponent data={tableData} setEmail={setEmail} setFilledData={setFilledData} />
    </div>
  )
}

export default App