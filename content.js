const bookmarkImgURL = chrome.runtime.getURL("assets/bookmark.png");
const key = "xxxSecretxxx";

const observer = new MutationObserver(function(){
    // observer.disconnect(); 
    diaplaySaveProblemButton();
})
observer.observe(document.body,{childList:true,subtree:true});
diaplaySaveProblemButton();

function getCurrentBookMarks(){
    return new Promise(function(resolve,reject){
        chrome.storage.local.get([key],function(result){
            console.log(result[key]);
            resolve(result[key] || []);
        })
    })
}
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
    else if(currentURL.includes("leetcode.com/problems") == true){
        addSaveBookmarkIconToLeetCode(createNewBookmarkImageElement);
        console.log("LeetCode");
        createNewBookmarkImageElement.style.marginBottom = "10px";
    }
    else if(currentURL.includes("geeksforgeeks.org/problems") == true){
        addSaveBookmarkIconToGeeksForGeeks(createNewBookmarkImageElement);
        createNewBookmarkImageElement.style.marginTop = "10px";
    }
    else if(currentURL.includes("cses.fi/problemset/task") == true){
        addSaveBookmarkIconT
    rCses(createNewBookmarkImageElement);
        createNewBookmarkImageElement.style.marginTop = "10px";
        createNewBookmarkImageElement.style.marginBottom = "10px";
    }
    else if(currentURL.includes("codechef.com/") == true && currentURL.includes("/problems/") == true   ){
        addSaveBookmarkIconTo
    CodeChef(createNewBookmarkImageElement);
    }
    
}

function addSaveBookmarkIconToMaang(createNewBookmarkImageElement){
    const title = this.document.getElementsByClassName("coding_problem_info_heading__G9ueL")[0];
    title.parentNode.parentNode.insertBefore(createNewBookmarkImageElement,title.parentNode.nextSibling);
}
function addSaveBookmarkIconToLeetCode(createNewBookmarkImageElement){
    const elementTarget = this.document.getElementsByClassName("elfjS")[0];
    elementTarget.prepend(createNewBookmarkImageElement);
}
function addSaveBookmarkIconToGeeksForGeeks(createNewBookmarkImageElement){
    const elementTarget = this.document.getElementsByClassName("problems_header_description__t_8PB")[0];
    elementTarget.insertAdjacentElement('afterend',createNewBookmarkImageElement);
}
function addSaveBookmarkIconToCses(createNewBookmarkImageElement){
    const elementTarget = this.document.getElementsByClassName("title-block")[0];
    elementTarget.appendChild(createNewBookmarkImageElement);
}
function addSaveBookmarkIconToCodeChef(createNewBookmarkImageElement){
    const elementTarget = this.document.getElementsByClassName("_fullscreen-clickable__container_10e0b_131")[0];
    elementTarget.prepend(createNewBookmarkImageElement);
    elementTarget.style.width =  "100%";
    elementTarget.style.justifyContent = "space-between";
    createNewBookmarkImageElement.style.marginLeft = "15px";
}

function getProblemTitle(){
    if(window.location.href.includes("maang.in/problems")){
        return getProblemTitleFromMaang();
    }
    else if(window.location.href.includes("leetcode.com/problems")){
        return getProblemTitleFromLeetCode();
    }
    else if(window.location.href.includes("geeksforgeeks.org/problems")){
        return getProblemTitleFromGeeksForGeeks();
    }
    else if(window.location.href.includes("cses.fi/problemset/task")){
        return getProblemTitleFromCses();
    }
    else if(window.location.href.includes("codechef.com/") == true && window.location.href.includes("/problems/") == true){
        return getProblemTitleFromCodeChef();
    }
}
function getProblemTitleFromLeetCode(){
   return document.getElementsByClassName("text-title-large")[0].firstElementChild.innerHTML;
    
}
function getProblemTitleFromMaang(){
    return document.getElementsByClassName("coding_problem_info_heading__G9ueL")[0].innerText;
}
function getProblemTitleFromGeeksForGeeks(){
    return document.getElementsByClassName("g-m-0")[0].innerText;
}
function getProblemTitleFromCses(){
    elementTarget = document.querySelector('.title-block h1');
    return elementTarget.innerText;
}
function getProblemTitleFromCodeChef(){
    const elementTarget = document.getElementById("problem-statement");
    return elementTarget.firstElementChild.innerText;
}