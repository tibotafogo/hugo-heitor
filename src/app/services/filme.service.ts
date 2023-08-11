import { Injectable, numberAttribute } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {
  private filmes: Filme [] = [];

  constructor() { }

  public getFilmes(): Filme[] {
    return this.filmes;
  }
   
  public addFilmes( value: string, date:string) {
    date = date.replace(/-/g, "/");
    let filme: Filme = { value: value, date:new Date(date), done:false };
    this.filmes.push(filme);
    this.setStorage();
    console.log(this.filmes);
  }
  public removeFilmes(index:number){
    this.filmes.splice(index,1);
    this.setStorage();
  }
  public alterarFilmes(index:number, value:string, date:string){
    let filme: Filme = this.filmes[index]
    filme.value = value;
    date = date.replace("-", "/");
    filme.date = new Date(date);
    this.filmes.splice (index, 1, filme);
    this.setStorage();
  }
  public async setStorage(){
    await Preferences.set ({
      key: 'filmes',
      value: JSON.stringify(this.filmes)
    });
  }
  public async getFromStorage() {
    const storeData = await Preferences.get({key: 'filmes'});
    if(storeData.value){
      this.filmes = JSON.parse(storeData.value);
    }else {
      this.filmes = []
    }
  }
  public updateFilmes(index: number, value: string, date:string){
    let filme: Filme  = this.filmes[index];
    filme.value = value;
    date = date.replace(/-/g, "/");
    filme.date = new Date(date);
    this.filmes.splice(index, 1, filme);
  }
  public delFilmes(index:number){
    this.filmes.splice(index, 1);
  }
}
interface Filme{
  value: string;
  date:Date;
  done?: boolean;
}