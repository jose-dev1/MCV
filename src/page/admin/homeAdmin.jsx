import React from 'react'
import SideNav from '../../components/sidebarComponent'
import { FormAgregar } from '../../components/admin/agregarComponent'
import Header from '../../components/headerComponent'

export default function AddEmploye () {
  return (
    <div>
      <Header />
      <FormAgregar />
      <SideNav />

    </div>
  )
}
