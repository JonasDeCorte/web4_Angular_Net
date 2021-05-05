interface ImageJSON
{
    imageData: string;
    personeelId: number;
}

export class Image
{
    constructor(
        private _imageData: string,
        private _personeelId: number
    ){}
    static fromJSON(imageJSON: ImageJSON): Image
    {
        let image = new Image(imageJSON.imageData, imageJSON.personeelId);
        return image
    }

    public get ImageData(): string{
        return this._imageData;
    }
    public get ersoneelId(): number{
        return this._personeelId;
    }
    
} 