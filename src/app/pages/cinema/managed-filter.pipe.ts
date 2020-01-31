import { PipeTransform, Pipe } from '@angular/core';
import { ManagedTheaterInterface } from 'src/app/models/managedTheaters';

@Pipe({
    name: 'managedFilter'
})

export class ManagedFilterPipe implements PipeTransform {

    transform(managed: ManagedTheaterInterface[] , searchTerm: string): ManagedTheaterInterface[] {
        if (!managed || !searchTerm) {
            return managed;
        }
        return managed.filter(managed =>
            managed.Cine.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);

    }
}
