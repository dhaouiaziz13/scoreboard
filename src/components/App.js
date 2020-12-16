import React, { Component } from "react";
import Home from "./home";
import Spinner from "./spinner";
import axios from "axios";
class App extends Component {
  state = {
    players: null,
  };

  // player id counter

  async componentDidMount() {
    const response = await axios.get("http://localhost:8080/data");
    this.setState({
      players: response.data,
    });
  }

  getHighScore = () => {
    const scores = this.state.players.map((p) => p.score);
    const highScore = Math.max(...scores);
    if (highScore) {
      return highScore;
    }
    return null;
  };

  handleScoreChange = (index, delta) => {
    this.setState((prevState) => {
      // New 'players' array – a copy of the previous `players` state
      const updatedPlayers = [...prevState.players];
      // A copy of the player object we're targeting
      const updatedPlayer = { ...updatedPlayers[index] };

      // Update the target player's score
      updatedPlayer.score += delta;
      // Update the 'players' array with the target player's latest score
      updatedPlayers[index] = updatedPlayer;

      // Update the `players` state without mutating the original state
      return {
        players: updatedPlayers,
      };
    });
  };

  handleAddPlayer = (name) => {
    this.setState((prevState) => {
      return {
        players: [
          ...prevState.players,
          {
            name,
            score: 0,
            id: (prevState.players.length += 1),
          },
        ],
      };
    });
  };
  save = () => {
    axios.post("http://localhost:8080/save", {
      data: this.state.players,
    });
  };
  handleRemovePlayer = (id) => {
    this.setState((prevState) => {
      return {
        players: prevState.players.filter((p) => p.id !== id),
      };
    });
  };
  renderer = () => {
    if (this.state.players) {
      const highScore = this.getHighScore();
      return (
        <Home
          prevPlayerId={this.prevPlayerId}
          handleRemovePlayer={this.handleRemovePlayer}
          handleScoreChange={this.handleScoreChange}
          handleAddPlayer={this.handleAddPlayer}
          highScore={highScore}
          players={this.state.players}
        />
      );
    }
    return <Spinner />;
  };
  render() {
    return (
      <div className="cont">
        {this.renderer()}
        <input
          onClick={() => this.save()}
          className="saveb"
          type="submit"
          value="save"
        />
        {/* <input className="out" type="submit" value="logout" /> */}
      </div>
    );
  }
}

export default App;
