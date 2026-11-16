// function buscarUsuario(): string {
//     let nome = ''

//     //Simulção de uma operação demorada (API, banco de dados, etc)
//     setTimeout(() => {
//         nome = 'Cris'
// }, 2000)

// return nome
// }

function buscarUsuario(): Promise<string> {
 return new Promise((resolve) => {
    setTimeout(() => { resolve('Cris') }, 2000)
})

}

async function exibirusuarioo() {


    console.log('Antes')
 
    const nome = await buscarUsuario()
    console.log(nome) 

    console.log('Depois')
}

exibirusuarioo()
