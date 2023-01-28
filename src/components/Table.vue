<template>
    <div class="text-white text-xl w-full flex flex-col justify-start items-start gap-5 h-fit absolute top-40 left-0 px-1 sm:px-20 bg-primary-dark">
        <div class="w-full border-primary-gray border-2 flex items-center h-12">
            <div class="mx-3">
                <svg width="20" height="20" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.4 0H16.2V2.7H5.4V0ZM2.7 5.4V2.7H5.4V5.4H2.7ZM2.7 16.2H0V5.4H2.7V16.2ZM5.4 18.9H2.7V16.2H5.4V18.9ZM16.2 18.9V21.6H5.4V18.9H16.2ZM18.9 16.2H16.2V18.9H18.9V21.6H21.6V24.3H24.3V27H27V24.3H24.3V21.6H21.6V18.9H18.9V16.2ZM18.9 5.4H21.6V16.2H18.9V5.4ZM18.9 5.4V2.7H16.2V5.4H18.9Z" fill="#D9D9D9"/>
                </svg>
            </div>
            <input 
            type="text"
            class="h-10 p-2 bg-transparent w-full focus:outline-none"    
            placeholder="Search by giveaway"
            @input="onSearch">
            <div class="btn-wrapper flex gap-3 justify-between mx-3">
                <button :class="this.isGiveaways ? 'active-btn' : 'inactive-btn'" @click="this.isGiveaways = true">Giveaway</button>
                <button :class="!this.isGiveaways ? 'active-btn' : 'inactive-btn'" @click="this.isGiveaways = false">Community</button>
            </div>
        </div>
        
        <table class="border-separate border-spacing-y-2 w-full table-fixed">
            <thead>
                <tr class="">
                <th class="text-left w-[3%]">Id #</th>
                <th class="w-[24%]">Giveaway</th>
                <th class="w-[20%]">Community</th>
                <th class="w-[8%]">Spots</th>
                <th class="w-[8%]">Entries</th>
                <th class="w-[8%]">Type</th>
                <th class="">Blockchain</th>
                <th class="w-[15%]">End Time</th>
                <th class="w-[7%]">Chances</th>
                </tr>
            </thead>
            <tbody>
                <tr class="" v-for="(item, index) in filteredData" :key="index">
                    <td class="border-l-2 border-y-2 border-primary-gray">{{ ++index }}</td>
                    <td class="border-y-2 border-primary-gray whitespace-nowrap overflow-hidden px-8"><a target="_blank"  :href="item.giveaway_url">{{ item.giveaway }}</a></td>
                    <td class="border-y-2 border-primary-gray"><a target="_blank" :href="item.community_url">{{ item.community }}</a></td>
                    <td class="border-y-2 border-primary-gray">{{ item.spot }}</td>
                    <td class="border-y-2 border-primary-gray">{{ item.entries }}</td>
                    <td class="border-y-2 border-primary-gray uppercase">{{ item.type }}</td>
                    <td class="uppercase border-y-2 border-primary-gray " :class="blockchainColor(item.blockchain)">{{ item.blockchain }}</td>
                    <td class="border-y-2 border-primary-gray uppercase">{{ unixToDate(item.end_time) }}</td>
                    <td class="border-r-2 border-y-2 border-primary-gray" :style="textColor(item.chance)">{{ item.chance }}%</td>
                </tr>
            </tbody>
        </table>
        <h1 v-if="!isRequestSuccses" class="w-full text-4xl mt-20">Loading...</h1>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    data() {
        return {
            isRequestSuccses: false,
            term: '',
            responseData: [],
            formattedData: [],
            isGiveaways: true
        }
    },
    computed: {
        filteredData() {
            return this.formattedData.filter(item => {
                if(this.isGiveaways){
                    return item.giveaway.toLowerCase().includes(this.term.toLowerCase())
                }else if(!this.isGiveaways){
                    return item.community.toLowerCase().includes(this.term.toLowerCase())
                }
            })
        },
        
    },
    methods: {
        unixToDate(unixTimestamp) {
            return new Date(unixTimestamp * 1000).toLocaleString()
        },
        onSearch(e){
            this.term = e.target.value;
        },
        textColor(chance) {
        const color = Math.round((chance / 100) * 255);
        const textColor = `rgb(${255 - color}, ${color}, 0)`;
        const shadowColor = `rgba(${255 - color}, ${color}, 0, 0.39)`;
        return {
            color: textColor,
            textShadow: `0px 0px 13px ${shadowColor}`
        };
        },
        blockchainColor(blockchain) {
            if (blockchain === "sol") {
                return 'bg-sol-gradient';
            } else if (blockchain === "eth") {
                return 'bg-eth-gradient';
            }
        },
        fetchData(){
    axios.get('https://lionfish-app-luhdb.ondigitalocean.app/allgiveaways')
        .then(response => {
            const data = response.data;
            const formattedData = [];
            data.forEach((item, index) => {
            item.giveaways.forEach(giveaway => {
                let obj = {};
                obj.giveaway = giveaway.title;
                obj.community = item.community;
                obj.spot = giveaway.mint_spots;
                obj.entries = giveaway.entries_count;
                obj.type = giveaway.selection_method;
                obj.blockchain = giveaway.blockchain;
                obj.chance = giveaway.chance;
                obj.giveaway_url = giveaway.giveaway_url;
                obj.community_url = giveaway.community_url;
                obj.end_time = giveaway.end_time;
                formattedData.push(obj);
            });
            });
            this.formattedData = formattedData;
            this.responseData = formattedData;
            this.isRequestSuccses = response.status ? true : false
        })
        .catch(error => {
            console.log(error);
        });
}
    },
    async mounted() {
        this.fetchData()   
        setInterval(() => {
            this.fetchData()   
        }, 5000)
    }   
      
}
</script>

<style scoped>
.bg-sol-gradient {
  background-image: linear-gradient(90deg, #9945FF 4.88%, #14F195 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}
.bg-eth-gradient {
  background-image: linear-gradient(90deg, #676767 4.88%, #E2E2E2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}
</style>