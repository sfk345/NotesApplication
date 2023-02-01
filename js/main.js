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
                <h1>First column</h1>
                
            </div>
            <div class="note-two">
                <h1>Second column</h1>
            </div>
            <div  class="note-three">
                <h1>Third column</h1>
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
            <label for="name">Name of the note</label>
            <input id="name" v-model="name" placeholder="Text">
        </p>
        <p class="name-column">
            <label for="noteOne">Your first note</label>
            <input id="noteOne" v-model="noteOne" placeholder="Text of the first note">
        </p>
        <p class="name-column">
            <label for="noteTwo">Your second note</label>
            <input id="noteTwo" v-model="noteTwo" placeholder="Text of the second note">
        </p>
        <p class="name-column">
            <label for="noteThree">Your third note</label>
            <input id="noteThree" v-model="noteThree" placeholder="Text of the third note">
        </p>
        <p class="name-column">
            <label for="noteFore">Your fourth note</label>
            <input id="noteFore" v-model="noteFore" placeholder="Text of the fourth note">
        </p>
        <p class="name-column">
            <label for="noteFife">Your fifth note</label>
            <input id="noteFife" v-model="noteFife" placeholder="Text of the fifth note">
        </p>
        <input class="btn" type="submit" value="Submit">
    </form>
    `,
    data() {
        return {
            name: null,
            noteOne: null,
            noteTwo: null,
            noteThree: null,
            noteFore: null,
            noteFife: null,
        }
    },
    methods: {
        onSubmit(){
            let noteCard = {
                name: this.name,
                noteOne: this.noteOne,
                noteTwo: this.noteTwo,
                noteThree: this.noteThree,
                noteFore: this.noteFore,
                noteFife: this.noteFife,
            }
            this.$emit('note-submitted', noteCard)
            this.name = null
        }
    },
    props: {

    }
})