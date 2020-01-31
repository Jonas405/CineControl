import { PipeTransform, Pipe } from '@angular/core';
import { MaterialDisneyInterface } from 'src/app/models/materialesDisney';

@Pipe({
    name: 'materialDisneyFilter'
})

export class MaterialDisneyFilterPipe implements PipeTransform {

    transform(managed: MaterialDisneyInterface[] , searchTerm: string): MaterialDisneyInterface[] {
        if (!managed || !searchTerm) {
            return managed;
        }
        return managed.filter(managed =>
            managed.Title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);

    }
}
