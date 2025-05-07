function fetchData() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "https://jsonplaceholder.typicode.com/users", true);
        xhr.onload = () => {
          const users = JSON.parse(xhr.responseText);
          localStorage.setItem("users", JSON.stringify(users));
          displayUsers();
        };
        xhr.send();
      }
      
      // Display users in table
      function displayUsers() {
        let tableBody = document.getElementById("userTableBody");
        tableBody.innerHTML = "";
      
        let users = JSON.parse(localStorage.getItem("users")) || [];
      
        users.forEach((user, index) => {
          tableBody.innerHTML += `
            <tr>
              <td>${index + 1}</td>
              <td>${user.name}</td>
              <td>${user.username}</td>
              <td>${user.email}</td>
              <td>${user.phone}</td>
              <td>${user.address?.city || user.city}</td>
            </tr>
          `;
        });
      }
      
      // Submit form
      document.getElementById("userForm").addEventListener("submit", (e) => {
        e.preventDefault();
      
        const name = document.getElementById("name").value;
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const city = document.getElementById("city").value;
        const password = document.getElementById("password").value;
      
        const newUser = {
          name,
          username,
          email,
          phone,
          password,
          address: {
            city: city,
          },
        };
      
        // AJAX POST
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "https://jsonplaceholder.typicode.com/users", true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
      
        xhr.onload = () => {
          if (xhr.status === 201) {
            let users = JSON.parse(localStorage.getItem("users")) || [];
            users.unshift(newUser);
            localStorage.setItem("users", JSON.stringify(users));
            displayUsers();
          }
        };
      
        xhr.send(JSON.stringify(newUser));
        $('#addUserModal').modal('hide');
        e.target.reset();
      });
      
      // Load on page start
      fetchData();
      
    
    