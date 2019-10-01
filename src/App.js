import React, { useState, useEffect } from 'react';

const App = () => {
  // Define text snippets for user to select:
  const SNIPPETS = [
    'Bears, beets, battlestar galactica',
    "What's Forrest Gump's password? 1Forrest1",
    'Where do programmers like to hangout? The Foo Bar'
  ];
  // Define initial game state when user selects a snippet:
  const INITIAL_GAME_STATE = { victory: false, startTime: null, endTime: null };
  // Define Hooks initial states and state-update methods:
  const [snippet, setSnippet] = useState('');
  const [userText, setUserText] = useState('');
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE);

  useEffect(() => {
    if (gameState.victory) document.title = 'Victory!';
  });

  const updateUserText = event => {
    setUserText(event.target.value);
    // console.log('current userText:', userText);
    if (event.target.value === snippet) {
      setGameState({
        ...gameState,
        victory: true,
        endTime: new Date().getTime() - gameState.startTime
      });
    }
  };

  const chooseSnippet = snippetIndex => () => {
    // console.log('chooseSnippet snippetIndex:', snippetIndex);
    setSnippet(SNIPPETS[snippetIndex]);
    setGameState({ ...gameState, startTime: new Date().getTime() });  //setState method must provide an entirely new object or value
  };

  return (
    <div>
      <h2>Type Race</h2>
      <hr />

      <h3>Snippet</h3>
      {snippet}
      <h4>{gameState.victory ? `Done! 🎉 Time: ${gameState.endTime}ms` : null}</h4>
      <input value={userText} onChange={updateUserText} />
      <hr />

      {
        SNIPPETS.map((SNIPPET, index) => (
          <button onClick={chooseSnippet(index)} key={index}>
            {SNIPPET.substring(0, 10)}...
          </button>
        ))
      }
    </div>
  );
}

export default App;
