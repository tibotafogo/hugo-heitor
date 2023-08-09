import { Injectable, numberAttribute } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {
  private filmes: Filme [] = [];

  constructor() { }

  public getFilme(): Filme[] {
    return this.filmes;
  }
   
  public addFilme( value: string, date:string) {
    date = date.replace("-", "/");
    let filme: Filme = { value: value, date:new Date(date), done:false };
    this.filmes.push(filme);
  }
  public updateFilme(index: number, value: string, date:string){
    let filme: Filme  = this.filmes[index];
    filme.value = value;
    date = date.replace("-", "/");
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