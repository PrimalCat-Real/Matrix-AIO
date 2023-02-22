<template>
    <div class="text-white text-xl w-full flex flex-col justify-start items-start gap-5 h-fit absolute top-20 left-0 px-1 sm:px-20 bg-primary-dark">
        <div class="w-full border-primary-gray border-2 flex items-center h-14 rounded-sm bg-[#00000032]">
            <div class="mx-4">
                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.9663 17.1599C14.3024 18.5526 12.1592 19.393 9.82263 19.393C4.5385 19.393 0.25 15.1045 0.25 9.8215C0.25 4.5385 4.5385 0.25 9.82263 0.25C15.1045 0.25 19.3941 4.5385 19.3941 9.8215C19.3941 12.1593 18.5537 14.3035 17.161 15.9651L22.5036 21.3089C22.6679 21.4731 22.75 21.6891 22.75 21.9062C22.75 22.5666 22.1459 22.75 21.9062 22.75C21.6903 22.75 21.4743 22.6679 21.3089 22.5025L15.9663 17.1599ZM9.82263 1.93862C5.47112 1.93862 1.93975 5.47113 1.93975 9.8215C1.93975 14.1719 5.47112 17.7044 9.82263 17.7044C14.1719 17.7044 17.7055 14.1719 17.7055 9.8215C17.7055 5.47113 14.1719 1.93862 9.82263 1.93862Z" fill="white"/>
                </svg>
            </div>
            <input 
            type="text"
            class="h-10 p-2 bg-transparent w-full focus:outline-none placeholder-secondary-light text-xl"    
            :placeholder="isGiveaways ? 'Search by giveaway': 'Search by community'"
            @input="onSearch">
            <div class="btn-wrapper flex gap-3 justify-between mx-3 items-center min-w-fit text-base">
                <h1 class="text-secondary-gray font-inter">Search by: </h1>
                <div class="border rounded-full border-2 border-secondary-gray">
                    <button :class="this.isGiveaways ? 'active-btn' : 'inactive-btn'" @click="this.isGiveaways = true">Giveaway</button>
                    <button :class="!this.isGiveaways ? 'active-btn' : 'inactive-btn'" @click="this.isGiveaways = false">Community</button>
                </div>
            </div>
        </div>
        
        <table class="border-separate border-spacing-y-2 w-full table-fixed text-secondary-light">
            <thead class="h-12">
                <tr class="font-roboto">
                    <th class="text-left w-[3%] font-light">Id #</th>
                    <th class="w-[24%] font-light">Giveaway</th>
                    <th class="w-[20%] font-light">Community</th>
                    <th class="w-[8%] font-light">Spots</th>
                    <th class="w-[8%] font-light">Entries</th>
                    <th class="w-[8%] sort-btn font-light" @click="sortByType">
                        <div class="tag-wrapper gap-3">
                            Type
                            <span class="cursor-pointer transition-all duration-300" :class="sortOrderByType && 'rotate-180'">
                                <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 10L11.7735 0H0.226497L6 10Z" fill="#919191"/>
                                </svg>
                            </span>
                        </div>
                    </th>
                    <th class="font-light">Blockchain</th>
                    <th class="w-[15%] sort-btn font-light" @click="sortByEndTime">
                        <div class="tag-wrapper gap-3">
                            End Time
                            <span class="cursor-pointer transition-all duration-300" :class="sortOrderByEndTime && 'rotate-180'">
                                <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 10L11.7735 0H0.226497L6 10Z" fill="#919191"/>
                                </svg>
                            </span>
                        </div>
                    </th>
                    <th class="w-[7%] sort-btn font-light" @click="sortByChance">
                        <div class="tag-wrapper gap-3">
                            Chances
                            <span class="cursor-pointer transition-all duration-300" :class="sortOrderByChance === -1 && 'rotate-180'">
                                <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 10L11.7735 0H0.226497L6 10Z" fill="#919191"/>
                                </svg>
                            </span>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="h-14 rounded-sm text-white" v-for="(item, index) in filteredData" :key="index">
                    <td class="border-l-2 border-y-2 border-primary-gray">{{ ++index }}</td>
                    <td class="border-y-2 border-primary-gray whitespace-nowrap overflow-hidden px-8"><a target="_blank"  :href="item.giveaway_url">{{ item.giveaway }}</a></td>
                    <td class="border-y-2 border-primary-gray whitespace-nowrap overflow-hidden"><a target="_blank" :href="item.community_url">{{ item.community }}</a></td>
                    <td class="border-y-2 border-primary-gray">{{ item.spot }}</td>
                    <td class="border-y-2 border-primary-gray">{{ item.entries }}</td>
                    <td class="border-y-2 border-primary-gray uppercase">{{ item.type }}</td>
                    <td class="uppercase border-y-2 border-primary-gray ">
                        <!-- sol icon -->
                        <div v-if="item.blockchain === 'sol'" class="tag-wrapper">
                            <SolIcon></SolIcon>
                        </div>
                        
                        <!-- eth icon -->
                        <div v-if="item.blockchain === 'eth'" class="tag-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="17" height="28" version="1.1" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"
                            viewBox="0 0 784.37 1277.39"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            xmlns:xodm="http://www.corel.com/coreldraw/odm/2003">
                            <g id="Layer_x0020_1">
                            <metadata id="CorelCorpID_0Corel-Layer"/>
                            <g id="_1421394342400">
                            <g>
                                <polygon fill="#343434" fill-rule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54 "/>
                                <polygon fill="#8C8C8C" fill-rule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33 "/>
                                <polygon fill="#3C3C3B" fill-rule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89 "/>
                                <polygon fill="#8C8C8C" fill-rule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89 "/>
                                <polygon fill="#141414" fill-rule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33 "/>
                                <polygon fill="#393939" fill-rule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33 "/>
                            </g>
                            </g>
                            </g>
                            </svg>
                        </div>

                        <!-- other icon -->
                        <div class="tag-wrapper" v-if="item.blockchain != 'sol' && item.blockchain != 'eth'">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path class="fill-secondary-light" d="M14.601 21.5c0 1.38-1.116 2.5-2.499 2.5-1.378 0-2.499-1.12-2.499-2.5s1.121-2.5 2.499-2.5c1.383 0 2.499 1.119 2.499 2.5zm-2.42-21.5c-4.029 0-7.06 2.693-7.06 8h3.955c0-2.304.906-4.189 3.024-4.189 1.247 0 2.57.828 2.684 2.411.123 1.666-.767 2.511-1.892 3.582-2.924 2.78-2.816 4.049-2.816 7.196h3.943c0-1.452-.157-2.508 1.838-4.659 1.331-1.436 2.986-3.222 3.021-5.943.047-3.963-2.751-6.398-6.697-6.398z"/></svg>
                        </div>

                        <!-- other text -->
                        <!-- <span  v-if="item.blockchain != 'sol' && item.blockchain != 'eth'">{{ item.blockchain }}</span> -->
                    </td>
                    <td class="border-y-2 border-primary-gray uppercase font-bold">{{ unixToDate(item.end_time) }}</td>
                    <td class="border-r-2 border-y-2 border-primary-gray font-bold" :style="textColor(item.chance)">{{ item.chance }}</td>
                </tr>
            </tbody>
        </table>
        <h1 v-if="!isRequestSuccses" class="w-full text-4xl mt-20">Loading...</h1>
        <PagesNav
        :total-items="this.dataSize"
        :page-size="pageSize"
        :current-page="currentPage" 
        @update:current-page="currentPage = $event"
            ></PagesNav>
    </div>

