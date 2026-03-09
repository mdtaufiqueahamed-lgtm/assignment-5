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


/* ================= TABS FUNCTIONALITY ================= */

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


/* ================= FETCH ISSUES ================= */



/* ================= ISSUE COUNT ================= */

function updateCount(issues){

  const countDisplay = document.getElementById("issue-count");

  countDisplay.innerText = `${issues.length} Issues`;

}


/* ================= SEARCH ================= */

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

/* ================= OPEN MODAL ================= */

function openModal(issue) {
  const modal = document.getElementById("modal");
  
  // মোডালের ভেতর ডেটা বসানো
  document.getElementById("modal-title").innerText = issue.title;
  document.getElementById("modal-desc").innerText = issue.description;
  
  // স্ট্যাটাস এবং লেখক এর তথ্য দেখানো
  document.getElementById("modal-info").innerHTML = `
    <div class="mt-4 pt-4 border-t border-gray-200">
       <p><strong>Status:</strong> ${issue.status.toUpperCase()}</p>
       <p><strong>Priority:</strong> ${issue.priority}</p>
       <p><strong>Author:</strong> ${issue.author}</p>
    </div>
  `;

  // মোডালটি স্ক্রিনে দেখানো (hidden ক্লাস সরিয়ে)
  modal.classList.remove("hidden");
}

function openIssueModal(issue) {
  const modal = document.getElementById("modal");
  
  // তথ্যগুলো মোডালে বসানো
  document.getElementById("modal-title").innerText = issue.title;
  document.getElementById("modal-desc").innerText = issue.description;
  document.getElementById("modal-assignee").innerText = issue.author;
  document.getElementById("modal-priority").innerText = issue.priority;
  document.getElementById("modal-meta").innerText = `• Opened by ${issue.author} • ${new Date(issue.createdAt).toLocaleDateString()}`;

  // ট্যাগগুলো দেখানো
  document.getElementById("modal-tags").innerHTML = `
    <span class="border border-red-200 text-red-400 px-3 py-1 text-xs rounded-full font-bold uppercase">${issue.category || 'BUG'}</span>
    <span class="border border-yellow-400 text-yellow-600 px-3 py-1 text-xs rounded-full font-bold uppercase">${issue.label || 'HELP WANTED'}</span>
  `;

  modal.classList.remove("hidden"); // মোডাল দেখানো
}

// ক্লোজ বাটন কাজ করানোর জন্য
document.getElementById("closeModal").onclick = () => {
  document.getElementById("modal").classList.add("hidden");
};