document.addEventListener("DOMContentLoaded", () => {
    let monsterContainer = document.getElementById("monster-container");
    let createMonsterForm = document.getElementById("create-monster-form");
  
    let backButton = document.getElementById("back");
    let forwardButton = document.getElementById("forward");
    let createMonsterButton = document.querySelector("#create-monster-form button");
  
    let currentPage = 1;
  
    // Fetch monsters and update the page
    function fetchMonsters(page) {
      let url = `http://localhost:3000/monsters?_limit=50&_page=${page}`; 
      
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
  
    createMonsterForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent form submission from refreshing the page
  
      // Get the values from the form inputs
      let nameInput = document.getElementById("name");
      let ageInput = document.getElementById("age");
      let descriptionInput = document.getElementById("description");
  
      let name = nameInput.value;
      let age = ageInput.value;
      let description = descriptionInput.value;
  
      // Create a new monster object with the form values
      let newMonster = {
        name: name,
        age: age,
        description: description,
      };
  
      // Call a function to save the new monster
      saveMonster(newMonster);
    });
  
    function saveMonster(monster) {
      let url = "http://localhost:3000/monsters"; // Replace with the actual API URL
  
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(monster),
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response from the API
          console.log("New monster saved:", data);
  
          // Clear the form inputs
          createMonsterForm.reset();
  
          // Fetch and render the updated list of monsters
          fetchMonsters(currentPage);
        })
        .catch(error => {
          console.error("Error saving monster:", error);
        });
    }
  });
  