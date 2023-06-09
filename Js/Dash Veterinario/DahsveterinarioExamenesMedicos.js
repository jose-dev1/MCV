function mostrarAlerta(){
    const selectModal = document.getElementById('floatingSelect');
    const opcionSelec = selectModal.options[selectModal.selectedIndex].value;
    
    if (opcionSelec === '1'){
        $('#myModal').modal('show');
    }else if (opcionSelec === '2'){
        $('#FIVAB_FeLV').modal('show');
    }else if (opcionSelec === '3'){
        $('#CDVAgTest').modal('show');
    }
}
