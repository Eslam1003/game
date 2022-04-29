import Header from './Header';
import Die from './Die';
import './style.css';
import React from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-canvas-confetti';
export default function App() {
  const [dice, setDice] = React.useState(newDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    let allhold = dice.every((die) => die.ishold);
    const fristvalue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === fristvalue);

    if (allhold && allSameValue) {
      setTenzies(true);
      console.log('you wine');
    }
  }, [dice]);

  // console.log(tenzies);
  function generatenewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      ishold: false,
      id: nanoid(),
    };
  }
  function newDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generatenewDice());
    }
    return newDice;
  }

  function roll() {
    if (!tenzies) {
      setDice((olddice) => {
        return olddice.map((die) => {
          return die.ishold ? die : generatenewDice();
        });
      });
    } else {
      setTenzies(false);
      setDice(newDice());
    }
  }

  function holddice(id) {
    setDice((olddice) => {
      return olddice.map((die) => {
        return id === die.id
          ? {
              ...die,
              ishold: !die.ishold,
            }
          : die;
      });
    });
  }

  let die = dice.map((die) => {
    return (
      <Die
        value={die.value}
        key={die.id}
        id={die.id}
        ishold={die.ishold}
        holddice={() => holddice(die.id)}
      />
    );
  });
  return (
    <div className='container'>
      <div className='game--container'>
        <Header />
        <div className='die--container'>{die}</div>
        <button onClick={roll}> {tenzies ? 'you win' : 'Roll'}</button>
      </div>
    </div>
  );
}
