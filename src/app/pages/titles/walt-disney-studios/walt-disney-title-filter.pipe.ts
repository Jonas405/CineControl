import { PipeTransform, Pipe } from '@angular/core';
import { MovieInterface } from 'src/app/models/movies';

@Pipe({
    name: 'titleDisneyFilter'
})

export class TitleDisneyFilterPipe implements PipeTransform{

    transform(managed: MovieInterface[] , searchTerm: string):  MovieInterface[] {
        if(!managed || !searchTerm){
            return managed;
        }
        return managed.filter(managed => 
            managed.movieName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);

    }
}