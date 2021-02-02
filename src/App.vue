<template>
 <body class="container mt-5">
    <div class="p-grid">
            <div class="p-inputgroup">
                <input class="form-control" v-model="value" placeholder="Você envia" >
                <span class="p-inputgroup-addon">
                  <Dropdown v-model="selectedValue1" :options="values" optionLabel="name" />
                </span>
            </div>
      
    </div>

    <div class="my-5">
      <h1> {{selectedValue1.name}} => {{selectedValue2.name}} : {{ multiplier }}</h1>
      <h1>IOF (1,10%) = {{selectedValue1.name}} {{ IOF }}.00</h1>
      <h1>Taxa administrativa = {{selectedValue1.name}} {{ taxa }}.00</h1>
    </div>

    <div class="p-grid">
        <div class="p-col-12">
            <div class="p-inputgroup">
              
                <input class="form-control" :value="`${selectedValue2.name} ${newValue}`" placeholder="Você envia" disabled>
                <span class="p-inputgroup-addon">
                  <Dropdown v-model="selectedValue2" :options="values" optionLabel="name" />
                </span>
            </div>
        </div>
    </div>
  
 </body>
   


</template>

<script>

import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'

export default {
  name: 'App',
    data() {
      
        return {
            to: 0,
            value: 0,
            selectedValue1: {name: 'BRL'},
    
            selectedValue2: {name: 'USD'},
            values: [
                {name: 'BRL'},
                {name: 'USD'},
                {name: 'EUR'},
            ]
        }
    },
    methods: {
      BRLto() {
        var val = 0
        switch (this.selectedValue2.name){
          case 'BRL': { this.to = 1; val = this.value; break }
          case 'USD': { this.to = (1 / 5.2164); val = (this.value - this.IOF - this.taxa) / 5.2164; break }
          case 'EUR': { this.to = (1 / 6.3970); val = (this.value - this.IOF - this.taxa) / 6.3970; break }
        }
        return val
      },
      USDto(){
        var val = 0
        switch (this.selectedValue2.name){
          case 'BRL': { this.to = (1 * 5.2164); val = (this.value - this.IOF - this.taxa) * 5.2164; break }
          case 'USD': { this.to = 1; val = this.value; break }
          case 'EUR': { this.to = (1 / 1.2206); val = (this.value - this.IOF - this.taxa) / 1.2206; break}
        }
        return val
      },
      EURto(){
        var val = 0
        switch (this.selectedValue2.name){
          case 'BRL': { this.to = (1 * 6.3970); val = (this.value - this.IOF - this.taxa) * 6.3970; break }
          case 'USD': { this.to = (1 * 1.2206); val = (this.value - this.IOF - this.taxa) * 1.2206; break } 
          case 'EUR': { this.to = 1; val = this.value; break }
        }
        return val
      }
    },
    computed: {
    multiplier() { return this.to }, 
    newValue() { 
      var val = 0
      switch (this.selectedValue1.name){
        case 'BRL': val = this.BRLto(); break
        case 'USD': val = this.USDto(); break
        case 'EUR': val = this.EURto(); break
      }
      return val
      }, 
    IOF() { return this.value * 0.011 }, 
    taxa() { return this.value * 0.01 }
  },

}
</script>

<style>
  .form-control {
    width: 300px;
  }


</style>
