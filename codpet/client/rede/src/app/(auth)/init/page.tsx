import Link from "next/link";
import Image from "next/image";

const Page = () => {
  return (
    
    <div className="note text-center">
    <Image
      src="/cat.svg" // Substitua pelo caminho da sua imagem
      alt="Descrição da imagem"
      width={800} // Largura da imagem
      height={600} // Altura da imagem
    />
  
    <h1 className="text m-2" style={{ color: "#21344d", fontSize: "20px", fontWeight: "bold", fontStyle: "italic", alignItems: 'center' }}>Seja bem-vindo ao CodPet</h1>
    <p className="teste" style={{ color: "#21344d", fontSize: "16px", fontStyle: "italic", alignItems: 'center' }}>Sua rede de amizades para pets</p>
  
    <div className="d-flex justify-content-center flex-wrap">
      <button className="btn btn-primary m-2"
        style={{ fontSize: '1.5rem',  backgroundColor: '#1457ae', borderRadius: '10px', cursor: 'pointer', color: '#ffffff',width: '150px',}} >
        <Link href="/login">Entrar</Link>
      </button>
  
      <button
        className="btn btn-primary m-2"
        style={{ fontSize: '1.5rem',  backgroundColor: '#1457ae', borderRadius: '10px', cursor: 'pointer', color: '#ffffff', width: '150px',}}>
        <Link href="/register">Cadastrar-se</Link>
      </button>
    </div>
  </div>
  
  
  
  );
};

export default Page;
