import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  "name" : string,
  "email" : string,
  "password" : string,
  "password_confirmation" : string
}

export interface Logger {
  "email" : string,
  "password" : string
}

export interface Hist {
  "media_id" : number,
  "media_type" : string,
  "media_name" : string,
  "media_overview" : string,
  "media_genre" : string,
  "media_vote" : string,
  "media_img" : string,
  "usuario_email" : string
}

const apiKey = 'c78cca8bba77868ca68b466c8572b5ce'
var httpOptions = {}

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http : HttpClient) { }

  InitialiceHeaders(){
    httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }),
    }
  }

  //----------REQUEST GENERALES-----

  getTopRated(type : string): Observable <any>{
    const reqURL = 'https://api.themoviedb.org/3/'+type+'/top_rated?api_key='+apiKey+'&language=es-MX&page=1'
    return this.http.get(reqURL)
  }

  getTrending(type: string): Observable <any>{
    const reqURL = 'https://api.themoviedb.org/3/trending/'+type+'/day?api_key=' + apiKey
    return this.http.get(reqURL)
  }

  getPopular(type: string, page): Observable <any>{
    const reqURL = 'https://api.themoviedb.org/3/'+type+'/popular?api_key='+apiKey+'&language=es-MX&page='+page
    return this.http.get(reqURL)
  }

  //----------REQUEST SÓLO DE PELÍCULAS----------

  getWatchingNow(): Observable <any>{
    const reqURL = 'https://api.themoviedb.org/3/movie/now_playing?api_key='+apiKey+'&language=es-MX&page=1'
    return this.http.get(reqURL)
  }

  getUpcoming(): Observable <any>{
    const reqURL = 'https://api.themoviedb.org/3/movie/upcoming?api_key='+apiKey+'&language=es-MX&page=1'
    return this.http.get(reqURL)
  }

  getOneMovie(reqId): Observable <any>{
    const reqURL = 'https://api.themoviedb.org/3/movie/'+reqId+'?api_key='+apiKey+'&language=es-MX'
    return this.http.get(reqURL)
  }

  //----------REQUEST SÓLO DE SERIES----------

  getOneSerie(reqId): Observable <any>{
    const reqURL = 'https://api.themoviedb.org/3/tv/'+reqId+'?api_key='+apiKey+'&language=es-MX'
    return this.http.get(reqURL)
  }

  getTvSeasons(reqId, reqSeason): Observable <any>{
    const reqURL = 'https://api.themoviedb.org/3/tv/'+reqId+'/season/'+reqSeason+'?api_key='+apiKey+'&language=es-MX'
    return this.http.get(reqURL)
  }

  getAiringToday() : Observable <any>{
    const reqURL = 'https://api.themoviedb.org/3/tv/airing_today?api_key='+apiKey+'&language=es-MX&page=1'
    return this.http.get(reqURL)
  }

  getInEmition() : Observable <any>{
    const reqURL = 'https://api.themoviedb.org/3/tv/airing_today?api_key='+apiKey+'&language=es-MX&page=1'
    return this.http.get(reqURL)
  }

  //--------BUSCAR--------------------------
  search(value) : Observable <any>{
    const reqURL = 'https://api.themoviedb.org/3/search/multi?api_key='+apiKey+'&language=es-MX&query='+value+'&page=1&include_adult=false'
    return this.http.get(reqURL)
  }

  //-------FUNCIONES DE USUARIO-------------
  register(body : User) : Observable <any>{
    const reqURL = 'https://redmex.online/api/register'
    return this.http.post(reqURL, body)
  }

  login(body : Logger) : Observable <any>{
    const reqURL = 'https://redmex.online/api/login'
    return this.http.post(reqURL, body)
  }

  getHistorial() : Observable <any>{
    const reqURL = 'https://redmex.online/api/historial'

    return this.http.get(reqURL, httpOptions)
  }

  putHistorial(request : Hist) : Observable <any>{
    const reqURL = 'https://redmex.online/api/historial'
    return this.http.post(reqURL, request, httpOptions)
  }

  getFavs() : Observable <any>{
    const reqURL = 'https://redmex.online/api/favoritos'
    return this.http.get(reqURL, httpOptions)
  }

  putFavs(request : Hist) : Observable <any>{
    const reqURL = 'https://redmex.online/api/favoritos'
    return this.http.post(reqURL, request, httpOptions)
  }

  deleteFavs(id) : Observable <any>{
    const reqURL = 'https://redmex.online/api/favoritos?media_id=' + id
    return this.http.delete(reqURL, httpOptions)
  }

  getUser() : Observable <any>{
    const reqURL = 'https://redmex.online/api/user'
    return this.http.get(reqURL, httpOptions)
  }

  updateUser(body) : Observable <any>{
    const reqURL = 'https://redmex.online/api/user'
    return this.http.put(reqURL, body, httpOptions)
  }

  loggout(){
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    return 'Cesión cerrada'
  }


}
