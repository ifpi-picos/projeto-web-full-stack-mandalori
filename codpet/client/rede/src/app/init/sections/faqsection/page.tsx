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
  <title>Conheça o Sistema CodPet</title>

  <div className="space-y-4">
    <details className="faq_panel bg-gray-100 p-4 rounded" open>
      <summary className="faq_label font-bold cursor-pointer">Proposta do Sistema</summary>
      <div className="faq_panel-body mt-2">
        <p className="faq_panel-answer text-gray-700">
          O CodPet nasceu da ideia de tornar mais fácil a localização de animais perdidos e promover a adoção responsável. A proposta é criar uma central onde informações sobre animais perdidos, seus donos e outros detalhes sejam cadastrados, facilitando a devolução ou adoção dos mesmos.
        </p>
      </div>
    </details>

    <div className="faq_body">
      <details className="faq_panel bg-gray-100 p-4 rounded" open>
        <summary className="faq_label font-bold cursor-pointer">Uso</summary>
        <div className="faq_panel-body mt-2">
          <p className="faq_panel-answer text-gray-700">
            O CodPet é um projeto independente com propósitos acadêmicos. Totalmente gratuito, ele está disponível para ser utilizado por qualquer pessoa interessada em contribuir para a causa da localização de animais perdidos e promoção da adoção responsável.
          </p>
        </div>
      </details>
    </div>

    <div className="faq_body">
      <details className="faq_panel bg-gray-100 p-4 rounded" open>
        <summary className="faq_label font-bold cursor-pointer">Termos de Uso</summary>
        <div className="faq_panel-body mt-2">
          <p className="faq_panel-answer text-gray-700">
            Ao se cadastrar no CodPet, você concorda e aceita os termos de uso dos seus dados no nosso sistema. Garantimos a total privacidade e seguimos rigorosamente a política de privacidade existente para proteger suas informações.
          </p>
        </div>
      </details>
    </div>
  </div>
</>

    );
  }
  
  export default Section;
  