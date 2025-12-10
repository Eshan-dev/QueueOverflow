const bookmarkImgURL = chrome.runtime.getURL("assets/bookmark.png");
const key = "xxxSecretxxx";

async function addBookmark(){
    const url = window.location.href;
    const problemTitle = getProblemTitle();
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
function getProblemTitle(){
    if(window.location.href.includes("maang.in/problems")){
        return getProblemTitleFromMaang();
    }
}
function getProblemTitleFromMaang(){
    return document.getElementsByClassName("coding_problem_info_heading__G9ueL")[0].innerText;
}
function diaplaySaveProblemButton(){
    // console.log("Trigger");
    if(document.getElementById("bookmark-icon"))return;
    const createNewBookmarkImageElement = this.document.createElement("img");
    let currentURL = window.location.href;

    createNewBookmarkImageElement.id = "bookmark-icon";
    createNewBookmarkImageElement.src = bookmarkImgURL;
    createNewBookmarkImageElement.style.width = "30px";
    createNewBookmarkImageElement.style.width = "30px";

    createNewBookmarkImageElement.addEventListener('click',addBookmark);

    if(currentURL.includes("maang.in/problems") == true){
        addSaveBookmarkIconToMaang(createNewBookmarkImageElement);
    }
    
}
function addSaveBookmarkIconToMaang(createNewBookmarkImageElement){
    const title = this.document.getElementsByClassName("coding_problem_info_heading__G9ueL")[0];
    title.parentNode.parentNode.insertBefore(createNewBookmarkImageElement,title.parentNode.nextSibling);
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
    diaplaySaveProblemButton();
})
observer.observe(document.body,{childList:true,subtree:true});
diaplaySaveProblemButton();
