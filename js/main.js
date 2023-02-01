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
        <p class="name-column">
            <label>Your first note</label>
            <input id="noteOne">
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