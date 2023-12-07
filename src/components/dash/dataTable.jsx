import {useState} from 'react'
import { DataGrid, esES } from '@mui/x-data-grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Botonera from './botonera'


export default function DataTable (props) {
    
    const { columns,rows,tipoId } = props

    const getRowId = (rows) => tipoId

    const theme = createTheme({
      palette: {
        primary: { main: '#1976d2' }
      }
    }, esES)
  
    const [selectionModel, setSelectionModel] = useState([])
  
    const handleSelectionModelChange = (newSelectionModel) => {
      setSelectionModel(newSelectionModel)
    }
  
    return (
      <ThemeProvider theme={theme}>
        <main>
          <Botonera />
          <div className='mt-3 pl-10 pr-10' style={{ height: 'auto', width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 }
                }
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              loading={!rows.length}
              getRowId={getRowId}
              onRowSelectionModelChange={(ids) => handleSelectionModelChange(ids)}
            />
          </div>
        </main>
      </ThemeProvider>
    )
  }
  