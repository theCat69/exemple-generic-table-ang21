import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { email, debounce, form, FormField, required, submit, min, max, schema } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { SimpleInput } from '../../components/forms/simple-input/simple-input';
import { NumberInput } from '../../components/forms/number-input/number-input';

interface Adresse {
  street: string;
  postalCode: string;
  city: string;
  country: string;
}

interface FormObject {
  email: string;
  name: string;
  dateOfBirth: string | null;
  age: number;
  adresse: Adresse | null;
}

@Component({
  selector: 'app-form-page',
  imports: [FormField, MatButtonModule, SimpleInput, NumberInput],
  templateUrl: './form-page.html',
  styleUrl: './form-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormPage {
  private formModel = signal<FormObject>({
    email: '',
    name: '',
    age: 0,
    dateOfBirth: null,
    adresse: null
  });

  formSchema = schema<FormObject>((schemaPath) => {
    debounce(schemaPath.email, 500);
    required(schemaPath.email, { message: 'Email required' });
    email(schemaPath.email, { message: 'Email should be valid' });
    required(schemaPath.age, { message: 'Age required' });
    min(schemaPath.age, 0);
    max(schemaPath.age, 150);
  })

  formTree = form(this.formModel, this.formSchema);

  submit(event: Event) {
    event.preventDefault();

    submit(this.formTree, async () => {
      const values = this.formModel();

      console.log('form values : ', values);
    });
  }
}