</template>
<script>
import axios from 'axios'
import ArrowIcon from './ArrowIcon.vue'
import SolIcon from './SolIcon.vue'
import PagesNav from './PagesNav.vue'

export default {
    data() {
        return {
            isRequestSuccses: false,
            term: "",
            responseData: [],
            formattedData: [],
            isGiveaways: true,
            // pagination test
            pageSize: 50,
            currentPage: 1,
            dataSize: 0,
            isSortedByChance: false,
            isSortedByEndTime: false,
            isSortedByType: false,
            sortOrderByChance: 1,
            sortOrderByEndTime: false,
            sortOrderByType: false,
        };
    },
    computed: {
        // without pagination
        // filteredData() {
        //     return this.formattedData.filter(item => {
        //         if (this.isGiveaways) {
        //             return item.giveaway.toLowerCase().includes(this.term.toLowerCase());
        //         }
        //         else if (!this.isGiveaways) {
        //             return item.community.toLowerCase().includes(this.term.toLowerCase());
        //         }
        //     });
        // },
        filteredData() {
            const filteredData = this.formattedData.filter(item => {
            if (this.isGiveaways) {
                return item.giveaway.toLowerCase().includes(this.term.toLowerCase());
            } else if (!this.isGiveaways) {
                return item.community.toLowerCase().includes(this.term.toLowerCase());
            }
            });

            this.dataSize = filteredData.length

            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            console.log(filteredData.slice(start, end))
            return filteredData.slice(start, end);
        }

    },
    methods: {
        unixToDate(unixTimestamp) {
            if (unixTimestamp == "TBA") {
                return "TBA";
            }
            else {
                let diff = new Date(unixTimestamp * 1000) - new Date();
                let diffInMinutes = diff / (1000 * 60);
                let diffInHours = diffInMinutes / 60;
                return diff < 0 ? "Time Expired" : (diffInHours > 0 ? diffInHours.toFixed(0) + " hours" : diffInMinutes.toFixed(0) + " minutes");
            }
        },
        onSearch(e) {
            this.term = e.target.value;
            this.currentPage = 1
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
                return "bg-sol-gradient";
            }
            else if (blockchain === "eth") {
                return "bg-eth-gradient";
            }
        },
        fetchData() {
            axios.get("https://lionfish-app-luhdb.ondigitalocean.app/allgiveaways")
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
                this.dataSize = this.formattedData.length;
                this.isRequestSuccses = response.status ? true : false;
                // if(this.isSortedByEndTime){
                //     this.sortByEndTime()
                // }else if(this.isSortedByChance){
                //     this.sortByChance()
                // }else if(this.isSortedByChance && this.isSortedByEndTime){
                //     console.log("sorted");
                //     this.sortByEndTime()
                //     this.sortByChance() 
    
                // }
                // console.log("sorted like", this.isSortedByChance && this.isSortedByEndTime);
                })
                .catch(error => {
                console.log(error);
            });
        },
        sortByType() {
            if (this.sortOrderByType) {
            this.formattedData.sort((a, b) => a.type.localeCompare(b.type));
            this.sortOrderByType = false;
            } else {
            this.formattedData.sort((a, b) => b.type.localeCompare(a.type));
            this.sortOrderByType = true;
            }
        },
        sortByChance(){
            this.formattedData.sort((a, b) => this.sortOrderByChance * (b.chance - a.chance));
            this.sortOrderByChance *= -1; // toggle the sort order
        },
        sortByEndTime(){
            if (!this.sortOrderByEndTime) {
                this.formattedData.sort((a, b) => {
                    const aTime = a.end_time === "TBA" ? Number.MAX_SAFE_INTEGER: parseInt(a.end_time);
                    const bTime = b.end_time === "TBA" ? Number.MAX_SAFE_INTEGER: parseInt(b.end_time);
                    return (aTime - bTime);
                });
                this.sortOrderByEndTime = true;
            } else {
                this.formattedData.sort((a, b) => {
                    const aTime = a.end_time === "TBA" ? Number.MAX_SAFE_INTEGER: parseInt(a.end_time);
                    const bTime = b.end_time === "TBA" ? Number.MAX_SAFE_INTEGER: parseInt(b.end_time);
                    return (bTime - aTime);
                });
                this.sortOrderByEndTime = false;
            }
        },
        onPageChange(pageNumber) {
            this.currentPage = pageNumber;
            console.log(this.currentPage);
        }
    },
    async mounted() {
        this.fetchData();
        setInterval(() => {
            this.fetchData();
        }, 100000);
    },
    components: { ArrowIcon, PagesNav, SolIcon }
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