import { PipeTransform, Pipe } from '@angular/core';
import { MaterialSonyInterface } from 'src/app/models/materialesSony';

@Pipe({
    name: 'materialSonyFilter'
})

export class MaterialSonyFilterPipe implements PipeTransform{

    transform(managed: MaterialSonyInterface[] , searchTerm: string):  MaterialSonyInterface[] {
        if(!managed || !searchTerm){
            return managed;
        }
        return managed.filter(managed => 
            managed.Title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);

    }
}