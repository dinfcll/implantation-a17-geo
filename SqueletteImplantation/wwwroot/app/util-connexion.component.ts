import { Component } from '@angular/core';

@Component({
  selector: 'util-connexion',
  template: `
    <h1>titre chose</h1>
	<label for="courriel">Courriel</label>
	<input type="email" id="courriel" name="courriel"/>
	<br>
	<label for="mdp">Mot de passe</label>
	<input type="password" id="mdp" name="mdp"/>
	<br>
	<input type="submit" value="Connexion"/>
    `  
})
export class UtilConnexionComponent  {  }