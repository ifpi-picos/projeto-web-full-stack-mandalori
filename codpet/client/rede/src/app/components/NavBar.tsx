import React from 'react';
import { FaHome } from 'react-icons/fa'; 

// Importe o ícone desejado

function NavBar() {
  return (
    <nav className="text-white p-4 flex justify-between" style={{ backgroundColor: "#4E77AD" }}>
      <div className="icone" style={{ marginLeft: '30px' }}>
        <ul className="mr-4"> 
          <li className="ml-4">
            <a aria-label="link do icone de inicio" href="/init">
              <FaHome size={45} />
            </a>
          </li>
        </ul>
      </div>

      <ul className="flex justify-end items-center font-bold text-lg" style={{marginRight: '30px', fontFamily: 'Inter', fontWeight: 'bold',  fontSize: '22px'}}>
        <li className="ml-4 hidden sm:block"><a href="/sections/faq">Sobre</a></li>
        <li className="ml-4 hidden sm:block"><a href="/sections/faqsection">Ajuda</a></li>
      </ul>
    </nav>
  );
}

export default NavBar;
