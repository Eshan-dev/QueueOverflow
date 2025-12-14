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
        }).then(function(response){
            console.log(response);
            sendResponse({data : response.data});
        })
        return true;
    }
    if (msg.type === "EXPORT_EXCEL") {
        (async () => {
          try {
            const res = await axios.get("http://localhost:3000/getSheet", {
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