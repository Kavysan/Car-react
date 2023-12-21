import { useState } from 'react'
import Button from './Button'
import Modal from './Modal'
import { server_calls } from '../api/server';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetData } from '../custom-hooks/FetchData';
import { makeStyles } from '@mui/styles';

const columns: GridColDef[] = [
    { field: 'make', headerName: 'MAKE', flex: 2 },
    { field: 'model', headerName: 'MODEL', flex: 2 },
    { field: 'year', headerName: 'YEAR', flex: 2 },
    { field: 'color', headerName: 'COLOR', flex: 2 },
];

const useStyles = makeStyles({
    root: {
      '& .MuiDataGrid-root': {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        color: 'black',

      },
    },
});

function DataTable() {
  const [ open, setOpen ] = useState(false);
  const { contactData, getData } = useGetData();
  const [ selectionModel, setSelectionModel ] = useState<string[]>([])
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const deleteData = () => {
    server_calls.delete(selectionModel[0]);
    getData();
    console.log(`Selection model: ${selectionModel}`)
    setTimeout( () => { window.location.reload() }, 1000)
  }

  return (
    <>
        <Modal 
            id={selectionModel}
            open={open}
            onClose={handleClose}
        />
        <div className='flex flex-col items-center justify-center'>
            <div className='flex flex-row justify-center items-center'>
            <Button onClick={handleOpen} className='p-3 bg-blue-800 text-sky-100 m-3 rounded hover:bg-slate-800 hover:text-white' >ADD CAR</Button>
            <Button onClick={handleOpen} className='p-3 bg-blue-800 text-sky-100 m-3 rounded hover:bg-slate-800 hover:text-white'>UPDATE</Button>
            <Button onClick={deleteData} className="p-3 bg-blue-800 text-sky-100 m-3 rounded hover:bg-slate-800 hover:text-white" >DELETE</Button>
        </div>
        <div
        className={open ? 'hidden' : `${classes.root} container mx-auto my-5 flex flex-col`}
          style={{ height: 400, width: '80%' }}
          >
            <h2 className='p-3 bg-blue-800 font-bold text-white rounded w-full text-center'>MY COLLECTION</h2>

            <DataGrid rows={contactData} columns={columns}
            checkboxSelection={true} 
            onRowSelectionModelChange={ (item:any) => {
              setSelectionModel(item)
            }}
            componentsProps={{
                pagination: {
                    rowsPerPageOptions: [5]
                }
            }}
            />
        </div></div>
    </>
  )
}

export default DataTable
