import React, { useEffect, useState } from 'react'
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
  const deleteTableData = (id: string) => {
    console.log("delete function called with id: ",id);
    
    setTableData((data) => {

      return data?.filter((t) => t.id != id)
    })


  }

  const updateTable = (newTableData: INPUT_DATA_TYPE, isEdit: boolean) => {
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
          let editableData = tableData?.map((p) => {
            if (p.email == email) return newTableData;
            else return p
          })
          return editableData
        }
      })

    }
    else if (!isEdit) {
      setTableData(prev => {
         if (prev && prev?.length > 0) {
        //   console.log("inside else => if settable");
      

          return [...prev, newTableData];
        
      }
         else {
        //   console.log("inside else => else settable");
          return [newTableData];
         }

       }
      )

    }

  }
  useEffect(() => {
    let localData = localStorage.getItem("tableData");
    console.log("localData: ", localData);
    if (localData) {
      console.log("inside localData if");

      setTableData(JSON.parse(localData))
    }
    // else {
    //   console.log("inside localData else");
    //   localStorage.setItem("tableData", JSON.stringify({}))
    // }

  }, [])
  useEffect(() => {
    localStorage.setItem("tableData", JSON.stringify(tableData));

  }, [tableData])
  return (
    <div>
      <RegisterForm updateTable={updateTable} filledData={filledData} setFilledData={setFilledData} />
      <SimpleTableComponent data={tableData} setEmail={setEmail} setFilledData={setFilledData} deleteTableData={deleteTableData} />
    </div>
  )
}

export default App