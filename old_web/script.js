// Obtener el botón
let backToTopBtn = document.getElementById("backToTopBtn");

// Mostrar el botón cuando se haga scroll hacia abajo
window.onscroll = function() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    backToTopBtn.style.display = "flex"; // Mostrar el botón cuando se baja más de 200px
  } else {
    backToTopBtn.style.display = "none"; // Ocultar el botón si no hay suficiente scroll
  }
};

// Deslizar hacia arriba cuando se haga clic en el botón
backToTopBtn.addEventListener("click", function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth" // Desplazamiento suave
  });
});


