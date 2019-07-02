import { Component, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaNoticias, Article } from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment';
import { NoticiasService } from '../services/noticias.service';
import { IonSegment, IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonSegment) segment;

  articulos: Article[] = [];
  segVal: any;
  categorias: string[] =['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']
  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(){
    this.segment.value = this.categorias[0];
    this.setNoticias(this.segment.value);
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      this.getNoticias(this.segment.value);
      
    event.target.complete();
      if (this.articulos.length == 700) {
        event.target.disabled = true;
      }
    }, 500);
    
  }

  getNoticias(categoria: string, event?){
    this.noticiasService.getNoticiasCat(categoria)
    .subscribe(noticias => {
      console.log(noticias);
      console.log(categoria);
      this.articulos.push(...noticias.articles);
     
    })
  }
  setNoticias(categoria: string){
    this.articulos.length =0;
    this.getNoticias(categoria);
  }
}