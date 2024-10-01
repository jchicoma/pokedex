import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import "@material/mwc-button";
import "@material/mwc-dialog";
import "@material/mwc-checkbox";

class EditDetailPokemon extends LitElement {
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
      width: 200px;
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

    mwc-checkbox span {
      /* Your styles here, e.g., */
      color: black;
      font-weight: normal;
    }
  `;

  static properties = {
    evolutions: { type: Array },
    namePokemon: { type: String },
    showModal: { type: Boolean },
  };

  constructor() {
    super();
    this.obtenerValores();
  }

  async obtenerValores() {
    this.showModal = false;
    this.namePokemon = "";
    this.evolutions = [
      {
        name: "Ivysaur",
        type: "Grass/Poison",
        image:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
      },
      {
        name: "Venusaur",
        type: "Grass/Poison",
        image:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
      },
    ];
    setTimeout(() => this.requestUpdate(), 0);
  }

  handleCheckboxChange(event) {
    this.showModal = event.target.checked;
  }

  closeModal() {
    this.showModal = false;
    this.desmarcarCheck();
  }

  desmarcarCheck() {
    const checkboxElement = this.shadowRoot.querySelector(
      'input[type="checkbox"]'
    );
    checkboxElement.checked = false;
  }
  handleCloseClick() {
    this.desmarcarCheck();
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
            ${this.evolutions
              ? html`
                  <div class="evolutions">
                    ${this.evolutions.map(
                      (evolution) => html`
                        <div class="evolution-item">
                          <div class="item">
                            <input type="text" value="${evolution.name}" />
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
                  <input
                    type="checkbox"
                    @change="${this.handleCheckboxChange}"
                  />¿Se repite el pokemon principal?
                  <mwc-dialog ?open="${this.showModal}">
                    <h2>El pokemon se puede cambiar en un punto cercano.</h2>
                    <mwc-button @click="${this.closeModal}" slot="primaryAction"
                      >Cerrar</mwc-button
                    >
                  </mwc-dialog>
                `
              : html` <span>No hay evoluciones</span> `}
          </div>
          <br />
          <button @click="${this.handleCloseClick}">Volver</button>
        </div>
      </section>
    `;
  }
}

customElements.define("edit-detail-pokemon", EditDetailPokemon);
