export function mostrarAlerta(msg, tipo) {
    const div = document.getElementById('alerta');
    if (!div) {
        alert(msg);
        return;
    }
    div.className = `alert alert-${tipo}`;
    div.textContent = msg;
    div.classList.remove('d-none');
    setTimeout(() => div.classList.add('d-none'), 3000);
}


