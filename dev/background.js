import axios from "axios";

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "addToSheet") {
        console.log(msg.userData.email);
        axios.post('http://localhost:3000/addProblem',msg.formData,{
            headers : {
                email : msg.userData.email.email,
                authorization : msg.userData.token.token,
                'Content-Type': 'application/json'
            }
        }).then(response => sendResponse({data : response.data}));
    }
    return true;
  });