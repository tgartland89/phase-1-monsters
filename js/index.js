document.addEventListener("DOMContentLoaded", () => {
    let monsterContainer = document.getElementById("monster-container");
    let backButton = document.getElementById("back");
    let forwardButton = document.getElementById("forward");
  
    let currentPage = 1;
  
// Fetch monsters and update the page
    function fetchMonsters(page) {
      let url = `http://localhost:3000/monsters?page=${page}&limit=50`; // Replace with the actual API URL
  
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data)) {
            renderMonsters(data);
          } else {
            console.error("Invalid response:", data);
          }
        })
        .catch(error => {
          console.error("Error fetching monsters:", error);
        });
    }
  
    // Render monsters in the monster container
    function renderMonsters(monsters) {
      monsterContainer.innerHTML = "";
  
      monsters.forEach(monster => {
        let monsterElement = document.createElement("div");
        monsterElement.innerHTML = `
          <h3>${monster.name}</h3>
          <p>Age: ${monster.age}</p>
          <p>Description: ${monster.description}</p>
        `;
        monsterContainer.appendChild(monsterElement);
      });
    }
// Load initial monsters on page load
    
    fetchMonsters(currentPage);
  
// Event listeners for pagination buttons
    backButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        fetchMonsters(currentPage);
      }
    });
  
    forwardButton.addEventListener("click", () => {
      currentPage++;
      fetchMonsters(currentPage);
    });
  });
  