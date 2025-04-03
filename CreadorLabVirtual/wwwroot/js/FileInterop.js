// Función para abrir el explorador de archivos y devolver el archivo seleccionado
window.mostrarDialogoArchivo = async () => {
    return new Promise((resolve) => {
        // Crear un input de tipo "file" oculto
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.style.display = 'none';

        // Escuchar cuando el usuario selecciona un archivo
        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0]; // Obtener el archivo seleccionado
            if (file) {
                // Devolver información del archivo (nombre, tipo, tamaño, etc.)
                resolve({
                    nombre: file.name,
                    tipo: file.type,
                    tamaño: file.size,
                    ultimaModificacion: file.lastModified,
                    archivo: file, // Referencia al objeto File (útil para leer contenido)
                });
            } else {
                resolve(null); // Si el usuario cancela
            }
        });

        // Mostrar el diálogo de selección de archivos
        document.body.appendChild(fileInput);
        fileInput.click();
        document.body.removeChild(fileInput);
    });
};
window.mostrarConfirmacionPersonalizada = (title, text, confirmButtonText, cancelButtonText) => {
    return Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        customClass: {
            popup: 'swal-custom'
        }
    }).then((result) => {
        return result.isConfirmed;
    });
};
window.mostrarDialogoGuardar = async (nombrePredeterminado = "archivo.txt") => {
    return new Promise((resolve) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(new Blob([""], { type: "text/plain" }));
        link.download = nombrePredeterminado;
        link.style.display = 'none';

        link.addEventListener('click', () => {
            setTimeout(() => {
                resolve({ nombre: nombrePredeterminado });
                URL.revokeObjectURL(link.href);
            }, 100);
        });

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
};