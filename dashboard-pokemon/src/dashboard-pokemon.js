import { LitElement, html, css } from "lit";
import "./components/form-detail-pokemon/src/form-detail-pokemon.js";
import "./components/edit-detail-pokemon/src/edit-detail-pokemon.js";

class DashboardPokemon extends LitElement {
  static styles = css`
    section {
      font-family: sans-serif;
      width: 750px;
      height: 900px;
      background-color: #f0f0f0;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    .title-card {
      background-color: red;
      padding: 20px;
      text-align: center;
      border-radius: 10px;
    }

    .centrar{
      text-align:center;
    }

    .pokemon-container {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 10px;
    }
    .pokemon-button {
      display: inline-block;
      padding: 10px;
      margin: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      cursor: pointer;
    }
  `;

  static properties = {
    pokemones: { type: Array },
    selectedPokemon: { type: String },
    showOtherComponent: {type: String},
    flagEditVar: { type: Boolean },
  };

  constructor() {
    super();
    this.pokemones = [];
    this.selectedPokemon = "";
    this.showOtherComponent = "";
    this.flagEditVar = false;
    this.obtenerValores();
  }

  async obtenerValores() {
    try {
      const response = await fetch("http://localhost:3002/pokemon");
      const data = await response.json();
      this.pokemones = data;
    } catch (error) {
      const jsonData = (await fetch("./data/pokemon.json")).json;
      this.pokemones = jsonData;
    }
  }

  handleButtonClick(pokemon) {
    console.log(`Hiciste clic en ${pokemon.name}`);
    console.log()
    if(this.flagEditVar == true){
      this.showOtherComponent = pokemon;
      this.selectedPokemon = "";
    }else{
      this.selectedPokemon = pokemon;
      this.showOtherComponent = "";
    }
    
    setTimeout(() => this.requestUpdate(), 0);
  }

  flagEdit() {
    this.flagEditVar = true;
  }

  closeSegundoComponente() {
    this.selectedPokemon = "";
    this.requestUpdate();
  }

  closeTercerComponent() {
    this.flagEditVar = false;
    this.showOtherComponent = "";
    this.requestUpdate();
  }

  render() {
    return html`
      ${this.selectedPokemon
        ? html`
            <form-detail-pokemon
              .evolutions=${this.selectedPokemon.evolutions}
              namePokemon="${this.selectedPokemon.name}"
              @close-modal="${this.closeSegundoComponente}"
            ></form-detail-pokemon>
          `
        : html`
            ${this.showOtherComponent
              ? html`
                  <edit-detail-pokemon
                    .evolutions=${this.showOtherComponent.evolutions}
                    namePokemon="${this.showOtherComponent.name}"
                    @close-modal="${this.closeTercerComponent}"
                  ></edit-detail-pokemon>
                `
              : html`
                  <section>
                    <div class="title-card">
                      <img
                        src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
                      />
                    </div>
                    <div class="pokemon-container">
                      ${this.pokemones.map(
                        (pokemon) => html`
                          <button
                            class="pokemon-button"
                            @click=${() => this.handleButtonClick(pokemon)}
                          >
                            <img src="${pokemon.image}" alt="${pokemon.name}" />
                            <br />
                            <strong>${pokemon.name}</strong><br />
                            <strong>Tipo: ${pokemon.type}</strong>
                          </button>
                        `
                      )}
                    </div>
                    <br />
                    <div class="centrar"><input type="checkbox" @change="${this.flagEdit}" />Activar Edición</div>
                    
                  </section>
                `}
          `}
    `;
  }
}

customElements.define("dashboard-pokemon", DashboardPokemon);
