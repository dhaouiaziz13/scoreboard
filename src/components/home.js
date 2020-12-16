import React from "react";
import Header from "./Header";
import Player from "./Player";
import AddPlayerForm from "./AddPlayerForm";

const Home = ({
  players,
  highScore,
  handleAddPlayer,
  handleScoreChange,
  handleRemovePlayer,
}) => {
  if (players) {
    return (
      <div className="scoreboard">
        <Header players={players} />

        {/* Players list */}
        {players.map((player, index) => (
          <Player
            name={player.name}
            score={player.score}
            id={player.id}
            key={player.id.toString()}
            index={index}
            changeScore={handleScoreChange}
            removePlayer={handleRemovePlayer}
            isHighScore={highScore === player.score}
          />
        ))}

        <AddPlayerForm addPlayer={handleAddPlayer} />
      </div>
    );
  }
};
export default Home;
