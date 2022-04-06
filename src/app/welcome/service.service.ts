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

const apiKey = 'c78cca8bba77868ca68b466c8572b5ce'

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http : HttpClient) { }

  //----------REQUEST GENERALES-----

  getTopRated(type : string): Observable <any>{
    const reqURL = 'https://api.themoviedb.org/3/'+type+'/top_rated?api_key='+apiKey+'&language=es-MX&page=1'
    return this.http.get(reqURL)
  }

  getTrending(type: string): Observable <any>{
    const reqURL = 'https://api.themoviedb.org/3/trending/'+type+'/day?api_key=' + apiKey
    return this.http.get(reqURL)
  }

  getPopular(type: string): Observable <any>{
    const reqURL = 'https://api.themoviedb.org/3/'+type+'/popular?api_key='+apiKey+'&language=es-MX&page=1'
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

  loggout(){
    localStorage.removeItem('token');
    return 'Cesión cerrada'
  }

  
}
