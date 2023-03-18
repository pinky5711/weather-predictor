

// fetch("/header-footer/header.html")
//   .then(response => response.text())
//   .then(html => {
//     // Extract any <script> tags from the HTML
//     let temp = document.createElement('div');
//     temp.innerHTML = html;
//     let scripts = temp.getElementsByTagName('script');

//     // Execute each script individually
//     for (let i = 0; i < scripts.length; i++) {
//       eval(scripts[i].innerText);
//     }

//     // Append the HTML to your page
//     document.getElementById("header").innerHTML = temp.innerHTML;
//   });




  
function importHtmlFile(filePath, elementId) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', filePath, true);
    xhr.onload = function() {
      if (xhr.status === 200) {
        const element = document.getElementById(elementId);
        element.innerHTML = xhr.responseText;
        // Inject any corresponding script tags by iterating over each HTML Script Element tag
        const scripts = element.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
          const newScript = document.createElement('script');
          newScript.type = 'text/javascript';
          if (scripts[i].src) {
            newScript.src = scripts[i].src;
          } else if(scripts[i].innerHTML) {
            newScript.text = scripts[i].innerHTML;
          }
          // Turn newly created nodes into real elements by appending them to the head tag
          document.head.appendChild(newScript);
        } 
      }
      xhr.onerror = function(e) {
        console.log(`Request failed ${filePath}: ${e}`);
      };
    };
    xhr.send(null);
  }
  
  importHtmlFile('/header-footer/header.html', 'header');

  fetch("/header-footer/footer.html")
  .then(response => {
    return response.text();
  })
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  });