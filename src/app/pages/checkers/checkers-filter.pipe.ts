import { PipeTransform, Pipe } from '@angular/core';
import { CheckerInterface } from 'src/app/models/checkers';

@Pipe({
    name: 'checkerFilter'
})

export class CheckerFilterPipe implements PipeTransform {

    transform(managed: CheckerInterface[] , searchTerm: string): CheckerInterface[] {
        if (!managed || !searchTerm) {
            return managed;
        }
        return managed.filter(managed =>
            managed.checkerName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);

    }
}
