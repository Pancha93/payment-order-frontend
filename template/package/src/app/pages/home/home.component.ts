import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {SliderComponent} from "../../components/slider/slider.component";
import {CardImagenComponent} from "../../components/card-imagen/card-imagen.component";
import {Header1Component} from "../../components/header1/header1";
import {Header2Component} from "../../components/header2/header2";
import {Header3Component} from "../../components/header3/header3";
import { sliderConfig, dataCards, textoIzquierda, textoDerecha } from './dataHome';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    SliderComponent,
    CardImagenComponent,
    Header1Component,
    Header2Component,
    Header3Component,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  configuracionSlider = sliderConfig;
  cards = dataCards;
  textoIzquierda = textoIzquierda;
  textoDerecha = textoDerecha;


  constructor(private router: Router) {}
  irALogin() {
    this.router.navigate(['/authentication/login']);
  }
}
