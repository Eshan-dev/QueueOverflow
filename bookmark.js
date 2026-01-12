const bookmarkButton = document.createElement('button');
const sheetButton = document.createElement('button');
bookmarkButton.id = "bookmark-icon";
sheetButton.id = "sheet-icon";

bookmarkButton.style.border = "2px solid grey";
bookmarkButton.style.width = "200px";
sheetButton.style.border = "2px solid grey";
sheetButton.style.width = "200px";


bookmarkButton.innerText = "Add to bookmark";
sheetButton.innerText = "Add to Sheet";

const key = "xxxSecretxxx";

export function startObserving(){
    
    const observer = new MutationObserver(function(){
        // observer.disconnect(); 
        diaplaySaveProblemButton();
    })
    observer.observe(document.body,{childList:true,subtree:true});
    diaplaySaveProblemButton();
}



function getCurrentBookMarks(){
    return new Promise(function(resolve,reject){
        chrome.storage.local.get([key],function(result){
            // console.log(result[key]);
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
    
    const buttonContainer = document.createElement('div');
    buttonContainer.id = "buttonContainer";
    buttonContainer.appendChild(bookmarkButton);
    buttonContainer.appendChild(sheetButton);
    bookmarkButton.addEventListener('click',function(e){
        e.currentTarget.innerText="Added to Bookmarks"
    })
    sheetButton.addEventListener('click',createSheetPopup);
    bookmarkButton.addEventListener('click',addBookmark);
    
    
    
    let currentURL = window.location.href;
    console.log(currentURL);
    
    if(currentURL.includes("maang.in/problems") == true){
        addSaveBookmarkIconToMaang(buttonContainer);
    }
    else if(currentURL.includes("leetcode.com/problems") == true){
        addSaveBookmarkIconToLeetCode(buttonContainer);
        console.log("LeetCode");
        buttonContainer.style.marginBottom = "10px";
    }
    else if(currentURL.includes("geeksforgeeks.org/problems") == true){
        addSaveBookmarkIconToGeeksForGeeks(buttonContainer);
        buttonContainer.style.marginTop = "10px";
    }
    else if(currentURL.includes("cses.fi/problemset/task") == true){
        addSaveBookmarkIconToCses(buttonContainer);
        buttonContainer.style.marginTop = "10px";
        buttonContainer.style.marginBottom = "10px";
    }
    else if(currentURL.includes("codechef.com/") == true && currentURL.includes("/problems/") == true   ){
        addSaveBookmarkIconToCodeChef(buttonContainer);
    }
    else if(currentURL.includes('https://codeforces.com/') == true && currentURL.includes('/problem/') == true){
        console.log("HERE");
        addSaveBookmarkIconToCodefroces(buttonContainer);
    }
    
}
function addSaveBookmarkIconToCodefroces(buttonContainer){
    const list = document.getElementsByClassName('second-level-menu')[0];
    list.style.position = 'relative';
    list.appendChild(buttonContainer);
}
function addSaveBookmarkIconToMaang(buttonContainer){
    const title = document.getElementsByClassName("coding_problem_info_heading__G9ueL")[0];
    title.parentNode.parentNode.insertBefore(buttonContainer,title.parentNode.nextSibling);
}
function addSaveBookmarkIconToLeetCode(buttonContainer){
    const elementTarget = document.getElementsByClassName("elfjS")[0];
    elementTarget.prepend(buttonContainer);
}
function addSaveBookmarkIconToGeeksForGeeks(buttonContainer){
    const elementTarget = document.getElementsByClassName("problems_header_description__t_8PB")[0];
    elementTarget.insertAdjacentElement('afterend',buttonContainer);
}
function addSaveBookmarkIconToCses(buttonContainer){
    const elementTarget = document.getElementsByClassName("title-block")[0];
    elementTarget.appendChild(buttonContainer);
}
function addSaveBookmarkIconToCodeChef(buttonContainer){
    const elementTarget = document.getElementById("problem-statement");
    console.log(elementTarget);
    elementTarget.insertBefore(buttonContainer,elementTarget.firstChild.nextSibling)
    elementTarget.style.width =  "100%";
    elementTarget.style.justifyContent = "space-between";
    buttonContainer.style.marginLeft = "15px";
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
    else if(window.location.href.includes('https://codeforces.com/') == true && window.location.href.includes('/problem/') == true){
        return getProblemTitleFromCodeforces();
    }
}
function getProblemTitleFromCodeforces(){
    return document.getElementsByClassName('title')[0].innerText;
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
    const elementTarget = document.querySelector('.title-block h1');
    return elementTarget.innerText;
}
function getProblemTitleFromCodeChef(){
    const elementTarget = document.getElementById("problem-statement");
    return elementTarget.firstElementChild.innerText;
}
function createSheetPopup(){
    if(document.getElementById('formContainer')){
        return;
    }
    const formContainer = document.createElement('div');
    const solveStatus   = document.createElement('textarea');
    const timeTaken = document.createElement('textarea');
    const concept = document.createElement('textarea');
    const framework = document.createElement('textarea');
    const form = document.createElement('textarea');
    const tatic = document.createElement('textarea');
    const debug = document.createElement('textarea');
    const solutionSummary = document.createElement('textarea');
    const notes = document.createElement('textarea');
    const buttton = document.createElement('button');


    formContainer.appendChild(solveStatus);
    formContainer.appendChild(timeTaken);
    formContainer.appendChild(concept);
    formContainer.appendChild(framework);
    formContainer.appendChild(form);
    formContainer.appendChild(tatic);
    formContainer.appendChild(debug);
    formContainer.appendChild(solutionSummary);
    formContainer.appendChild(notes);
    formContainer.appendChild(buttton);
    formContainer.id = "formContainer";
    
    buttton.innerText = "Push To Sheet";
    buttton.style.border = '2px solid grey';
    buttton.id = "pushButton";
    buttton.addEventListener('click',pushToSheet);
    // buttton.innerText = "Push To Sheet";
    solveStatus.placeholder = `AC/WA/TLE/Not Understood(Type here ....)`
    solveStatus.style.border = "2px solid grey" 
    solveStatus.id = "solveStatus";
    timeTaken.placeholder = "Time Taken"
    timeTaken.style.border = "2px solid grey" 
    timeTaken.id = "timeTaken" 
    concept.placeholder = "Concept/Topic"
    concept.style.border = "2px solid grey" 
    concept.id = "concept" 
    framework.placeholder = "How to think about this question"
    framework.style.border = "2px solid grey" 
    framework.id = "framework"
    form.placeholder = "to which form this question belongs"
    form.style.border = "2px solid grey" 
    form.id = "form" 
    tatic.placeholder = "Any Quick Tricks"
    tatic.style.border = "2px solid grey" 
    tatic.id = "tactic" 
    debug.placeholder = "Mistakes Made"
    debug.style.border = "2px solid grey" 
    debug.id = "debug" 
    solutionSummary.placeholder = "Some Implementation details"
    solutionSummary.style.border = "2px solid grey" 
    solutionSummary.id = "solutionSummary" 
    notes.placeholder = "Something Extra?"
    notes.style.border = "2px solid grey" 
    notes.id = "notes" 
    
    formContainer.style.display =  "flex";
    formContainer.style.flexDirection =  "column";
    document.getElementById("buttonContainer").appendChild(formContainer);
    
}
async function getUserData(){
    const token = await chrome.storage.local.get(['token']);
    const email = await chrome.storage.local.get(['email']);
    return {email,token};
}
async function isToken(){
    const token = await chrome.storage.local.get(["token"])
    if(token.token){
        return true;
    }
    else{
        return false;
    }
}
async function pushToSheet(){
    const buttton = document.getElementById('pushButton');
    buttton.removeEventListener('click',pushToSheet);
    buttton.innerText = `Adding ...\nBackend is running on free tier\nIt can take upto 1 minute `

    console.log("here");
    const userData = await getUserData();
    // console.log(await isToken());
    if(await isToken() === false || userData.email === null){
        console.log("NO Token");
        const pushButton = document.getElementById('pushButton');
        pushButton.style.display = 'none';
        const newButton = document.createElement("button")
        newButton.innerText = "You have to login first Click here to login";
        newButton.addEventListener('click',function(){
            doAuth();
        })
        newButton.style.border = "2px solid grey";
        document.getElementById('formContainer').appendChild(newButton);
        
    }
    else{
        const formData = getFormData();
        
        // console.log(userData);
        // console.log(formData);
        chrome.runtime.sendMessage({ type: "addToSheet", formData,userData }, (res) => {
            console.log(res);
            if(res === undefined || res === null || res.data.success === false){
                const pushButton = document.getElementById('pushButton');
                pushButton.style.display = 'none';

                const newButton = document.createElement("button")
                newButton.innerText = "You have to login first Click here to login";
                // newButton.style.setProperty("bor
                // der", "2px solid grey", "important");
                newButton.addEventListener('click',function(){
                    doAuth();

                })
                newButton.style.border = "2px solid grey";
                document.getElementById('formContainer').appendChild(newButton);
                
                
            }
            else {
                document.getElementById("solveStatus").style.display = 'none'
                document.getElementById("timeTaken").style.display = 'none';
                document.getElementById("concept").style.display = 'none'
                document.getElementById('framework').style.display = 'none';
                document.getElementById('form').style.display = 'none';
                document.getElementById('tactic').style.display = 'none';
                document.getElementById('debug').style.display = 'none';
                document.getElementById('solutionSummary').style.display = 'none';
                document.getElementById('notes').style.display = 'none';
                // document.getElementById('sheet-icon').style.display = 'none';
                const pushButton = document.getElementById('pushButton');
                pushButton.style.display = 'none';
                // const sheetButton = document.getElementById('sheet-icon');
                sheetButton.innerText = "Added To Sheet";
                sheetButton.removeEventListener('click',createSheetPopup)
                // sheetButton.style.border = "2px solid grey"
                
            }
        });
    }
    
}

const CLIENT_ID = "546067484138-o5h7nuv4sg2di26qruuc53ijl9uhqal0.apps.googleusercontent.com";
const REDIRECT_URL = "https://queue-overflow-backend.onrender.com/auth/google/callback";

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
    window.open(authUrl, "_blank");
    location.reload();
}
function getFormData(){
    const problem = window.location.href;
    const solveStatus = document.getElementById("solveStatus").value
    const timeTaken = document.getElementById("timeTaken").value;
    const concept = document.getElementById("concept").value
    const framework = document.getElementById('framework').value;
    const form = document.getElementById('form').value;
    const tactic = document.getElementById('tactic').value;
    const debug = document.getElementById('debug').value;
    const solutionSummary = document.getElementById('solutionSummary').value;
    const notes = document.getElementById('notes').value;
    const obj = {
        problem,solveStatus,timeTaken,concept,framework,form,tactic,debug,solutionSummary,notes
    };
        return obj;
    }
