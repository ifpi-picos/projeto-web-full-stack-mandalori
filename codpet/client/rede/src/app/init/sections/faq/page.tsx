import React from 'react';

const faqPanelStyle = {
  backgroundColor: 'transparent',
  padding: '10px',
  border: '1px solid #ccc',
  marginBottom: '10px',
};

function Faq() {
  return (
    <><title>Perguntas Frequentes - CodPet</title><div className="space-y-4">
      <details className="faq_panel bg-gray-100 p-4 rounded" open>
        <summary className="faq_label font-bold cursor-pointer">Origem</summary>
        <div className="faq_panel-body mt-2">
          <p className="faq_panel-answer text-gray-700">
            O CodPet é um projeto desenvolvido por alunos do quarto período do curso de Análise e Desenvolvimento de Sistemas, no IFPI - Campus Picos.
          </p>
        </div>
      </details>

      <div className="faq_body">
        <details className="faq_panel bg-gray-100 p-4 rounded" open>
          <summary className="faq_label font-bold cursor-pointer">Proposta do Sistema</summary>
          <div className="faq_panel-body mt-2">
            <p className="faq_panel-answer text-gray-700">
            O projeto propõe uma rede social inovadora para facilitar a localização de animais perdidos e promover a adoção responsável. Diante da obsolescência dos métodos tradicionais de divulgação, a plataforma oferece aos donos de animais um espaço centralizado para compartilhar informações detalhadas. Buscando ser mais perceptível e eficiente do que os meios convencionais, a proposta visa engajar a comunidade, criando uma atmosfera colaborativa para ampliar as chances de localização e adoção. Esperamos que essa abordagem moderna não apenas atenda à necessidade imediata de encontrar animais perdidos, mas também fomente uma cultura de cuidado e responsabilidade.
            </p>
          </div>
        </details>
      </div>

      <div className="faq_body">
        <details className="faq_panel bg-gray-100 p-4 rounded" open>
          <summary className="faq_label font-bold cursor-pointer">Uso</summary>
          <div className="faq_panel-body mt-2">
            <p className="faq_panel-answer text-gray-700">
              O CodPet é uma iniciativa acadêmica totalmente independente. Gratuito e acessível a todos, o projeto busca contribuir para a localização de animais perdidos e incentivar a adoção, sendo aberto ao uso por qualquer pessoa interessada.
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
    </div></>

  );
}

export default Faq;
