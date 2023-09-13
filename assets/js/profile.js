var ul = document.querySelector('nav ul');
var menuBtn = document.querySelector('.menu-btn i');

function menuShow() {
    if (ul.classList.contains('open')) {
        ul.classList.remove('open');
    }else{
        ul.classList.add('open');
    }
}

const panels = document.querySelectorAll('.faq_panel');

const panellabels = document.querySelectorAll('.faq_label');

panels.forEach((panel, index) => { let isExpanded = panel.getAttribute('aria-expanded') === 'true';


    panellabels[index].addEventListener('click', () => { console.log('clicked');

isExpanded=!isExpanded;

panel.setAttribute('aria-expanded', isExpanded);

});
});


// Obtém os elementos do perfil
var profileInfo = document.getElementById("profileInfo");
var editButton = document.getElementById("editButton");
var saveButton = document.getElementById("saveButton");
var nameSpan = document.getElementById("name");
var emailSpan = document.getElementById("email");
var bioSpan = document.getElementById("bio");

// Define um evento para o botão "Editar"
editButton.addEventListener("click", function() {
  // Esconde as informações do perfil e exibe o formulário de edição
  profileInfo.style.display = "none";
  document.getElementById("profileForm").style.display = "block";

  // Preenche os campos de entrada com as informações do perfil
  document.getElementById("nameInput").value = nameSpan.textContent;
  document.getElementById("emailInput").value = emailSpan.textContent;
  document.getElementById("bioInput").value = bioSpan.textContent;
});


saveButton.addEventListener("click", function() {
  
  var name = document.getElementById("nameInput").value;
  var email = document.getElementById("emailInput").value;
  var bio = document.getElementById("bioInput").value;

  
  nameSpan.textContent = name;
  emailSpan.textContent = email;
  bioSpan.textContent = bio;


  profileInfo.style.display = "block";
  document.getElementById("profileForm").style.display = "none";
});


nameSpan.textContent = "Joyce Moura";
emailSpan.textContent = "joyce@gmail.com";
bioSpan.textContent = "DEV";

'use strict'

let photo = document.getElementById('imgPhoto');
let file = document.getElementById('flImage');

photo.addEventListener('click', () => {
    file.click();
});

file.addEventListener('change', () => {

    if (file.files.length <= 0) {
        return;
    }

    let reader = new FileReader();

    reader.onload = () => {
        photo.src = reader.result;
    }

    reader.readAsDataURL(file.files[0]);
});

