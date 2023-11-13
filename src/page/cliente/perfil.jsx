import React from 'react';
import SideNav from '../../components/sidebarComponent'
import Header from '../../components/headerComponent'
import InfoPerfil from '../../components/client/infoComponent'

function Perfil() {

  return (

    <div>
      <Header />
      <InfoPerfil />
      <SideNav user={JSON.parse(localStorage.getItem('user'))} />

    </div>
  )
}

export default Perfil;
