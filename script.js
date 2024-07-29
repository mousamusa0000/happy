document.addEventListener('DOMContentLoaded', function() {
    const sendButton = document.getElementById('sendButton');
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');
    const uploadButton = document.getElementById('uploadButton');
    const fileInput = document.getElementById('fileInput');

    // Function to append messages to the chat
    function appendMessage(content, type) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message';

        if (type === 'text') {
            messageElement.textContent = content;
        } else if (type === 'image') {
            const img = document.createElement('img');
            img.src = content;
            messageElement.appendChild(img);
        } else if (type === 'audio') {
            const audio = document.createElement('audio');
            audio.controls = true;
            audio.src = content;
            messageElement.appendChild(audio);
        }

        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Handle text messages
    sendButton.addEventListener('click', function() {
        const messageText = messageInput.value.trim();
        if (messageText) {
            appendMessage(messageText, 'text');
            messageInput.value = '';
        }
    });

    // Handle file uploads
    uploadButton.addEventListener('click', function() {
        fileInput.click();
    });

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                if (file.type.startsWith('image/')) {
                    appendMessage(e.target.result, 'image');
                } else if (file.type.startsWith('audio/')) {
                    appendMessage(e.target.result, 'audio');
                }
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle Enter key for sending text messages
    messageInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendButton.click();
        }
    });
});
