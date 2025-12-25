import axios from "axios";

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === "addToSheet") {
        console.log(msg.userData.email);
        axios.post('https://queue-overflow-backend.onrender.com/addProblem',msg.formData,{
            headers : {
                email : msg.userData.email.email,
                authorization : msg.userData.token.token,
                'Content-Type': 'application/json'
            }
        }).then(function(response){
            console.log(response);
            sendResponse({data : response.data});
        }).catch(function(err){
          console.log(err);
          sendResponse({success : false,data : {success : false}})
        });
        return true;
    }
    if (msg.type === "EXPORT_EXCEL") {
        (async () => {
          try {
            const res = await axios.get("https://queue-overflow-backend.onrender.com/getSheet", {
              responseType: "arraybuffer",
              headers: {
                email: msg.userData.email.email,
                authorization: msg.userData.token.token
              }
            });
      
            // Convert ArrayBuffer -> base64 string
            const arr = new Uint8Array(res.data);
            let binary = "";
            for (let i = 0; i < arr.byteLength; i++) {
              binary += String.fromCharCode(arr[i]);
            }
            const base64 = btoa(binary);
            const dataUrl = `data:${res.headers["content-type"]};base64,${base64}`;
      
            sendResponse({
              success: true,
              dataUrl // send string only
            });
          } catch (err) {
            sendResponse({ success: false, error: err.message });
          }
        })();
      
        return true;
      }
      
    
        
  });
  chrome.runtime.onInstalled.addListener(async (details) => {
    console.log("installed");
    if (details.reason !== "install") return;
    
    try {
      console.log("sending request");
      await fetch("https://queue-overflow-backend.onrender.com/install", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          version: chrome.runtime.getManifest().version
        })
      });
    } catch (err) {
      console.error("Install ping failed", err);
    }
  });