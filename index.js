require('dotenv').config()

const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");


const main = async () => {

    const busquedas= new Busquedas();
    let opt ;

    do{
        //Esta funcion imprime el menu
        opt = await inquirerMenu();

        // console.log({ opt });
        
        switch (opt) {
            case 1:
                //Mostrar Mensaje
                const terminoBusq = await leerInput('Cuidad: ');
               

                //Buscar los lugares
                const lugares= await busquedas.cuidad( terminoBusq );
                

                //Seleccionar el lugar
                const id = await listarLugares(lugares);
                if ( id === '0') continue;

                const lugarSel = lugares.find(l => l.id === id );

                //Guardar en DB
                busquedas.agregarHistorial( lugarSel.nombre );
                
                
                //Clima
                const clima = await busquedas.climaLugar( lugarSel.lat, lugarSel.lng);

                //Mostrar resultados
                console.clear();
                console.log('\Información de la Ciudad\n'.blue);
                console.log('Cuidad:', lugarSel.nombre.red);
                console.log('Lat:', lugarSel.lat);
                console.log('lng:', lugarSel.lng);
                console.log('Temperatura:', clima.temp);
                console.log('Mínima:', clima.min);
                console.log('Máxima:', clima.max);
                console.log('Como esta el clima:',clima.desc.red);


                break;   
        
            case 2:
                busquedas.historialCapitalizado.forEach((lugar, i )=> {
                     const idx = `${ i + 1}.`.blue;
                     console.log(`${idx} ${ lugar}`);
                })

            break;

                   
        }

        await pausa();
        
    } while ( opt !==0);


}

main ();