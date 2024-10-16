export default defineContentScript({
  matches: ['*://*.linkedin.com/*'],
  main() {
    console.log('Hello content.');

    // Function to create and show the AI icon
    const createAIIcon = () => {
      const icon = document.createElement('div');
      icon.id = 'ai-icon';
      icon.innerHTML = '<svg>Your SVG Here</svg>'; // Replace with actual SVG
      icon.className = 'fixed bottom-2 right-2 cursor-pointer'; // Tailwind CSS classes for positioning
      icon.addEventListener('click', showModal);
      document.body.appendChild(icon);
      console.log('AI icon created and added to the DOM');
    };

    // Function to show modal
    const showModal = () => {
      const modal = document.createElement('div');
      modal.id = 'ai-modal';
      modal.className = 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50';
      modal.innerHTML = `
        <div class="bg-white p-4 rounded shadow-lg">
            <h2 class="text-lg font-bold">AI Response Generator</h2>
            <input id="ai-input" class="border p-2 w-full" type="text" placeholder="Enter your command..." />
            <button id="generate-btn" class="bg-blue-500 text-white px-4 py-2 mt-2">Generate</button>
            <button id="regenerate-btn" class="bg-gray-300 text-black px-4 py-2 mt-2" disabled>Regenerate</button>
            <button id="insert-btn" class="bg-green-500 text-white px-4 py-2 mt-2">Insert</button>
        </div>
      `;
      
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
      
      document.body.appendChild(modal);
      console.log('Modal displayed');
      
      // Button listeners
      document.getElementById('generate-btn')!.addEventListener('click', generateResponse);
      document.getElementById('insert-btn')!.addEventListener('click', insertResponse);
    };

    // Function to close the modal
    const closeModal = (modal: HTMLElement) => {
      modal.remove();
      console.log('Modal closed');
    };

    // Function to generate response
    const generateResponse = () => {
      const responseText = "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";
      const input = document.getElementById('ai-input');

      // Check if input is an HTMLInputElement
      if (input instanceof HTMLInputElement) {
        input.value = responseText; // Now TypeScript recognizes `input` as an HTMLInputElement
        console.log('Response generated:', responseText);
      } else {
        console.error('Input element not found or is not an HTMLInputElement');
      }
    };

    // Function to insert response into LinkedIn message input
    const insertResponse = () => {
      const responseText = "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";
      const messageInput = document.querySelector('textarea[name="message"]');

      // Check if messageInput is an HTMLTextAreaElement
      if (messageInput instanceof HTMLTextAreaElement) {
        messageInput.value = responseText;
        console.log('Response inserted into the message input field');
      } else {
        console.error('Message input field not found or is not a textarea');
      }
    };

    // Function to handle focus on LinkedIn message input
    const handleFocus = () => {
      createAIIcon();
      console.log('Message input focused, AI icon displayed');
    };

    // Function to handle blur on LinkedIn message input
    const handleBlur = () => {
      const icon = document.getElementById('ai-icon');
      if (icon) {
        icon.remove();
        console.log('Message input unfocused, AI icon removed');
      }
    };

    // Event listeners for LinkedIn message input
    const messageInput = document.querySelector('textarea[name="message"]'); // Adjust selector as needed
    if (messageInput) {
      messageInput.addEventListener('focus', handleFocus);
      messageInput.addEventListener('blur', handleBlur);
      console.log('Event listeners added to message input');
    } else {
      console.error('Message input field not found');
    }
  },
});



