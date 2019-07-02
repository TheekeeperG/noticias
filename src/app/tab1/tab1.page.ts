import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../services/noticias.service';
import {Article} from '../interfaces/interfaces';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  articulos: Article[] = [];
  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(){
    this.noticiasService.getNoticias()
    .subscribe(noticias=>{
      console.log("Noticias...",noticias);
      this.articulos.push(...noticias.articles);
    });
  }
}
