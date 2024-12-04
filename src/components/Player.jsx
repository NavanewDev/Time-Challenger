import {useState, useRef} from 'react';

export default function Player() {
    const [displayName, setDisplayName] = useState('');
    const playerName = useRef();

    function handleClick() {
        setDisplayName(playerName.current.value);
        playerName.current.value = '';
    }

    

    return (
      <section id="player">
        <h2>Welcome {displayName != '' ? displayName : 'Unknown Entity'}</h2>
        <p>
          <input ref={playerName} type="text"/>
          <button onClick={handleClick}>Set Name</button>
        </p>
      </section>
    );
  }
