import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})

export class PokedexComponent implements OnInit {

  pokemonName !: string
  pokemonImg !: string
  pokemonStats = {
    hp:null,
    attack:null,
    defense:null,
    spAtk:null,
    spDefense:null,
    speed:null
  }

  form !: FormGroup


  constructor(
    private pokemonService : PokemonService,
    private fb : FormBuilder) { }

  ngOnInit(): void {  
    this.formInit()
  }

  formInit(){
    this.form = this.fb.group({
      pokemonName: [''],
      pokemonNumber: [''] 
    })
  }

  getPokemon(){
    this.pokemonService.getPokemon(this.form.controls['pokemonNumber'].value).subscribe(thisPokemons => {
      this.pokemonName = thisPokemons.name
      this.pokemonImg = thisPokemons.sprites.front_default
      this.form.controls['pokemonName'].patchValue(thisPokemons.name)
      this.getPokemonStatus()
    })
  }
  
  getPokemonStatus(){
    this.pokemonService.getPokemonStats(this.form.controls['pokemonNumber'].value).subscribe(thisPokemon => {
      let pokemonStats = thisPokemon.stats
      this.setPokemonStats(pokemonStats)
    })
  }
  setPokemonStats(pokemonStats : any){
    this.pokemonStats.hp = pokemonStats[0].base_stat
    this.pokemonStats.attack = pokemonStats[1].base_stat
    this.pokemonStats.defense = pokemonStats[2].base_stat
    this.pokemonStats.spAtk = pokemonStats[3].base_stat
    this.pokemonStats.spDefense = pokemonStats[4].base_stat
    this.pokemonStats.speed = pokemonStats[5].base_stat
  }

}
