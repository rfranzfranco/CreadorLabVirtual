using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace CreadorLabVirtual.Layout
{
    public partial class NavMenu
    {
        [Inject] private IJSRuntime JS { get; set; } = default!;

        private async Task Salir()
        {
            var result = await JS.InvokeAsync<bool>("mostrarConfirmacionPersonalizada","Cerrar aplicación","¿Estás seguro de que deseas salir?","Sí, salir","Cancelar");
            if (result)
            {
                await JS.InvokeVoidAsync("window.close");
            }
        }
        private async Task AbrirArchivo()
        {
            // Llamar a la función JavaScript
            var fileInfo = await JS.InvokeAsync<dynamic>("mostrarDialogoArchivo");

            if (fileInfo != null)
            {
                Console.WriteLine($"Archivo seleccionado: {fileInfo.nombre}");
                Console.WriteLine($"Tamaño: {fileInfo.tamaño} bytes");

                // var contenido = await LeerArchivo(fileInfo.archivo);
            }
        }
        private async Task Guardar()
        {
            var resultado = await JS.InvokeAsync<dynamic>("mostrarDialogoGuardar", "miArchivo.fni");
        }
        private async Task GuardarComo()
        {
            var resultado = await JS.InvokeAsync<dynamic>("mostrarDialogoGuardar", "");
        }
    }
}
