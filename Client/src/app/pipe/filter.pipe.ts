import {Pipe, PipeTransform} from '@angular/core';
import {Note} from '../models/note';

@Pipe({
  name: 'filter',
  pure: true,
})
export class FilterPipe implements PipeTransform {
  transform(items: Note[], query: string) {
    if (items && query) {
      items = items.filter((value: Note) => {
        if (value.tag) {
          return value.tag.toLowerCase().indexOf(query.toLowerCase()) > -1;
        }

        return items;
      });
    }

    return items;
  }
}
