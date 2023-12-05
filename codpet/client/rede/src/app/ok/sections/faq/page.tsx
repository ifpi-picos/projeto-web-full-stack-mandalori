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
              Com a missão de facilitar a localização de animais perdidos e promover a adoção responsável, o projeto se apresenta como uma central de cadastros. Aqui, são registradas informações sobre animais perdidos, seus donos e outros detalhes, visando facilitar a devolução ou adoção desses animais.
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
              Ao cadastrar-se, você concorda e aceita os termos de uso dos seus dados no nosso sistema. Comprometemo-nos a manter sua privacidade de acordo com a política existente, seguindo rigorosamente suas diretrizes.
            </p>
          </div>
        </details>
      </div>
    </div></>

  );
}

export default Faq;
