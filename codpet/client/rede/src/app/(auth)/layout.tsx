import NavBar from "../components/NavBar";


function AuthPage({children} : {children:React.ReactNode}){
    return (
        <>
        <NavBar/>
        <main className="bg-[#4e77ad] bg-no-repeat bg-cover flex min-h-screen flex-col items-center justify-center">
            <form className="flex flex-col bg-white px-6 py-14 rounded-2xl gap-11">
                {children}
            </form>
        </main>
        </>
    )
}

export default AuthPage;