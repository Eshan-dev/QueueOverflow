const playIcon = chrome.runtime.getURL("assets/play.png");
const deleteIcon = chrome.runtime.getURL("assets/delete.png");
const key = "xxxSecretxxx";

function fetchBookmarks(){
    return new Promise(function(resolve,reject){
        chrome.storage.local.get([key],function(result){
            resolve(result[key] || []);
        })
    })
}
async function setBookmarks(bookmarks){
    await chrome.storage.local.set({[key] : bookmarks});
    displayBookmarks();
}
function addElement(title,url){
    const allBookmarkDiv = document.getElementById("bookmarks-list");
    
    // console.log(bookmarkList);
    
    const singleBookmarkDiv = document.createElement('div');
    
    const problemElement = document.createElement('a');
    problemElement.href = url;
    problemElement.innerText = title;
    
    const openProblemIcon = document.createElement('img');
    openProblemIcon.src = playIcon;
    openProblemIcon.style.width = "20px";
    openProblemIcon.style.height = "20px";
    openProblemIcon.addEventListener('click',openUrl);
    
    const deleteProblemIcon = document.createElement('img');
    deleteProblemIcon.src = deleteIcon;
    deleteProblemIcon.style.width = "20px";
    deleteProblemIcon.style.height = "20px";
    deleteProblemIcon.addEventListener('click',deleteBookmark);
    
    singleBookmarkDiv.appendChild(problemElement);
    singleBookmarkDiv.appendChild(openProblemIcon);
    singleBookmarkDiv.appendChild(deleteProblemIcon);
    singleBookmarkDiv.classList.add("bookmark");
    
    allBookmarkDiv.appendChild(singleBookmarkDiv);
}
async function displayBookmarks(){
    const bookmarkDiv = document.getElementById("bookmarks-list");
    bookmarkDiv.innerHTML = "";

    const bookmarks =  await fetchBookmarks();
    bookmarks.forEach(function(bookmark){
        addElement(bookmark.title,bookmark.url);
    });
}
window.addEventListener('DOMContentLoaded',async function() {
    displayBookmarks();
})

function openUrl(){
    const url = this.previousSibling.href;
    window.open(url, '_blank');
}
async function deleteBookmark(){
    const url = this.previousSibling.previousSibling.href;
    // console.log(url);

    const allBookmarks = await fetchBookmarks();
    const newBookmarks = allBookmarks.filter(function(bookmark){
    return bookmark.url !== url;}
    )
    await setBookmarks(newBookmarks);
}

const CLIENT_ID = "546067484138-o5h7nuv4sg2di26qruuc53ijl9uhqal0.apps.googleusercontent.com";
const REDIRECT_URL = "http://localhost:3000/auth/google/callback";

const authUrl = `
https://accounts.google.com/o/oauth2/v2/auth?
client_id=${CLIENT_ID}&
response_type=code&
redirect_uri=${encodeURIComponent(REDIRECT_URL)}&
scope=openid%20email%20profile&
access_type=offline&
prompt=consent
`;

function doAuth(){
    chrome.tabs.create({ url: authUrl });
}