/* ================= LOGIN FUNCTIONALITY ================= */

let allIssues = [];

const issuesContainer = document.getElementById("issues-container");
const loginPage = document.getElementById("login-page");

const mainPage = document.getElementById("main-page");
 const loginBtn = document.getElementById("loginBtn");
const loginError = document.getElementById("login-error");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const DEMO_USER = "admin";
const DEMO_PASS = "admin123";

loginBtn.addEventListener("click", () => {

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (username === DEMO_USER && password === DEMO_PASS) {
    loginPage.classList.add("hidden");
    mainPage.classList.remove("hidden");

    loadIssues("all");
  } else {
    loginError.classList.remove("hidden");
  }

});




const tabBtns = document.querySelectorAll(".tab-btn");

tabBtns.forEach(btn => {

  btn.addEventListener("click", () => {

    tabBtns.forEach(b => {
      b.classList.remove("bg-blue-500","text-white");
      b.classList.add("bg-gray-200");
    });

    btn.classList.add("bg-blue-500","text-white");
    btn.classList.remove("bg-gray-200");

    const status = btn.getAttribute("data-status");

    filterIssues(status);

  });

});




function loadIssues(){

  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
  .then(res => res.json())
  .then(data => {

    allIssues = data.data;

    displayIssues(allIssues);

    updateCount(allIssues);

  });

}




function filterIssues(status){

  if(status === "all"){
    displayIssues(allIssues);
    updateCount(allIssues);
    return;
  }

  const filtered = allIssues.filter(issue => issue.status === status);

  displayIssues(filtered);
  updateCount(filtered);

}




function displayIssues(issues){
    issuesContainer.innerHTML = "";

    issues.forEach(issue => {
        const borderColor = issue.status === "open"
            ? "border-green-500"
            : "border-purple-500";

        const category = issue.category || "general";
        const label = issue.label || "issue";

        const card = document.createElement("div");
        card.className = `bg-white rounded-xl shadow border-t-4 ${borderColor} overflow-hidden cursor-pointer`;

        card.innerHTML = `
        <div class="p-5">
            <div class="flex justify-between items-center mb-3">
                <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">●</div>
                <span class="bg-red-100 text-red-500 px-3 py-1 text-xs rounded-full font-semibold">${issue.priority}</span>
            </div>

            <h2 class="text-lg font-bold mb-2">${issue.title}</h2>
              <p class="text-gray-500 text-sm mb-4">${issue.description}</p>

            <div class="flex gap-2 mb-4">
            <span class="border border-red-300 text-red-500 px-3 py-1 text-xs rounded-full">${category}</span>
                <span class="border border-yellow-400 text-yellow-600 px-3 py-1 text-xs rounded-full">${label}</span>
            </div>
        </div>

        <div class="border-t p-4 text-sm text-gray-500">
            <p>#${issue.id} by ${issue.author}</p>
            <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
        </div>
        `;

      
        card.addEventListener("click", () => {
            openIssueModal(issue);
        });

        issuesContainer.appendChild(card);
    });


}





function updateCount(issues){

  const countDisplay = document.getElementById("issue-count");

   countDisplay.innerText = `${issues.length} Issues`;

}




const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", () => {

  const text = searchInput.value.toLowerCase();

  const filtered = allIssues.filter(issue =>

    issue.title.toLowerCase().includes(text) ||
    issue.description.toLowerCase().includes(text)

  );

displayIssues(filtered);
  updateCount(filtered);

});



function openModal(issue) {
  const modal = document.getElementById("modal");
  

  document.getElementById("modal-title").innerText = issue.title;
  document.getElementById("modal-desc").innerText = issue.description;
  
  
  document.getElementById("modal-info").innerHTML = `
    <div class="mt-4 pt-4 border-t border-gray-200">
         <p><strong>Status:</strong> ${issue.status.toUpperCase()}</p>
       <p><strong>Priority:</strong> ${issue.priority}</p>
       <p><strong>Author:</strong> ${issue.author}</p>
    </div>
  `;

  modal.classList.remove("hidden");
}

function openIssueModal(issue) {
  const modal = document.getElementById("modal");
  
  
  document.getElementById("modal-title").innerText = issue.title;
  document.getElementById("modal-desc").innerText = issue.description;
  document.getElementById("modal-assignee").innerText = issue.author;
  document.getElementById("modal-priority").innerText = issue.priority;
  document.getElementById("modal-meta").innerText = `• Opened by ${issue.author} • ${new Date(issue.createdAt).toLocaleDateString()}`;

 
  document.getElementById("modal-tags").innerHTML = `
    <span class="border border-red-200 text-red-400 px-3 py-1 text-xs rounded-full font-bold uppercase">${issue.category || 'BUG'}</span>
    <span class="border border-yellow-400 text-yellow-600 px-3 py-1 text-xs rounded-full font-bold uppercase">${issue.label || 'HELP WANTED'}</span>
  `;

  modal.classList.remove("hidden"); 
}


document.getElementById("closeModal").onclick = () => {
  document.getElementById("modal").classList.add("hidden");
};


