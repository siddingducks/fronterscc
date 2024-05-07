let container;
let theme;
let btn;

document.addEventListener("DOMContentLoaded", function() {
  container = document.querySelector('html');
  theme = localStorage.getItem('theme');

  //setting default theme as 'dark'
  if (theme === null) {
    localStorage.setItem('theme', 'dark');
    theme = 'dark';
  }

  //style button & page on page load
  btn = document.getElementById('themeToggle');
  setDataTheme(theme);
  buttonStyle(btn, theme);
  
  // EVENT DELEGATION : toggleDiv and btn
  document.getElementById("toggleDiv").addEventListener("click", function(btn) {
    if(btn.target && btn.target.className == "button") {
       toggleDarkMode();
    }
  });
}); 

function setDataTheme(dataTheme) {
  if (dataTheme === 'dark') {
    container.setAttribute('data-theme', 'dark');
  } else {
    container.setAttribute('data-theme', 'light');
  }
}

function toggleDarkMode() { 
  //determine the new data theme onclick
  if (theme === 'dark') {
    container.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    theme = 'light';
  } else {
    container.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    theme = 'dark';
  }

  //restyle button to new theme
  buttonStyle(btn, theme);
};

function buttonStyle(button, theme) { 
    //style the button for the current data theme
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    let label = document.createElement('span');
    let ariaLabel = '';

    svg.setAttribute('id','themeColorIcon');
    svg.setAttribute('xmlns','http://www.w3.org/2000/svg');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('viewbox', '0 0 16 16');

    if(theme === 'dark') {
      ariaLabel = 'Change to dark theme';
      label.innerText = 'Dark Mode';
  
      let path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      let path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  
      svg.setAttribute('fill', '#FFF');
  
      path1.setAttribute('d', 'M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278');
      path2.setAttribute('d', 'M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z');
  
      svg.appendChild(path1);
      svg.appendChild(path2);
    } else {
      ariaLabel = 'Change to light theme';
      label.innerText = 'Light Mode';

      svg.setAttribute('fill', '#000');
  
      let path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path1.setAttribute('d', 'M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708');
  
      svg.appendChild(path1);
    }

    //erase button HTML contents
    button.innerHTML = '';

    //re-set button attributes that were erased
    button.type = 'button';
    button.classList.add('button');
    button.setAttribute('id', 'themeToggle');
    button.setAttribute('aria-label', ariaLabel);

    label.classList.add("desktop-label");
    button.append(svg, label);
};