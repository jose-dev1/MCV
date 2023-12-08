import { DataGrid, esES } from '@mui/x-data-grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'


export default function DataTable (props) {
    
    const { columns, rows, tipoId, selectId } = props

    const theme = createTheme({
      palette: {
        primary: { main: '#1976d2' }
      }
    }, esES)
  
    const handleSelectionModelChange = (newSelectionModel) => {
      selectId(newSelectionModel)
    }
  
    return (
      <ThemeProvider theme={theme}>
         <main>
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
              getRowId={tipoId}
              onRowSelectionModelChange={(ids) => handleSelectionModelChange(ids)}
            />
          </div>
        </main>
      </ThemeProvider>
    )
  }
  