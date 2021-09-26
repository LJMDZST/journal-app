import cloudinary from 'cloudinary';
import { fileUpload } from "../../helpers/fileUpload";



cloudinary.config({ 
    cloud_name: 'dyxmxrjw6', 
    api_key: '644692433787194', 
    api_secret: 'Pe4-W_P4hHWytKENd_zQeM8ZPuI'
  });

describe('Pruebas en fileUpload', () => {
    jest.setTimeout(20000);
    
    test('debe cargar un archivo y retornar el URL', async()=>{
        
        // Se busca una imagen en google y se copia el url para llamarlo con fetch

        const resp = await fetch('https://media.tacdn.com/media/attractions-splice-spp-674x446/09/c3/33/97.jpg');

        // Se obtienen los datos binarios de la imagen con la response
        const blob = await resp.blob();

        // Se crea un archivo binario con la imagen
        const file = new File([blob], 'foto.jpg');

        // Se lo carga en cloudinary 

        const url = await fileUpload(file);

        expect(  typeof(url) ).toBe( 'string' );

        const segments = url.split('/');
        
        const imageId = segments[ segments.length -1 ].replace( '.jpg','');

        
        await cloudinary.v2.api.delete_resources(`${imageId}`, {}, (error,result )=>{
            //console.log(error,result);
        });


    })

})
