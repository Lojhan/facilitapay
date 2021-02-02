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
      <h1>{{ multiplier }}</h1>
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
    computed: {
    multiplier() { return this.value * 0.01 }, 
    newValue() { 
      var value = 0

      const BRLto = () => {
        var brl = 0
        switch (this.selectedValue2.name){
          case 'BRL': brl = this.value; break
          case 'USD': brl = (this.value - this.IOF - this.taxa) / 5.2164; break
          case 'EUR': brl = (this.value - this.IOF - this.taxa) / 6.3970; break
        }
        return brl
      }

      const USDto = () => {
        var usd = 0
        switch (this.selectedValue2.name){
          case 'BRL': usd = (this.value - this.IOF - this.taxa) * 5.2164; break
          case 'USD': usd = this.value; break
          case 'EUR': usd = (this.value - this.IOF - this.taxa) / 1.2206; break
        }
        return usd
      }

      const EURto = () => {
        var eur = 0
        switch (this.selectedValue2.name){
          case 'BRL': eur = (this.value - this.IOF - this.taxa) * 6.3970; break 
          case 'USD': eur = (this.value - this.IOF - this.taxa) * 1.2206; break 
          case 'EUR': eur = this.value; break
        }
        return eur
      }


      switch (this.selectedValue1.name){
        case 'BRL': value = BRLto(); break
        case 'USD': value = USDto(); break
        case 'EUR': value = EURto(); break
      }


      return value
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
