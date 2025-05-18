import { FormControl } from "@angular/forms";


export interface CardForm {
  
  cardNumber: FormControl<string>;
  expiryDate: FormControl<string>;
  cardHolder: FormControl<string>;
  cvv: FormControl<string>;
}



export interface Tarjeta {
  id: number;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}