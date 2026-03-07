/*  LOGIN FUNCTIONALITY  */
const loginPage = document.getElementById('login-page');
const mainPage = document.getElementById('main-page');
const loginBtn = document.getElementById('loginBtn');
const loginError = document.getElementById('login-error');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

const DEMO_USER = "admin";
const DEMO_PASS = "admin123";

loginBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  if(username === DEMO_USER && password === DEMO_PASS){
    loginPage.classList.add('hidden');
    mainPage.classList.remove('hidden');
    loadIssues('all');
  } else {
    loginError.classList.remove('hidden');
  }
});





/*  TABS FUNCTIONALITY  */
const tabBtns = document.querySelectorAll('.tab-btn');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('bg-blue-500','text-white'));
    tabBtns.forEach(b => b.classList.add('bg-gray-200'));
    btn.classList.add('bg-blue-500','text-white');
    btn.classList.remove('bg-gray-200');
    const status = btn.getAttribute('data-status');
    loadIssues(status);
  });
});

/*  SEARCH FUNCTIONALITY  */
const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', () => {
  const query = document.getElementById('searchInput').value.trim();
  searchIssues(query);
});

const issuesContainer = document.getElementById("issues-container")

function loadIssues(){

fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
.then(res => res.json())
.then(data => {

const issues = data.data

displayIssues(issues)

})

}


function displayIssues(issues){

issuesContainer.innerHTML = ""

issues.forEach(issue => {

const borderColor = issue.status === "open"
? "border-green-500"
: "border-purple-500"

const card = document.createElement("div")

card.className = `bg-white rounded-xl shadow border-t-4 ${borderColor} overflow-hidden`

card.innerHTML = `

<div class="p-5">

<div class="flex justify-between items-center mb-3">

<div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
●
</div>

<span class="bg-red-100 text-red-500 px-3 py-1 text-xs rounded-full font-semibold">
${issue.priority}
</span>

</div>

<h2 class="text-lg font-bold mb-2">
${issue.title}
</h2>

<p class="text-gray-500 text-sm mb-4">
${issue.description}
</p>

<div class="flex gap-2 mb-4">

<span class="border border-red-300 text-red-500 px-3 py-1 text-xs rounded-full">
${issue.category}
</span>

<span class="border border-yellow-400 text-yellow-600 px-3 py-1 text-xs rounded-full">
${issue.label}
</span>

</div>

</div>

<div class="border-t p-4 text-sm text-gray-500">

<p>#${issue.id} by ${issue.author}</p>
<p>${new Date(issue.createdAt).toLocaleDateString()}</p>

</div>

`

issuesContainer.appendChild(card)

})

}

loadIssues();







