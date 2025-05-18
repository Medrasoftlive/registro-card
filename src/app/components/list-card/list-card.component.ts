import { Component, OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';
import { Tarjeta } from '../../models/card';



@Component({
  selector: 'app-list-card',
  standalone: false,
  templateUrl: './list-card.component.html',
  styleUrl: './list-card.component.css'
})
export class ListCardComponent implements OnInit {

  constructor(private cardservice: CardService){

  }

  tarjetas?: Tarjeta[];

  ngOnInit(): void {
    this.cardservice.getCards().subscribe(cards=>{
      this.tarjetas=cards;
      
    });
  }

  enmascararNumero(numero: string): string {
  if (numero.length < 16) return numero; 
  return numero.substring(0, 2) + '************' + numero.substring(numero.length-4);
  }

}
