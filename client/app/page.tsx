"use client"

import { useEffect, useState } from 'react';

"use client"

export default function Home() {
  return (
    <div>
      <textarea className="resize-none w-full h-24 border rounded-md p-2" placeholder="今なにしてる？"></textarea>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded rounded-lg">Send</button>
    </div>
  )
}

// export default function Home() {
//   const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/";

//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     getMessages();
//   });
//   const handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setMessage(event.target.value);
//   };

//   const getMessages = async () => {
//     try {
//       const response = await fetch(API_URL);
//       if (response.ok) {
//         const data = await response.json();
//         console.log(data);
//       }
//     } catch (error) {
//       console.error('Failed to send data:', error);
//     }
//   }

//   const sendMessage = async () => {
//     try {
//       const data = { key: 'value' };
//       const response = await fetch(API_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log(data);
//       }
//     } catch (error) {
//       console.error('Failed to send data:', error);
//     }
//   };

//   return (
//     <div>
//       <textarea onChange={handleMessageChange} className="resize-none w-full h-24 border rounded-md p-2" placeholder="今なにしてる？"></textarea>
//       <button onClick={sendMessage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded rounded-lg">Send</button>
//     </div>
//   )

// }