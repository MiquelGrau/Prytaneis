import {CityModel} from '../../../core/models/city.model';

export class CitiesStateModel {
  loading: boolean;
  citiesList: CityModel[];
  selectedCity: CityModel | null;

  constructor(loading: boolean, citiesList: CityModel[], selectedCity: (CityModel | null)) {
    this.loading = loading;
    this.citiesList = citiesList;
    this.selectedCity = selectedCity;
  }
}
