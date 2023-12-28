import Link from "next/link";
import Image from "next/image";

const Page = () => {
  return (
<>
  <title>Bem-Vindo ao CodPet</title>
  
  <div className="note text-center">
        <Image
          src="/cat.svg"
          alt="Descrição da imagem"
          width={800}
          height={600}
          priority={true}  // Add priority attribute
        />

    <h1 className="text m-2" style={{ color: "#21344d", fontSize: "20px", fontWeight: "bold", fontStyle: "italic", alignItems: 'center' }}>Seja bem-vindo ao CodPet</h1>
    <p className="teste" style={{ color: "#21344d", fontSize: "16px", fontStyle: "italic", alignItems: 'center' }}>Nossa plataforma busca contribuir para a localização de animais perdidos e incentivar a adoção, sendo aberto ao uso por qualquer pessoa interessada.</p>

    <div className="flex justify-center flex-wrap">
      <Link className="bg-blue-800 hover:bg-blue-500 text-white font-bold m-2 px-3 py-1 rounded-md transition duration-300 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        href="/login">
        Entrar
      </Link>

      <Link className="bg-blue-800 hover:bg-blue-500 text-white font-bold m-2 px-3 py-1 rounded-md transition duration-300 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        href="/register">
        Cadastrar-se
      </Link>
      </div>
  </div>
</>
  );
};

export default Page;