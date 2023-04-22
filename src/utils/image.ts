import fs from 'fs';

export async function toBase64ImageUrl(imgUrl: string): Promise<string> {
    const fetchImageUrl = await fetch(imgUrl)
    const responseArrBuffer = await fetchImageUrl.arrayBuffer()
    const toBase64 =
        `data:${fetchImageUrl.headers.get('Content-Type') || 'image/png'};base64,${Buffer.from(responseArrBuffer).toString('base64')}`
    return toBase64
}

export function saveB64ToPng(b64: string, filename: string) {
    const data = b64.replace(/^data:image\/\w+;base64,/, "");
    const buf = Buffer.from(data, 'base64')
    fs.writeFile(`./public/uploads/${filename}.png`, buf, function (err: any) { console.log(err) });
}


export function fetchImage(path: string): string {
    const fetchUrl: string = path.startsWith('https://') ? path : `/uploads/${path}.png`;
    return fetchUrl;

}