function progres() {
	let timerInterval
  Swal.fire({
  title: 'Credenciales validad',
  html: 'Logeando en 2 segundos',
  timer: 2000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading()
    const b = Swal.getHtmlContainer().querySelector('b')
    timerInterval = setInterval(() => {
      b.textContent = Swal.getTimerLeft()
    }, 100)
  },
  willClose: () => {
    clearInterval(timerInterval)
  }
}).then((result) => {
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log('I was closed by the timer')
  }
})
}

function rpass(){
	Swal.fire({
		title: 'Digite su correo electronico',
		input: 'text',
		inputAttributes: {
		  autocapitalize: 'off'
		},
		showCancelButton: true,
		confirmButtonText: 'Enviar',
		showLoaderOnConfirm: true,
		preConfirm: (login) => {
		  return fetch(`//api.github.com/users/${login}`)
			.then(response => {
			  if (!response.ok) {
				throw new Error(response.statusText)
			  }
			  return response.json()
			})
			.catch(error => {
			  Swal.showValidationMessage(
				`Request failed: ${error}`
			  )
			})
		},
		allowOutsideClick: () => !Swal.isLoading()
	  }).then((result) => {
		if (result.isConfirmed) {
		  Swal.fire({
			title: `${result.value.login}'s avatar`,
			imageUrl: result.value.avatar_url
		  })
		}
	  })
}
