import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { CardForm, Tarjeta } from '../../models/card';
import { CardService } from '../../services/card.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
currentYear = new Date().getFullYear() % 100;
maxYear = this.currentYear + 5;
form!: FormGroup<CardForm>;
tarjetas: Tarjeta[] = [];

constructor(private fb: NonNullableFormBuilder, private cardservice: CardService, private router: Router) {
    this.form = this.fb.group<CardForm>({
      cardNumber: this.fb.control('', [
        Validators.required,
        Validators.pattern(/^\d{13,16}$/)
      ]),
      expiryDate: this.fb.control('', [
        Validators.required,
        this.expiryValidator.bind(this)
      ]),
      cardHolder: this.fb.control('', [
        Validators.required,
        Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{1,20}$/)
      ]),
      cvv: this.fb.control('', [
        Validators.required,
        Validators.pattern(/^\d{3,4}$/)
      ])
    });
  }

 get f(): CardForm{
    return this.form.controls;
  }


/** Valida el formato y rango del campo fecha */
  expiryValidator(control: FormControl<string>): ValidationErrors | null {
    const match = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(control.value);
    if (!match) return { invalidFormat: true };
    const year = parseInt(match[2], 10);
    return year >= 22 && year <= this.maxYear ? null : { invalidYear: true };
  }


  /** Formatea el número de tarjeta para vista previa */
  formatCardNumber(): string {
    const val = this.f.cardNumber.value;
    return val ? val.replace(/\d{4}(?=\d)/g, '$&  ').trim() : '••••  ••••  ••••  ••••';
  }

/*enmascararNumero(numero: string): string {
  if (numero.length < 16) return numero; 
  return numero.substring(0, 2) + '************' + numero.substring(numero.length-4);
   
}*/
  ngOnInit(): void {
    
   this.cardservice.getCards().subscribe(cards=>{
      this.tarjetas=cards
    
    });
    
  }

/** Envío del formulario */
  onSubmit(): void {
     if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }
  const tarjeta: Tarjeta = {
    id: 0, //crypto.randomUUID(),
   // cardNumber: this.enmascararNumero(this.f.cardNumber.value),
    cardNumber: this.f.cardNumber.value,
    cardHolder: this.f.cardHolder.value,
    expiryDate: this.f.expiryDate.value,
    cvv: this.f.cvv.value
  };
 debugger
this.cardservice.addCard(tarjeta).subscribe(()=>{
      alert("Tarjeta registrada");
      this.router.navigate(["card/lista"]);
  });
 // this.tarjetas.push(tarjeta);
  this.form.reset();
  }

}
