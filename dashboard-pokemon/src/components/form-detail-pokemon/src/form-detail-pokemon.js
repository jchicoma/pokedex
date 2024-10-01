import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";

class FormDetailPokemon extends LitElement {
  static styles = css`
    section {
      font-family: sans-serif;
      width: 650px;
      height: 900px;
      background-color: #f0f0f0;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 10px;
    }

    .title-card {
      background-color: red;
      padding: 20px;
      text-align: center;
      border-radius: 10px;
    }

    .pokemon-info {
      align-items: center;
      text-align: center;
      margin-bottom: 10px;
    }

    .pokemon-name {
      font-size: 18px;
    }

    .evolutions {
      flex-wrap: wrap;
    }

    .evolution-item {
      border: 1px;
      border-color: black;
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: center;
    }

    .item {
      border: 1px solid black;
      width: 160px;
      height: 90px;
      align-items: center;
      padding-top: 40px;
      padding-left: 10px;
      text-align: left;
      border-radius: 10px;
    }

    .space {
      margin: 10px;
    }

    .space-bottom{
      margin-bottom: 20px;
    }

    button {
      background-color: red;
      color: white;
      border: none;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      border-radius: 10px;
    }

    button:hover {
      background-color: darkred;
    }
  `;

  static properties = {
    evolutions: { type: Array },
    namePokemon: { type: String },
  };

  constructor() {
    super();
    this.obtenerValores();
  }

  async obtenerValores() {
    this.namePokemon = "";
    this.evolutions = [];
    setTimeout(() => this.requestUpdate(), 0);
  }

  handleCloseClick() {
    this.dispatchEvent(new CustomEvent("close-modal"));
  }

  render() {
    return html`
      <section>
        <div class="title-card">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
          />
        </div>
        <br />
        <div class="pokemon-info">
          <div>
            <h2>Evoluciones de ${this.namePokemon}</h2>
            <br />
            ${this.evolutions.length
              ? html`
                  <div class="evolutions">
                    ${this.evolutions.map(
                      (evolution) => html`
                        <div class="evolution-item">
                          <div class="item">
                            <strong>${evolution.name}</strong><br />
                            <strong>Tipo: ${evolution.type}</strong>
                          </div>
                          <div class="space"></div>
                          <div class="item">
                            <img
                              src="${evolution.image}"
                              alt="${evolution.name}"
                            />
                          </div>
                        </div>
                        <br />
                      `
                    )}
                  </div>
                `
              : html`
                  <div class="space-bottom">
                    <span>No hay evoluciones</span>
                  </div>
                `}
          </div>
          <button @click="${this.handleCloseClick}">Volver</button>
        </div>
      </section>
    `;
  }
}

customElements.define("form-detail-pokemon", FormDetailPokemon);
