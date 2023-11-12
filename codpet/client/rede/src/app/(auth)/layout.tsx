

function AuthPage({children} : {children:React.ReactNode}){
    return (
        <main className="bg-[url('https://img.freepik.com/fotos-gratis/fundo-azul-do-gradiente-de-luxo-abstrato-liso-azul-escuro-com-vinheta-preta-studio-banner_1258-52379.jpg?w=996&t=st=1694711816~exp=1694712416~hmac=6798a3edc00a928449db3af875eae73980cab873a28b80c3fd708b7362f41148')] bg-no-repeat bg-cover flex min-h-screen flex-col items-center justify-center">
        <form className="flex flex-col bg-white px-6 py-14 rounded-2xl gap-11">
            {children}
        </form>
        </main>
    )
}

export default AuthPage;