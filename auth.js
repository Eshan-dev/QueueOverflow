const url = new URL(window.location.href);
const token = url.searchParams.get("token");


async function displayAuthenticated(){
    const title = document.getElementById("title");
    if(token){
        await chrome.localStorage.set({token});
        title.textContent = "Authenticated";
    }
    else {
        title.textContent = "Authentication failed";
    }
    setTimeout(function(){
        window.close();
    }, 3000);
}

displayAuthenticated();