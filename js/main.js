let app = new Vue({
    el: '#app',
    data:{

    }
})

Vue.component('Notes', {
    templates: `
    <div class="Notes">
        <div class="all-notes">
            <div class="note-one">
            
            </div>
            <div class="note-two">
            
            </div>
            <div  class="note-three">
            
            </div>
        </div>
        <div class="note-add">
            <Notes-add></Notes-add>
        </div>
    </div>
    `,
    data(){
        return {

        }
    },
    methods:{

    },
    props: {

    },
    mounted(){

    }
})

Vue.component('Notes-tab', {
    templates: `
    <div>
        <ul>
            <span class="tab"
            :class="{activeTab: selectedtab === tab}"
            @click="selectedTab = tab">
            {{tab}}
            </span>
        </ul>
    </div>
    `,
    data() {
        return {

        }
    },
    methods: {

    },
    props: {

    }
})

Vue.component('Notes-add', {
    templates: `
    <form class="note-form" @submit.prevent="onSubmit">
        <p class="name-column>
            <label>Name of the note</label>
            <input id="name" placeholder="Text">
        </p>
        <p class="name-column">
            <label>Your first note</label>
            <input id="noteOne">
        </p>
        <p>
            <label>Your second note</label>
            <input id="noteTwo">
        </p>
        <p>
            <label>Your third note</label>
            <input id="noteThree">
        </p>
        <p>
            <label for="#">Your fourth note</label>
            <input id="noteFore">
        </p>
        <p>
            <label for="#">Your fifth note</label>
            <input id="noteFife">
        </p>
        <input type="submit" value="Submit">
    </form>
    `,
    data() {
        return {

        }
    },
    methods: {

    },
    props: {

    }
})