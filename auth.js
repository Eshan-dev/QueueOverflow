const url = new URL(window.location.href);
const token = url.searchParams.get("token");
const email = url.searchParams.get("email");


async function displayAuthenticated(){
    const title = document.getElementById("title");
    console.log(token);
    if(token){
        chrome.storage.local.set({ "token": token,"email" :email },function(){
            const title = document.getElementById("title");
            title.textContent = "Authentication Done";
        });
    }
    else {
        title.textContent = "Authentication failed";
    }
}

displayAuthenticated();