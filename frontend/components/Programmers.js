/*
PROGRAMMERS Instructions

Watch the short video in `design-files/programmers.gif`:

This component keeps track of a list of pioneers in the field of programming on the one hand,
and the id of the currently featured programmer on the other. That's two slices of state!
We can only feature one awesome programmer at a time.

Find comments below to help you along.
*/

import React, { useState } from 'react';

// Use this variable ONLY to initialize a slice of state!
// There is something in the JSX right now breaking this rule...
// The export syntax is necessary for the testing library to be able to import the array.
export const listOfAwesome = [
  { id: '1', name: 'Ada Lovelace' },
  { id: '2', name: 'Grace Hopper' },
  { id: '3', name: 'Evelyn Boyd Granville' },
  { id: '4', name: 'Mary Kenneth Keller' },
  { id: '5', name: 'Frances Allen' },
  { id: '6', name: 'Carol Shaw' },
];

export default function Programmers() {
  // We'll have to use the state hook twice, as we need two slices of state.
  // The programmers list on the one hand, and the id of the featured programmer on the other.
  const [programmers, setProgrammers] = useState(listOfAwesome);
  const [featuredId, setFeaturedId] = useState(null);

  const getNameOfFeatured = () => {
    // Leave this for last!
    // This is NOT an event handler but a helper function. See its usage inside the JSX.
    // It's going to utilize both slices of state to return the _name_ of the featured dev.
    // The beauty of closures is that we can "see" both slices of state from this region
    // of the program, without needing to inject the information through arguments.
    const featured = programmers.find(dev => dev.id === featuredId);
    return featured ? featured.name : "";
  };

  const style = {
    fontSize: '1.5em',
    marginTop: '0.5em',
    color: featuredId ? "gold" : 'royalblue', // 🤔 color turns to gold, when celebrating
  };

  return (
    <div className='widget-programmers container'>
      <h2>Programmers</h2>
      <div className='programmers'>
        {
          /* Nasty bug! We should map over a slice of state, instead of 'listOfAwesome'.
          We might think: "it works, though!" But if the list of programmers is not state,
          we could never add or edit programmers in the future. The list would be a static thing." */
          programmers.map(dev =>
            <div className='programmer' key={dev.id}>
              {dev.name} 
              <button onClick={() => setFeaturedId(dev.id)/* in here set the featured id to be dev.id */}>Feature</button>
            </div>
          )
        }
      </div>
      <div id='featured' style={style}>
        {
          // Ternaries are fantastic to render "one thing or the other" depending on the "truthiness" of something.
          // Pseudo-code: if the currently featured id is truthy render text 1, otherwise render text 2.
          // Replace the hard-coded false with the correct variable.
          featuredId
            ? `🎉 Let's celebrate ${getNameOfFeatured()}! 🥳`
            : 'Pick an awesome programmer'
        }
      </div>
    </div>
  );
}
