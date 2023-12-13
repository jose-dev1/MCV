import { DataGrid, esES } from '@mui/x-data-grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'


export default function DataTable(props) {
  const { columns, rows, selectId, selectRow, title } = props

  const theme = createTheme({
    palette: {
      primary: { main: '#1976d2' }
    }
  }, esES)

  const handleSelectionModelChange = (customId) => {
    const busqueda = rows.filter((obj) => {
      return obj.id === customId[0]
    })

    selectId(customId[0])
    selectRow(busqueda[0])
  }


  return (
    <ThemeProvider theme={theme}>
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
          loading={!rows.length}
          onRowSelectionModelChange={(ids) => handleSelectionModelChange(ids)}
        />
      </div>
    </ThemeProvider>
  )
}
