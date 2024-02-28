import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'frenchDate',
  standalone: true
})
export class FrenchDatePipe implements PipeTransform {

  transform(value: Date): string | null {
    if (!value) return null;
    
    const date = new Date(value);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    
    let formattedDate = date.toLocaleDateString('fr-FR', options);

    formattedDate = formattedDate
      .split(' ')
      .map(word => this.capitalizeFirstLetter(word))
      .join(' ');

    return formattedDate;
  }

  private capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
