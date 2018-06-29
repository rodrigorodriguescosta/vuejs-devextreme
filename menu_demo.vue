<template>
  <f-menu v-model="menu"></f-menu>
</template>

<script>
  export default {
    data () {
      return {
        menu: [{
          id: '1',
          name: 'Video Players',
          items: [{
            id: '1_1',
            name: 'HD Video Player',
            price: 220
          }, {
            id: '1_2',
            name: 'SuperHD Video Player',
            price: 270
          }]
        }, {
          id: '2',
          name: 'Televisions',
          items: [{
            id: '2_1',
            name: 'SuperLCD 42',
            price: 1200
          }, {
            id: '2_2',
            name: 'SuperLED 42',
            price: 1450
          }, {
            id: '2_3',
            name: 'SuperLED 50',
            price: 1600
          }, {
            id: '2_4',
            name: 'SuperLCD 55 (Not available)',
            price: 1350,
            disabled: true
          }, {
            id: '2_5',
            name: 'SuperLCD 70',
            price: 4000
          }]
        }, {
          id: '3',
          name: 'Monitors',
          items: [{
            name: '19"',
            items: [{
              id: '3_1_1',
              name: 'DesktopLCD 19',
              price: 160
            }]
          }, {
            id: '3_2',
            name: '21"',
            items: [{
              id: '3_2_1',
              name: 'DesktopLCD 21',
              price: 170
            }, {
              id: '3_2_2',
              name: 'DesktopLED 21',
              price: 175
            }]
          }]
        }, {
          id: '4',
          name: 'Projectors',
          items: [{
            id: '4_1',
            name: 'Projector Plus',
            iconSrc: 'images/products/14.png',
            price: 550
          }, {
            id: '4_2',
            name: 'Projector PlusHD',
            iconSrc: 'images/products/15.png',
            price: 750
          }]
        }]
      }
    }
  }
</script>

