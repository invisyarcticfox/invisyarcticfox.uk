export namespace D1 {
  export type Photography = {
    file: string
    folder: string|null,
    date: string
    iso: number
    focallength: number
    aperture: number
    shutter_num: number
    shutter_den: number
    hex: string
    reg: string
    iata: string|null
    icao: string|null
  }

  export type SonaArt = { file:string, artist:string, artisturl:string, width:number, height:number }

  export type Animations = { file:string, title:string, date:string, source:string|null }
}