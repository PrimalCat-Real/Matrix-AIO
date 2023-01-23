<template>
    <div class="text-white text-xl w-full flex flex-col justify-start items-start gap-5 h-fit absolute top-40 left-0 px-20 bg-primary-dark">
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
                <th class="w-[15%]">Chances</th>
                </tr>
            </thead>
            <tbody>
                <tr class="" v-for="(item, index) in responseData" :key="index">
                    <td class="border-l-2 border-y-2 border-primary-gray">{{ ++index }}</td>
                    <td class="border-y-2 border-primary-gray">{{ item.giveaway }}</td>
                    <td class="border-y-2 border-primary-gray">{{ item.community }}</td>
                    <td class="border-y-2 border-primary-gray">{{ item.spot }}</td>
                    <td class="border-y-2 border-primary-gray">{{ item.entries }}</td>
                    <td class="border-y-2 border-primary-gray">{{ item.type }}</td>
                    <td class="border-y-2 border-primary-gray">{{ item.blockchain }}</td>
                    <td class="border-r-2 border-y-2 border-primary-gray">100%</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            term: '',
            responseData: [],
            formattedData: [],
        }
    },
    methods: {
        onSearch(e){
            this.term = e.target.value;
            this.responseData = this.formattedData.filter(item => {
            return item.giveaway.toLowerCase().includes(this.term.toLowerCase())
            })
        }
    },
    async mounted() {
    try {
      // @IMPORTANT Remove no-cors on production
      const response = await fetch('http://127.0.0.1:8069/allgiveaways')
      if(response.ok) {
        const data = await response.json()
        
        const formattedData = [];
        data.forEach((item, index) => {
        item.giveaways.forEach(giveaway => {
            let obj = {};
            obj.giveaway = giveaway.title;
            obj.community = item.community;
            obj.spot = giveaway.mint_spots;
            obj.entries = giveaway.entries_count;
            obj.type = giveaway.type;
            obj.blockchain = giveaway.blockchain;
            formattedData.push(obj);
        });
        });
        console.log(formattedData);
        this.formattedData = formattedData
        this.responseData = formattedData
      } else {
        throw new Error("Error fetching data")
      }
    } catch (error) {
      console.log(error)
        }
    }
}
</script>

<style>

</style>