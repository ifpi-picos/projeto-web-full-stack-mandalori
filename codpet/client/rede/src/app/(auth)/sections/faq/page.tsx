import React from 'react';

const faqPanelStyle = {
  backgroundColor: 'transparent',
  padding: '10px',
  border: '1px solid #ccc',
  marginBottom: '10px',
};

function FAQ() {
  return (
    <div>
      <details aria-expanded={true} className="faq_panel" open>
        <summary className="faq_label"><strong>Origem</strong></summary>
          
        <div className="faq_panel-body">
          <p className="faq_panel-answer">CodPet é um projeto que está sendo desenvolvido por alunos do quarto período do curso de Análise e Desenvolvimento de Sistemas, do IFPI - Campus Picos.</p>
        </div>
      </details>
      
      <br />

      <div className="faq_body">
        <details aria-expanded={true} className="faq_panel" open>
          <summary className="faq_label"><strong>Proposta do Sistema</strong></summary>
          <div className="faq_panel-body">
            <p className="faq_panel-answer">
              Pensando em facilitar a localização de animais perdidos e ajudar na divulgação de adoção dos mesmos.
              <br /> 
              O projeto se propõe a ser uma central onde serão cadastrados os animais perdidos informações de seus respectivos donos e demais dados para possibilitar a devolução/adoção dos mesmos.
            </p>
          </div>
        </details>

        <br />

      </div>

      <div className="faq_body">
        <details aria-expanded={true} className="faq_panel" open>
          <summary className="faq_label"><strong>Uso</strong></summary>
          <div className="faq_panel-body">
            <p className="faq_panel-answer">
              O projeto é uma iniciativa e totalmente independente com fins acadêmicos, o mesmo é totalmente gratuito e pode ser utilizado por qualquer pessoa.
            </p>
          </div>
        </details>
      </div>

      <br />

      <div className="faq_body">
        <details aria-expanded={true} className="faq_panel" open>
          <summary className="faq_label"><strong>Termos de uso</strong></summary>
          <div className="faq_panel-body">
            <p className="faq_panel-answer">
              Ao se cadastrar você estará concordando e aceitando os termos de uso dos seus dados no nosso sistema, tendo em vista que manteremos a sua privacidade seguindo a risca com a política de privacidade existente.
            </p>
          </div>
        </details>
      </div>
    </div>
  );
}

export default FAQ;
