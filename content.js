const bookmarkIconURL = chrome.runtime.getURL("assets/bookmark.png");
const key = "xxxSecretxxx";

async function addBookmark(){
    const url = window.location.href;
    const problemTitle = document.getElementsByClassName("coding_problem_info_heading__G9ueL")[0].innerText;
    const obj = {
        title: problemTitle,
        url: url
    };
    
    const currentBookMarks = await getCurrentBookMarks();
    if(currentBookMarks.some(function(e){
        return e.url === url;
    }) == false){
        const updatedBookMarks = [...currentBookMarks,obj];
        chrome.storage.local.set({[key] : updatedBookMarks},function(){
            console.log("added");
            
        })
    }
    // console.log(problemTitle);
}
function showButton(){
    console.log("Trigger");
    if(document.getElementById("bookmark-icon"))return;
    const bookmark = this.document.createElement("img");
    let currentURL = window.location.href;

    bookmark.id = "bookmark-icon";
    bookmark.src = bookmarkIconURL;
    bookmark.style.width = "30px";
    bookmark.style.width = "30px";

    bookmark.addEventListener('click',addBookmark);

    if(currentURL.includes("maang.in/problems") == true){
        const title = this.document.getElementsByClassName("coding_problem_info_heading__G9ueL")[0];
        title.parentNode.parentNode.insertBefore(bookmark,title.parentNode.nextSibling);
    }

}

 function getCurrentBookMarks(){
    return new Promise(function(resolve,reject){
        chrome.storage.local.get([key],function(result){
            console.log(result[key]);
            resolve(result[key] || []);
        })
    })
}

const observer = new MutationObserver(function(){
    // observer.disconnect(); 
    showButton();
})
observer.observe(document.body,{childList:true,subtree:true});
showButton();
