import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokemon !: string

  constructor(private http: HttpClient) { }

  getPokemon(pokemon : string) : Observable<any>{
    return this.http.get(`https://pokeapi.co/api/v2/pokemon-form/${pokemon}`)
  }

  getPokemonStats(pokemon : string)  : Observable<any>{
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
  }



}
