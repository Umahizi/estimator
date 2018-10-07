import _ from 'lodash';
import $ from 'jquery'; 
import './styles/styles.css';
import notifier from 'Utils/notifier.js'

import data from './data/data.js';
import productsView from './view/productsView.js';
import seriesView from './view/seriesView.js';
import estimateView from './view/esimateView.js';

window.jQuery = $; window.$ = $;

var self = null;

class App{
  constructor()
  {
      self = this;
      notifier.addListener(seriesView.onSelected,self.estimate);
      notifier.addListener(productsView.onSelected,self.loadSeries);

  }

  
  loadProducts() {
    
      data.loadProducts(productsView.applyTemplate);

    }

    loadSeries(){
      data.loadSeries(productsView.selected.attr('id'),seriesView.applyTemplate);
      
    }

    estimate()
    {
      data.estimate(productsView.selected.data(),seriesView.selected.data(),estimateView.applyTemplate);
    }
    
}

var app = new App();

app.loadProducts();