const btnsdeclinar = document.querySelectorAll("#btnDeclinar")

btnsdeclinar.forEach(button =>{
    
    button.addEventListener("click",()=> {
       
        const { value: text } = Swal.fire({
            input: 'textarea',
            inputLabel: '¿Desea rechasar la cita?, sele notificara al usuario, porfabor digite el motivo por el cual cancela la cita.',
            inputPlaceholder: 'Descripcion...',
            inputAttributes: {
              'aria-label': 'Type your message here'
            },
            confirmButtonText:'Enviar',
            showDenyButton:true,
            denyButtonText:`Cancelar`,
          })
          .then((result)=>{
            if(result.isConfirmed){
                swal.fire('Mensaje enviado','','success')
            }else if(result.isDenied){
                swal.fire('Mensaje no enviado','','info')
            }DashVeterinario
          })
          
          if (text) {
            Swal.fire(text)
          }
    });
})