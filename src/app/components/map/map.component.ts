import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit{
  ngOnInit(): void {
    let svgCountryPaths = document.querySelectorAll<SVGPathElement>('path');

    Array.prototype.forEach.call(svgCountryPaths, (svgCountry: SVGPathElement) => {

      svgCountry.addEventListener('mouseover', (event:MouseEvent)=> {
        const path = event.target as SVGPathElement;
        path.style.fill = '#654321';
      });

      svgCountry.addEventListener('mouseleave', (event:MouseEvent)=> {
        const path = event.target as SVGPathElement;
        path.style.fill = '';
      });
      
      svgCountry.addEventListener('click', () => {
        this.loadCountryData(svgCountry);
      });
    });
  }

  async loadCountryData(svgCountry: SVGPathElement){
    let api: string = 'https://api.worldbank.org/V2/country/'+svgCountry.id+'?format=json';
    let res: Response = await fetch(api);
    let data: any =  await res.json();
    let dataPath: any = data[1];
    
    let name: string = dataPath[0].name;
    document.getElementById('name')!.innerText = name;

    let capital: string = dataPath[0].capitalCity;
    document.getElementById('capital')!.innerText = capital;

    let region: string = dataPath[0].region.value;
    document.getElementById('region')!.innerText = region;

    let income: string = dataPath[0].incomeLevel.value;
    document.getElementById('income')!.innerText = income;

    let longitude: string = dataPath[0].longitude;
    document.getElementById('longitude')!.innerText = longitude;

    let latitude: string = dataPath[0].latitude;
    document.getElementById('latitude')!.innerText = latitude;

  }
  
}

