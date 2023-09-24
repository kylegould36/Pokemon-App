const React = require("react");

const myStyle = {
  color: "#ffffff",
  backgroundColor: "#000000",
};
const color = {
  color: "white",
};

class Show extends React.Component {
  render() {
    const { pokemonData } = this.props;

    if (!pokemonData || !pokemonData.img) {
      return (
        <div style={myStyle}>
          <h1>Gotta Catch 'Em All</h1>
          <p>Error: Invalid Pokémon Data</p>
          <a style={color} href="/pokemon">
            Back
          </a>
        </div>
      );
    }

    const imageUrl = pokemonData.img;

    return (
      <div style={myStyle}>
        <h1>Gotta Catch 'Em All</h1>
        <h2>{cap(pokemonData.name)}</h2>
        <img src={imageUrl} alt={pokemonData.name} />
        <br />
        <br />
        <a style={color} href="/pokemon">
          Back
        </a>
      </div>
    );
  }
}

function cap(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = Show;
