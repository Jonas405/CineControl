export class Upload {
    $key: string;
    cuerpo: string;
    encabezado: string;
    logisticID: string;
    timeStamp: Date;
    file: File;
    name: string;
    url: string;
    progress: number;
    createdAt: Date = new Date();

    constructor(file: File) {
        this.file = file;
        this.name = name;
       // this.url = URL;
    }
}
