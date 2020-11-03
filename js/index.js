// full search with params: https://api.github.com/search/users?q=tom+repos:%3E42+followers:%3E1000
// specific user page: "https://api.github.com/users/mojombo"

//SEARCH USERS
//1. make call to users endpoint
//2. display a user card for each user

const BASEURL = 'https://api.github.com/search/'
const USERURL = `${BASEURL}users`
const REPOURL = `${BASEURL}respositories`

const userListUl = document.querySelector('#user-list')
const repoListUl = document.querySelector('#repos-list')
const searchForm = document.querySelector('#github-form')

function renderUserCard(user) {
    const li = document.createElement('li')
    li.className = 'user-li'
    li.dataset.id = user.id
    userListUl.append(li)
    
    const cardDiv = document.createElement('div')
    cardDiv.className = "user-card"
    li.append(cardDiv)

    const loginHeader = document.createElement('h4')
    loginHeader.textContent = user.login

    const avatarImg = document.createElement('img')
    avatarImg.src = user.avatar_url
    avatarImg.alt = "avatar"

    const profileLink = document.createElement('a')
    profileLink.href = user.html_url

    cardDiv.append(loginHeader, avatarImg, profileLink)
}

function handleSearch(e) {
    const searchTerm = e.target.search.value.split(' ').join('+').toLowerCase()
    fetch(USERURL+`?q=${searchTerm}`, {method:"GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/vnd.github.v3+json"
        }
    })
    .then(resp => resp.json())
    .then(users => console.log(users))
    .catch(error => console.log(error))
}

searchForm.addEventListener('submit', handleSearch)