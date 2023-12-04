import React from 'react'
import { FormAgregar } from '../../components/admin/agregarComponent'
import Sidebar from '../../components/sidebarComponent'

export default function AddEmploye () {
  return (
    <div className='flex gap-9'>
      <Sidebar />
      <div>
        <FormAgregar />
      </div>
    </div>
  )
}
