import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search'
})

export class SearchPipe implements PipeTransform {
    transform(languages: any, searchInput: string): any[] {
        if (!searchInput) {
            return languages;
        }

        searchInput = searchInput.toLowerCase();
        return languages.filter(
            (x: { name: any; }) => JSON.stringify(x.name).toLowerCase().includes(searchInput)
        )
    }
}