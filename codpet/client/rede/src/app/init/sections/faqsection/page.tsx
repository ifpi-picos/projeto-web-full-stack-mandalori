import React from 'react';

const faqStyle = {
    backgroundColor: 'transparent',
    padding: '10px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  };

  function Section() {
    return (
<>
  <title>Perguntas Frequentes - CodPet</title>

  <div className="space-y-4">
    <details className="faq_panel bg-gray-100 p-4 rounded" open>
      <summary className="faq_label font-bold cursor-pointer">Quem pode utilizar o CodPet?</summary>
      <div className="faq_panel-body mt-2">
        <p className="faq_panel-answer text-gray-700">
        O CodPet é aberto a qualquer pessoa interessada em contribuir para a localização de animais perdidos e na promoção da adoção responsável. Seja um dono procurando seu animal ou alguém interessado em adotar, todos são bem-vindos.
        </p>
      </div>
    </details>

    <div className="faq_body">
      <details className="faq_panel bg-gray-100 p-4 rounded" open>
        <summary className="faq_label font-bold cursor-pointer">Como posso contribuir para o CodPet?</summary>
        <div className="faq_panel-body mt-2">
          <p className="faq_panel-answer text-gray-700">
          Você pode contribuir para o CodPet cadastrando informações sobre animais perdidos, compartilhando os casos nas nossa plataforma. Quanto mais a comunidade colaborar, mais eficiente será o sistema.
          </p>
        </div>
      </details>
    </div>

    <div className="faq_body">
      <details className="faq_panel bg-gray-100 p-4 rounded" open>
        <summary className="faq_label font-bold cursor-pointer">O CodPet cobra algum tipo de taxa?</summary>
        <div className="faq_panel-body mt-2">
          <p className="faq_panel-answer text-gray-700">
          Não, o CodPet é totalmente gratuito. É uma iniciativa acadêmica independente que busca contribuir para a localização de animais perdidos e incentivar a adoção, sendo acessível a todos sem nenhum custo.
          </p>
        </div>
      </details>
    </div>
  </div>
</>

    );
  }
  
  export default Section;
  