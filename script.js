document.addEventListener("DOMContentLoaded",()=>{
    const sendBtn = document.querySelector(".chat-input span");
const chatInput = document.querySelector(".chat-input textarea");
const chatbox = document.querySelector(".chatbox");
let userMessage;
const API_KEY ="sk-proj-J1rFLGEwVhcsyGcRJf35T3BlbkFJMNLPfeCOSThsIPfg5Kj2";
const API_URL = "https://api.openai.com/v1/chat/completions";
const createChatLi=(message,className) => {
    //creating a chat <li> element with passed message and classname
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat",className);
    let chatContent = className === "outgoing" ? `<p> ${message}</p>` : `<span class="material-symbols-outlined"> family_star </span> <p> ${message}</p>` ;
    chatLi.innerHTML = chatContent;
    return chatLi;
};
const fetchWithExponentialBackoff = (url, options, retries = 1000, delay = 1000) => {
    return fetch(url, options)
        .then(response => {
            if (!response.ok && response.status === 429 && retries > 0) {
                // Wait and retry with exponential backoff
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(fetchWithExponentialBackoff(url, options, retries - 1, delay * 2));
                    }, delay);
                });
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
            throw error; // Rethrow the error to propagate it to the caller
        });
};

const generateResponse =(incomingChat) =>{
    const API_URL = "https://api.openai.com/v1/chat/completions"
    const messageEle = incomingChat.querySelector("p");
    const requestOptions ={
        method :"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [ ({  role: "user", content: userMessage})]
    })
}
fetchWithExponentialBackoff(API_URL, requestOptions)
.then(data => {
    if (data && data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {
        console.log(data);
        messageEle.textContent = data.choices[0].message.content;
    } else {
        console.error("Invalid data structure received:", data);
        messageEle.textContent = "Failed to fetch response";
    }
})
.catch(error => {
    console.error('Error fetching data:', error);
    messageEle.textContent = "Failed to fetch response";
});
};
const handleChat =()=>{
    userMessage= chatInput.value.trim();
    if(!userMessage)return
    chatbox.appendChild(createChatLi(userMessage,"outgoing"));
        //to display thinking 
        setTimeout(()=>{
            const incomingChat = createChatLi("Thinking......","incoming");
            chatbox.appendChild(incomingChat);
            generateResponse(incomingChat);
        },700);
        if(userMessage=="Who is Barsha")
            { 
                setTimeout(()=> chatbox.appendChild(createChatLi("Barsha is usha kee devtaa , kanchana devtaa ","incoming")),2000); 
            }
             if(userMessage==="Who is Ritik")
                {
                    setTimeout(()=> chatbox.appendChild(createChatLi("He is brother of Narad Saud "))
                ,2000);
                }
    if(userMessage==="Hello")
                {
                    setTimeout(()=> chatbox.appendChild(createChatLi("Hi ,How are you ? How can I help you"))
                ,2000);
                }
    if(userMessage==="I am sad")
                {
                    setTimeout(()=> chatbox.appendChild(createChatLi("Don't be sad , just enjoy your life fully , keep yourself motivated")) 
                ,2000);
                }
    if(userMessage==="Thank you")
                {
                    setTimeout(()=> chatbox.appendChild(createChatLi("It's my pleasure !!! Any other problems ?"))
                ,2000);
                }
};
sendBtn.addEventListener("click",handleChat);});
