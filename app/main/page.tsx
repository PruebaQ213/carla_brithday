"use client"

import React, { useEffect, useState } from 'react';

// Define the type for the agent
type Agent = {
  uuid: string;
  fullPortrait: string;
  displayName: string;
};

export default function Main() {
  const [agents, setAgents] = useState([]);
  const [agentDictionary, setAgentDictionary] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedAgent, setAgent] = useState("");

  const handleClick = (agentUuid : string) => {
    setAgent(agentUuid); // Set the selected agent's UUID
  }

  useEffect(() => {
    // Fetching agent data from the Valorant API
    fetch('https://valorant-api.com/v1/agents/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setAgents(data.data); // Set the agents state with the fetched data
        const dictionary: Record<string, { img: string; name: string }> = {}; // Create a typed dictionary
        data.data.forEach((agent: Agent) => { // Specify the type for agent
          dictionary[agent.uuid] = { img: agent.fullPortrait, name: agent.displayName }; // Populate the dictionary
        });
        setAgentDictionary(dictionary); // Set the agent dictionary state
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setLoading(false); // Ensure loading is false even on error
      });
  }, []); // Empty dependency array means this effect runs once on mount



  return (
    <>
      <div id="main" className="h-screen flex-col flex items-center justify-center">
        <div className="header flex items-center justify-center">
          <h1 className="text-7xl">{selectedAgent ? agentDictionary[selectedAgent]?.name : 'Por favor, selecciona un agente'}</h1>
          <img className="w-64" src={agentDictionary[selectedAgent]?.img} alt="" />
        </div>
        
        <div className="api m-14 h-3/4 w-11/12 text-center bg-red-400 flex flex-wrap justify-center overflow-auto">
          {loading ? (
            <h1 className="text-9xl font-bold flex text-center justify-center items-center">Cargando..</h1>
          ) : (
            agents.map(agent => (
              agent.uuid !== 'ded3520f-4264-bfed-162d-b080e2abccf9' && (
                <div key={agent.uuid} className="m-4 flex justify-center items-center">
                  <img 
                    src={agent.fullPortrait} 
                    alt={agent.displayName} 
                    id="agent" 
                    className={`m-10 scale-150 cursor-pointer ${selectedAgent === agent.uuid ? 'bg-pink-500 rounded-3xl mt-5' : ''}`} 
                    onClick={() => handleClick(agent.uuid)} // Add onClick handler
                  />
                </div>
              )
            ))
          )}
        </div>
        <button 
          className="scale-150 bg-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-red-700 transition duration-300 mb-5"
          onClick={() => {
            localStorage.setItem('selectedAgentImg', agentDictionary[selectedAgent]?.img);
            localStorage.setItem('selectedAgentName', agentDictionary[selectedAgent]?.name); 
          }}
        >
          LOCK IN
        </button>
      </div>
    </>
  );
}